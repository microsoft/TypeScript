package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
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
