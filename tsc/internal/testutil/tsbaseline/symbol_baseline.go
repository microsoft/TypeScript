package tsbaseline

import (
	"fmt"
	"regexp"
	"slices"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/testutil/harnessutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	codeLinesRegexp  = regexp.MustCompile("[\r\u2028\u2029]|\r?\n")
	bracketLineRegex = regexp.MustCompile(`^\s*[{|}]\s*$`)
	lineEndRegex     = regexp.MustCompile(`\r?\n`)
)

func DoTypeAndSymbolBaseline(
	t *testing.T,
	baselinePath string,
	header string,
	program *compiler.Program,
	allFiles []*harnessutil.TestFile,
	opts baseline.Options,
	skipTypeBaselines bool,
	skipSymbolBaselines bool,
	hasErrorBaseline bool,
) {
	// The full walker simulates the types that you would get from doing a full
	// compile.  The pull walker simulates the types you get when you just do
	// a type query for a random node (like how the LS would do it).  Most of the
	// time, these will be the same.  However, occasionally, they can be different.
	// Specifically, when the compiler internally depends on symbol IDs to order
	// things, then we may see different results because symbols can be created in a
	// different order with 'pull' operations, and thus can produce slightly differing
	// output.
	//
	// For example, with a full type check, we may see a type displayed as: number | string
	// But with a pull type check, we may see it as:                        string | number
	//
	// These types are equivalent, but depend on what order the compiler observed
	// certain parts of the program.

	fullWalker := newTypeWriterWalker(program, hasErrorBaseline)

	// !!! Enable type baselines once it's implemented
	// t.Run("type", func(t *testing.T) {
	// 	checkBaselines(t, baselinePath, allFiles, fullWalker, header, opts, false /*isSymbolBaseline*/)
	// })
	t.Run("symbol", func(t *testing.T) {
		checkBaselines(t, baselinePath, allFiles, fullWalker, header, opts, true /*isSymbolBaseline*/)
	})
}

func checkBaselines(
	t *testing.T,
	baselinePath string,
	allFiles []*harnessutil.TestFile,
	fullWalker *typeWriterWalker,
	header string,
	opts baseline.Options,
	isSymbolBaseline bool,
) {
	fullExtension := core.IfElse(isSymbolBaseline, ".symbols", ".types")
	outputFileName := tspath.RemoveFileExtension(baselinePath)
	fullBaseline := generateBaseline(allFiles, fullWalker, header, isSymbolBaseline)
	baseline.Run(t, outputFileName+fullExtension, fullBaseline, opts)
}

func generateBaseline(
	allFiles []*harnessutil.TestFile,
	fullWalker *typeWriterWalker,
	header string,
	isSymbolBaseline bool,
) string {
	var result strings.Builder
	// !!! Perf baseline
	var perfLines []string
	// prePerformanceValues := getPerformanceBaselineValues()
	baselines := iterateBaseline(allFiles, fullWalker, isSymbolBaseline)
	for _, value := range baselines {
		result.WriteString(value)
	}
	// postPerformanceValues := getPerformanceBaselineValues()

	if !isSymbolBaseline {
		// !!! Perf baselines
		// const perfStats: [name: string, reportThreshold: number, beforeValue: number, afterValue: number][] = [];
		// perfStats.push(["Strict subtype cache", 1000, prePerformanceValues.strictSubtype, postPerformanceValues.strictSubtype]);
		// perfStats.push(["Subtype cache", 1000, prePerformanceValues.subtype, postPerformanceValues.subtype]);
		// perfStats.push(["Identity cache", 1000, prePerformanceValues.identity, postPerformanceValues.identity]);
		// perfStats.push(["Assignability cache", 1000, prePerformanceValues.assignability, postPerformanceValues.assignability]);
		// perfStats.push(["Type Count", 1000, prePerformanceValues.typeCount, postPerformanceValues.typeCount]);
		// perfStats.push(["Instantiation count", 1500, prePerformanceValues.instantiation, postPerformanceValues.instantiation]);
		// perfStats.push(["Symbol count", 45000, prePerformanceValues.symbol, postPerformanceValues.symbol]);

		// if (perfStats.some(([, threshold, , postValue]) => postValue >= threshold)) {
		// 	perfLines.push(`=== Performance Stats ===`);
		// 	for (const [name, threshold, preValue, postValue] of perfStats) {
		// 		if (postValue >= threshold) {
		// 			const preString = valueToString(preValue);
		// 			const postString = valueToString(postValue);
		// 			if (preString === postString) {
		// 				perfLines.push(`${name}: ${preString}`);
		// 			}
		// 			else {
		// 				perfLines.push(`${name}: ${preString} -> ${postString}`);
		// 			}
		// 		}
		// 	}
		// 	perfLines.push("");
		// 	perfLines.push("");
		// }
	}

	if result.Len() > 0 {
		return fmt.Sprintf("//// [%s] ////\r\n\r\n%s%s", header, strings.Join(perfLines, "\n"), result.String())
	}
	return result.String()
}

