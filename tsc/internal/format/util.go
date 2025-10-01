package format

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func rangeIsOnOneLine(node core.TextRange, file *ast.SourceFile) bool {
	startLine, _ := scanner.GetECMALineAndCharacterOfPosition(file, node.Pos())
	endLine, _ := scanner.GetECMALineAndCharacterOfPosition(file, node.End())
	return startLine == endLine
}

func getOpenTokenForList(node *ast.Node, list *ast.NodeList) ast.Kind {
	switch node.Kind {
	case ast.KindConstructor,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindArrowFunction,
		ast.KindCallSignature,
		ast.KindConstructSignature,
		ast.KindFunctionType,
		ast.KindConstructorType,
		ast.KindGetAccessor,
		ast.KindSetAccessor:
		if node.TypeParameterList() == list {
			return ast.KindLessThanToken
		} else if node.ParameterList() == list {
			return ast.KindOpenParenToken
		}
	case ast.KindCallExpression, ast.KindNewExpression:
		if node.TypeArgumentList() == list {
			return ast.KindLessThanToken
		} else if node.ArgumentList() == list {
			return ast.KindOpenParenToken
		}
	case ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindTypeAliasDeclaration:
		if node.TypeParameterList() == list {
			return ast.KindLessThanToken
		}
	case ast.KindTypeReference,
		ast.KindTaggedTemplateExpression,
		ast.KindTypeQuery,
		ast.KindExpressionWithTypeArguments,
		ast.KindImportType:
		if node.TypeArgumentList() == list {
			return ast.KindLessThanToken
		}
	case ast.KindTypeLiteral:
		return ast.KindOpenBraceToken
	}

	return ast.KindUnknown
}

func getCloseTokenForOpenToken(kind ast.Kind) ast.Kind {
	// TODO: matches strada - seems like it could handle more pairs of braces, though? [] notably missing
	switch kind {
	case ast.KindOpenParenToken:
		return ast.KindCloseParenToken
	case ast.KindLessThanToken:
		return ast.KindGreaterThanToken
	case ast.KindOpenBraceToken:
		return ast.KindCloseBraceToken
	}
	return ast.KindUnknown
}

func GetLineStartPositionForPosition(position int, sourceFile *ast.SourceFile) int {
	lineStarts := scanner.GetECMALineStarts(sourceFile)
	line, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, position)
	return int(lineStarts[line])
}

/**
 * Tests whether `child` is a grammar error on `parent`.
 * In strada, this also checked node arrays, but it is never actually called with one in practice.
 */
func isGrammarError(parent *ast.Node, child *ast.Node) bool {
	if ast.IsTypeParameterDeclaration(parent) {
		return child == parent.AsTypeParameter().Expression
	}
	if ast.IsPropertySignatureDeclaration(parent) {
		return child == parent.AsPropertySignatureDeclaration().Initializer
	}
	if ast.IsPropertyDeclaration(parent) {
		return ast.IsAutoAccessorPropertyDeclaration(parent) && child == parent.AsPropertyDeclaration().PostfixToken && child.Kind == ast.KindQuestionToken
	}
	if ast.IsPropertyAssignment(parent) {
		pa := parent.AsPropertyAssignment()
		mods := pa.Modifiers()
		return child == pa.PostfixToken || (mods != nil && isGrammarErrorElement(&mods.NodeList, child, ast.IsModifierLike))
	}
	if ast.IsShorthandPropertyAssignment(parent) {
		sp := parent.AsShorthandPropertyAssignment()
		mods := sp.Modifiers()
		return child == sp.EqualsToken || child == sp.PostfixToken || (mods != nil && isGrammarErrorElement(&mods.NodeList, child, ast.IsModifierLike))
	}
	if ast.IsMethodDeclaration(parent) {
		return child == parent.AsMethodDeclaration().PostfixToken && child.Kind == ast.KindExclamationToken
	}
	if ast.IsConstructorDeclaration(parent) {
		return child == parent.AsConstructorDeclaration().Type || isGrammarErrorElement(parent.AsConstructorDeclaration().TypeParameters, child, ast.IsTypeParameterDeclaration)
	}
	if ast.IsGetAccessorDeclaration(parent) {
		return isGrammarErrorElement(parent.AsGetAccessorDeclaration().TypeParameters, child, ast.IsTypeParameterDeclaration)
	}
	if ast.IsSetAccessorDeclaration(parent) {
		return child == parent.AsSetAccessorDeclaration().Type || isGrammarErrorElement(parent.AsSetAccessorDeclaration().TypeParameters, child, ast.IsTypeParameterDeclaration)
	}
	if ast.IsNamespaceExportDeclaration(parent) {
		mods := parent.AsNamespaceExportDeclaration().Modifiers()
		return mods != nil && isGrammarErrorElement(&mods.NodeList, child, ast.IsModifierLike)
	}
	return false
}

func isGrammarErrorElement(list *ast.NodeList, child *ast.Node, isPossibleElement func(node *ast.Node) bool) bool {
	if list == nil || len(list.Nodes) == 0 {
		return false
	}
	if !isPossibleElement(child) {
		return false
	}
	return slices.Contains(list.Nodes, child)
}

/**
 * Validating `expectedTokenKind` ensures the token was typed in the context we expect (eg: not a comment).
 * @param expectedTokenKind The kind of the last token constituting the desired parent node.
 */
func findImmediatelyPrecedingTokenOfKind(end int, expectedTokenKind ast.Kind, sourceFile *ast.SourceFile) *ast.Node {
	precedingToken := astnav.FindPrecedingToken(sourceFile, end)
	if precedingToken == nil || precedingToken.Kind != expectedTokenKind || precedingToken.End() != end {
		return nil
	}
	return precedingToken
}

/**
 * Finds the highest node enclosing `node` at the same list level as `node`
 * and whose end does not exceed `node.end`.
 *
 * Consider typing the following
 * ```
 * let x = 1;
 * while (true) {
 * }
 * ```
 * Upon typing the closing curly, we want to format the entire `while`-statement, but not the preceding
 * variable declaration.
 */
func findOutermostNodeWithinListLevel(node *ast.Node) *ast.Node {
	current := node
	for current != nil &&
		current.Parent != nil &&
		current.Parent.End() == node.End() &&
		!isListElement(current.Parent, current) {
		current = current.Parent
	}

	return current
}

// Returns true if node is a element in some list in parent
// i.e. parent is class declaration with the list of members and node is one of members.
func isListElement(parent *ast.Node, node *ast.Node) bool {
	switch parent.Kind {
	case ast.KindClassDeclaration, ast.KindInterfaceDeclaration:
		return node.Loc.ContainedBy(parent.MemberList().Loc)
	case ast.KindModuleDeclaration:
		body := parent.Body()
		return body != nil && body.Kind == ast.KindModuleBlock && node.Loc.ContainedBy(body.StatementList().Loc)
	case ast.KindSourceFile, ast.KindBlock, ast.KindModuleBlock:
		return node.Loc.ContainedBy(parent.StatementList().Loc)
	case ast.KindCatchClause:
		return node.Loc.ContainedBy(parent.AsCatchClause().Block.StatementList().Loc)
	}

	return false
}
