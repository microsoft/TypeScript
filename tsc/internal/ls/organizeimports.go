package ls

import (
	"cmp"
	"math"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	caseInsensitiveOrganizeImportsComparer = []func(a, b string) int{getOrganizeImportsOrdinalStringComparer(true)}
	caseSensitiveOrganizeImportsComparer   = []func(a, b string) int{getOrganizeImportsOrdinalStringComparer(false)}
	organizeImportsComparers               = []func(a, b string) int{
		caseInsensitiveOrganizeImportsComparer[0],
		caseSensitiveOrganizeImportsComparer[0],
	}
)

// statement = anyImportOrRequireStatement
func getImportDeclarationInsertIndex(sortedImports []*ast.Statement, newImport *ast.Statement, comparer func(a, b *ast.Statement) int) int {
	// !!!
	return len(sortedImports)
}

// returns `-1` if `a` is better than `b`
//
//	note: this sorts in descending order of preference; different than convention in other cmp-like functions
func compareModuleSpecifiers(
	a *ImportFix, // !!! ImportFixWithModuleSpecifier
	b *ImportFix, // !!! ImportFixWithModuleSpecifier
	importingFile *ast.SourceFile, // | FutureSourceFile,
	program *compiler.Program,
	preferences UserPreferences,
	allowsImportingSpecifier func(specifier string) bool,
	toPath func(fileName string) tspath.Path,
) int {
	if a.kind == ImportFixKindUseNamespace || b.kind == ImportFixKindUseNamespace {
		return 0
	}
	if comparison := compareBooleans(
		b.moduleSpecifierKind != modulespecifiers.ResultKindNodeModules || allowsImportingSpecifier(b.moduleSpecifier),
		a.moduleSpecifierKind != modulespecifiers.ResultKindNodeModules || allowsImportingSpecifier(a.moduleSpecifier),
	); comparison != 0 {
		return comparison
	}
	if comparison := compareModuleSpecifierRelativity(a, b, preferences); comparison != 0 {
		return comparison
	}
	if comparison := compareNodeCoreModuleSpecifiers(a.moduleSpecifier, b.moduleSpecifier, importingFile, program); comparison != 0 {
		return comparison
	}
	if comparison := compareBooleans(isFixPossiblyReExportingImportingFile(a, importingFile.Path(), toPath), isFixPossiblyReExportingImportingFile(b, importingFile.Path(), toPath)); comparison != 0 {
		return comparison
	}
	if comparison := compareNumberOfDirectorySeparators(a.moduleSpecifier, b.moduleSpecifier); comparison != 0 {
		return comparison
	}
	return 0
}

// True > False
func compareBooleans(a, b bool) int {
	if a && !b {
		return -1
	} else if !a && b {
		return 1
	}
	return 0
}

// returns `-1` if `a` is better than `b`
func compareModuleSpecifierRelativity(a *ImportFix, b *ImportFix, preferences UserPreferences) int {
	switch preferences.ImportModuleSpecifierPreference {
	case modulespecifiers.ImportModuleSpecifierPreferenceNonRelative, modulespecifiers.ImportModuleSpecifierPreferenceProjectRelative:
		return compareBooleans(a.moduleSpecifierKind == modulespecifiers.ResultKindRelative, b.moduleSpecifierKind == modulespecifiers.ResultKindRelative)
	}
	return 0
}

func compareNodeCoreModuleSpecifiers(a, b string, importingFile *ast.SourceFile, program *compiler.Program) int {
	if strings.HasPrefix(a, "node:") && !strings.HasPrefix(b, "node:") {
		if shouldUseUriStyleNodeCoreModules(importingFile, program) {
			return -1
		}
		return 1
	}
	if strings.HasPrefix(b, "node:") && !strings.HasPrefix(a, "node:") {
		if shouldUseUriStyleNodeCoreModules(importingFile, program) {
			return 1
		}
		return -1
	}
	return 0
}

