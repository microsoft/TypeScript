package parser

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func getLanguageVariant(scriptKind core.ScriptKind) core.LanguageVariant {
	switch scriptKind {
	case core.ScriptKindTSX, core.ScriptKindJSX, core.ScriptKindJS, core.ScriptKindJSON:
		// .tsx and .jsx files are treated as jsx language variant.
		return core.LanguageVariantJSX
	}
	return core.LanguageVariantStandard
}

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func tokenIsIdentifierOrKeywordOrGreaterThan(token ast.Kind) bool {
	return token == ast.KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
}

func GetJSDocCommentRanges(f *ast.NodeFactory, commentRanges []ast.CommentRange, node *ast.Node, text string) []ast.CommentRange {
	switch node.Kind {
	case ast.KindParameter, ast.KindTypeParameter, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindParenthesizedExpression, ast.KindVariableDeclaration, ast.KindExportSpecifier:
		for commentRange := range scanner.GetTrailingCommentRanges(f, text, node.Pos()) {
			commentRanges = append(commentRanges, commentRange)
		}
		for commentRange := range scanner.GetLeadingCommentRanges(f, text, node.Pos()) {
			commentRanges = append(commentRanges, commentRange)
		}
	default:
		for commentRange := range scanner.GetLeadingCommentRanges(f, text, node.Pos()) {
			commentRanges = append(commentRanges, commentRange)
		}
	}
	// Keep if the comment starts with '/**' but not if it is '/**/'
	return slices.DeleteFunc(commentRanges, func(comment ast.CommentRange) bool {
		return comment.End() > node.End() || text[comment.Pos()+1] != '*' || text[comment.Pos()+2] != '*' || text[comment.Pos()+3] == '/'
	})
}

func isKeywordOrPunctuation(token ast.Kind) bool {
	return ast.IsKeywordKind(token) || ast.IsPunctuationKind(token)
}

func isJSDocLikeText(text string) bool {
	return len(text) >= 4 && text[1] == '*' && text[2] == '*' && text[3] != '/'
}
