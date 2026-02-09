package lsutil

import (
	"cmp"
	"math"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"golang.org/x/text/collate"
	"golang.org/x/text/language"
)

var (
	caseInsensitiveOrganizeImportsComparer = []func(a, b string) int{getOrganizeImportsOrdinalStringComparer(true)}
	caseSensitiveOrganizeImportsComparer   = []func(a, b string) int{getOrganizeImportsOrdinalStringComparer(false)}
	organizeImportsComparers               = []func(a, b string) int{
		caseInsensitiveOrganizeImportsComparer[0],
		caseSensitiveOrganizeImportsComparer[0],
	}
)

// FilterImportDeclarations filters out non-import declarations from a list of statements.
func FilterImportDeclarations(statements []*ast.Statement) []*ast.Statement {
	return core.Filter(statements, func(stmt *ast.Statement) bool {
		return stmt.Kind == ast.KindImportDeclaration
	})
}

// GetDetectionLists returns the lists of comparers and type orders to test for organize imports detection.
func GetDetectionLists(preferences *UserPreferences) (comparersToTest []func(a, b string) int, typeOrdersToTest []OrganizeImportsTypeOrder) {
	if preferences != nil && !preferences.OrganizeImportsIgnoreCase.IsUnknown() {
		ignoreCase := preferences.OrganizeImportsIgnoreCase.IsTrue()
		comparersToTest = []func(a, b string) int{getOrganizeImportsStringComparer(preferences, ignoreCase)}
	} else {
		comparersToTest = []func(a, b string) int{
			getOrganizeImportsStringComparer(preferences, true),
			getOrganizeImportsStringComparer(preferences, false),
		}
	}

	if preferences != nil && preferences.OrganizeImportsTypeOrder != OrganizeImportsTypeOrderAuto {
		typeOrdersToTest = []OrganizeImportsTypeOrder{preferences.OrganizeImportsTypeOrder}
	} else {
		typeOrdersToTest = []OrganizeImportsTypeOrder{
			OrganizeImportsTypeOrderLast,
			OrganizeImportsTypeOrderInline,
			OrganizeImportsTypeOrderFirst,
		}
	}

	return comparersToTest, typeOrdersToTest
}

func getOrganizeImportsOrdinalStringComparer(ignoreCase bool) func(a, b string) int {
	if ignoreCase {
		return stringutil.CompareStringsCaseInsensitiveEslintCompatible
	}
	return stringutil.CompareStringsCaseSensitive
}

func getOrganizeImportsUnicodeStringComparer(ignoreCase bool, preferences *UserPreferences) func(a, b string) int {
	resolvedLocale := getOrganizeImportsLocale(preferences)

	caseFirst := OrganizeImportsCaseFirstFalse
	numeric := false
	accents := true

	if preferences != nil {
		caseFirst = preferences.OrganizeImportsCaseFirst
		numeric = preferences.OrganizeImportsNumericCollation
		accents = preferences.OrganizeImportsAccentCollation
	}

	tag, _ := language.Parse(resolvedLocale)

	var opts []collate.Option

	if numeric {
		opts = append(opts, collate.Numeric)
	}

	looseOpts := append([]collate.Option{}, opts...)
	looseOpts = append(looseOpts, collate.Loose)
	looseCollator := collate.New(tag, looseOpts...)

	if !ignoreCase {
		caseInsensitiveOpts := append([]collate.Option{}, opts...)
		caseInsensitiveOpts = append(caseInsensitiveOpts, collate.IgnoreCase)
		caseInsensitiveCollator := collate.New(tag, caseInsensitiveOpts...)

		fullCollator := collate.New(tag, opts...)

		return func(a, b string) int {
			var primaryCmp int
			if !accents {
				primaryCmp = looseCollator.CompareString(a, b)
			} else {
				primaryCmp = caseInsensitiveCollator.CompareString(a, b)
			}
			if primaryCmp != 0 {
				return primaryCmp
			}

			aRunes := []rune(a)
			bRunes := []rune(b)
			minLen := min(len(aRunes), len(bRunes))

			for i := range minLen {
				aUpper := unicode.IsUpper(aRunes[i])
				bUpper := unicode.IsUpper(bRunes[i])
				if aUpper != bUpper {
					switch caseFirst {
					case OrganizeImportsCaseFirstUpper:
						if aUpper {
							return -1
						}
						return 1
					case OrganizeImportsCaseFirstLower:
						if !aUpper {
							return -1
						}
						return 1
					default:
						if aUpper {
							return 1
						}
						return -1
					}
				}
			}

			if !accents {
				if len(aRunes) != len(bRunes) {
					return len(aRunes) - len(bRunes)
				}
				return 0
			}

			return fullCollator.CompareString(a, b)
		}
	}

	if ignoreCase {
		opts = append(opts, collate.IgnoreCase)
		if !accents {
			opts = append(opts, collate.Loose)
		}
	}

	collator := collate.New(tag, opts...)

	return func(a, b string) int {
		return collator.CompareString(a, b)
	}
}