func iterateBaseline(allFiles []*harnessutil.TestFile, fullWalker *typeWriterWalker, isSymbolBaseline bool) []string {
	var baselines []string

	for _, file := range allFiles {
		unitName := file.UnitName
		var typeLines strings.Builder
		typeLines.WriteString("=== " + unitName + " ===\r\n")
		codeLines := codeLinesRegexp.Split(file.Content, -1)
		var results []*typeWriterResult
		if isSymbolBaseline {
			results = fullWalker.getSymbols(unitName)
		} else {
			results = fullWalker.getTypes(unitName)
		}
		lastIndexWritten := -1
		for _, result := range results {
			if isSymbolBaseline && result.symbol == "" {
				return baselines
			}
			if lastIndexWritten == -1 {
				typeLines.WriteString(strings.Join(codeLines[:result.line+1], "\r\n"))
				typeLines.WriteString("\r\n")
			} else if lastIndexWritten != result.line {
				if !(lastIndexWritten+1 < len(codeLines) &&
					(bracketLineRegex.MatchString(codeLines[lastIndexWritten+1]) || strings.TrimSpace(codeLines[lastIndexWritten+1]) == "")) {
					typeLines.WriteString("\r\n")
				}
				typeLines.WriteString(strings.Join(codeLines[lastIndexWritten+1:result.line+1], "\r\n"))
				typeLines.WriteString("\r\n")
			}
			lastIndexWritten = result.line
			typeOrSymbolString := core.IfElse(isSymbolBaseline, result.symbol, result.typ)
			lineText := lineDelimiter.ReplaceAllString(result.sourceText, "")
			typeLines.WriteString(">")
			fmt.Fprintf(&typeLines, "%s : %s", lineText, typeOrSymbolString)
			typeLines.WriteString("\r\n")
			if result.underline != "" {
				typeLines.WriteString(">")
				for range len(lineText) {
					typeLines.WriteString(" ")
				}
				typeLines.WriteString(" : ")
				typeLines.WriteString(result.underline)
				typeLines.WriteString("\r\n")
			}
		}

		if lastIndexWritten+1 < len(codeLines) {
			if !(lastIndexWritten+1 < len(codeLines) &&
				(bracketLineRegex.MatchString(codeLines[lastIndexWritten+1]) || strings.TrimSpace(codeLines[lastIndexWritten+1]) == "")) {
				typeLines.WriteString("\r\n")
			}
			typeLines.WriteString(strings.Join(codeLines[lastIndexWritten+1:], "\r\n"))
		}
		typeLines.WriteString("\r\n")

		baselines = append(
			baselines,
			removeTestPathPrefixes(typeLines.String(), false /*retainTrailingDirectorySeparator*/),
		)
	}

	return baselines
}

type typeWriterWalker struct {
	program              *compiler.Program
	checker              *compiler.Checker
	hadErrorBaseline     bool
	currentSourceFile    *ast.SourceFile
	declarationTextCache map[*ast.Node]string
}