func shouldUseUriStyleNodeCoreModules(file *ast.SourceFile, program *compiler.Program) bool {
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

// This is a simple heuristic to try to avoid creating an import cycle with a barrel re-export.
// E.g., do not `import { Foo } from ".."` when you could `import { Foo } from "../Foo"`.
// This can produce false positives or negatives if re-exports cross into sibling directories
// (e.g. `export * from "../whatever"`) or are not named "index".
func isFixPossiblyReExportingImportingFile(fix *ImportFix, importingFilePath tspath.Path, toPath func(fileName string) tspath.Path) bool {
	if fix.isReExport != nil && *(fix.isReExport) &&
		fix.exportInfo != nil && fix.exportInfo.moduleFileName != "" && isIndexFileName(fix.exportInfo.moduleFileName) {
		reExportDir := toPath(tspath.GetDirectoryPath(fix.exportInfo.moduleFileName))
		return strings.HasPrefix(string(importingFilePath), string(reExportDir))
	}
	return false
}

func compareNumberOfDirectorySeparators(path1, path2 string) int {
	return cmp.Compare(strings.Count(path1, "/"), strings.Count(path2, "/"))
}

func isIndexFileName(fileName string) bool {
	fileName = tspath.GetBaseFileName(fileName)
	if tspath.FileExtensionIsOneOf(fileName, []string{".js", ".jsx", ".d.ts", ".ts", ".tsx"}) {
		fileName = tspath.RemoveFileExtension(fileName)
	}
	return fileName == "index"
}

func getOrganizeImportsOrdinalStringComparer(ignoreCase bool) func(a, b string) int {
	if ignoreCase {
		return stringutil.CompareStringsCaseInsensitiveEslintCompatible
	}
	return stringutil.CompareStringsCaseSensitive
}

// getModuleSpecifierExpression returns the module specifier expression from an import/require statement
func getModuleSpecifierExpression(declaration *ast.Statement) *ast.Expression {
	switch declaration.Kind {
	case ast.KindImportEqualsDeclaration:
		importEquals := declaration.AsImportEqualsDeclaration()
		if importEquals.ModuleReference.Kind == ast.KindExternalModuleReference {
			return importEquals.ModuleReference.AsExternalModuleReference().Expression
		}
		return nil
	case ast.KindImportDeclaration:
		return declaration.AsImportDeclaration().ModuleSpecifier
	case ast.KindVariableStatement:
		// For require statements: const x = require('...')
		variableStatement := declaration.AsVariableStatement()
		declarations := variableStatement.DeclarationList.AsVariableDeclarationList().Declarations.Nodes
		if len(declarations) > 0 {
			decl := declarations[0]
			initializer := decl.Initializer()
			if initializer != nil && initializer.Kind == ast.KindCallExpression {
				callExpr := initializer.AsCallExpression()
				if len(callExpr.Arguments.Nodes) > 0 {
					return callExpr.Arguments.Nodes[0]
				}
			}
		}
		return nil
	default:
		return nil
	}
}

func getExternalModuleName(specifier *ast.Expression) string {
	if specifier != nil && ast.IsStringLiteralLike(specifier.AsNode()) {
		return specifier.Text()
	}
	return ""
}

// compareModuleSpecifiersWorker compares two module specifiers
func compareModuleSpecifiersWorker(m1 *ast.Expression, m2 *ast.Expression, comparer func(a, b string) int) int {
	name1 := getExternalModuleName(m1)
	name2 := getExternalModuleName(m2)
	if cmp := compareBooleans(name1 == "", name2 == ""); cmp != 0 {
		return cmp
	}
	if cmp := compareBooleans(tspath.IsExternalModuleNameRelative(name1), tspath.IsExternalModuleNameRelative(name2)); cmp != 0 {
		return cmp
	}
	return comparer(name1, name2)
}

// compareImportKind returns comparison order based on import kind
func compareImportKind(s1 *ast.Statement, s2 *ast.Statement) int {
	return cmp.Compare(getImportKindOrder(s1), getImportKindOrder(s2))
}

// getImportKindOrder returns the sort order for different import kinds:
// 1. Side-effect imports
// 2. Type-only imports
// 3. Namespace imports
// 4. Default imports
// 5. Named imports
// 6. ImportEqualsDeclarations
// 7. Require variable statements
func getImportKindOrder(s1 *ast.Statement) int {
	switch s1.Kind {
	case ast.KindImportDeclaration:
		importDecl := s1.AsImportDeclaration()
		if importDecl.ImportClause == nil {
			return 0 // Side-effect import
		}
		importClause := importDecl.ImportClause.AsImportClause()
		if importClause.IsTypeOnly() {
			return 1 // Type-only import
		}
		if importClause.NamedBindings != nil && importClause.NamedBindings.Kind == ast.KindNamespaceImport {
			return 2 // Namespace import
		}
		if importClause.Name() != nil {
			return 3 // Default import
		}
		return 4 // Named imports
	case ast.KindImportEqualsDeclaration:
		return 5
	case ast.KindVariableStatement:
		return 6 // Require statement
	default:
		return 7
	}
}

// compareImportsOrRequireStatements compares two import or require statements for sorting
func compareImportsOrRequireStatements(s1 *ast.Statement, s2 *ast.Statement, comparer func(a, b string) int) int {
	if cmp := compareModuleSpecifiersWorker(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2), comparer); cmp != 0 {
		return cmp
	}
	return compareImportKind(s1, s2)
}

// compareImportOrExportSpecifiers compares two import or export specifiers
func compareImportOrExportSpecifiers(s1 *ast.Node, s2 *ast.Node, comparer func(a, b string) int, preferences *UserPreferences) int {
	typeOrder := OrganizeImportsTypeOrderLast
	if preferences != nil {
		typeOrder = preferences.OrganizeImportsTypeOrder
	}

	s1Name := s1.Name().Text()
	s2Name := s2.Name().Text()

	switch typeOrder {
	case OrganizeImportsTypeOrderFirst:
		if cmp := compareBooleans(s2.IsTypeOnly(), s1.IsTypeOnly()); cmp != 0 {
			return cmp
		}
		return comparer(s1Name, s2Name)
	case OrganizeImportsTypeOrderInline:
		return comparer(s1Name, s2Name)
	default: // OrganizeImportsTypeOrderLast
		if cmp := compareBooleans(s1.IsTypeOnly(), s2.IsTypeOnly()); cmp != 0 {
			return cmp
		}
		return comparer(s1Name, s2Name)
	}
}

