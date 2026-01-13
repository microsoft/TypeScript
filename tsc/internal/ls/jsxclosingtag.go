package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideClosingTagCompletion(ctx context.Context, params *lsproto.TextDocumentPositionParams) (lsproto.CustomClosingTagCompletionResponse, error) {
	_, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)
	position := l.converters.LineAndCharacterToPosition(sourceFile, params.Position)

	token := astnav.FindPrecedingToken(sourceFile, int(position))
	if token == nil {
		return lsproto.CustomClosingTagCompletionResponse{}, nil
	}

	var element *ast.Node
	if token.Kind == ast.KindGreaterThanToken && ast.IsJsxOpeningElement(token.Parent) {
		element = token.Parent.Parent
	} else if ast.IsJsxText(token) && ast.IsJsxElement(token.Parent) {
		element = token.Parent
	}

	if element != nil && isUnclosedTag(element.AsJsxElement()) {
		tagNameNode := element.AsJsxElement().OpeningElement.TagName()
		result := lsproto.CustomClosingTagCompletion{
			// Slight divergence from Strada - we don't use the verbatim text from the opening tag.
			NewText: "</" + ast.EntityNameToString(tagNameNode, scanner.GetTextOfNode) + ">",
		}
		return lsproto.CustomClosingTagCompletionResponse{CustomClosingTagCompletion: &result}, nil
	}

	var fragment *ast.Node
	if token.Kind == ast.KindGreaterThanToken && ast.IsJsxOpeningFragment(token.Parent) {
		fragment = token.Parent.Parent
	} else if ast.IsJsxText(token) && ast.IsJsxFragment(token.Parent) {
		fragment = token.Parent
	}

	if fragment != nil && isUnclosedFragment(fragment.AsJsxFragment()) {
		result := lsproto.CustomClosingTagCompletion{
			NewText: "</>",
		}
		return lsproto.CustomClosingTagCompletionResponse{CustomClosingTagCompletion: &result}, nil
	}

	return lsproto.CustomClosingTagCompletionResponse{}, nil
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
