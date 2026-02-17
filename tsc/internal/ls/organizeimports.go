package ls

import (
	"context"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

// OrganizeImports organizes imports by:
//  1. Removing unused imports
//  2. Coalescing imports from the same module
//  3. Sorting imports
func (l *LanguageService) OrganizeImports(
	ctx context.Context,
	sourceFile *ast.SourceFile,
	program *compiler.Program,
	kind lsproto.CodeActionKind,
) map[string][]*lsproto.TextEdit {
	changeTracker := change.NewTracker(ctx, program.Options(), l.FormatOptions(), l.converters)
	shouldSort := kind == lsproto.CodeActionKindSourceSortImports || kind == lsproto.CodeActionKindSourceOrganizeImports
	shouldCombine := shouldSort
	shouldRemove := kind == lsproto.CodeActionKindSourceRemoveUnusedImports || kind == lsproto.CodeActionKindSourceOrganizeImports
	topLevelImportDecls := lsutil.FilterImportDeclarations(sourceFile.Statements.Nodes)
	topLevelImportGroupDecls := groupByNewlineContiguous(sourceFile, topLevelImportDecls)

	preferences := l.UserPreferences()
	comparersToTest, typeOrdersToTest := lsutil.GetDetectionLists(preferences)
	defaultComparer := comparersToTest[0]

	var moduleSpecifierComparer func(a, b string) int
	var namedImportComparer func(a, b string) int
	if !preferences.OrganizeImportsIgnoreCase.IsUnknown() {
		moduleSpecifierComparer = defaultComparer
		namedImportComparer = defaultComparer
	}
	typeOrder := preferences.OrganizeImportsTypeOrder

	if preferences.OrganizeImportsIgnoreCase.IsUnknown() {
		result, _ := lsutil.DetectModuleSpecifierCaseBySort(topLevelImportGroupDecls, comparersToTest)
		moduleSpecifierComparer = result
	}

	if typeOrder == lsutil.OrganizeImportsTypeOrderAuto || preferences.OrganizeImportsIgnoreCase.IsUnknown() {
		namedImportComparer2, typeOrder2, found := lsutil.DetectNamedImportOrganizationBySort(topLevelImportDecls, comparersToTest, typeOrdersToTest)
		if found {
			if namedImportComparer == nil || preferences.OrganizeImportsIgnoreCase.IsUnknown() {
				namedImportComparer = namedImportComparer2
			}
			if typeOrder == lsutil.OrganizeImportsTypeOrderAuto {
				typeOrder = typeOrder2
			}
		}
	}

	comparer := organizeImportsComparerSettings{
		moduleSpecifierComparer: moduleSpecifierComparer,
		namedImportComparer:     namedImportComparer,
		typeOrder:               typeOrder,
	}

	for _, importGroupDecl := range topLevelImportGroupDecls {
		organizeImportsWorker(importGroupDecl, comparer, shouldSort, shouldCombine, shouldRemove, sourceFile, program, changeTracker, ctx)
	}

	if kind != lsproto.CodeActionKindSourceRemoveUnusedImports {
		topLevelExportGroupDecls := getTopLevelExportGroups(sourceFile)
		for _, exportGroupDecl := range topLevelExportGroupDecls {
			organizeExportsWorker(exportGroupDecl, comparer, sourceFile, changeTracker)
		}
	}

	for _, stmt := range sourceFile.Statements.Nodes {
		if !ast.IsAmbientModule(stmt.AsNode()) {
			continue
		}

		ambientModule := stmt.AsModuleDeclaration()
		if ambientModule.Body == nil {
			continue
		}

		moduleBody := ambientModule.Body.AsModuleBlock()

		ambientModuleImportDecls := lsutil.FilterImportDeclarations(moduleBody.Statements.Nodes)
		ambientModuleImportGroupDecls := groupByNewlineContiguous(sourceFile, ambientModuleImportDecls)

		for _, importGroupDecl := range ambientModuleImportGroupDecls {
			organizeImportsWorker(importGroupDecl, comparer, shouldSort, shouldCombine, shouldRemove, sourceFile, program, changeTracker, ctx)
		}

		if kind != lsproto.CodeActionKindSourceRemoveUnusedImports {
			var ambientModuleExportDecls []*ast.Statement
			for _, s := range moduleBody.Statements.Nodes {
				if s.Kind == ast.KindExportDeclaration {
					ambientModuleExportDecls = append(ambientModuleExportDecls, s)
				}
			}
			organizeExportsWorker(ambientModuleExportDecls, comparer, sourceFile, changeTracker)
		}
	}

	return changeTracker.GetChanges()
}

type organizeImportsComparerSettings struct {
	moduleSpecifierComparer func(a, b string) int
	namedImportComparer     func(a, b string) int
	typeOrder               lsutil.OrganizeImportsTypeOrder
}

func organizeImportsWorker(
	oldImportDecls []*ast.Statement,
	comparer organizeImportsComparerSettings,
	shouldSort bool,
	shouldCombine bool,
	shouldRemove bool,
	sourceFile *ast.SourceFile,
	program *compiler.Program,
	changeTracker *change.Tracker,
	ctx context.Context,
) {
	if len(oldImportDecls) == 0 {
		return
	}

	// Header comment preservation is handled via LeadingTriviaOptionExclude in the change tracker below

	processedImports := slices.Clone(oldImportDecls)
	if shouldRemove {
		typeChecker, done := program.GetTypeCheckerForFile(ctx, sourceFile)
		defer done()
		processedImports = removeUnusedImports(processedImports, sourceFile, typeChecker, program, changeTracker)
	}

	var newImportDecls []*ast.Statement
	if shouldCombine {
		grouped := groupByModuleSpecifier(processedImports)
		if shouldSort {
			slices.SortFunc(grouped, func(a, b []*ast.Statement) int {
				if len(a) == 0 || len(b) == 0 {
					return 0
				}
				return lsutil.CompareModuleSpecifiers(
					a[0].ModuleSpecifier(),
					b[0].ModuleSpecifier(),
					comparer.moduleSpecifierComparer,
				)
			})
		}

		specifierComparer := lsutil.GetNamedImportSpecifierComparer(
			&lsutil.UserPreferences{OrganizeImportsTypeOrder: comparer.typeOrder},
			comparer.namedImportComparer,
		)

		for _, importGroup := range grouped {
			coalesced := coalesceImportsWorker(importGroup, comparer.moduleSpecifierComparer, specifierComparer, sourceFile, changeTracker)
			if shouldSort {
				slices.SortFunc(coalesced, func(a, b *ast.Statement) int {
					return lsutil.CompareImportsOrRequireStatements(a, b, comparer.moduleSpecifierComparer)
				})
			}
			newImportDecls = append(newImportDecls, coalesced...)
		}
	} else {
		newImportDecls = processedImports
	}

	if shouldSort && !shouldCombine {
		slices.SortFunc(newImportDecls, func(a, b *ast.Statement) int {
			return lsutil.CompareImportsOrRequireStatements(a, b, comparer.moduleSpecifierComparer)
		})
	}

	if len(newImportDecls) == 0 {
		changeTracker.DeleteNodeRange(
			sourceFile,
			oldImportDecls[0].AsNode(),
			oldImportDecls[len(oldImportDecls)-1].AsNode(),
			change.LeadingTriviaOptionExclude, // Preserve header comment
			change.TrailingTriviaOptionInclude,
		)
	} else {
		for _, imp := range newImportDecls {
			changeTracker.SetEmitFlags(imp.AsNode(), printer.EFNoLeadingComments)
		}

		options := change.NodeOptions{
			LeadingTriviaOption:  change.LeadingTriviaOptionExclude, // Preserve header comment
			TrailingTriviaOption: change.TrailingTriviaOptionInclude,
			Suffix:               "\n",
		}

		newNodes := core.Map(newImportDecls, func(s *ast.Statement) *ast.Node { return s.AsNode() })
		changeTracker.ReplaceNodeWithNodes(sourceFile, oldImportDecls[0].AsNode(), newNodes, &options)

		if len(oldImportDecls) > 1 {
			for i := 1; i < len(oldImportDecls); i++ {
				changeTracker.Delete(sourceFile, oldImportDecls[i].AsNode())
			}
		}
	}
}

func groupByModuleSpecifier(imports []*ast.Statement) [][]*ast.Statement {
	groups := make(map[string][]*ast.Statement)
	var order []string

	for _, imp := range imports {
		specifier := lsutil.GetExternalModuleName(imp.ModuleSpecifier())
		if _, exists := groups[specifier]; !exists {
			order = append(order, specifier)
		}
		groups[specifier] = append(groups[specifier], imp)
	}

	result := make([][]*ast.Statement, 0, len(order))
	for _, key := range order {
		result = append(result, groups[key])
	}
	return result
}

func removeUnusedImports(oldImports []*ast.Statement, sourceFile *ast.SourceFile, typeChecker *checker.Checker, program *compiler.Program, changeTracker *change.Tracker) []*ast.Statement {
	compilerOptions := program.Options()
	jsxElementsPresent := (sourceFile.AsNode().SubtreeFacts() & ast.SubtreeContainsJsx) != 0
	jsxModeNeedsExplicitImport := compilerOptions.Jsx == core.JsxEmitReact || compilerOptions.Jsx == core.JsxEmitReactNative

	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	usedImports := make([]*ast.Statement, 0, len(oldImports))

	for _, importDecl := range oldImports {
		importClause := importDecl.AsImportDeclaration().ImportClause
		if importClause == nil {
			usedImports = append(usedImports, importDecl)
			continue
		}

		clause := importClause.AsImportClause()
		name := clause.Name()
		namedBindings := clause.NamedBindings

		if name != nil && !typeChecker.IsDeclarationUsed(sourceFile, name.AsIdentifier(), jsxElementsPresent, jsxModeNeedsExplicitImport) {
			name = nil
		}

		if namedBindings != nil {
			switch namedBindings.Kind {
			case ast.KindNamespaceImport:
				nsImport := namedBindings.AsNamespaceImport()
				if !typeChecker.IsDeclarationUsed(sourceFile, nsImport.Name().AsIdentifier(), jsxElementsPresent, jsxModeNeedsExplicitImport) {
					namedBindings = nil
				}
			case ast.KindNamedImports:
				namedImports := namedBindings.AsNamedImports()
				originalBindings := namedBindings
				newElements := filterUsedImportSpecifiers(namedImports.Elements.Nodes, typeChecker, sourceFile, jsxElementsPresent, jsxModeNeedsExplicitImport)
				if len(newElements) == 0 {
					namedBindings = nil
				} else if len(newElements) < len(namedImports.Elements.Nodes) {
					newList := factory.NewNodeList(newElements)
					updatedNamedImports := factory.UpdateNamedImports(namedImports, newList)
					namedBindings = updatedNamedImports.AsNode()
				}
				if namedBindings != nil && !ast.NodeIsSynthesized(originalBindings.AsNode()) && !printer.RangeIsOnSingleLine(originalBindings.Loc, sourceFile) {
					changeTracker.SetEmitFlags(namedBindings, printer.EFMultiLine)
				}
			}
		}

		if name != nil || namedBindings != nil {
			importDeclNode := importDecl.AsImportDeclaration()
			newClause := factory.UpdateImportClause(clause, clause.PhaseModifier, name, namedBindings)
			newImportDecl := factory.UpdateImportDeclaration(
				importDeclNode,
				importDeclNode.Modifiers(),
				newClause.AsNode(),
				importDeclNode.ModuleSpecifier,
				importDeclNode.Attributes,
			)
			usedImports = append(usedImports, newImportDecl)
		} else {
			moduleSpecifier := importDecl.ModuleSpecifier()
			if hasModuleDeclarationMatchingSpecifier(sourceFile, moduleSpecifier) {
				if sourceFile.IsDeclarationFile {
					importDeclNode := importDecl.AsImportDeclaration()
					newImportDecl := factory.UpdateImportDeclaration(
						importDeclNode,
						importDeclNode.Modifiers(),
						nil, // no import clause
						importDeclNode.ModuleSpecifier,
						importDeclNode.Attributes,
					)
					usedImports = append(usedImports, newImportDecl)
				} else {
					usedImports = append(usedImports, importDecl)
				}
			}
		}
	}

	return usedImports
}

func filterUsedImportSpecifiers(
	elements []*ast.Statement,
	typeChecker *checker.Checker,
	sourceFile *ast.SourceFile,
	jsxElementsPresent bool,
	jsxModeNeedsExplicitImport bool,
) []*ast.Statement {
	var result []*ast.Statement
	for _, elem := range elements {
		spec := elem.AsImportSpecifier()
		if typeChecker.IsDeclarationUsed(sourceFile, spec.Name().AsIdentifier(), jsxElementsPresent, jsxModeNeedsExplicitImport) {
			result = append(result, elem)
		}
	}
	return result
}

func hasModuleDeclarationMatchingSpecifier(sourceFile *ast.SourceFile, moduleSpecifier *ast.Expression) bool {
	if moduleSpecifier == nil || !ast.IsStringLiteral(moduleSpecifier.AsNode()) {
		return false
	}
	moduleSpecifierText := moduleSpecifier.Text()

	for _, moduleName := range sourceFile.ModuleAugmentations {
		if ast.IsStringLiteral(moduleName) && moduleName.Text() == moduleSpecifierText {
			return true
		}
	}

	return false
}

// getImportAttributesKey returns a key for grouping imports by their attributes.
func getImportAttributesKey(attributes *ast.ImportAttributesNode) string {
	if attributes == nil {
		return ""
	}

	importAttrs := attributes.AsImportAttributes()
	var key strings.Builder
	key.WriteString(importAttrs.Token.String())
	key.WriteString(" ")

	attrNodes := make([]*ast.Node, len(importAttrs.Attributes.Nodes))
	copy(attrNodes, importAttrs.Attributes.Nodes)
	slices.SortFunc(attrNodes, func(a, b *ast.Node) int {
		aName := a.AsImportAttribute().Name().Text()
		bName := b.AsImportAttribute().Name().Text()
		return stringutil.CompareStringsCaseSensitive(aName, bName)
	})

	for _, attrNode := range attrNodes {
		attr := attrNode.AsImportAttribute()
		key.WriteString(attr.Name().Text())
		key.WriteString(":")
		if ast.IsStringLiteralLike(attr.Value.AsNode()) {
			key.WriteString(`"`)
			key.WriteString(attr.Value.Text())
			key.WriteString(`"`)
		} else {
			key.WriteString(attr.Value.AsNode().Text())
		}
		key.WriteString(" ")
	}

	return key.String()
}

// groupByNewlineContiguous groups declarations by blank lines between them.
func groupByNewlineContiguous(sourceFile *ast.SourceFile, decls []*ast.Statement) [][]*ast.Statement {
	s := scanner.NewScanner()
	s.SetSkipTrivia(false) // Must not skip trivia to detect newlines
	var groups [][]*ast.Statement
	var currentGroup []*ast.Statement

	for _, decl := range decls {
		if len(currentGroup) > 0 && isNewGroup(sourceFile, decl, s) {
			groups = append(groups, currentGroup)
			currentGroup = nil
		}
		currentGroup = append(currentGroup, decl)
	}

	if len(currentGroup) > 0 {
		groups = append(groups, currentGroup)
	}

	return groups
}

func isNewGroup(sourceFile *ast.SourceFile, decl *ast.Statement, s *scanner.Scanner) bool {
	fullStart := decl.Pos()
	if fullStart < 0 {
		return false
	}

	text := sourceFile.Text()
	textLen := len(text)

	if fullStart >= textLen {
		return false
	}

	startPos := scanner.SkipTrivia(text, fullStart)
	if startPos <= fullStart {
		return false
	}

	triviaLen := startPos - fullStart
	s.SetText(text[fullStart:startPos])

	numberOfNewLines := 0
	for s.TokenStart() < triviaLen {
		tokenKind := s.Scan()
		if tokenKind == ast.KindNewLineTrivia {
			numberOfNewLines++
			if numberOfNewLines >= 2 {
				return true
			}
		}
	}

	return false
}

func coalesceImportsWorker(
	importDecls []*ast.Statement,
	comparer func(a, b string) int,
	specifierComparer func(s1, s2 *ast.Node) int,
	sourceFile *ast.SourceFile,
	changeTracker *change.Tracker,
) []*ast.Statement {
	if len(importDecls) == 0 {
		return importDecls
	}

	importGroupsByAttributes := make(map[string][]*ast.Statement)
	var attributeKeys []string

	for _, importDecl := range importDecls {
		key := getImportAttributesKey(importDecl.AsImportDeclaration().Attributes)
		if _, exists := importGroupsByAttributes[key]; !exists {
			attributeKeys = append(attributeKeys, key)
		}
		importGroupsByAttributes[key] = append(importGroupsByAttributes[key], importDecl)
	}

	coalescedImports := make([]*ast.Statement, 0)

	for _, attributeKey := range attributeKeys {
		importGroupSameAttrs := importGroupsByAttributes[attributeKey]
		categorized := getCategorizedImports(importGroupSameAttrs)

		if categorized.importWithoutClause != nil {
			coalescedImports = append(coalescedImports, categorized.importWithoutClause)
		}

		factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})

		for i, group := range []importGroup{categorized.regularImports, categorized.typeOnlyImports} {
			if group.isEmpty() {
				continue
			}

			isTypeOnly := i == 1

			if !isTypeOnly && len(group.defaultImports) == 1 && len(group.namespaceImports) == 1 && len(group.namedImports) == 0 {
				defaultImport := group.defaultImports[0]
				namespaceImport := group.namespaceImports[0]

				defaultClause := defaultImport.AsImportDeclaration().ImportClause.AsImportClause()
				namespaceBindings := namespaceImport.AsImportDeclaration().ImportClause.AsImportClause().NamedBindings

				newClause := factory.UpdateImportClause(defaultClause, defaultClause.PhaseModifier, defaultClause.Name(), namespaceBindings)
				defaultDeclNode := defaultImport.AsImportDeclaration()
				newImportDecl := factory.UpdateImportDeclaration(
					defaultDeclNode,
					defaultDeclNode.Modifiers(),
					newClause,
					defaultDeclNode.ModuleSpecifier,
					defaultDeclNode.Attributes,
				)
				coalescedImports = append(coalescedImports, newImportDecl)
				continue
			}

			slices.SortFunc(group.namespaceImports, func(a, b *ast.Statement) int {
				n1 := a.AsImportDeclaration().ImportClause.AsImportClause().NamedBindings.AsNamespaceImport().Name()
				n2 := b.AsImportDeclaration().ImportClause.AsImportClause().NamedBindings.AsNamespaceImport().Name()
				return comparer(n1.Text(), n2.Text())
			})

			for _, nsImport := range group.namespaceImports {
				nsImportDecl := nsImport.AsImportDeclaration()
				clause := nsImportDecl.ImportClause.AsImportClause()
				newClause := factory.UpdateImportClause(clause, clause.PhaseModifier, nil, clause.NamedBindings)
				newImportDecl := factory.UpdateImportDeclaration(
					nsImportDecl,
					nsImportDecl.Modifiers(),
					newClause,
					nsImportDecl.ModuleSpecifier,
					nsImportDecl.Attributes,
				)
				coalescedImports = append(coalescedImports, newImportDecl)
			}

			var firstDefaultImport *ast.Statement
			var firstNamedImport *ast.Statement

			if len(group.defaultImports) > 0 {
				firstDefaultImport = group.defaultImports[0]
			}
			if len(group.namedImports) > 0 {
				firstNamedImport = group.namedImports[0]
			}

			importDecl := firstDefaultImport
			if importDecl == nil {
				importDecl = firstNamedImport
			}
			if importDecl == nil {
				continue
			}

			var newDefaultImport *ast.IdentifierNode
			var newImportSpecifiers []*ast.Node

			if len(group.defaultImports) == 1 {
				newDefaultImport = group.defaultImports[0].AsImportDeclaration().ImportClause.AsImportClause().Name()
			} else {
				for _, defaultImport := range group.defaultImports {
					defaultClause := defaultImport.AsImportDeclaration().ImportClause.AsImportClause()
					defaultName := defaultClause.Name()
					propertyName := factory.NewIdentifier("default")
					importSpec := factory.NewImportSpecifier(false, propertyName, defaultName)
					newImportSpecifiers = append(newImportSpecifiers, importSpec)
				}
			}

			newImportSpecifiers = append(newImportSpecifiers, getNewImportSpecifiers(group.namedImports, factory)...)
			slices.SortStableFunc(newImportSpecifiers, specifierComparer)

			var newNamedImports *ast.NamedImportBindings
			if len(newImportSpecifiers) == 0 {
				if newDefaultImport != nil {
					newNamedImports = nil
				} else {
					newNamedImports = factory.NewNamedImports(factory.NewNodeList(nil))
				}
			} else {
				sortedList := factory.NewNodeList(newImportSpecifiers)
				if firstNamedImport != nil {
					firstNamedBindings := firstNamedImport.AsImportDeclaration().ImportClause.AsImportClause().NamedBindings.AsNamedImports()
					originalElements := firstNamedBindings.Elements
					if originalElements.HasTrailingComma() {
						sortedList.Loc = originalElements.Loc
					}
					newNamedImports = factory.UpdateNamedImports(firstNamedBindings, sortedList).AsNode()
				} else {
					newNamedImports = factory.NewNamedImports(sortedList)
				}
			}

			if sourceFile != nil && newNamedImports != nil && firstNamedImport != nil {
				firstNamedBindings := firstNamedImport.AsImportDeclaration().ImportClause.AsImportClause().NamedBindings
				if !ast.NodeIsSynthesized(firstNamedBindings.AsNode()) && !printer.RangeIsOnSingleLine(firstNamedBindings.Loc, sourceFile) {
					changeTracker.SetEmitFlags(newNamedImports.AsNode(), printer.EFMultiLine)
				}
			}

			if isTypeOnly && newDefaultImport != nil && newNamedImports != nil {
				importDeclNode := importDecl.AsImportDeclaration()

				defaultClause := factory.NewImportClause(importDeclNode.ImportClause.AsImportClause().PhaseModifier, newDefaultImport, nil)
				defaultImportDecl := factory.UpdateImportDeclaration(
					importDeclNode,
					importDeclNode.Modifiers(),
					defaultClause,
					importDeclNode.ModuleSpecifier,
					importDeclNode.Attributes,
				)
				coalescedImports = append(coalescedImports, defaultImportDecl)

				namedDeclNode := firstNamedImport
				if namedDeclNode == nil {
					namedDeclNode = importDecl
				}
				namedImportDeclNode := namedDeclNode.AsImportDeclaration()
				namedClause := factory.NewImportClause(namedImportDeclNode.ImportClause.AsImportClause().PhaseModifier, nil, newNamedImports)
				namedImportDecl := factory.UpdateImportDeclaration(
					namedImportDeclNode,
					namedImportDeclNode.Modifiers(),
					namedClause,
					namedImportDeclNode.ModuleSpecifier,
					namedImportDeclNode.Attributes,
				)
				coalescedImports = append(coalescedImports, namedImportDecl)
			} else {
				importDeclNode := importDecl.AsImportDeclaration()
				clauseNode := importDeclNode.ImportClause.AsImportClause()
				newClause := factory.UpdateImportClause(clauseNode, clauseNode.PhaseModifier, newDefaultImport, newNamedImports)
				newImportDecl := factory.UpdateImportDeclaration(
					importDeclNode,
					importDeclNode.Modifiers(),
					newClause,
					importDeclNode.ModuleSpecifier,
					importDeclNode.Attributes,
				)
				coalescedImports = append(coalescedImports, newImportDecl)
			}
		}
	}
	return coalescedImports
}

