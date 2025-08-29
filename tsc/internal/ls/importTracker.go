package ls

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
)

type ImpExpKind int32

const (
	ImpExpKindUnknown ImpExpKind = iota
	ImpExpKindImport
	ImpExpKindExport
)

type ImportExportSymbol struct {
	kind       ImpExpKind
	symbol     *ast.Symbol
	exportInfo *ExportInfo
}

type ExportInfo struct {
	exportingModuleSymbol *ast.Symbol
	exportKind            ExportKind
}

type LocationAndSymbol struct {
	importLocation *ast.Node
	importSymbol   *ast.Symbol
}

type ImportsResult struct {
	importSearches   []LocationAndSymbol
	singleReferences []*ast.Node
	indirectUsers    []*ast.SourceFile
}

type ImportTracker func(exportSymbol *ast.Symbol, exportInfo *ExportInfo, isForRename bool) *ImportsResult

// Creates the imports map and returns an ImportTracker that uses it. Call this lazily to avoid calling `getDirectImportsMap` unnecessarily.
func createImportTracker(sourceFiles []*ast.SourceFile, sourceFilesSet *collections.Set[string], checker *checker.Checker) ImportTracker {
	allDirectImports := getDirectImportsMap(sourceFiles, checker)
	return func(exportSymbol *ast.Symbol, exportInfo *ExportInfo, isForRename bool) *ImportsResult {
		directImports, indirectUsers := getImportersForExport(sourceFiles, sourceFilesSet, allDirectImports, exportInfo, checker)
		importSearches, singleReferences := getSearchesFromDirectImports(directImports, exportSymbol, exportInfo.exportKind, checker, isForRename)
		return &ImportsResult{importSearches, singleReferences, indirectUsers}
	}
}

// Returns a map from a module symbol to all import statements that directly reference the module
func getDirectImportsMap(sourceFiles []*ast.SourceFile, checker *checker.Checker) map[*ast.Symbol][]*ast.Node {
	result := make(map[*ast.Symbol][]*ast.Node)
	for _, sourceFile := range sourceFiles {
		// !!! cancellation
		forEachImport(sourceFile, func(importDecl *ast.Node, moduleSpecifier *ast.Node) {
			if moduleSymbol := checker.GetSymbolAtLocation(moduleSpecifier); moduleSymbol != nil {
				result[moduleSymbol] = append(result[moduleSymbol], importDecl)
			}
		})
	}
	return result
}

// Calls `action` for each import, re-export, or require() in a file
func forEachImport(sourceFile *ast.SourceFile, action func(importStatement *ast.Node, imported *ast.Node)) {
	if sourceFile.ExternalModuleIndicator != nil || len(sourceFile.Imports()) != 0 {
		for _, i := range sourceFile.Imports() {
			action(importFromModuleSpecifier(i), i)
		}
	} else {
		forEachPossibleImportOrExportStatement(sourceFile.AsNode(), func(node *ast.Node) bool {
			switch node.Kind {
			case ast.KindExportDeclaration, ast.KindImportDeclaration, ast.KindJSImportDeclaration:
				if specifier := node.ModuleSpecifier(); specifier != nil && ast.IsStringLiteral(specifier) {
					action(node, specifier)
				}
			case ast.KindImportEqualsDeclaration:
				if isExternalModuleImportEquals(node) {
					action(node, node.AsImportEqualsDeclaration().ModuleReference.Expression())
				}
			}
			return false
		})
	}
}

func forEachPossibleImportOrExportStatement(sourceFileLike *ast.Node, action func(statement *ast.Node) bool) bool {
	for _, statement := range getStatementsOfSourceFileLike(sourceFileLike) {
		if action(statement) || isAmbientModuleDeclaration(statement) && forEachPossibleImportOrExportStatement(statement, action) {
			return true
		}
	}
	return false
}

