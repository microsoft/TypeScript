package ls

import (
	"cmp"
	"context"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

// CodeFixProvider represents a provider for a specific type of code fix
type CodeFixProvider struct {
	ErrorCodes        []int32
	GetCodeActions    func(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error)
	FixIds            []string
	GetAllCodeActions func(ctx context.Context, fixContext *CodeFixContext) (*CombinedCodeActions, error)
}

// CodeFixContext contains the context needed to generate code fixes
type CodeFixContext struct {
	SourceFile *ast.SourceFile
	Span       core.TextRange
	ErrorCode  int32
	Program    *compiler.Program
	LS         *LanguageService
	Diagnostic *lsproto.Diagnostic
	Params     *lsproto.CodeActionParams
}

// CodeAction represents a single code action fix
type CodeAction struct {
	Description       string
	Changes           []*lsproto.TextEdit
	FixID             string
	FixAllDescription string
}

// Compare defines a total ordering for CodeAction values, comparing description
// then text edits lexicographically. Used with slices.BinarySearchFunc.
func (a *CodeAction) Compare(b *CodeAction) int {
	if c := strings.Compare(a.Description, b.Description); c != 0 {
		return c
	}
	if c := cmp.Compare(len(a.Changes), len(b.Changes)); c != 0 {
		return c
	}
	for i, edit := range a.Changes {
		if c := edit.Compare(b.Changes[i]); c != 0 {
			return c
		}
	}
	return 0
}

// CombinedCodeActions represents combined code actions for fix-all scenarios
type CombinedCodeActions struct {
	Description string
	Changes     []*lsproto.TextEdit
}

// codeFixProviders is the list of all registered code fix providers
var codeFixProviders = []*CodeFixProvider{
	ImportFixProvider,
	IsolatedDeclarationsFixProvider,
	// Add more code fix providers here as they are implemented
}

// ProvideCodeActions returns code actions for the given range and context
func (l *LanguageService) ProvideCodeActions(ctx context.Context, params *lsproto.CodeActionParams) (lsproto.CodeActionResponse, error) {
	program, file := l.getProgramAndFile(params.TextDocument.Uri)

	var actions []lsproto.CommandOrCodeAction

	if params.Context != nil && params.Context.Only != nil {
		for _, kind := range *params.Context.Only {
			matchingKinds := getOrganizeImportsActionsForKind(kind)
			for _, matchingKind := range matchingKinds {
				organizeAction := l.createOrganizeImportsAction(ctx, program, file, matchingKind)
				actions = append(actions, *organizeAction)
			}

			if isFixAllKind(kind) {
				fixAllAction, err := l.createFixAllAction(ctx, program, file, params.TextDocument.Uri)
				if err != nil {
					return lsproto.CodeActionResponse{}, err
				}
				if fixAllAction != nil {
					actions = append(actions, *fixAllAction)
				}
			}
		}
	}

	if params.Context != nil && params.Context.Diagnostics != nil && wantsQuickFixes(params.Context.Only) {
		fixIdSeen := make(map[string]*CodeFixProvider)

		for _, diag := range params.Context.Diagnostics {
			if diag.Code == nil || diag.Code.Integer == nil {
				continue
			}

			errorCode := *diag.Code.Integer

			for _, provider := range codeFixProviders {
				if !containsErrorCode(provider.ErrorCodes, errorCode) {
					continue
				}

				position := l.converters.LineAndCharacterToPosition(file, diag.Range.Start)
				endPosition := l.converters.LineAndCharacterToPosition(file, diag.Range.End)
				fixContext := &CodeFixContext{
					SourceFile: file,
					Span:       core.NewTextRange(int(position), int(endPosition)),
					ErrorCode:  errorCode,
					Program:    program,
					LS:         l,
					Diagnostic: diag,
					Params:     params,
				}

				providerActions, err := provider.GetCodeActions(ctx, fixContext)
				if err != nil {
					return lsproto.CodeActionResponse{}, err
				}
				for _, action := range providerActions {
					actions = append(actions, convertToLSPCodeAction(action, diag, params.TextDocument.Uri))
					if action.FixID != "" {
						fixIdSeen[action.FixID] = provider
					}
				}
			}
		}

		fixAllActions, err := l.getFixAllQuickFixes(ctx, program, file, params.TextDocument.Uri, fixIdSeen)
		if err != nil {
			return lsproto.CodeActionResponse{}, err
		}
		actions = append(actions, fixAllActions...)
	}

	return lsproto.CommandOrCodeActionArrayOrNull{CommandOrCodeActionArray: &actions}, nil
}

// getFixAllQuickFixes returns per-provider "Fix all in file" quickfix entries for providers
// that matched at least 2 diagnostics in the full file.
func (l *LanguageService) getFixAllQuickFixes(
	ctx context.Context,
	program *compiler.Program,
	file *ast.SourceFile,
	uri lsproto.DocumentUri,
	fixIdSeen map[string]*CodeFixProvider,
) ([]lsproto.CommandOrCodeAction, error) {
	var actions []lsproto.CommandOrCodeAction

	// Deduplicate providers; multiple fixIds may map to the same provider.
	var seen collections.Set[*CodeFixProvider]
	for _, provider := range fixIdSeen {
		if seen.Has(provider) {
			continue
		}
		seen.Add(provider)

		if provider.GetAllCodeActions == nil {
			continue
		}

		if !hasMultipleFixableDiagnostics(ctx, program, file, provider.ErrorCodes) {
			continue
		}

		fixContext := &CodeFixContext{
			SourceFile: file,
			Program:    program,
			LS:         l,
		}
		combined, err := provider.GetAllCodeActions(ctx, fixContext)
		if err != nil {
			return nil, err
		}
		if combined != nil && len(combined.Changes) > 0 {
			kind := lsproto.CodeActionKindQuickFix
			changes := map[lsproto.DocumentUri][]*lsproto.TextEdit{
				uri: combined.Changes,
			}
			actions = append(actions, lsproto.CommandOrCodeAction{
				CodeAction: &lsproto.CodeAction{
					Title: combined.Description,
					Kind:  &kind,
					Edit:  &lsproto.WorkspaceEdit{Changes: &changes},
				},
			})
		}
	}

	return actions, nil
}

// hasMultipleFixableDiagnostics returns true if the file has at least 2 diagnostics
// matching the given error codes. Checks all diagnostic sources (semantic,
// syntactic, suggestion, declaration) to match ProvideDiagnostics.
func hasMultipleFixableDiagnostics(ctx context.Context, program *compiler.Program, file *ast.SourceFile, errorCodes []int32) bool {
	allDiags := getAllDiagnostics(ctx, program, file)
	count := 0
	for _, d := range allDiags {
		if containsErrorCode(errorCodes, d.Code()) {
			count++
			if count >= 2 {
				return true
			}
		}
	}
	return false
}

// codeActionKindContains returns true if the requested kind equals or is a
// hierarchical parent of actionKind, using '.' as the separator. This matches
// the semantics of VS Code's HierarchicalKind.contains.
func codeActionKindContains(requestedKind, actionKind lsproto.CodeActionKind) bool {
	return requestedKind == actionKind ||
		requestedKind == "" ||
		strings.HasPrefix(string(actionKind), string(requestedKind)+".")
}

// isFixAllKind returns true if the requested kind matches source.fixAll
func isFixAllKind(kind lsproto.CodeActionKind) bool {
	return codeActionKindContains(kind, lsproto.CodeActionKindSourceFixAll)
}

// wantsQuickFixes returns true if the Only filter is nil/empty (meaning all kinds are wanted)
// or explicitly includes the quickfix kind.
func wantsQuickFixes(only *[]lsproto.CodeActionKind) bool {
	if only == nil || len(*only) == 0 {
		return true
	}
	for _, kind := range *only {
		if codeActionKindContains(kind, lsproto.CodeActionKindQuickFix) {
			return true
		}
	}
	return false
}

// createFixAllAction creates a source.fixAll code action that applies all auto-fixable
// code fixes across the file.
func (l *LanguageService) createFixAllAction(
	ctx context.Context,
	program *compiler.Program,
	file *ast.SourceFile,
	uri lsproto.DocumentUri,
) (*lsproto.CommandOrCodeAction, error) {
	kind := lsproto.CodeActionKindSourceFixAll
	lspChanges := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)

	for _, provider := range codeFixProviders {
		if provider.GetAllCodeActions == nil {
			continue
		}

		fixContext := &CodeFixContext{
			SourceFile: file,
			Program:    program,
			LS:         l,
		}

		combined, err := provider.GetAllCodeActions(ctx, fixContext)
		if err != nil {
			return nil, err
		}
		if combined != nil && len(combined.Changes) > 0 {
			lspChanges[uri] = append(lspChanges[uri], combined.Changes...)
		}
	}

	if len(lspChanges) == 0 {
		return nil, nil
	}

	return &lsproto.CommandOrCodeAction{
		CodeAction: &lsproto.CodeAction{
			Title: diagnostics.Fix_All.Localize(locale.FromContext(ctx)),
			Kind:  &kind,
			Edit:  &lsproto.WorkspaceEdit{Changes: &lspChanges},
		},
	}, nil
}