type categorizedImports struct {
	importWithoutClause *ast.Statement
	typeOnlyImports     importGroup
	regularImports      importGroup
}

type importGroup struct {
	defaultImports   []*ast.Statement
	namespaceImports []*ast.Statement
	namedImports     []*ast.Statement
}

func (g importGroup) isEmpty() bool {
	return len(g.defaultImports) == 0 && len(g.namespaceImports) == 0 && len(g.namedImports) == 0
}

func getCategorizedImports(importDecls []*ast.Statement) categorizedImports {
	var importWithoutClause *ast.Statement
	var typeOnlyImports, regularImports importGroup

	for _, importDecl := range importDecls {
		if importDecl.AsImportDeclaration().ImportClause == nil {
			if importWithoutClause == nil {
				importWithoutClause = importDecl
			}
			continue
		}

		clause := importDecl.AsImportDeclaration().ImportClause.AsImportClause()
		group := &regularImports
		if clause.IsTypeOnly() {
			group = &typeOnlyImports
		}

		name := clause.Name()
		namedBindings := clause.NamedBindings

		if name != nil {
			group.defaultImports = append(group.defaultImports, importDecl)
		}

		if namedBindings != nil {
			switch namedBindings.Kind {
			case ast.KindNamespaceImport:
				group.namespaceImports = append(group.namespaceImports, importDecl)
			case ast.KindNamedImports:
				group.namedImports = append(group.namedImports, importDecl)
			}
		}
	}

	return categorizedImports{
		importWithoutClause: importWithoutClause,
		typeOnlyImports:     typeOnlyImports,
		regularImports:      regularImports,
	}
}