func getSourceFileLikeForImportDeclaration(node *ast.Node) *ast.Node {
	if ast.IsCallExpression(node) || ast.IsJSDocImportTag(node) {
		return ast.GetSourceFileOfNode(node).AsNode()
	}
	parent := node.Parent
	if ast.IsSourceFile(parent) {
		return parent
	}
	debug.Assert(ast.IsModuleBlock(parent) && isAmbientModuleDeclaration(parent.Parent))
	return parent.Parent
}

func isAmbientModuleDeclaration(node *ast.Node) bool {
	return ast.IsModuleDeclaration(node) && ast.IsStringLiteral(node.Name())
}

func getStatementsOfSourceFileLike(node *ast.Node) []*ast.Node {
	if ast.IsSourceFile(node) {
		return node.Statements()
	}
	if body := node.Body(); body != nil {
		return body.Statements()
	}
	return nil
}

func getImportersForExport(
	sourceFiles []*ast.SourceFile,
	sourceFilesSet *collections.Set[string],
	allDirectImports map[*ast.Symbol][]*ast.Node,
	exportInfo *ExportInfo,
	checker *checker.Checker,
) ([]*ast.Node, []*ast.SourceFile) {
	var directImports []*ast.Node
	var indirectUserDeclarations []*ast.Node
	markSeenDirectImport := nodeSeenTracker()
	markSeenIndirectUser := nodeSeenTracker()
	isAvailableThroughGlobal := exportInfo.exportingModuleSymbol.GlobalExports != nil

	getDirectImports := func(moduleSymbol *ast.Symbol) []*ast.Node {
		return allDirectImports[moduleSymbol]
	}

	// Adds a module and all of its transitive dependencies as possible indirect users
	var addIndirectUser func(*ast.Node, bool)
	addIndirectUser = func(sourceFileLike *ast.Node, addTransitiveDependencies bool) {
		debug.Assert(!isAvailableThroughGlobal)
		if !markSeenIndirectUser(sourceFileLike) {
			return
		}
		indirectUserDeclarations = append(indirectUserDeclarations, sourceFileLike)
		if !addTransitiveDependencies {
			return
		}
		moduleSymbol := checker.GetMergedSymbol(sourceFileLike.Symbol())
		if moduleSymbol == nil {
			return
		}
		debug.Assert(moduleSymbol.Flags&ast.SymbolFlagsModule != 0)
		for _, directImport := range getDirectImports(moduleSymbol) {
			if !ast.IsImportTypeNode(directImport) {
				addIndirectUser(getSourceFileLikeForImportDeclaration(directImport), true /*addTransitiveDependencies*/)
			}
		}
	}

	isExported := func(node *ast.Node, stopAtAmbientModule bool) bool {
		for node != nil && !(stopAtAmbientModule && isAmbientModuleDeclaration(node)) {
			if ast.HasSyntacticModifier(node, ast.ModifierFlagsExport) {
				return true
			}
			node = node.Parent
		}
		return false
	}

	handleImportCall := func(importCall *ast.Node) {
		top := ast.FindAncestor(importCall, isAmbientModuleDeclaration)
		if top == nil {
			top = ast.GetSourceFileOfNode(importCall).AsNode()
		}
		addIndirectUser(top, isExported(importCall, true /*stopAtAmbientModule*/))
	}

	handleNamespaceImport := func(importDeclaration *ast.Node, name *ast.Node, isReExport bool, alreadyAddedDirect bool) {
		if exportInfo.exportKind == ExportKindExportEquals {
			// This is a direct import, not import-as-namespace.
			if !alreadyAddedDirect {
				directImports = append(directImports, importDeclaration)
			}
		} else if !isAvailableThroughGlobal {
			sourceFileLike := getSourceFileLikeForImportDeclaration(importDeclaration)
			debug.Assert(ast.IsSourceFile(sourceFileLike) || ast.IsModuleDeclaration(sourceFileLike))
			addIndirectUser(sourceFileLike, isReExport || findNamespaceReExports(sourceFileLike, name, checker))
		}
	}

	var handleDirectImports func(*ast.Symbol)
	handleDirectImports = func(exportingModuleSymbol *ast.Symbol) {
		theseDirectImports := getDirectImports(exportingModuleSymbol)
		for _, direct := range theseDirectImports {
			if !markSeenDirectImport(direct) {
				continue
			}
			// !!! cancellation
			switch direct.Kind {
			case ast.KindCallExpression:
				if ast.IsImportCall(direct) {
					handleImportCall(direct)
				} else if !isAvailableThroughGlobal {
					parent := direct.Parent
					if exportInfo.exportKind == ExportKindExportEquals && ast.IsVariableDeclaration(parent) {
						name := parent.Name()
						if ast.IsIdentifier(name) {
							directImports = append(directImports, name)
						}
					}
				}
			case ast.KindIdentifier:
				// Nothing
			case ast.KindImportEqualsDeclaration:
				handleNamespaceImport(direct, direct.Name(), ast.HasSyntacticModifier(direct, ast.ModifierFlagsExport), false /*alreadyAddedDirect*/)
			case ast.KindImportDeclaration, ast.KindJSImportDeclaration, ast.KindJSDocImportTag:
				directImports = append(directImports, direct)
				if importClause := direct.ImportClause(); importClause != nil {
					if namedBindings := importClause.AsImportClause().NamedBindings; namedBindings != nil && ast.IsNamespaceImport(namedBindings) {
						handleNamespaceImport(direct, namedBindings.Name(), false /*isReExport*/, true /*alreadyAddedDirect*/)
						break
					}
				}
				if !isAvailableThroughGlobal && ast.IsDefaultImport(direct) {
					addIndirectUser(getSourceFileLikeForImportDeclaration(direct), false)
					// Add a check for indirect uses to handle synthetic default imports
				}
			case ast.KindExportDeclaration:
				exportClause := direct.AsExportDeclaration().ExportClause
				if exportClause == nil {
					// This is `export * from "foo"`, so imports of this module may import the export too.
					handleDirectImports(getContainingModuleSymbol(direct, checker))
				} else if ast.IsNamespaceExport(exportClause) {
					// `export * as foo from "foo"` add to indirect uses
					addIndirectUser(getSourceFileLikeForImportDeclaration(direct), true /*addTransitiveDependencies*/)
				} else {
					// This is `export { foo } from "foo"` and creates an alias symbol, so recursive search will get handle re-exports.
					directImports = append(directImports, direct)
				}
			case ast.KindImportType:
				// Only check for typeof import('xyz')
				if !isAvailableThroughGlobal && direct.AsImportTypeNode().IsTypeOf && direct.AsImportTypeNode().Qualifier == nil && isExported(direct, false) {
					addIndirectUser(ast.GetSourceFileOfNode(direct).AsNode(), true /*addTransitiveDependencies*/)
				}
				directImports = append(directImports, direct)
			default:
				debug.FailBadSyntaxKind(direct, "Unexpected import kind.")
			}
		}
	}

	getIndirectUsers := func() []*ast.SourceFile {
		if isAvailableThroughGlobal {
			// It has `export as namespace`, so anything could potentially use it.
			return sourceFiles
		}
		// Module augmentations may use this module's exports without importing it.
		for _, decl := range exportInfo.exportingModuleSymbol.Declarations {
			if ast.IsExternalModuleAugmentation(decl) && sourceFilesSet.Has(ast.GetSourceFileOfNode(decl).FileName()) {
				addIndirectUser(decl, false)
			}
		}
		// This may return duplicates (if there are multiple module declarations in a single source file, all importing the same thing as a namespace), but `State.markSearchedSymbol` will handle that.
		return core.Map(indirectUserDeclarations, ast.GetSourceFileOfNode)
	}

	handleDirectImports(exportInfo.exportingModuleSymbol)
	return directImports, getIndirectUsers()
}

