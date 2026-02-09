package ls

import (
	"context"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

// CodeFixProvider represents a provider for a specific type of code fix
type CodeFixProvider struct {
	ErrorCodes        []int32
	GetCodeActions    func(ctx context.Context, fixContext *CodeFixContext) ([]CodeAction, error)
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
	Description string
	Changes     []*lsproto.TextEdit
}

// CombinedCodeActions represents combined code actions for fix-all scenarios
type CombinedCodeActions struct {
	Description string
	Changes     []*lsproto.TextEdit
}

// codeFixProviders is the list of all registered code fix providers
var codeFixProviders = []*CodeFixProvider{
	ImportFixProvider,
	// Add more code fix providers here as they are implemented
}

// ProvideCodeActions returns code actions for the given range and context
func (l *LanguageService) ProvideCodeActions(ctx context.Context, params *lsproto.CodeActionParams) (lsproto.CodeActionResponse, error) {
	program, file := l.getProgramAndFile(params.TextDocument.Uri)

	var actions []lsproto.CommandOrCodeAction

	// Handle source actions (like organize imports)
	if params.Context != nil && params.Context.Only != nil {
		for _, kind := range *params.Context.Only {
			// Get all matching organize imports actions for the requested kind
			matchingKinds := getOrganizeImportsActionsForKind(kind)
			for _, matchingKind := range matchingKinds {
				organizeAction := l.createOrganizeImportsAction(ctx, program, file, matchingKind)
				actions = append(actions, *organizeAction)
			}
		}
	}

	// Process diagnostics in the context to generate quick fixes
	if params.Context != nil && params.Context.Diagnostics != nil {
		for _, diag := range params.Context.Diagnostics {
			if diag.Code == nil || diag.Code.Integer == nil {
				continue
			}

			errorCode := *diag.Code.Integer

			// Check all code fix providers
			for _, provider := range codeFixProviders {
				if !containsErrorCode(provider.ErrorCodes, errorCode) {
					continue
				}

				// Create context for the provider
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

				// Get code actions from the provider
				providerActions, err := provider.GetCodeActions(ctx, fixContext)
				if err != nil {
					return lsproto.CodeActionResponse{}, err
				}
				for _, action := range providerActions {
					actions = append(actions, convertToLSPCodeAction(&action, diag, params.TextDocument.Uri))
				}
			}
		}
	}

	return lsproto.CommandOrCodeActionArrayOrNull{CommandOrCodeActionArray: &actions}, nil
}

// getOrganizeImportsActionTitle returns the appropriate title for the given organize imports kind
func getOrganizeImportsActionTitle(kind lsproto.CodeActionKind) string {
	switch kind {
	case lsproto.CodeActionKindSourceRemoveUnusedImports:
		return "Remove Unused Imports"
	case lsproto.CodeActionKindSourceSortImports:
		return "Sort Imports"
	default:
		return "Organize Imports"
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
		if strings.HasPrefix(string(organizeKind), string(requestedKind)) {
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
	title := getOrganizeImportsActionTitle(kind)
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