func getNewImportSpecifiers(namedImports []*ast.Statement, factory *ast.NodeFactory) []*ast.Node {
	var result []*ast.Node

	for _, namedImport := range namedImports {
		elements := tryGetNamedBindingElements(namedImport)
		if elements == nil {
			continue
		}

		for _, elem := range elements {
			spec := elem.AsImportSpecifier()

			if spec.PropertyName != nil && spec.Name() != nil {
				propertyText := spec.PropertyName.Text()
				nameText := spec.Name().Text()

				if propertyText == nameText {
					normalized := factory.UpdateImportSpecifier(spec, spec.IsTypeOnly, nil, spec.Name())
					result = append(result, normalized)
					continue
				}
			}

			result = append(result, elem)
		}
	}

	return result
}

func tryGetNamedBindingElements(namedImport *ast.Statement) []*ast.Statement {
	if namedImport.Kind != ast.KindImportDeclaration {
		return nil
	}

	importDecl := namedImport.AsImportDeclaration()
	if importDecl.ImportClause == nil {
		return nil
	}

	clause := importDecl.ImportClause.AsImportClause()
	namedBindings := clause.NamedBindings

	if namedBindings != nil && namedBindings.Kind == ast.KindNamedImports {
		namedImportsNode := namedBindings.AsNamedImports()
		return namedImportsNode.Elements.Nodes
	}

	return nil
}