func getContainingModuleSymbol(importer *ast.Node, checker *checker.Checker) *ast.Symbol {
	return checker.GetMergedSymbol(getSourceFileLikeForImportDeclaration(importer).Symbol())
}

// Returns 'true' is the namespace 'name' is re-exported from this module, and 'false' if it is only used locally
func findNamespaceReExports(sourceFileLike *ast.Node, name *ast.Node, checker *checker.Checker) bool {
	namespaceImportSymbol := checker.GetSymbolAtLocation(name)
	return forEachPossibleImportOrExportStatement(sourceFileLike, func(statement *ast.Node) bool {
		if !ast.IsExportDeclaration(statement) {
			return false
		}
		exportClause := statement.AsExportDeclaration().ExportClause
		moduleSpecifier := statement.AsExportDeclaration().ModuleSpecifier
		return moduleSpecifier == nil && exportClause != nil && ast.IsNamedExports(exportClause) && core.Some(exportClause.Elements(), func(element *ast.Node) bool {
			return checker.GetExportSpecifierLocalTargetSymbol(element) == namespaceImportSymbol
		})
	})
}

func getSearchesFromDirectImports(
	directImports []*ast.Node,
	exportSymbol *ast.Symbol,
	exportKind ExportKind,
	checker *checker.Checker,
	isForRename bool,
) ([]LocationAndSymbol, []*ast.Node) {
	var importSearches []LocationAndSymbol
	var singleReferences []*ast.Node

	addSearch := func(location *ast.Node, symbol *ast.Symbol) {
		importSearches = append(importSearches, LocationAndSymbol{location, symbol})
	}

	isNameMatch := func(name string) bool {
		// Use name of "default" even in `export =` case because we may have allowSyntheticDefaultImports
		return name == exportSymbol.Name || exportKind != ExportKindNamed && name == ast.InternalSymbolNameDefault
	}

	// `import x = require("./x")` or `import * as x from "./x"`.
	// An `export =` may be imported by this syntax, so it may be a direct import.
	// If it's not a direct import, it will be in `indirectUsers`, so we don't have to do anything here.
	handleNamespaceImportLike := func(importName *ast.Node) {
		// Don't rename an import that already has a different name than the export.
		if exportKind == ExportKindExportEquals && (!isForRename || isNameMatch(importName.Text())) {
			addSearch(importName, checker.GetSymbolAtLocation(importName))
		}
	}

	searchForNamedImport := func(namedBindings *ast.Node) {
		if namedBindings == nil {
			return
		}
		for _, element := range namedBindings.Elements() {
			name := element.Name()
			propertyName := element.PropertyName()
			if !isNameMatch(core.OrElse(propertyName, name).Text()) {
				continue
			}
			if propertyName != nil {
				// This is `import { foo as bar } from "./a"` or `export { foo as bar } from "./a"`. `foo` isn't a local in the file, so just add it as a single reference.
				singleReferences = append(singleReferences, propertyName)
				// If renaming `{ foo as bar }`, don't touch `bar`, just `foo`.
				// But do rename `foo` in ` { default as foo }` if that's the original export name.
				if !isForRename || name.Text() == exportSymbol.Name {
					// Search locally for `bar`.
					addSearch(name, checker.GetSymbolAtLocation(name))
				}
			} else {
				var localSymbol *ast.Symbol
				if ast.IsExportSpecifier(element) && element.PropertyName() != nil {
					localSymbol = checker.GetExportSpecifierLocalTargetSymbol(element)
				} else {
					localSymbol = checker.GetSymbolAtLocation(name)
				}
				addSearch(name, localSymbol)
			}
		}
	}

	handleImport := func(decl *ast.Node) {
		if ast.IsImportEqualsDeclaration(decl) {
			if isExternalModuleImportEquals(decl) {
				handleNamespaceImportLike(decl.Name())
			}
			return
		}
		if ast.IsIdentifier(decl) {
			handleNamespaceImportLike(decl)
			return
		}
		if ast.IsImportTypeNode(decl) {
			if qualifier := decl.AsImportTypeNode().Qualifier; qualifier != nil {
				firstIdentifier := ast.GetFirstIdentifier(qualifier)
				if firstIdentifier.Text() == ast.SymbolName(exportSymbol) {
					singleReferences = append(singleReferences, firstIdentifier)
				}
			} else if exportKind == ExportKindExportEquals {
				singleReferences = append(singleReferences, decl.AsImportTypeNode().Argument.AsLiteralTypeNode().Literal)
			}
			return
		}
		// Ignore if there's a grammar error
		if !ast.IsStringLiteral(decl.ModuleSpecifier()) {
			return
		}
		if ast.IsExportDeclaration(decl) {
			if exportClause := decl.AsExportDeclaration().ExportClause; exportClause != nil && ast.IsNamedExports(exportClause) {
				searchForNamedImport(exportClause)
			}
			return
		}
		if importClause := decl.ImportClause(); importClause != nil {
			if namedBindings := importClause.AsImportClause().NamedBindings; namedBindings != nil {
				switch namedBindings.Kind {
				case ast.KindNamespaceImport:
					handleNamespaceImportLike(namedBindings.Name())
				case ast.KindNamedImports:
					// 'default' might be accessed as a named import `{ default as foo }`.
					if exportKind == ExportKindNamed || exportKind == ExportKindDefault {
						searchForNamedImport(namedBindings)
					}
				}
			}
			// `export =` might be imported by a default import if `--allowSyntheticDefaultImports` is on, so this handles both ExportKind.Default and ExportKind.ExportEquals.
			// If a default import has the same name as the default export, allow to rename it.
			// Given `import f` and `export default function f`, we will rename both, but for `import g` we will rename just that.
			if name := importClause.Name(); name != nil && (exportKind == ExportKindDefault || exportKind == ExportKindExportEquals) && (!isForRename || name.Text() == symbolNameNoDefault(exportSymbol)) {
				defaultImportAlias := checker.GetSymbolAtLocation(name)
				addSearch(name, defaultImportAlias)
			}
		}
	}
	for _, decl := range directImports {
		handleImport(decl)
	}
	return importSearches, singleReferences
}

