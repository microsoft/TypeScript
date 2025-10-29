package lsutil

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func ProbablyUsesSemicolons(file *ast.SourceFile) bool {
	withSemicolon := 0
	withoutSemicolon := 0
	nStatementsToObserve := 5

	var visit func(node *ast.Node) bool
	visit = func(node *ast.Node) bool {
		if node.Flags&ast.NodeFlagsReparsed != 0 {
			return false
		}
		if SyntaxRequiresTrailingSemicolonOrASI(node.Kind) {
			lastToken := GetLastToken(node, file)
			if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
				withSemicolon++
			} else {
				withoutSemicolon++
			}
		} else if SyntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {
			lastToken := GetLastToken(node, file)
			if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
				withSemicolon++
			} else if lastToken != nil && lastToken.Kind != ast.KindCommaToken {
				lastTokenLine, _ := scanner.GetECMALineAndCharacterOfPosition(
					file,
					astnav.GetStartOfNode(lastToken, file, false /*includeJSDoc*/))
				nextTokenLine, _ := scanner.GetECMALineAndCharacterOfPosition(
					file,
					scanner.GetRangeOfTokenAtPosition(file, lastToken.End()).Pos())
				// Avoid counting missing semicolon in single-line objects:
				// `function f(p: { x: string /*no semicolon here is insignificant*/ }) {`
				if lastTokenLine != nextTokenLine {
					withoutSemicolon++
				}
			}
		}

		if withSemicolon+withoutSemicolon >= nStatementsToObserve {
			return true
		}

		return node.ForEachChild(visit)
	}

	file.ForEachChild(visit)

	// One statement missing a semicolon isn't sufficient evidence to say the user
	// doesn't want semicolons, because they may not even be done writing that statement.
	if withSemicolon == 0 && withoutSemicolon <= 1 {
		return true
	}

	// If even 2/5 places have a semicolon, the user probably wants semicolons
	if withoutSemicolon == 0 {
		return true
	}
	return withSemicolon/withoutSemicolon > 1/nStatementsToObserve
}

func ShouldUseUriStyleNodeCoreModules(file *ast.SourceFile, program *compiler.Program) bool {
	for _, node := range file.Imports() {
		if core.NodeCoreModules()[node.Text()] && !core.ExclusivelyPrefixedNodeCoreModules[node.Text()] {
			if strings.HasPrefix(node.Text(), "node:") {
				return true
			} else {
				return false
			}
		}
	}

	return program.UsesUriStyleNodeCoreModules()
}