func getTopLevelExportGroups(sourceFile *ast.SourceFile) [][]*ast.Statement {
	var topLevelExportGroups [][]*ast.Statement
	statements := sourceFile.Statements.Nodes
	statementsLen := len(statements)

	i := 0
	groupIndex := 0
	for i < statementsLen {
		if statements[i].Kind == ast.KindExportDeclaration {
			if groupIndex >= len(topLevelExportGroups) {
				topLevelExportGroups = append(topLevelExportGroups, []*ast.Statement{})
			}
			exportDecl := statements[i].AsExportDeclaration()
			if exportDecl.ModuleSpecifier != nil {
				topLevelExportGroups[groupIndex] = append(topLevelExportGroups[groupIndex], statements[i])
				i++
			} else {
				for i < statementsLen && statements[i].Kind == ast.KindExportDeclaration {
					topLevelExportGroups[groupIndex] = append(topLevelExportGroups[groupIndex], statements[i])
					i++
				}
				groupIndex++
			}
		} else {
			i++
			if groupIndex < len(topLevelExportGroups) && len(topLevelExportGroups[groupIndex]) > 0 {
				groupIndex++
			}
		}
	}

	var result [][]*ast.Statement
	for _, exportGroup := range topLevelExportGroups {
		subGroups := groupByNewlineContiguous(sourceFile, exportGroup)
		result = append(result, subGroups...)
	}

	return result
}