func getImportOrExportSymbol(node *ast.Node, symbol *ast.Symbol, checker *checker.Checker, comingFromExport bool) *ImportExportSymbol {
	exportInfo := func(symbol *ast.Symbol, kind ExportKind) *ImportExportSymbol {
		if exportInfo := getExportInfo(symbol, kind, checker); exportInfo != nil {
			return &ImportExportSymbol{
				kind:       ImpExpKindExport,
				symbol:     symbol,
				exportInfo: exportInfo,
			}
		}
		return nil
	}

	getExport := func() *ImportExportSymbol {
		getExportAssignmentExport := func(ex *ast.Node) *ImportExportSymbol {
			// Get the symbol for the `export =` node; its parent is the module it's the export of.
			if ex.Symbol().Parent == nil {
				return nil
			}
			exportKind := core.IfElse(ex.AsExportAssignment().IsExportEquals, ExportKindExportEquals, ExportKindDefault)
			return &ImportExportSymbol{
				kind:   ImpExpKindExport,
				symbol: symbol,
				exportInfo: &ExportInfo{
					exportingModuleSymbol: ex.Symbol().Parent,
					exportKind:            exportKind,
				},
			}
		}

		// Not meant for use with export specifiers or export assignment.
		getExportKindForDeclaration := func(node *ast.Node) ExportKind {
			if ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault) {
				return ExportKindDefault
			}
			return ExportKindNamed
		}

		getSpecialPropertyExport := func(node *ast.Node, useLhsSymbol bool) *ImportExportSymbol {
			var kind ExportKind
			switch ast.GetAssignmentDeclarationKind(node.AsBinaryExpression()) {
			case ast.JSDeclarationKindExportsProperty:
				kind = ExportKindNamed
			case ast.JSDeclarationKindModuleExports:
				kind = ExportKindExportEquals
			default:
				return nil
			}
			sym := symbol
			if useLhsSymbol {
				sym = checker.GetSymbolAtLocation(ast.GetElementOrPropertyAccessName(node.AsBinaryExpression().Left))
			}
			if sym == nil {
				return nil
			}
			return exportInfo(sym, kind)
		}

		parent := node.Parent
		grandparent := parent.Parent
		if symbol.ExportSymbol != nil {
			if ast.IsPropertyAccessExpression(parent) {
				// When accessing an export of a JS module, there's no alias. The symbol will still be flagged as an export even though we're at the use.
				// So check that we are at the declaration.
				if ast.IsBinaryExpression(grandparent) && slices.Contains(symbol.Declarations, parent) {
					return getSpecialPropertyExport(grandparent, false /*useLhsSymbol*/)
				}
				return nil
			}
			return exportInfo(symbol.ExportSymbol, getExportKindForDeclaration(parent))
		} else {
			exportNode := getExportNode(parent, node)
			switch {
			case exportNode != nil && ast.HasSyntacticModifier(exportNode, ast.ModifierFlagsExport):
				if ast.IsImportEqualsDeclaration(exportNode) && exportNode.AsImportEqualsDeclaration().ModuleReference == node {
					// We're at `Y` in `export import X = Y`. This is not the exported symbol, the left-hand-side is. So treat this as an import statement.
					if comingFromExport {
						return nil
					}
					lhsSymbol := checker.GetSymbolAtLocation(exportNode.Name())
					return &ImportExportSymbol{
						kind:   ImpExpKindImport,
						symbol: lhsSymbol,
					}
				}
				return exportInfo(symbol, getExportKindForDeclaration(exportNode))
			case ast.IsNamespaceExport(parent):
				return exportInfo(symbol, ExportKindNamed)
			case ast.IsExportAssignment(parent):
				return getExportAssignmentExport(parent)
			case ast.IsExportAssignment(grandparent):
				return getExportAssignmentExport(grandparent)
			case ast.IsBinaryExpression(parent):
				return getSpecialPropertyExport(parent, true /*useLhsSymbol*/)
			case ast.IsBinaryExpression(grandparent):
				return getSpecialPropertyExport(grandparent, true /*useLhsSymbol*/)
			case ast.IsJSDocTypedefTag(parent) || ast.IsJSDocCallbackTag(parent):
				return exportInfo(symbol, ExportKindNamed)
			}
		}
		return nil
	}

	getImport := func() *ImportExportSymbol {
		if !isNodeImport(node) {
			return nil
		}
		// A symbol being imported is always an alias. So get what that aliases to find the local symbol.
		importedSymbol := checker.GetImmediateAliasedSymbol(symbol)
		if importedSymbol == nil {
			return nil
		}
		// Search on the local symbol in the exporting module, not the exported symbol.
		importedSymbol = skipExportSpecifierSymbol(importedSymbol, checker)
		// Similarly, skip past the symbol for 'export ='
		if importedSymbol.Name == "export=" {
			importedSymbol = getExportEqualsLocalSymbol(importedSymbol, checker)
			if importedSymbol == nil {
				return nil
			}
		}
		// If the import has a different name than the export, do not continue searching.
		// If `importedName` is undefined, do continue searching as the export is anonymous.
		// (All imports returned from this function will be ignored anyway if we are in rename and this is a not a named export.)
		importedName := symbolNameNoDefault(importedSymbol)
		if importedName == "" || importedName == ast.InternalSymbolNameDefault || importedName == symbol.Name {
			return &ImportExportSymbol{
				kind:   ImpExpKindImport,
				symbol: importedSymbol,
			}
		}
		return nil
	}

	result := getExport()
	if result == nil && !comingFromExport {
		result = getImport()
	}
	return result
}

