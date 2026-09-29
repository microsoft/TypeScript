package ls

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

// allow the client to match more than valid tag names. This allows linked editing when typing is in progress or tag name is incomplete
var jsxTagWordPattern = new("[a-zA-Z0-9:\\-\\._$]*")

func (l *LanguageService) ProvideLinkedEditingRange(ctx context.Context, params *lsproto.LinkedEditingRangeParams) (lsproto.LinkedEditingRangeResponse, error) {
	_, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)
	positions := l.converters.FromLSPPositionForSourceFile(sourceFile, params.Position, spanmap.FeatureLinkedEditing)
	if len(positions) != 1 || !positions[0].Fidelity.IsExact() {
		return lsproto.LinkedEditingRangeResponse{}, nil
	}
	sourceFile = positions[0].Script
	position := positions[0].Position
	token := astnav.FindPrecedingToken(sourceFile, int(position))

	if token == nil || token.Parent.Kind == ast.KindSourceFile {
		return lsproto.LinkedEditingRangeResponse{}, nil
	}

	if ast.IsJsxFragment(token.Parent.Parent) {
		fragment := token.Parent.Parent.AsJsxFragment()
		openFragment := fragment.OpeningFragment
		closeFragment := fragment.ClosingFragment
		if openFragment.Flags&ast.NodeFlagsThisNodeOrAnySubNodesHasError != 0 || closeFragment.Flags&ast.NodeFlagsThisNodeOrAnySubNodesHasError != 0 {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}

		openPos := core.TextPos(astnav.GetStartOfNode(openFragment.AsNode(), sourceFile, false) + len("<"))
		closePos := core.TextPos(astnav.GetStartOfNode(closeFragment.AsNode(), sourceFile, false) + len("</"))

		// only allows linked editing right after opening bracket: <| ></| >
		if (position != openPos) && (position != closePos) {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}

		openLineChar, openFidelity := l.converters.ToLSPPositionForFeature(sourceFile, openPos, spanmap.FeatureLinkedEditing)
		closeLineChar, closeFidelity := l.converters.ToLSPPositionForFeature(sourceFile, closePos, spanmap.FeatureLinkedEditing)
		if !openFidelity.IsExact() || !closeFidelity.IsExact() {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}
		return lsproto.LinkedEditingRangeResponse{
			LinkedEditingRanges: &lsproto.LinkedEditingRanges{
				Ranges: []lsproto.Range{
					{Start: openLineChar, End: openLineChar}, // only return start position for opening tag since the length of a fragment is always 3 and it is unlikely user will type in the middle of a fragment tag
					{Start: closeLineChar, End: closeLineChar},
				},
				WordPattern: jsxTagWordPattern,
			},
		}, nil
	} else {
		// determines if the cursor is in an element tag
		tag := ast.FindAncestor(token.Parent, func(n *ast.Node) bool {
			if ast.IsJsxOpeningElement(n) || ast.IsJsxClosingElement(n) {
				return true
			}
			return false
		})
		if tag == nil {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}
		debug.Assert(ast.IsJsxOpeningElement(tag) || ast.IsJsxClosingElement(tag), "tag should be opening or closing element")

		jsxElement := tag.Parent.AsJsxElement()
		openTag := jsxElement.OpeningElement
		closeTag := jsxElement.ClosingElement

		openTagNameStart := astnav.GetStartOfNode(openTag.TagName().AsNode(), sourceFile, false)
		openTagNameEnd := openTag.TagName().End()
		closeTagNameStart := astnav.GetStartOfNode(closeTag.TagName().AsNode(), sourceFile, false)
		closeTagNameEnd := closeTag.TagName().End()
		// do not return linked cursors if tags are not well-formed
		if openTagNameStart == astnav.GetStartOfNode(openTag.AsNode(), sourceFile, false) || closeTagNameStart == astnav.GetStartOfNode(closeTag.AsNode(), sourceFile, false) ||
			openTagNameEnd == openTag.End() || closeTagNameEnd == closeTag.End() {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}
		// only return linked cursors if the cursor is within a tag name
		positionInt := int(position)
		if !(openTagNameStart <= positionInt && positionInt <= openTagNameEnd || closeTagNameStart <= positionInt && positionInt <= closeTagNameEnd) {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}

		// only return linked cursors if text in both tags is identical
		openingTagText := scanner.GetTextOfNode(openTag.TagName().AsNode())
		if openingTagText != scanner.GetTextOfNode(closeTag.TagName().AsNode()) {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}

		openRange, openFidelity := l.converters.ToLSPRangeForFeature(sourceFile, core.NewTextRange(openTagNameStart, openTagNameEnd), spanmap.FeatureLinkedEditing)
		closeRange, closeFidelity := l.converters.ToLSPRangeForFeature(sourceFile, core.NewTextRange(closeTagNameStart, closeTagNameEnd), spanmap.FeatureLinkedEditing)
		if !openFidelity.IsExact() || !closeFidelity.IsExact() {
			return lsproto.LinkedEditingRangeResponse{}, nil
		}

		return lsproto.LinkedEditingRangeResponse{
			LinkedEditingRanges: &lsproto.LinkedEditingRanges{
				Ranges: []lsproto.Range{
					openRange,
					closeRange,
				},
				WordPattern: jsxTagWordPattern,
			},
		}, nil
	}
}