func organizeExportsWorker(
	oldExportDecls []*ast.Statement,
	comparer organizeImportsComparerSettings,
	sourceFile *ast.SourceFile,
	changeTracker *change.Tracker,
) {
	if len(oldExportDecls) == 0 {
		return
	}

	specifierComparerFunc := lsutil.GetNamedImportSpecifierComparer(
		&lsutil.UserPreferences{OrganizeImportsTypeOrder: comparer.typeOrder},
		comparer.namedImportComparer,
	)

	newExportDecls := coalesceExportsWorker(oldExportDecls, specifierComparerFunc, comparer.moduleSpecifierComparer, sourceFile, changeTracker)

	if len(oldExportDecls) > 0 {
		if len(newExportDecls) == 0 {
			changeTracker.DeleteNodeRange(
				sourceFile,
				oldExportDecls[0].AsNode(),
				oldExportDecls[len(oldExportDecls)-1].AsNode(),
				change.LeadingTriviaOptionExclude,
				change.TrailingTriviaOptionInclude,
			)
		} else {
			options := change.NodeOptions{
				LeadingTriviaOption:  change.LeadingTriviaOptionExclude,
				TrailingTriviaOption: change.TrailingTriviaOptionInclude,
				Suffix:               "\n",
			}

			newNodes := core.Map(newExportDecls, func(s *ast.Statement) *ast.Node { return s.AsNode() })
			changeTracker.ReplaceNodeWithNodes(sourceFile, oldExportDecls[0].AsNode(), newNodes, &options)

			if len(oldExportDecls) > 1 {
				for i := 1; i < len(oldExportDecls); i++ {
					changeTracker.Delete(sourceFile, oldExportDecls[i].AsNode())
				}
			}
		}
	}
}