// getOrganizeImportsActionTitle returns the appropriate title for the given organize imports kind
func getOrganizeImportsActionTitle(ctx context.Context, kind lsproto.CodeActionKind) string {
	loc := locale.FromContext(ctx)
	switch kind {
	case lsproto.CodeActionKindSourceRemoveUnusedImports:
		return diagnostics.Remove_Unused_Imports.Localize(loc)
	case lsproto.CodeActionKindSourceSortImports:
		return diagnostics.Sort_Imports.Localize(loc)
	default:
		return diagnostics.Organize_Imports.Localize(loc)
	}
}

// getOrganizeImportsActionsForKind returns the organize imports code action kinds that should be
// returned for the given requested kind.
func getOrganizeImportsActionsForKind(requestedKind lsproto.CodeActionKind) []lsproto.CodeActionKind {
	organizeImportsKinds := []lsproto.CodeActionKind{
		lsproto.CodeActionKindSourceOrganizeImports,
		lsproto.CodeActionKindSourceRemoveUnusedImports,
		lsproto.CodeActionKindSourceSortImports,
	}

	var result []lsproto.CodeActionKind
	for _, organizeKind := range organizeImportsKinds {
		if codeActionKindContains(requestedKind, organizeKind) {
			result = append(result, organizeKind)
		}
	}

	if slices.Contains(result, requestedKind) {
		return []lsproto.CodeActionKind{requestedKind}
	}

	return result
}

