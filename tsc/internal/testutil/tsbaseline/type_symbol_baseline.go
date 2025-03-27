package tsbaseline

import (
	"fmt"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil"
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

	t.Run("type", func(t *testing.T) {
		defer testutil.RecoverAndFail(t, "Panic on creating type baseline for test "+header)

		// !!! Remove once the type baselines print node reuse lines
		typesOpts := opts
		typesOpts.DiffFixupOld = func(s string) string {
			var sb strings.Builder
			sb.Grow(len(s))

			perfStats := false
			for line := range strings.SplitSeq(s, "\n") {
				if isTypeBaselineNodeReuseLine(line) {
					continue
				}

				if !perfStats && strings.HasPrefix(line, "=== Performance Stats ===") {
					perfStats = true
					continue
				} else if perfStats {
					if strings.HasPrefix(line, "=== ") {
						perfStats = false
					} else {
						continue
					}
				}

				sb.WriteString(line)
				sb.WriteString("\n")
			}

			return sb.String()[:sb.Len()-1]
		}
		typesOpts.IsSubmoduleAccepted = len(program.UnsupportedExtensions()) != 0 // TODO(jakebailey): read submoduleAccepted.txt

		checkBaselines(t, baselinePath, allFiles, fullWalker, header, typesOpts, false /*isSymbolBaseline*/)
	})
	t.Run("symbol", func(t *testing.T) {
		defer testutil.RecoverAndFail(t, "Panic on creating symbol baseline for test "+header)
		checkBaselines(t, baselinePath, allFiles, fullWalker, header, opts, true /*isSymbolBaseline*/)
	})
}

func isTypeBaselineNodeReuseLine(line string) bool {
	line, ok := strings.CutPrefix(line, ">")
	if !ok {
		return false
	}
	line = strings.TrimLeft(line[1:], " ")
	line, ok = strings.CutPrefix(line, ":")
	if !ok {
		return false
	}

	for _, c := range line {
		switch c {
		case ' ', '^', '\r':
			// Okay
		default:
			return false
		}
	}
	return true
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
	outputFileName := tsExtension.ReplaceAllString(baselinePath, fullExtension)
	fullBaseline := generateBaseline(allFiles, fullWalker, header, isSymbolBaseline)
	baseline.Run(t, outputFileName, fullBaseline, opts)
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
	return baseline.NoContent
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
	hadErrorBaseline     bool
	currentSourceFile    *ast.SourceFile
	declarationTextCache map[*ast.Node]string
}

func newTypeWriterWalker(program *compiler.Program, hadErrorBaseline bool) *typeWriterWalker {
	return &typeWriterWalker{
		program:              program,
		hadErrorBaseline:     hadErrorBaseline,
		declarationTextCache: make(map[*ast.Node]string),
	}
}

