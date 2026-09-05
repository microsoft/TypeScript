package lsp

import (
	"runtime"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// Each concurrent project holds its own diagnostics checker, so this bounds peak memory.
const workspaceDiagnosticsMaxProjects = 4

// workspaceDiagnosticsConcurrency returns how many projects to check at once, mirroring the default
// the build orchestrator uses for --builders: four, or one under single threaded mode. Unlike a
// build, a pull runs while the user is typing, so it also leaves half the processors for the
// requests they are waiting on.
func workspaceDiagnosticsConcurrency(work []workspaceDiagnosticsProject) int {
	for _, pf := range work {
		if pf.languageService.GetProgram().SingleThreaded() {
			return 1
		}
	}
	return min(len(work), workspaceDiagnosticsMaxProjects, max(1, runtime.GOMAXPROCS(0)/2))
}

// projectsInScope narrows the loaded projects to the ones the scope reports on, in snapshot order.
func projectsInScope(snapshot *project.Snapshot, scope lsutil.WorkspaceDiagnosticsScope) []*project.Project {
	all := snapshot.ProjectCollection.Projects()
	if scope == lsutil.WorkspaceDiagnosticsScopeAllProjects {
		return all
	}

	wanted := collections.Set[tspath.Path]{}
	for _, open := range snapshot.OpenProjects() {
		wanted.Add(open.Id())
	}
	if scope == lsutil.WorkspaceDiagnosticsScopeOpenProjectsAndDependents {
		// Walk reference edges backwards to a fixed point to find consumers of the open projects.
		// The graph is tiny, so repeated passes beat building a reverse index.
		for changed := true; changed; {
			changed = false
			for _, p := range all {
				if wanted.Has(p.Id()) {
					continue
				}
				if slices.ContainsFunc(p.ReferencedProjectPaths(), wanted.Has) {
					wanted.Add(p.Id())
					changed = true
				}
			}
		}
	}

	inScope := make([]*project.Project, 0, wanted.Len())
	for _, p := range all {
		if wanted.Has(p.Id()) {
			inScope = append(inScope, p)
		}
	}
	return inScope
}

type workspaceDiagnosticsProject struct {
	languageService *ls.LanguageService
	project         *project.Project
	generation      uint64
	// Index aligned. A file answered from the cache has its report filled in and its entry nil.
	files   []*ast.SourceFile
	reports []workspaceDiagnosticReport
	toCheck int
}

// assignFilesToProjects decides which project reports which file and answers from the cache where
// it can. Enumerating files needs the program but not a checker, so this runs before any checking.
func (r *workspaceDiagnosticsRun) assignFilesToProjects(snapshot *project.Snapshot, projects []*project.Project) []workspaceDiagnosticsProject {
	var work []workspaceDiagnosticsProject
	// A client that pulls per document reconciles the two providers' results poorly, so open
	// documents are left to that pull. One that only pulls the workspace needs them included.
	deDuplicate := !snapshot.UserPreferences().WorkspaceDiagnosticsServerDiagnosticsDeDuplication.IsFalse()
	for _, p := range projects {
		program := p.GetProgram()
		if program == nil {
			continue
		}
		// Id rather than ConfigFilePath: the inferred project has no config file and would panic.
		projectPath := p.Id()
		generation := p.ProgramLastUpdate
		languageService := ls.NewLanguageService(projectPath, program, snapshot, "")

		pf := workspaceDiagnosticsProject{languageService: languageService, project: p, generation: generation}
		for _, file := range languageService.WorkspaceDiagnosticFiles() {
			if deDuplicate {
				if handle := snapshot.GetFile(file.FileName()); handle != nil && handle.IsOverlay() {
					// The client pulls open documents directly. Reporting them here too would
					// duplicate every problem, since the client only reconciles the two within one
					// provider. Leaving the file out of `reported` clears anything it still holds.
					continue
				}
			}
			uri := lsconv.FileNameToDocumentURI(file.FileName())
			if !r.reported.AddIfAbsent(uri) {
				continue
			}
			if resultID, ok := r.cache.unchangedResultID(uri, projectPath, generation, r.previous[uri]); ok {
				pf.files = append(pf.files, nil)
				pf.reports = append(pf.reports, workspaceDiagnosticReport{
					UnchangedDocumentDiagnosticReport: &lsproto.WorkspaceUnchangedDocumentDiagnosticReport{
						Uri:      uri,
						Version:  openDocumentVersion(snapshot, file.FileName()),
						ResultId: resultID,
					},
				})
				continue
			}
			pf.files = append(pf.files, file)
			pf.reports = append(pf.reports, workspaceDiagnosticReport{})
			pf.toCheck++
		}
		if len(pf.files) > 0 {
			work = append(work, pf)
		}
	}
	return work
}