func coalesceExportsWorker(
	exportGroup []*ast.Statement,
	specifierComparer func(s1, s2 *ast.Node) int,
	moduleSpecifierComparer func(a, b string) int,
	sourceFile *ast.SourceFile,
	changeTracker *change.Tracker,
) []*ast.Statement {
	if len(exportGroup) == 0 {
		return exportGroup
	}

	exportsByModuleSpecifier := make(map[string][]*ast.Statement)
	var moduleSpecifierOrder []string

	for _, exportDecl := range exportGroup {
		export := exportDecl.AsExportDeclaration()
		var moduleSpecifier string
		if export.ModuleSpecifier != nil {
			moduleSpecifier = export.ModuleSpecifier.Text()
		}
		if _, exists := exportsByModuleSpecifier[moduleSpecifier]; !exists {
			moduleSpecifierOrder = append(moduleSpecifierOrder, moduleSpecifier)
		}
		exportsByModuleSpecifier[moduleSpecifier] = append(exportsByModuleSpecifier[moduleSpecifier], exportDecl)
	}

	slices.SortStableFunc(moduleSpecifierOrder, func(a, b string) int {
		if a == "" && b != "" {
			return 1
		}
		if a != "" && b == "" {
			return -1
		}
		return moduleSpecifierComparer(a, b)
	})

	var coalescedExports []*ast.Statement
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})

	for _, moduleSpecifier := range moduleSpecifierOrder {
		group := exportsByModuleSpecifier[moduleSpecifier]

		categorized := getCategorizedExports(group)

		if categorized.exportWithoutClause != nil {
			coalescedExports = append(coalescedExports, categorized.exportWithoutClause)
		}

		for _, subGroup := range [][]*ast.Statement{categorized.namedExports, categorized.typeOnlyExports} {
			if len(subGroup) == 0 {
				continue
			}

			var newExportSpecifiers []*ast.Node
			for _, exportDecl := range subGroup {
				exportClause := exportDecl.AsExportDeclaration().ExportClause
				if exportClause != nil && exportClause.Kind == ast.KindNamedExports {
					namedExports := exportClause.AsNamedExports()
					newExportSpecifiers = append(newExportSpecifiers, namedExports.Elements.Nodes...)
				}
			}

			slices.SortStableFunc(newExportSpecifiers, specifierComparer)

			exportDecl := subGroup[0].AsExportDeclaration()

			var updatedExportClause *ast.NamedExportBindings
			if exportDecl.ExportClause != nil {
				if exportDecl.ExportClause.Kind == ast.KindNamedExports {
					namedExports := exportDecl.ExportClause.AsNamedExports()
					sortedList := factory.NewNodeList(newExportSpecifiers)
					updatedExportClause = factory.UpdateNamedExports(namedExports, sortedList)

					if sourceFile != nil && !ast.NodeIsSynthesized(namedExports.AsNode()) && !printer.RangeIsOnSingleLine(namedExports.Loc, sourceFile) {
						changeTracker.SetEmitFlags(updatedExportClause.AsNode(), printer.EFMultiLine)
					}
				} else {
					updatedExportClause = exportDecl.ExportClause
				}
			}

			newExportDecl := factory.UpdateExportDeclaration(
				exportDecl,
				exportDecl.Modifiers(),
				exportDecl.IsTypeOnly,
				updatedExportClause,
				exportDecl.ModuleSpecifier,
				exportDecl.Attributes,
			)
			coalescedExports = append(coalescedExports, newExportDecl)
		}
	}

	return coalescedExports
}

type categorizedExports struct {
	exportWithoutClause *ast.Statement
	namedExports        []*ast.Statement
	typeOnlyExports     []*ast.Statement
}

func getCategorizedExports(exportGroup []*ast.Statement) categorizedExports {
	var exportWithoutClause *ast.Statement
	var namedExports, typeOnlyExports []*ast.Statement

	for _, exportDecl := range exportGroup {
		export := exportDecl.AsExportDeclaration()
		if export.ExportClause == nil {
			if exportWithoutClause == nil {
				exportWithoutClause = exportDecl
			}
		} else if export.IsTypeOnly {
			typeOnlyExports = append(typeOnlyExports, exportDecl)
		} else {
			namedExports = append(namedExports, exportDecl)
		}
	}

	return categorizedExports{
		exportWithoutClause: exportWithoutClause,
		namedExports:        namedExports,
		typeOnlyExports:     typeOnlyExports,
	}
}