func (walker *typeWriterWalker) getTypeCheckerForCurrentFile() *checker.Checker {
	// If we don't use the right checker for the file, its contents won't be up to date
	// since the types/symbols baselines appear to depend on files having been checked.
	return walker.program.GetTypeCheckerForFile(walker.currentSourceFile)
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
		if ast.IsExpressionNode(n) || n.Kind == ast.KindIdentifier || ast.IsDeclarationName(n) {
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

	var resChildren []*ast.Node
	addChild := func(child *ast.Node) bool {
		resChildren = append(resChildren, child)
		return false
	}

	for len(work) > 0 {
		elem := work[len(work)-1]
		work = work[:len(work)-1]
		result = append(result, elem)
		elem.ForEachChild(addChild)
		slices.Reverse(resChildren)
		work = append(work, resChildren...)
		resChildren = resChildren[:0]
	}
	return result
}

func (walker *typeWriterWalker) writeTypeOrSymbol(node *ast.Node, isSymbolWalk bool) *typeWriterResult {
	actualPos := scanner.SkipTrivia(walker.currentSourceFile.Text, node.Pos())
	line, _ := scanner.GetLineAndCharacterOfPosition(walker.currentSourceFile, actualPos)
	sourceText := scanner.GetSourceTextOfNodeFromSourceFile(walker.currentSourceFile, node, false /*includeTrivia*/)
	fileChecker := walker.getTypeCheckerForCurrentFile()

	if !isSymbolWalk {
		// Don't try to get the type of something that's already a type.
		// Exception for `T` in `type T = something` because that may evaluate to some interesting type.
		if ast.IsPartOfTypeNode(node) ||
			ast.IsIdentifier(node) &&
				(ast.GetMeaningFromDeclaration(node.Parent)&ast.SemanticMeaningValue) == 0 &&
				!(ast.IsTypeAliasDeclaration(node.Parent) && node == node.Parent.Name()) {
			return nil
		}

		if ast.IsOmittedExpression(node) {
			return nil
		}

		var t *checker.Type
		// Workaround to ensure we output 'C' instead of 'typeof C' for base class expressions
		if ast.IsExpressionWithTypeArgumentsInClassExtendsClause(node.Parent) {
			t = fileChecker.GetTypeAtLocation(node.Parent)
		}
		if t == nil || checker.IsTypeAny(t) {
			t = fileChecker.GetTypeAtLocation(node)
		}
		var typeString string
		// var underline string
		if !walker.hadErrorBaseline &&
			checker.IsTypeAny(t) &&
			!ast.IsBindingElement(node.Parent) &&
			!ast.IsPropertyAccessOrQualifiedName(node.Parent) &&
			!ast.IsLabelName(node) &&
			!ast.IsGlobalScopeAugmentation(node.Parent) &&
			!ast.IsMetaProperty(node.Parent) &&
			!isImportStatementName(node) &&
			!isExportStatementName(node) &&
			!isIntrinsicJsxTag(node, walker.currentSourceFile) {
			typeString = t.AsIntrinsicType().IntrinsicName()
		} else {
			// !!! TODO: full type printing and underline when we have node builder
			// const typeFormatFlags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.AllowUniqueESSymbolType | ts.TypeFormatFlags.GenerateNamesForShadowedTypeParams;
			// let typeNode = this.checker.typeToTypeNode(type, node.parent, (typeFormatFlags & ts.TypeFormatFlags.NodeBuilderFlagsMask) | ts.NodeBuilderFlags.IgnoreErrors, ts.InternalNodeBuilderFlags.AllowUnresolvedNames)!;
			// if (ts.isIdentifier(node) && ts.isTypeAliasDeclaration(node.parent) && node.parent.name === node && ts.isIdentifier(typeNode) && ts.idText(typeNode) === ts.idText(node)) {
			// 	// for a complex type alias `type T = ...`, showing "T : T" isn't very helpful for type tests. When the type produced is the same as
			// 	// the name of the type alias, recreate the type string without reusing the alias name
			// 	typeNode = this.checker.typeToTypeNode(type, node.parent, ((typeFormatFlags | ts.TypeFormatFlags.InTypeAlias) & ts.TypeFormatFlags.NodeBuilderFlagsMask) | ts.NodeBuilderFlags.IgnoreErrors)!;
			// }

			// const { printer, writer, underliner, reset } = createSyntheticNodeUnderliningPrinter();
			// printer.writeNode(ts.EmitHint.Unspecified, typeNode, this.currentSourceFile, writer);
			// typeString = writer.getText();
			// underline = underliner.getText();
			// reset();
			typeString = fileChecker.TypeToString(t)
		}
		return &typeWriterResult{
			line:       line,
			sourceText: sourceText,
			typ:        typeString,
			// underline: underline, // !!! TODO: underline
		}
	}

	symbol := fileChecker.GetSymbolAtLocation(node)
	if symbol == nil {
		return nil
	}

	var symbolString strings.Builder
	symbolString.Grow(256)
	symbolString.WriteString("Symbol(")
	symbolString.WriteString(fileChecker.SymbolToString(symbol))
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
		symbolString.WriteString("Decl(")
		symbolString.WriteString(fileName)
		symbolString.WriteString(", ")
		if isDefaultLibraryFile(fileName) {
			symbolString.WriteString("--, --)")
		} else {
			fmt.Fprintf(&symbolString, "%d, %d)", declLine, declChar)
		}
	}
	symbolString.WriteString(")")
	return &typeWriterResult{
		line:       line,
		sourceText: sourceText,
		symbol:     symbolString.String(),
	}
}

func isImportStatementName(node *ast.Node) bool {
	if ast.IsImportSpecifier(node.Parent) && (node == node.Parent.Name() || node == node.Parent.PropertyName()) {
		return true
	}
	if ast.IsImportClause(node.Parent) && node == node.Parent.Name() {
		return true
	}
	if ast.IsImportEqualsDeclaration(node.Parent) && node == node.Parent.Name() {
		return true
	}
	return false
}

func isExportStatementName(node *ast.Node) bool {
	if ast.IsExportAssignment(node.Parent) && node == node.Parent.Expression() {
		return true
	}
	if ast.IsExportSpecifier(node.Parent) && (node == node.Parent.Name() || node == node.Parent.PropertyName()) {
		return true
	}
	return false
}

func isIntrinsicJsxTag(node *ast.Node, sourceFile *ast.SourceFile) bool {
	if !(ast.IsJsxOpeningElement(node.Parent) || ast.IsJsxClosingElement(node.Parent) || ast.IsJsxSelfClosingElement(node.Parent)) {
		return false
	}
	if node.Parent.TagName() != node {
		return false
	}
	text := scanner.GetSourceTextOfNodeFromSourceFile(sourceFile, node, false /*includeTrivia*/)
	return checker.IsIntrinsicJsxName(text)
}