func newTypeWriterWalker(program *compiler.Program, hadErrorBaseline bool) *typeWriterWalker {
	return &typeWriterWalker{
		checker:              program.GetTypeChecker(),
		program:              program,
		hadErrorBaseline:     hadErrorBaseline,
		declarationTextCache: make(map[*ast.Node]string),
	}
}

type typeWriterResult struct {
	line       int
	sourceText string
	symbol     string
	typ        string
	underline  string // !!!
}

func (walker *typeWriterWalker) getTypes(filename string) []*typeWriterResult {
	sourceFile := walker.program.GetSourceFile(filename)
	walker.currentSourceFile = sourceFile
	return walker.visitNode(sourceFile.AsNode(), false /*isSymbolWalk*/)
}

func (walker *typeWriterWalker) getSymbols(filename string) []*typeWriterResult {
	sourceFile := walker.program.GetSourceFile(filename)
	walker.currentSourceFile = sourceFile
	return walker.visitNode(sourceFile.AsNode(), true /*isSymbolWalk*/)
}

func (walker *typeWriterWalker) visitNode(node *ast.Node, isSymbolWalk bool) []*typeWriterResult {
	nodes := forEachASTNode(node)
	var results []*typeWriterResult
	for _, n := range nodes {
		if compiler.IsExpressionNode(n) || n.Kind == ast.KindIdentifier || ast.IsDeclarationName(n) {
			result := walker.writeTypeOrSymbol(n, isSymbolWalk)
			if result != nil {
				results = append(results, result)
			}
		}
	}
	return results
}

func forEachASTNode(node *ast.Node) []*ast.Node {
	var result []*ast.Node
	work := []*ast.Node{node}
	for len(work) > 0 {
		elem := work[len(work)-1]
		work = work[:len(work)-1]
		result = append(result, elem)

		var resChildren []*ast.Node
		elem.ForEachChild(func(child *ast.Node) bool {
			resChildren = append(resChildren, child)
			return false
		})
		slices.Reverse(resChildren)
		work = append(work, resChildren...)
	}
	return result
}

func (walker *typeWriterWalker) writeTypeOrSymbol(node *ast.Node, isSymbolWalk bool) *typeWriterResult {
	actualPos := scanner.SkipTrivia(walker.currentSourceFile.Text, node.Pos())
	line, _ := scanner.GetLineAndCharacterOfPosition(walker.currentSourceFile, actualPos)
	sourceText := scanner.GetSourceTextOfNodeFromSourceFile(walker.currentSourceFile, node, false /*includeTrivia*/)

	if !isSymbolWalk {
		// !!! Types baseline
	}

	symbol := walker.checker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil
	}

	var symbolString strings.Builder
	symbolString.WriteString("Symbol(" + walker.checker.SymbolToString(symbol))
	count := 0
	for _, declaration := range symbol.Declarations {
		if count >= 5 {
			fmt.Fprintf(&symbolString, " ... and %d more", len(symbol.Declarations)-count)
			break
		}
		count++
		symbolString.WriteString(", ")
		if declText, ok := walker.declarationTextCache[declaration]; ok {
			symbolString.WriteString(declText)
			continue
		}

		declSourceFile := ast.GetSourceFileOfNode(declaration)
		declLine, declChar := scanner.GetLineAndCharacterOfPosition(declSourceFile, declaration.Pos())
		fileName := tspath.GetBaseFileName(declSourceFile.FileName())
		isLibFile := isDefaultLibraryFile(fileName)
		lineStr := strconv.Itoa(declLine)
		charStr := strconv.Itoa(declChar)
		declText := fmt.Sprintf("Decl(%s, %s, %s)", fileName, core.IfElse(isLibFile, "--", lineStr), core.IfElse(isLibFile, "--", charStr))
		symbolString.WriteString(declText)
	}
	symbolString.WriteString(")")
	return &typeWriterResult{
		line:       line,
		sourceText: sourceText,
		symbol:     symbolString.String(),
	}
}
