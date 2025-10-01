package lsutil

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func PositionIsASICandidate(pos int, context *ast.Node, file *ast.SourceFile) bool {
	contextAncestor := ast.FindAncestorOrQuit(context, func(ancestor *ast.Node) ast.FindAncestorResult {
		if ancestor.End() != pos {
			return ast.FindAncestorQuit
		}

		return ast.ToFindAncestorResult(SyntaxMayBeASICandidate(ancestor.Kind))
	})

	return contextAncestor != nil && NodeIsASICandidate(contextAncestor, file)
}

func SyntaxMayBeASICandidate(kind ast.Kind) bool {
	return SyntaxRequiresTrailingCommaOrSemicolonOrASI(kind) ||
		SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind) ||
		SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind) ||
		SyntaxRequiresTrailingSemicolonOrASI(kind)
}

func SyntaxRequiresTrailingCommaOrSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindCallSignature ||
		kind == ast.KindConstructSignature ||
		kind == ast.KindIndexSignature ||
		kind == ast.KindPropertySignature ||
		kind == ast.KindMethodSignature
}

func SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindFunctionDeclaration ||
		kind == ast.KindConstructor ||
		kind == ast.KindMethodDeclaration ||
		kind == ast.KindGetAccessor ||
		kind == ast.KindSetAccessor
}

func SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindModuleDeclaration
}

func SyntaxRequiresTrailingSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindVariableStatement ||
		kind == ast.KindExpressionStatement ||
		kind == ast.KindDoStatement ||
		kind == ast.KindContinueStatement ||
		kind == ast.KindBreakStatement ||
		kind == ast.KindReturnStatement ||
		kind == ast.KindThrowStatement ||
		kind == ast.KindDebuggerStatement ||
		kind == ast.KindPropertyDeclaration ||
		kind == ast.KindTypeAliasDeclaration ||
		kind == ast.KindImportDeclaration ||
		kind == ast.KindImportEqualsDeclaration ||
		kind == ast.KindExportDeclaration ||
		kind == ast.KindNamespaceExportDeclaration ||
		kind == ast.KindExportAssignment
}

func NodeIsASICandidate(node *ast.Node, file *ast.SourceFile) bool {
	lastToken := GetLastToken(node, file)
	if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
		return false
	}

	if SyntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {
		if lastToken != nil && lastToken.Kind == ast.KindCommaToken {
			return false
		}
	} else if SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(node.Kind) {
		lastChild := GetLastChild(node, file)
		if lastChild != nil && ast.IsModuleBlock(lastChild) {
			return false
		}
	} else if SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(node.Kind) {
		lastChild := GetLastChild(node, file)
		if lastChild != nil && ast.IsFunctionBlock(lastChild) {
			return false
		}
	} else if !SyntaxRequiresTrailingSemicolonOrASI(node.Kind) {
		return false
	}

	// See comment in parser's `parseDoStatement`
	if node.Kind == ast.KindDoStatement {
		return true
	}

	topNode := ast.FindAncestor(node, func(ancestor *ast.Node) bool { return ancestor.Parent == nil })
	nextToken := astnav.FindNextToken(node, topNode, file)
	if nextToken == nil || nextToken.Kind == ast.KindCloseBraceToken {
		return true
	}

	startLine, _ := scanner.GetECMALineAndCharacterOfPosition(file, node.End())
	endLine, _ := scanner.GetECMALineAndCharacterOfPosition(file, astnav.GetStartOfNode(nextToken, file, false /*includeJSDoc*/))
	return startLine != endLine
}