func getExportInfo(exportSymbol *ast.Symbol, exportKind ExportKind, c *checker.Checker) *ExportInfo {
	// Parent can be nil if an `export` is not at the top-level (which is a compile error).
	if exportSymbol.Parent != nil {
		exportingModuleSymbol := c.GetMergedSymbol(exportSymbol.Parent)
		// `export` may appear in a namespace. In that case, just rely on global search.
		if checker.IsExternalModuleSymbol(exportingModuleSymbol) {
			return &ExportInfo{
				exportingModuleSymbol: exportingModuleSymbol,
				exportKind:            exportKind,
			}
		}
	}
	return nil
}

// If a reference is a class expression, the exported node would be its parent.
// If a reference is a variable declaration, the exported node would be the variable statement.
func getExportNode(parent *ast.Node, node *ast.Node) *ast.Node {
	var declaration *ast.Node
	switch {
	case ast.IsVariableDeclaration(parent):
		declaration = parent
	case ast.IsBindingElement(parent):
		declaration = ast.WalkUpBindingElementsAndPatterns(parent)
	}
	if declaration != nil {
		if parent.Name() == node && !ast.IsCatchClause(declaration.Parent) && ast.IsVariableStatement(declaration.Parent.Parent) {
			return declaration.Parent.Parent
		}
		return nil
	}
	return parent
}

