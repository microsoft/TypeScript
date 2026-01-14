package lsutil

import (
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
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
				lastTokenLine := scanner.GetECMALineOfPosition(
					file,
					astnav.GetStartOfNode(lastToken, file, false /*includeJSDoc*/))
				nextTokenLine := scanner.GetECMALineOfPosition(
					file,
					scanner.SkipTrivia(file.Text(), lastToken.End()))
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

func ShouldUseUriStyleNodeCoreModules(file *ast.SourceFile, program *compiler.Program) core.Tristate {
	for _, node := range file.Imports() {
		if core.NodeCoreModules()[node.Text()] && !core.ExclusivelyPrefixedNodeCoreModules[node.Text()] {
			if strings.HasPrefix(node.Text(), "node:") {
				return core.TSTrue
			} else {
				return core.TSFalse
			}
		}
	}

	return program.UsesUriStyleNodeCoreModules()
}

func QuotePreferenceFromString(str *ast.StringLiteral) QuotePreference {
	if str.TokenFlags&ast.TokenFlagsSingleQuote != 0 {
		return QuotePreferenceSingle
	}
	return QuotePreferenceDouble
}

func GetQuotePreference(sourceFile *ast.SourceFile, preferences *UserPreferences) QuotePreference {
	if preferences.QuotePreference != "" && preferences.QuotePreference != "auto" {
		if preferences.QuotePreference == "single" {
			return QuotePreferenceSingle
		}
		return QuotePreferenceDouble
	}
	// ignore synthetic import added when importHelpers: true
	firstModuleSpecifier := core.Find(sourceFile.Imports(), func(n *ast.Node) bool {
		return ast.IsStringLiteral(n) && !ast.NodeIsSynthesized(n.Parent)
	})
	if firstModuleSpecifier != nil {
		return QuotePreferenceFromString(firstModuleSpecifier.AsStringLiteral())
	}
	return QuotePreferenceDouble
}

func ModuleSymbolToValidIdentifier(moduleSymbol *ast.Symbol, forceCapitalize bool) string {
	return ModuleSpecifierToValidIdentifier(stringutil.StripQuotes(moduleSymbol.Name), forceCapitalize)
}

func ModuleSpecifierToValidIdentifier(moduleSpecifier string, forceCapitalize bool) string {
	baseName := tspath.GetBaseFileName(strings.TrimSuffix(tspath.RemoveFileExtension(moduleSpecifier), "/index"))
	res := []rune{}
	lastCharWasValid := true
	baseNameRunes := []rune(baseName)
	if len(baseNameRunes) > 0 && scanner.IsIdentifierStart(baseNameRunes[0]) {
		if forceCapitalize {
			res = append(res, unicode.ToUpper(baseNameRunes[0]))
		} else {
			res = append(res, baseNameRunes[0])
		}
	} else {
		lastCharWasValid = false
	}

	for i := 1; i < len(baseNameRunes); i++ {
		isValid := scanner.IsIdentifierPart(baseNameRunes[i])
		if isValid {
			if !lastCharWasValid {
				res = append(res, unicode.ToUpper(baseNameRunes[i]))
			} else {
				res = append(res, baseNameRunes[i])
			}
		}
		lastCharWasValid = isValid
	}

	// Need `"_"` to ensure result isn't empty.
	resString := string(res)
	if resString != "" && !IsNonContextualKeyword(scanner.StringToToken(resString)) {
		return resString
	}
	return "_" + resString
}

func IsNonContextualKeyword(token ast.Kind) bool {
	return ast.IsKeywordKind(token) && !ast.IsContextualKeyword(token)
}