// getNamedImportSpecifierComparer returns a comparer function for import/export specifiers
func getNamedImportSpecifierComparer(preferences *UserPreferences, comparer func(a, b string) int) func(s1, s2 *ast.Node) int {
	if comparer == nil {
		ignoreCase := false
		if preferences != nil && !preferences.OrganizeImportsIgnoreCase.IsUnknown() {
			ignoreCase = preferences.OrganizeImportsIgnoreCase.IsTrue()
		}
		comparer = getOrganizeImportsOrdinalStringComparer(ignoreCase)
	}
	return func(s1, s2 *ast.Node) int {
		return compareImportOrExportSpecifiers(s1, s2, comparer, preferences)
	}
}

// getImportSpecifierInsertionIndex finds the insertion index for a new import specifier
func getImportSpecifierInsertionIndex(sortedImports []*ast.Node, newImport *ast.Node, comparer func(s1, s2 *ast.Node) int) int {
	return core.FirstResult(core.BinarySearchUniqueFunc(sortedImports, func(mid int, value *ast.Node) int {
		return comparer(value, newImport)
	}))
}

// getOrganizeImportsStringComparerWithDetection detects the string comparer to use based on existing imports
func getOrganizeImportsStringComparerWithDetection(originalImportDecls []*ast.Statement, preferences *UserPreferences) (comparer func(a, b string) int, isSorted bool) {
	result := detectModuleSpecifierCaseBySort([][]*ast.Statement{originalImportDecls}, getComparers(preferences))
	return result.comparer, result.isSorted
}

func getComparers(preferences *UserPreferences) []func(a string, b string) int {
	if preferences != nil {
		switch preferences.OrganizeImportsIgnoreCase {
		case core.TSTrue:
			return caseInsensitiveOrganizeImportsComparer
		case core.TSFalse:
			return caseSensitiveOrganizeImportsComparer
		}
	}

	return organizeImportsComparers
}

type caseSensitivityDetectionResult struct {
	comparer func(a, b string) int
	isSorted bool
}

func detectModuleSpecifierCaseBySort(importDeclsByGroup [][]*ast.Statement, comparersToTest []func(a, b string) int) caseSensitivityDetectionResult {
	moduleSpecifiersByGroup := make([][]string, 0, len(importDeclsByGroup))
	for _, importGroup := range importDeclsByGroup {
		moduleNames := make([]string, 0, len(importGroup))
		for _, decl := range importGroup {
			if expr := getModuleSpecifierExpression(decl); expr != nil {
				moduleNames = append(moduleNames, getExternalModuleName(expr))
			} else {
				moduleNames = append(moduleNames, "")
			}
		}
		moduleSpecifiersByGroup = append(moduleSpecifiersByGroup, moduleNames)
	}
	return detectCaseSensitivityBySort(moduleSpecifiersByGroup, comparersToTest)
}

func detectCaseSensitivityBySort(originalGroups [][]string, comparersToTest []func(a, b string) int) caseSensitivityDetectionResult {
	var bestComparer func(a, b string) int
	bestDiff := math.MaxInt

	for _, curComparer := range comparersToTest {
		diffOfCurrentComparer := 0

		for _, listToSort := range originalGroups {
			if len(listToSort) <= 1 {
				continue
			}
			diff := measureSortedness(listToSort, curComparer)
			diffOfCurrentComparer += diff
		}

		if diffOfCurrentComparer < bestDiff {
			bestDiff = diffOfCurrentComparer
			bestComparer = curComparer
		}
	}

	if bestComparer == nil && len(comparersToTest) > 0 {
		bestComparer = comparersToTest[0]
	}

	return caseSensitivityDetectionResult{
		comparer: bestComparer,
		isSorted: bestDiff == 0,
	}
}

func measureSortedness[T any](arr []T, comparer func(a, b T) int) int {
	i := 0
	for j := range len(arr) - 1 {
		if comparer(arr[j], arr[j+1]) > 0 {
			i++
		}
	}
	return i
}

// getNamedImportSpecifierComparerWithDetection detects the appropriate comparer for named imports
func getNamedImportSpecifierComparerWithDetection(importDecl *ast.Node, preferences *UserPreferences, sourceFile *ast.SourceFile) (specifierComparer func(s1, s2 *ast.Node) int, isSorted core.Tristate) {
	specifierComparer = getNamedImportSpecifierComparer(preferences, getComparers(preferences)[0])
	// Try to detect from the current import declaration
	if (preferences == nil || preferences.OrganizeImportsIgnoreCase.IsUnknown() || preferences.OrganizeImportsTypeOrder == OrganizeImportsTypeOrderLast) &&
		importDecl.Kind == ast.KindImportDeclaration {
		// For now, just return the default comparer
		// Full detection logic would require porting detectNamedImportOrganizationBySort
		return specifierComparer, core.TSUnknown
	}

	return specifierComparer, core.TSUnknown
}