// createOrganizeImportsAction creates the organize imports code action
func (l *LanguageService) createOrganizeImportsAction(
	ctx context.Context,
	program *compiler.Program,
	file *ast.SourceFile,
	kind lsproto.CodeActionKind,
) *lsproto.CommandOrCodeAction {
	title := getOrganizeImportsActionTitle(ctx, kind)
	changes := l.OrganizeImports(
		ctx,
		file,
		program,
		kind,
	)
	if len(changes) == 0 {
		return &lsproto.CommandOrCodeAction{
			CodeAction: &lsproto.CodeAction{
				Title: title,
				Kind:  &kind,
				Edit:  &lsproto.WorkspaceEdit{Changes: &map[lsproto.DocumentUri][]*lsproto.TextEdit{}},
			},
		}
	}

	lspChanges := make(map[lsproto.DocumentUri][]*lsproto.TextEdit)
	for fileName, edits := range changes {
		fileURI := lsconv.FileNameToDocumentURI(fileName)
		lspChanges[fileURI] = edits
	}

	return &lsproto.CommandOrCodeAction{
		CodeAction: &lsproto.CodeAction{
			Title: title,
			Kind:  &kind,
			Edit:  &lsproto.WorkspaceEdit{Changes: &lspChanges},
		},
	}
}

// containsErrorCode checks if the error code is in the list
func containsErrorCode(codes []int32, code int32) bool {
	return slices.Contains(codes, code)
}

// convertToLSPCodeAction converts an internal CodeAction to an LSP CodeAction
func convertToLSPCodeAction(action *CodeAction, diag *lsproto.Diagnostic, uri lsproto.DocumentUri) lsproto.CommandOrCodeAction {
	kind := lsproto.CodeActionKindQuickFix
	changes := map[lsproto.DocumentUri][]*lsproto.TextEdit{
		uri: action.Changes,
	}
	diagnostics := []*lsproto.Diagnostic{diag}

	return lsproto.CommandOrCodeAction{
		CodeAction: &lsproto.CodeAction{
			Title:       action.Description,
			Kind:        &kind,
			Edit:        &lsproto.WorkspaceEdit{Changes: &changes},
			Diagnostics: &diagnostics,
		},
	}
}
