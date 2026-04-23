package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideOnAutoInsert(ctx context.Context, params *lsproto.VsOnAutoInsertParams) (lsproto.VsOnAutoInsertResponse, error) {
	if params.VSCh != ">" {
		return lsproto.VsOnAutoInsertResponse{}, nil
	}

	_, sourceFile := l.getProgramAndFile(params.VSTextDocument.Uri)
	position := l.converters.LineAndCharacterToPosition(sourceFile, params.VSPosition)

	token := astnav.FindPrecedingToken(sourceFile, int(position))
	if token == nil {
		return lsproto.VsOnAutoInsertResponse{}, nil
	}

	var closingText string
	var element *ast.Node
	if token.Kind == ast.KindGreaterThanToken && ast.IsJsxOpeningElement(token.Parent) {
		element = token.Parent.Parent
	} else if ast.IsJsxText(token) && ast.IsJsxElement(token.Parent) {
		element = token.Parent
	}

	if element != nil && isUnclosedTag(element.AsJsxElement()) {
		tagNameNode := element.AsJsxElement().OpeningElement.TagName()
		// Slight divergence from Strada - we don't use the verbatim text from the opening tag.
		closingText = "</" + ast.EntityNameToString(tagNameNode, scanner.GetTextOfNode) + ">"
	} else {
		var fragment *ast.Node
		if token.Kind == ast.KindGreaterThanToken && ast.IsJsxOpeningFragment(token.Parent) {
			fragment = token.Parent.Parent
		} else if ast.IsJsxText(token) && ast.IsJsxFragment(token.Parent) {
			fragment = token.Parent
		}

		if fragment != nil && isUnclosedFragment(fragment.AsJsxFragment()) {
			closingText = "</>"
		}
	}

	if closingText == "" {
		return lsproto.VsOnAutoInsertResponse{}, nil
	}

	return lsproto.VsOnAutoInsertResponse{
		VsOnAutoInsertResponseItem: &lsproto.VsOnAutoInsertResponseItem{
			VSTextEditFormat: lsproto.InsertTextFormatSnippet,
			VSTextEdit: &lsproto.TextEdit{
				Range: lsproto.Range{Start: params.VSPosition, End: params.VSPosition},
				// Tag names can contain `$` (valid JSX identifier characters), so
				// escape the closing text to avoid being interpreted as a snippet
				// placeholder/variable.
				NewText: "$0" + escapeSnippetText(closingText),
			},
		},
	}, nil
}

func isUnclosedTag(node *ast.JsxElement) bool {
	openingElement := node.OpeningElement
	closingElement := node.ClosingElement
	if !ast.TagNamesAreEquivalent(openingElement.TagName(), closingElement.TagName()) {
		return true
	}

	parent := node.Parent
	if ast.IsJsxElement(parent) {
		parent := parent.AsJsxElement()
		return ast.TagNamesAreEquivalent(openingElement.TagName(), parent.OpeningElement.TagName()) && isUnclosedTag(parent)
	}

	return false
}

func isUnclosedFragment(node *ast.JsxFragment) bool {
	closingFragment := node.ClosingFragment
	if closingFragment.Flags&ast.NodeFlagsThisNodeHasError != 0 {
		return true
	}

	parent := node.Parent
	if ast.IsJsxFragment(parent) && isUnclosedFragment(parent.AsJsxFragment()) {
		return true
	}

	return false
}
