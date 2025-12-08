package ls

import (
	"context"
	"fmt"
	"iter"
	"runtime/debug"
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type Project interface {
	Id() tspath.Path
	GetProgram() *compiler.Program
	HasFile(fileName string) bool
}

type projectAndTextDocumentPosition struct {
	project             Project
	ls                  *LanguageService
	Uri                 lsproto.DocumentUri
	Position            lsproto.Position
	forOriginalLocation bool
}

type response[Resp any] struct {
	complete            bool
	result              Resp
	forOriginalLocation bool
}

type CrossProjectOrchestrator interface {
	GetDefaultProject() Project
	GetAllProjectsForInitialRequest() []Project
	GetLanguageServiceForProjectWithFile(ctx context.Context, project Project, uri lsproto.DocumentUri) *LanguageService
	GetProjectsForFile(ctx context.Context, uri lsproto.DocumentUri) ([]Project, error)
	GetProjectsLoadingProjectTree(ctx context.Context, requestedProjectTrees *collections.Set[tspath.Path]) iter.Seq[Project]
}

func handleCrossProject[Req lsproto.HasTextDocumentPosition, Resp any](
	defaultLs *LanguageService,
	ctx context.Context,
	params Req,
	orchestrator CrossProjectOrchestrator,
	symbolAndEntriesToResp func(*LanguageService, context.Context, Req, SymbolAndEntriesData, symbolEntryTransformOptions) (Resp, error),
	combineResults func(iter.Seq[Resp]) Resp,
	isRename bool,
	implementations bool,
	options symbolEntryTransformOptions,
) (Resp, error) {
	var resp Resp
	var err error

	// Single project
	if orchestrator == nil {
		data, _ := defaultLs.provideSymbolsAndEntries(ctx, params.TextDocumentURI(), params.TextDocumentPosition(), isRename, implementations)
		return symbolAndEntriesToResp(defaultLs, ctx, params, data, options)
	}

	defaultProject := orchestrator.GetDefaultProject()
	allProjects := orchestrator.GetAllProjectsForInitialRequest()
	var results collections.SyncMap[tspath.Path, *response[Resp]]
	var defaultDefinition *nonLocalDefinition
	canSearchProject := func(project Project) bool {
		_, searched := results.Load(project.Id())
		return !searched
	}
	wg := core.NewWorkGroup(false)
	var errMu sync.Mutex
	var enqueueItem func(item projectAndTextDocumentPosition)
	var panicsOccured []string
	var panicMu sync.Mutex
	enqueueItem = func(item projectAndTextDocumentPosition) {
		var response response[Resp]
		if _, loaded := results.LoadOrStore(item.project.Id(), &response); loaded {
			return
		}
		wg.Queue(func() {
			if ctx.Err() != nil {
				return
			}
			defer func() {
				if r := recover(); r != nil {
					stack := debug.Stack()
					panicOccured := fmt.Sprintf("panic handling request: %v\n%s", r, string(stack))
					panicMu.Lock()
					panicsOccured = append(panicsOccured, panicOccured)
					panicMu.Unlock()
				}
			}()
			// Process the item
			ls := item.ls
			if ls == nil {
				// Get it now
				ls = orchestrator.GetLanguageServiceForProjectWithFile(ctx, item.project, item.Uri)
				if ls == nil {
					return
				}
			}
			data, ok := ls.provideSymbolsAndEntries(ctx, item.Uri, item.Position, isRename, implementations)
			if ctx.Err() != nil {
				return
			}
			if ok {
				for _, entry := range data.SymbolsAndEntries {
					// Find the default definition that can be in another project
					// Later we will use this load ancestor tree that references this location and expand search
					if item.project == defaultProject && defaultDefinition == nil {
						defaultDefinition = ls.getNonLocalDefinition(ctx, entry)
					}
					ls.forEachOriginalDefinitionLocation(ctx, entry, func(uri lsproto.DocumentUri, position lsproto.Position) {
						// Get default configured project for this file
						defProjects, errProjects := orchestrator.GetProjectsForFile(ctx, uri)
						if errProjects != nil {
							return
						}
						for _, defProject := range defProjects {
							// Optimization: don't enqueue if will be discarded
							if canSearchProject(defProject) {
								enqueueItem(projectAndTextDocumentPosition{
									project:             defProject,
									Uri:                 uri,
									Position:            position,
									forOriginalLocation: true,
								})
							}
						}
					})
				}
			}

			if result, errSearch := symbolAndEntriesToResp(ls, ctx, params, data, options); errSearch == nil {
				response.complete = true
				response.result = result
				response.forOriginalLocation = item.forOriginalLocation
			} else {
				errMu.Lock()
				defer errMu.Unlock()
				if err == nil {
					err = errSearch
				}
			}
		})
	}

	// Initial set of projects and locations in the queue, starting with default project
	enqueueItem(projectAndTextDocumentPosition{
		project:  defaultProject,
		ls:       defaultLs,
		Uri:      params.TextDocumentURI(),
		Position: params.TextDocumentPosition(),
	})
	for _, project := range allProjects {
		if project != defaultProject {
			enqueueItem(projectAndTextDocumentPosition{
				project: project,
				// TODO!! symlinks need to change the URI
				Uri:      params.TextDocumentURI(),
				Position: params.TextDocumentPosition(),
			})
		}
	}

	getResultsIterator := func() iter.Seq[Resp] {
		return func(yield func(Resp) bool) {
			var seenProjects collections.SyncSet[tspath.Path]
			if response, loaded := results.Load(defaultProject.Id()); loaded && response.complete {
				if !yield(response.result) {
					return
				}
			}
			seenProjects.Add(defaultProject.Id())
			for _, project := range allProjects {
				if seenProjects.AddIfAbsent(project.Id()) {
					if response, loaded := results.Load(project.Id()); loaded && response.complete {
						if !yield(response.result) {
							return
						}
					}
				}
			}
			// Prefer the searches from locations for default definition
			results.Range(func(key tspath.Path, response *response[Resp]) bool {
				if !response.forOriginalLocation && seenProjects.AddIfAbsent(key) && response.complete {
					return yield(response.result)
				}
				return true
			})
			// Then the searches from original locations
			results.Range(func(key tspath.Path, response *response[Resp]) bool {
				if response.forOriginalLocation && seenProjects.AddIfAbsent(key) && response.complete {
					return yield(response.result)
				}
				return true
			})
		}
	}

	// Outer loop - to complete work if more is added after completing existing queue
	for {
		// Process existing known projects first
		wg.RunAndWait()
		// No need to use mu here since we are not in parallel at this point
		if panicsOccured != nil {
			panic(fmt.Sprintf("Panics occurred during cross-project handling: %v", panicsOccured))
		}
		if ctx.Err() != nil {
			return resp, ctx.Err()
		}
		if err != nil {
			return resp, err
		}

		wg = core.NewWorkGroup(false)
		hasMoreWork := false
		if defaultDefinition != nil {
			var requestedProjectTrees collections.Set[tspath.Path]
			results.Range(func(key tspath.Path, response *response[Resp]) bool {
				if response.complete {
					requestedProjectTrees.Add(key)
				}
				return true
			})

			// Load more projects based on default definition found
			for loadedProject := range orchestrator.GetProjectsLoadingProjectTree(ctx, &requestedProjectTrees) {
				if ctx.Err() != nil {
					return resp, ctx.Err()
				}

				// Can loop forever without this (enqueue here, dequeue above, repeat)
				if !canSearchProject(loadedProject) || loadedProject.GetProgram() == nil {
					continue
				}

				// Enqueue the project and location for further processing
				if loadedProject.HasFile(defaultDefinition.TextDocumentURI().FileName()) {
					enqueueItem(projectAndTextDocumentPosition{
						project:  loadedProject,
						Uri:      defaultDefinition.TextDocumentURI(),
						Position: defaultDefinition.TextDocumentPosition(),
					})
					hasMoreWork = true
				} else if sourcePos := defaultDefinition.GetSourcePosition(); sourcePos != nil && loadedProject.HasFile(sourcePos.TextDocumentURI().FileName()) {
					enqueueItem(projectAndTextDocumentPosition{
						project:  loadedProject,
						Uri:      sourcePos.TextDocumentURI(),
						Position: sourcePos.TextDocumentPosition(),
					})
					hasMoreWork = true
				} else if generatedPos := defaultDefinition.GetGeneratedPosition(); generatedPos != nil && loadedProject.HasFile(generatedPos.TextDocumentURI().FileName()) {
					enqueueItem(projectAndTextDocumentPosition{
						project:  loadedProject,
						Uri:      generatedPos.TextDocumentURI(),
						Position: generatedPos.TextDocumentPosition(),
					})
					hasMoreWork = true
				}
			}
		}
		if !hasMoreWork {
			break
		}
	}

	if results.Size() > 1 {
		resp = combineResults(getResultsIterator())
	} else {
		// Single result, return that directly
		for value := range getResultsIterator() {
			resp = value
			break
		}
	}
	return resp, nil
}

func combineLocationArray[T lsproto.HasLocation](
	combined []T,
	locations *[]T,
	seen *collections.Set[lsproto.Location],
) []T {
	for _, loc := range *locations {
		if seen.AddIfAbsent(loc.GetLocation()) {
			combined = append(combined, loc)
		}
	}
	return combined
}

func combineResponseLocations[T lsproto.HasLocations](results iter.Seq[T]) *[]lsproto.Location {
	var combined []lsproto.Location
	var seenLocations collections.Set[lsproto.Location]
	for resp := range results {
		if locations := resp.GetLocations(); locations != nil {
			combined = combineLocationArray(combined, locations, &seenLocations)
		}
	}
	return &combined
}

func combineReferences(results iter.Seq[lsproto.ReferencesResponse]) lsproto.ReferencesResponse {
	return lsproto.LocationsOrNull{Locations: combineResponseLocations(results)}
}

func combineImplementations(results iter.Seq[lsproto.ImplementationResponse]) lsproto.ImplementationResponse {
	var combined []*lsproto.LocationLink
	var seenLocations collections.Set[lsproto.Location]
	for resp := range results {
		if definitionLinks := resp.DefinitionLinks; definitionLinks != nil {
			combined = combineLocationArray(combined, definitionLinks, &seenLocations)
		} else if locations := resp.Locations; locations != nil {
			return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{Locations: combineResponseLocations(results)}
		}
	}
	return lsproto.LocationOrLocationsOrDefinitionLinksOrNull{DefinitionLinks: &combined}
}

func combineRenameResponse(results iter.Seq[lsproto.RenameResponse]) lsproto.RenameResponse {
	combined := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)
	seenChanges := make(map[lsproto.DocumentUri]*collections.Set[lsproto.Range])
	// !!! this is not used any more so we will skip this part of deduplication and combining
	// 	DocumentChanges *[]TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile `json:"documentChanges,omitzero"`
	// 	ChangeAnnotations *map[string]*ChangeAnnotation `json:"changeAnnotations,omitzero"`

	for resp := range results {
		if resp.WorkspaceEdit != nil && resp.WorkspaceEdit.Changes != nil {
			for doc, changes := range *resp.WorkspaceEdit.Changes {
				seenSet, ok := seenChanges[doc]
				if !ok {
					seenSet = &collections.Set[lsproto.Range]{}
					seenChanges[doc] = seenSet
				}
				changesForDoc, exists := combined[doc]
				if !exists {
					changesForDoc = []*lsproto.TextEdit{}
				}
				for _, change := range changes {
					if !seenSet.Has(change.Range) {
						seenSet.Add(change.Range)
						changesForDoc = append(changesForDoc, change)
					}
				}
				combined[doc] = changesForDoc
			}
		}
	}
	if len(combined) > 0 {
		return lsproto.RenameResponse{
			WorkspaceEdit: &lsproto.WorkspaceEdit{
				Changes: &combined,
			},
		}
	}
	return lsproto.RenameResponse{}
}

func combineIncomingCalls(results iter.Seq[lsproto.CallHierarchyIncomingCallsResponse]) lsproto.CallHierarchyIncomingCallsResponse {
	var combined []*lsproto.CallHierarchyIncomingCall
	var seenCalls collections.Set[lsproto.Location]
	for resp := range results {
		if resp.CallHierarchyIncomingCalls != nil {
			for _, call := range *resp.CallHierarchyIncomingCalls {
				if seenCalls.AddIfAbsent(call.From.GetLocation()) {
					combined = append(combined, call)
				}
			}
		}
	}
	return lsproto.CallHierarchyIncomingCallsResponse{CallHierarchyIncomingCalls: &combined}
}