func getOrganizeImportsLocale(preferences *UserPreferences) string {
	localeStr := "en"
	if preferences != nil && preferences.OrganizeImportsLocale != "" {
		localeStr = preferences.OrganizeImportsLocale
	}

	if localeStr == "auto" {
		if locale.Default != (locale.Locale{}) {
			tag := language.Tag(locale.Default)
			return tag.String()
		}
		return "en"
	}

	if locale, ok := locale.Parse(localeStr); ok {
		tag := language.Tag(locale)
		return tag.String()
	}

	return "en"
}

func getOrganizeImportsStringComparer(preferences *UserPreferences, ignoreCase bool) func(a, b string) int {
	collation := OrganizeImportsCollationOrdinal
	if preferences != nil {
		collation = preferences.OrganizeImportsCollation
	}

	if collation == OrganizeImportsCollationUnicode {
		return getOrganizeImportsUnicodeStringComparer(ignoreCase, preferences)
	}
	return getOrganizeImportsOrdinalStringComparer(ignoreCase)
}

func getModuleSpecifierExpression(declaration *ast.Statement) *ast.Expression {
	switch declaration.Kind {
	case ast.KindImportEqualsDeclaration:
		importEquals := declaration.AsImportEqualsDeclaration()
		if importEquals.ModuleReference.Kind == ast.KindExternalModuleReference {
			return importEquals.ModuleReference.Expression()
		}
		return nil
	case ast.KindImportDeclaration:
		return declaration.ModuleSpecifier()
	case ast.KindVariableStatement:
		declarations := declaration.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes
		if len(declarations) > 0 {
			initializer := declarations[0].Initializer()
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

// GetExternalModuleName returns the module name from a module specifier expression.
func GetExternalModuleName(specifier *ast.Expression) string {
	if specifier != nil && ast.IsStringLiteralLike(specifier.AsNode()) {
		return specifier.Text()
	}
	return ""
}

// CompareModuleSpecifiers compares two module specifiers using the given comparer.
func CompareModuleSpecifiers(m1 *ast.Expression, m2 *ast.Expression, comparer func(a, b string) int) int {
	name1 := GetExternalModuleName(m1)
	name2 := GetExternalModuleName(m2)
	if cmp := core.CompareBooleans(name1 == "", name2 == ""); cmp != 0 {
		return cmp
	}
	if cmp := core.CompareBooleans(tspath.IsExternalModuleNameRelative(name1), tspath.IsExternalModuleNameRelative(name2)); cmp != 0 {
		return cmp
	}
	return comparer(name1, name2)
}

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
const (
	importKindOrderSideEffect   = 0
	importKindOrderTypeOnly     = 1
	importKindOrderNamespace    = 2
	importKindOrderDefault      = 3
	importKindOrderNamed        = 4
	importKindOrderImportEquals = 5
	importKindOrderRequire      = 6
	importKindOrderUnknown      = 7
)

func getImportKindOrder(s1 *ast.Statement) int {
	switch s1.Kind {
	case ast.KindImportDeclaration:
		importDecl := s1.AsImportDeclaration()
		if importDecl.ImportClause == nil {
			return importKindOrderSideEffect
		}
		importClause := importDecl.ImportClause.AsImportClause()
		if importClause.IsTypeOnly() {
			return importKindOrderTypeOnly
		}
		if importClause.NamedBindings != nil && importClause.NamedBindings.Kind == ast.KindNamespaceImport {
			return importKindOrderNamespace
		}
		if importClause.Name() != nil {
			return importKindOrderDefault
		}
		return importKindOrderNamed
	case ast.KindImportEqualsDeclaration:
		return importKindOrderImportEquals
	case ast.KindVariableStatement:
		return importKindOrderRequire
	default:
		return importKindOrderUnknown
	}
}

// CompareImportsOrRequireStatements compares two import or require statements.
func CompareImportsOrRequireStatements(s1 *ast.Statement, s2 *ast.Statement, comparer func(a, b string) int) int {
	if cmp := CompareModuleSpecifiers(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2), comparer); cmp != 0 {
		return cmp
	}
	return compareImportKind(s1, s2)
}

func compareImportOrExportSpecifiers(s1 *ast.Node, s2 *ast.Node, comparer func(a, b string) int, preferences *UserPreferences) int {
	typeOrder := OrganizeImportsTypeOrderLast
	if preferences != nil {
		typeOrder = preferences.OrganizeImportsTypeOrder
	}

	s1Name := s1.Name().Text()
	s2Name := s2.Name().Text()

	switch typeOrder {
	case OrganizeImportsTypeOrderFirst:
		if cmp := core.CompareBooleans(s2.IsTypeOnly(), s1.IsTypeOnly()); cmp != 0 {
			return cmp
		}
		return comparer(s1Name, s2Name)
	case OrganizeImportsTypeOrderInline:
		return comparer(s1Name, s2Name)
	default: // OrganizeImportsTypeOrderLast
		if cmp := core.CompareBooleans(s1.IsTypeOnly(), s2.IsTypeOnly()); cmp != 0 {
			return cmp
		}
		return comparer(s1Name, s2Name)
	}
}

// GetNamedImportSpecifierComparer returns a comparer function for sorting import specifiers.
func GetNamedImportSpecifierComparer(preferences *UserPreferences, comparer func(a, b string) int) func(s1, s2 *ast.Node) int {
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

// GetImportSpecifierInsertionIndex returns the index at which to insert a new import specifier.
func GetImportSpecifierInsertionIndex(sortedImports []*ast.Node, newImport *ast.Node, comparer func(s1, s2 *ast.Node) int) int {
	return core.FirstResult(core.BinarySearchUniqueFunc(sortedImports, func(mid int, value *ast.Node) int {
		return comparer(value, newImport)
	}))
}

// GetImportDeclarationInsertIndex returns the index at which to insert a new import declaration.
func GetImportDeclarationInsertIndex(sortedImports []*ast.Statement, newImport *ast.Statement, comparer func(a, b *ast.Statement) int) int {
	return core.FirstResult(core.BinarySearchUniqueFunc(sortedImports, func(mid int, value *ast.Statement) int {
		return comparer(value, newImport)
	}))
}

// GetOrganizeImportsStringComparerWithDetection returns a string comparer based on detecting the order of import statements by the module specifier
func GetOrganizeImportsStringComparerWithDetection(originalImportDecls []*ast.Statement, preferences *UserPreferences) (comparer func(a, b string) int, isSorted bool) {
	result, sorted := DetectModuleSpecifierCaseBySort([][]*ast.Statement{originalImportDecls}, getComparers(preferences))
	return result, sorted
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

type namedImportSortResult struct {
	namedImportComparer func(a, b string) int
	typeOrder           OrganizeImportsTypeOrder
	isSorted            bool
}

// DetectNamedImportOrganizationBySort detects the order of named imports throughout the file by considering the named imports in each statement as a group
func DetectNamedImportOrganizationBySort(
	originalGroups []*ast.Statement,
	comparersToTest []func(a, b string) int,
	typesToTest []OrganizeImportsTypeOrder,
) (comparer func(a, b string) int, typeOrder OrganizeImportsTypeOrder, found bool) {
	result := detectNamedImportOrganizationBySort(originalGroups, comparersToTest, typesToTest)
	if result == nil {
		return nil, OrganizeImportsTypeOrderLast, false
	}
	return result.namedImportComparer, result.typeOrder, true
}

func detectNamedImportOrganizationBySort(
	originalGroups []*ast.Statement,
	comparersToTest []func(a, b string) int,
	typesToTest []OrganizeImportsTypeOrder,
) *namedImportSortResult {
	var bothNamedImports bool
	var importDeclsWithNamed []*ast.Statement

	for _, imp := range originalGroups {
		if imp.AsImportDeclaration().ImportClause == nil {
			continue
		}
		clause := imp.AsImportDeclaration().ImportClause.AsImportClause()
		if clause.NamedBindings == nil || clause.NamedBindings.Kind != ast.KindNamedImports {
			continue
		}
		namedImports := clause.NamedBindings.AsNamedImports()
		if len(namedImports.Elements.Nodes) == 0 {
			continue
		}

		if !bothNamedImports {
			hasTypeOnly := false
			hasRegular := false
			for _, elem := range namedImports.Elements.Nodes {
				if elem.IsTypeOnly() {
					hasTypeOnly = true
				} else {
					hasRegular = true
				}
			}
			if hasTypeOnly && hasRegular {
				bothNamedImports = true
			}
		}

		importDeclsWithNamed = append(importDeclsWithNamed, imp)
	}

	if len(importDeclsWithNamed) == 0 {
		return nil
	}

	namedImportsByDecl := make([][]*ast.Statement, 0, len(importDeclsWithNamed))
	for _, imp := range importDeclsWithNamed {
		clause := imp.AsImportDeclaration().ImportClause.AsImportClause()
		namedImports := clause.NamedBindings.AsNamedImports()
		namedImportsByDecl = append(namedImportsByDecl, namedImports.Elements.Nodes)
	}

	if !bothNamedImports || len(typesToTest) == 0 {
		namesList := make([][]string, len(namedImportsByDecl))
		for i, imports := range namedImportsByDecl {
			names := make([]string, len(imports))
			for j, imp := range imports {
				names[j] = imp.Name().Text()
			}
			namesList[i] = names
		}
		sortState := detectCaseSensitivityBySort(namesList, comparersToTest)
		typeOrder := OrganizeImportsTypeOrderLast
		if len(typesToTest) == 1 {
			typeOrder = typesToTest[0]
		}
		return &namedImportSortResult{
			namedImportComparer: sortState.comparer,
			typeOrder:           typeOrder,
			isSorted:            sortState.isSorted,
		}
	}

	bestDiff := map[OrganizeImportsTypeOrder]int{
		OrganizeImportsTypeOrderFirst:  math.MaxInt,
		OrganizeImportsTypeOrderLast:   math.MaxInt,
		OrganizeImportsTypeOrderInline: math.MaxInt,
	}
	bestComparer := map[OrganizeImportsTypeOrder]func(a, b string) int{
		OrganizeImportsTypeOrderFirst:  comparersToTest[0],
		OrganizeImportsTypeOrderLast:   comparersToTest[0],
		OrganizeImportsTypeOrderInline: comparersToTest[0],
	}

	for _, curComparer := range comparersToTest {
		currDiff := map[OrganizeImportsTypeOrder]int{
			OrganizeImportsTypeOrderFirst:  0,
			OrganizeImportsTypeOrderLast:   0,
			OrganizeImportsTypeOrderInline: 0,
		}

		for _, importDecl := range namedImportsByDecl {
			for _, typeOrder := range typesToTest {
				prefs := &UserPreferences{OrganizeImportsTypeOrder: typeOrder}
				diff := measureSortedness(importDecl, func(n1, n2 *ast.Node) int {
					return compareImportOrExportSpecifiers(n1, n2, curComparer, prefs)
				})
				currDiff[typeOrder] = currDiff[typeOrder] + diff
			}
		}

		for _, typeOrder := range typesToTest {
			if currDiff[typeOrder] < bestDiff[typeOrder] {
				bestDiff[typeOrder] = currDiff[typeOrder]
				bestComparer[typeOrder] = curComparer
			}
		}
	}

	for _, bestTypeOrder := range typesToTest {
		isBest := true
		for _, testTypeOrder := range typesToTest {
			if bestDiff[testTypeOrder] < bestDiff[bestTypeOrder] {
				isBest = false
				break
			}
		}
		if isBest {
			return &namedImportSortResult{
				namedImportComparer: bestComparer[bestTypeOrder],
				typeOrder:           bestTypeOrder,
				isSorted:            bestDiff[bestTypeOrder] == 0,
			}
		}
	}

	return &namedImportSortResult{
		namedImportComparer: bestComparer[OrganizeImportsTypeOrderLast],
		typeOrder:           OrganizeImportsTypeOrderLast,
		isSorted:            bestDiff[OrganizeImportsTypeOrderLast] == 0,
	}
}

type caseSensitivityDetectionResult struct {
	comparer func(a, b string) int
	isSorted bool
}

// DetectModuleSpecifierCaseBySort detects the order of module specifiers based on import statements throughout the module/file
func DetectModuleSpecifierCaseBySort(importDeclsByGroup [][]*ast.Statement, comparersToTest []func(a, b string) int) (comparer func(a, b string) int, isSorted bool) {
	moduleSpecifiersByGroup := make([][]string, 0, len(importDeclsByGroup))
	for _, importGroup := range importDeclsByGroup {
		moduleNames := make([]string, 0, len(importGroup))
		for _, decl := range importGroup {
			if expr := getModuleSpecifierExpression(decl); expr != nil {
				moduleNames = append(moduleNames, GetExternalModuleName(expr))
			} else {
				moduleNames = append(moduleNames, "")
			}
		}
		moduleSpecifiersByGroup = append(moduleSpecifiersByGroup, moduleNames)
	}
	result := detectCaseSensitivityBySort(moduleSpecifiersByGroup, comparersToTest)
	return result.comparer, result.isSorted
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

// GetNamedImportSpecifierComparerWithDetection returns a specifier comparer based on detecting the existing sort order within a single import statement
func GetNamedImportSpecifierComparerWithDetection(importDecl *ast.Node, sourceFile *ast.SourceFile, preferences *UserPreferences) (specifierComparer func(s1, s2 *ast.Node) int, isSorted core.Tristate) {
	comparersToTest, typeOrdersToTest := GetDetectionLists(preferences)

	var importStmt *ast.Statement
	if importDecl.Kind == ast.KindImportDeclaration {
		importStmt = importDecl
	}

	specifierComparer = GetNamedImportSpecifierComparer(preferences, comparersToTest[0])
	isSorted = core.TSUnknown

	if (preferences == nil || preferences.OrganizeImportsIgnoreCase.IsUnknown() || preferences.OrganizeImportsTypeOrder == OrganizeImportsTypeOrderAuto) && importStmt != nil {
		detectFromDecl := detectNamedImportOrganizationBySort([]*ast.Statement{importStmt}, comparersToTest, typeOrdersToTest)
		if detectFromDecl != nil {
			isSorted = core.BoolToTristate(detectFromDecl.isSorted)
			specifierComparer = GetNamedImportSpecifierComparer(
				&UserPreferences{OrganizeImportsTypeOrder: detectFromDecl.typeOrder},
				detectFromDecl.namedImportComparer,
			)
		} else if sourceFile != nil {
			allImports := FilterImportDeclarations(sourceFile.Statements.Nodes)
			detectFromFile := detectNamedImportOrganizationBySort(allImports, comparersToTest, typeOrdersToTest)
			if detectFromFile != nil {
				isSorted = core.BoolToTristate(detectFromFile.isSorted)
				specifierComparer = GetNamedImportSpecifierComparer(
					&UserPreferences{OrganizeImportsTypeOrder: detectFromFile.typeOrder},
					detectFromFile.namedImportComparer,
				)
			}
		}
	}

	return specifierComparer, isSorted
}