func isNodeImport(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindImportEqualsDeclaration:
		return parent.Name() == node && isExternalModuleImportEquals(parent)
	case ast.KindImportSpecifier:
		// For a rename import `{ foo as bar }`, don't search for the imported symbol. Just find local uses of `bar`.
		return parent.PropertyName() == nil
	case ast.KindImportClause, ast.KindNamespaceImport:
		debug.Assert(parent.Name() == node)
		return true
	case ast.KindBindingElement:
		return ast.IsInJSFile(node) && ast.IsVariableDeclarationInitializedToRequire(parent.Parent.Parent)
	}
	return false
}

func isExternalModuleImportEquals(node *ast.Node) bool {
	moduleReference := node.AsImportEqualsDeclaration().ModuleReference
	return ast.IsExternalModuleReference(moduleReference) && moduleReference.Expression().Kind == ast.KindStringLiteral
}

// If at an export specifier, go to the symbol it refers to. */
func skipExportSpecifierSymbol(symbol *ast.Symbol, checker *checker.Checker) *ast.Symbol {
	// For `export { foo } from './bar", there's nothing to skip, because it does not create a new alias. But `export { foo } does.
	for _, declaration := range symbol.Declarations {
		switch {
		case ast.IsExportSpecifier(declaration) && declaration.PropertyName() == nil && declaration.Parent.Parent.ModuleSpecifier() == nil:
			return core.OrElse(checker.GetExportSpecifierLocalTargetSymbol(declaration), symbol)
		case ast.IsPropertyAccessExpression(declaration) && ast.IsModuleExportsAccessExpression(declaration.Expression()) && !ast.IsPrivateIdentifier(declaration.Name()):
			// Export of form 'module.exports.propName = expr';
			return checker.GetSymbolAtLocation(declaration)
		case ast.IsShorthandPropertyAssignment(declaration) && ast.IsBinaryExpression(declaration.Parent.Parent) && ast.GetAssignmentDeclarationKind(declaration.Parent.Parent.AsBinaryExpression()) == ast.JSDeclarationKindModuleExports:
			return checker.GetExportSpecifierLocalTargetSymbol(declaration.Name())
		}
	}
	return symbol
}

func getExportEqualsLocalSymbol(importedSymbol *ast.Symbol, checker *checker.Checker) *ast.Symbol {
	if importedSymbol.Flags&ast.SymbolFlagsAlias != 0 {
		return checker.GetImmediateAliasedSymbol(importedSymbol)
	}
	decl := debug.CheckDefined(importedSymbol.ValueDeclaration)
	switch {
	case ast.IsExportAssignment(decl):
		return decl.Expression().Symbol()
	case ast.IsBinaryExpression(decl):
		return decl.AsBinaryExpression().Right.Symbol()
	case ast.IsSourceFile(decl):
		return decl.Symbol()
	}
	return nil
}

func symbolNameNoDefault(symbol *ast.Symbol) string {
	if symbol.Name != ast.InternalSymbolNameDefault {
		return symbol.Name
	}
	for _, decl := range symbol.Declarations {
		name := ast.GetNameOfDeclaration(decl)
		if name != nil && ast.IsIdentifier(name) {
			return name.Text()
		}
	}
	return ""
}
