package ls

import (
	"context"
	"slices"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type DeclarationInfo struct {
	name        string
	declaration *ast.Node
	matchScore  int
}

func ProvideWorkspaceSymbols(ctx context.Context, programs []*compiler.Program, converters *Converters, query string) ([]lsproto.SymbolInformation, error) {
	// Obtain set of non-declaration source files from all active programs.
	var sourceFiles collections.Set[*ast.SourceFile]
	for _, program := range programs {
		for _, sourceFile := range program.SourceFiles() {
			if !sourceFile.IsDeclarationFile {
				sourceFiles.Add(sourceFile)
			}
		}
	}
	// Create DeclarationInfos for all declarations in the source files.
	var infos []DeclarationInfo
	for sourceFile := range sourceFiles.Keys() {
		if ctx != nil && ctx.Err() != nil {
			return []lsproto.SymbolInformation{}, nil
		}
		declarationMap := sourceFile.GetDeclarationMap()
		for name, declarations := range declarationMap {
			score := getMatchScore(name, query)
			if score >= 0 {
				for _, declaration := range declarations {
					infos = append(infos, DeclarationInfo{name, declaration, score})
				}
			}
		}
	}
	// Sort the DeclarationInfos and return the top 256 matches.
	slices.SortFunc(infos, compareDeclarationInfos)
	count := min(len(infos), 256)
	symbols := make([]lsproto.SymbolInformation, count)
	for i, info := range infos[0:count] {
		node := core.OrElse(ast.GetNameOfDeclaration(info.declaration), info.declaration)
		sourceFile := ast.GetSourceFileOfNode(node)
		pos := scanner.SkipTrivia(sourceFile.Text(), node.Pos())
		var symbol lsproto.SymbolInformation
		symbol.Name = info.name
		symbol.Kind = getSymbolKindFromNode(info.declaration)
		symbol.Location = converters.ToLSPLocation(sourceFile, core.NewTextRange(pos, node.End()))
		symbols[i] = symbol
	}
	return symbols, nil
}

// Return a score for matching `s` against `pattern`. In order to match, `s` must contain each of the characters in
// `pattern` in the same order. Upper case characters in `pattern` must match exactly, whereas lower case characters
// in `pattern` match either case in `s`. If `s` doesn't match, -1 is returned. Otherwise, the returned score is the
// number of characters in `s` that weren't matched. Thus, zero represents an exact match, and higher values represent
// increasingly less specific partial matches.
func getMatchScore(s string, pattern string) int {
	score := 0
	for _, p := range pattern {
		exact := unicode.IsUpper(p)
		for {
			c, size := utf8.DecodeRuneInString(s)
			if size == 0 {
				return -1
			}
			s = s[size:]
			if exact && c == p || !exact && unicode.ToLower(c) == unicode.ToLower(p) {
				break
			}
			score++
		}
	}
	return score
}

// Sort DeclarationInfos by ascending match score, then ascending case insensitive name, then
// ascending case sensitive name, and finally by source file name and position.
func compareDeclarationInfos(d1, d2 DeclarationInfo) int {
	if d1.matchScore != d2.matchScore {
		return d1.matchScore - d2.matchScore
	}
	if c := stringutil.CompareStringsCaseInsensitive(d1.name, d2.name); c != 0 {
		return c
	}
	if c := strings.Compare(d1.name, d2.name); c != 0 {
		return c
	}
	s1 := ast.GetSourceFileOfNode(d1.declaration)
	s2 := ast.GetSourceFileOfNode(d2.declaration)
	if s1 != s2 {
		return strings.Compare(string(s1.Path()), string(s2.Path()))
	}
	return d1.declaration.Pos() - d2.declaration.Pos()
}

func getSymbolKindFromNode(node *ast.Node) lsproto.SymbolKind {
	switch node.Kind {
	case ast.KindModuleDeclaration:
		return lsproto.SymbolKindNamespace
	case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindTypeAliasDeclaration:
		return lsproto.SymbolKindClass
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		return lsproto.SymbolKindMethod
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindGetAccessor, ast.KindSetAccessor:
		return lsproto.SymbolKindProperty
	case ast.KindConstructor, ast.KindConstructSignature:
		return lsproto.SymbolKindConstructor
	case ast.KindEnumDeclaration:
		return lsproto.SymbolKindEnum
	case ast.KindInterfaceDeclaration:
		return lsproto.SymbolKindInterface
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression:
		return lsproto.SymbolKindFunction
	case ast.KindEnumMember:
		return lsproto.SymbolKindEnumMember
	case ast.KindTypeParameter:
		return lsproto.SymbolKindTypeParameter
	}
	return lsproto.SymbolKindVariable
}
