package autoimport

import (
	"context"
	"fmt"
	"maps"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/locale"

	// "github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
)

type ImportAdder interface {
	HasFixes() bool
	AddImportFromExportedSymbol(symbol *ast.Symbol, isValidTypeOnlyUseSite bool)
	Edits() []*lsproto.TextEdit
}

// addToExistingState tracks modifications to an existing import clause or binding pattern
type addToExistingState struct {
	importClauseOrBindingPattern *ast.ImportClauseOrBindingPattern
	defaultImport                *newImportBinding
	namedImports                 map[string]*newImportBinding
}

// importsCollection tracks new imports to be created for a given module specifier
type importsCollection struct {
	defaultImport       *newImportBinding
	namedImports        map[string]*newImportBinding
	namespaceLikeImport *newImportBinding
	useRequire          bool
}

func newImportsKey(moduleSpecifier string, topLevelTypeOnly bool) string {
	if topLevelTypeOnly {
		return "1|" + moduleSpecifier
	}
	return "0|" + moduleSpecifier
}

type importAdder struct {
	// Context
	ctx           context.Context
	checker       *checker.Checker
	view          *View
	formatOptions *lsutil.FormatCodeSettings
	converters    *lsconv.Converters
	preferences   *lsutil.UserPreferences

	// State
	addToNamespace []*Fix                                                    // Namespace fixes don't conflict, so just build a list
	importType     []*Fix                                                    // JSDoc type import fixes
	addToExisting  map[*ast.ImportClauseOrBindingPattern]*addToExistingState // importClauseOrBindingPattern -> default or named bindings
	newImports     map[string]*importsCollection                             // module specifier + type only -> imports
	// !!! removeExisting, verbatimImports?
}

func NewImportAdder(
	ctx context.Context,
	program *compiler.Program,
	checker *checker.Checker,
	file *ast.SourceFile,
	view *View,
	formatOptions *lsutil.FormatCodeSettings,
	converters *lsconv.Converters,
	preferences *lsutil.UserPreferences,
) ImportAdder {
	return &importAdder{
		ctx:            ctx,
		checker:        checker,
		view:           view,
		formatOptions:  formatOptions,
		converters:     converters,
		preferences:    preferences,
		addToNamespace: nil,
		importType:     nil,
		addToExisting:  make(map[*ast.Node]*addToExistingState),
		newImports:     make(map[string]*importsCollection),
	}
}

func (adder *importAdder) HasFixes() bool {
	return len(adder.addToNamespace) > 0 ||
		len(adder.importType) > 0 ||
		len(adder.addToExisting) > 0 ||
		len(adder.newImports) > 0
}

// !!! referenceImport
func (adder *importAdder) AddImportFromExportedSymbol(exportedSymbol *ast.Symbol, isValidTypeOnlyUseSite bool) {
	symbol := adder.checker.GetMergedSymbol(adder.checker.SkipAlias(exportedSymbol))
	exportInfos := adder.getAllExportsForSymbol(symbol)
	if len(exportInfos) == 0 {
		// If no exportInfo is found, this means export could not be resolved when we have filtered for autoImportFileExcludePatterns,
		//     so we should not generate an import.
		// debug.Assert(len(adder.ls.UserPreferences().AutoImportFileExcludePatterns) > 0)
		return
	}
	fix := adder.getImportFixForSymbol(adder.view, adder.view.importingFile, exportInfos, isValidTypeOnlyUseSite)
	if fix != nil {
		// !!! referenceImport -> propertyName
		adder.addImport(fix)
	}
}

func (adder *importAdder) Edits() []*lsproto.TextEdit {
	// !!! organize imports?
	tracker := change.NewTracker(adder.ctx, adder.view.program.Options(), adder.formatOptions, adder.converters)
	quotePreference := lsutil.GetQuotePreference(adder.view.importingFile, adder.preferences)
	for _, fix := range adder.addToNamespace {
		addNamespaceQualifier(fix, tracker, adder.view.importingFile, locale.Default)
	}
	for _, fix := range adder.importType {
		addImportType(fix, adder.view.importingFile, adder.preferences, tracker, locale.Default)
	}
	for clauseOrPattern, entry := range adder.addToExisting {
		addToExistingImport(
			tracker,
			adder.view.importingFile,
			clauseOrPattern,
			entry.defaultImport,
			slices.Collect(maps.Values(entry.namedImports)),
			adder.preferences,
		)
	}

	var newDeclarations []*ast.AnyImportOrRequireStatement
	for key, newImport := range adder.newImports {
		moduleSpecifier := key[2:] // From `${0 | 1}|${moduleSpecifier}` format
		var declarations []*ast.AnyImportOrRequireStatement
		if newImport.useRequire {
			declarations = getNewRequires(
				tracker,
				moduleSpecifier,
				quotePreference,
				newImport.defaultImport,
				slices.Collect(maps.Values(newImport.namedImports)),
				newImport.namespaceLikeImport,
				adder.view.program.Options(),
			)
		} else {
			declarations = getNewImports(
				tracker,
				moduleSpecifier,
				quotePreference,
				newImport.defaultImport,
				slices.Collect(maps.Values(newImport.namedImports)),
				newImport.namespaceLikeImport,
				adder.view.program.Options(),
				adder.preferences,
			)
		}
		newDeclarations = append(newDeclarations, declarations...)
	}

	if len(newDeclarations) > 0 {
		insertImports(tracker, adder.view.importingFile, newDeclarations, true /*blankLineBetween*/, adder.preferences)
	}

	return tracker.GetChanges()[adder.view.importingFile.FileName()]
}

// addImport adds an import fix to the appropriate category based on its kind.
// This batches imports so that multiple imports from the same module can be combined.
func (adder *importAdder) addImport(fix *Fix) {
	symbolName := fix.Name
	compilerOptions := adder.view.program.Options()

	switch fix.Kind {
	case lsproto.AutoImportFixKindUseNamespace:
		adder.addToNamespace = append(adder.addToNamespace, fix)
	case lsproto.AutoImportFixKindJsdocTypeImport:
		adder.importType = append(adder.importType, fix)
	case lsproto.AutoImportFixKindAddToExisting:
		existingFix := getAddToExistingImportFix(adder.view.importingFile, fix)
		entry := adder.addToExisting[existingFix.importClauseOrBindingPattern]
		if entry == nil {
			entry = &addToExistingState{
				importClauseOrBindingPattern: existingFix.importClauseOrBindingPattern,
				namedImports:                 make(map[string]*newImportBinding),
			}
			adder.addToExisting[existingFix.importClauseOrBindingPattern] = entry
		}

		if fix.ImportKind == lsproto.ImportKindNamed {
			prevImport := entry.namedImports[symbolName]
			var prevTypeOnly lsproto.AddAsTypeOnly
			if prevImport != nil {
				prevTypeOnly = prevImport.addAsTypeOnly
			}
			entry.namedImports[symbolName] = &newImportBinding{
				kind:          lsproto.ImportKindNamed,
				name:          symbolName,
				addAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),
				propertyName:  existingFix.namedImport.propertyName,
			}
		} else {
			// Default import
			debug.Assert(
				entry.defaultImport == nil || entry.defaultImport.name == symbolName,
				"(Add to Existing) Default import should be missing or match symbolName",
			)
			var prevTypeOnly lsproto.AddAsTypeOnly
			if entry.defaultImport != nil {
				prevTypeOnly = entry.defaultImport.addAsTypeOnly
			}
			entry.defaultImport = &newImportBinding{
				kind:          lsproto.ImportKindDefault,
				name:          symbolName,
				addAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),
			}
		}

	case lsproto.AutoImportFixKindAddNew:
		entry := adder.getNewImportEntry(fix.ModuleSpecifier, fix.ImportKind, fix.UseRequire, fix.AddAsTypeOnly)
		debug.Assert(
			entry.useRequire == fix.UseRequire,
			"(Add new) Tried to add an `import` and a `require` for the same module",
		)

		switch fix.ImportKind {
		case lsproto.ImportKindDefault:
			debug.Assert(
				entry.defaultImport == nil || entry.defaultImport.name == symbolName,
				"(Add new) Default import should be missing or match symbolName",
			)
			var prevTypeOnly lsproto.AddAsTypeOnly
			if entry.defaultImport != nil {
				prevTypeOnly = entry.defaultImport.addAsTypeOnly
			}
			entry.defaultImport = &newImportBinding{
				kind:          lsproto.ImportKindDefault,
				name:          symbolName,
				addAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),
			}

		case lsproto.ImportKindNamed:
			if entry.namedImports == nil {
				entry.namedImports = make(map[string]*newImportBinding)
			}
			prevImport := entry.namedImports[symbolName]
			var prevTypeOnly lsproto.AddAsTypeOnly
			if prevImport != nil {
				prevTypeOnly = prevImport.addAsTypeOnly
			}
			entry.namedImports[symbolName] = &newImportBinding{
				kind:          lsproto.ImportKindNamed,
				name:          symbolName,
				addAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),
				// !!! propertyName
			}

		case lsproto.ImportKindCommonJS:
			if compilerOptions.VerbatimModuleSyntax == core.TSTrue {
				if entry.namedImports == nil {
					entry.namedImports = make(map[string]*newImportBinding)
				}
				prevImport := entry.namedImports[symbolName]
				var prevTypeOnly lsproto.AddAsTypeOnly
				if prevImport != nil {
					prevTypeOnly = prevImport.addAsTypeOnly
				}
				entry.namedImports[symbolName] = &newImportBinding{
					kind:          lsproto.ImportKindCommonJS,
					name:          symbolName,
					addAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),
					// !!! propertyName
				}
			} else {
				debug.Assert(
					entry.namespaceLikeImport == nil || entry.namespaceLikeImport.name == symbolName,
					"Namespacelike import should be missing or match symbolName",
				)
				entry.namespaceLikeImport = &newImportBinding{
					kind:          lsproto.ImportKindCommonJS,
					name:          symbolName,
					addAsTypeOnly: fix.AddAsTypeOnly,
				}
			}

		case lsproto.ImportKindNamespace:
			debug.Assert(
				entry.namespaceLikeImport == nil || entry.namespaceLikeImport.name == symbolName,
				"Namespacelike import should be missing or match symbolName",
			)
			entry.namespaceLikeImport = &newImportBinding{
				kind:          lsproto.ImportKindNamespace,
				name:          symbolName,
				addAsTypeOnly: fix.AddAsTypeOnly,
			}
		}

	case lsproto.AutoImportFixKindPromoteTypeOnly:
		// Excluding from fix-all
	default:
		debug.Fail(fmt.Sprintf("Unexpected fix kind: %v", fix.Kind))
	}
}

// `NotAllowed` overrides `Required` because one addition of a new import might be required to be type-only
// because of `--importsNotUsedAsValues=error`, but if a second addition of the same import is `NotAllowed`
// to be type-only, the reason the first one was `Required` - the unused runtime dependency - is now moot.
// Alternatively, if one addition is `Required` because it has no value meaning under `--preserveValueImports`
// and `--isolatedModules`, it should be impossible for another addition to be `NotAllowed` since that would
// mean a type is being referenced in a value location.
func reduceAddAsTypeOnlyValues(prevValue, newValue lsproto.AddAsTypeOnly) lsproto.AddAsTypeOnly {
	if newValue > prevValue {
		return newValue
	}
	return prevValue
}

func (adder *importAdder) getNewImportEntry(moduleSpecifier string, importKind lsproto.ImportKind, useRequire bool, addAsTypeOnly lsproto.AddAsTypeOnly) *importsCollection {
	// A default import that requires type-only makes the whole import type-only.
	// (We could add `default` as a named import, but that style seems undesirable.)
	// Under `--preserveValueImports` and `--importsNotUsedAsValues=error`, if a
	// module default-exports a type but named-exports some values (weird), you would
	// have to use a type-only default import and non-type-only named imports. These
	// require two separate import declarations, so we build this into the map key.
	typeOnlyKey := newImportsKey(moduleSpecifier, true /*topLevelTypeOnly*/)
	nonTypeOnlyKey := newImportsKey(moduleSpecifier, false /*topLevelTypeOnly*/)
	typeOnlyEntry := adder.newImports[typeOnlyKey]
	nonTypeOnlyEntry := adder.newImports[nonTypeOnlyKey]
	newEntry := &importsCollection{
		useRequire: useRequire,
	}

	if importKind == lsproto.ImportKindDefault && addAsTypeOnly == lsproto.AddAsTypeOnlyRequired {
		if typeOnlyEntry != nil {
			return typeOnlyEntry
		}
		adder.newImports[typeOnlyKey] = newEntry
		return newEntry
	}

	if addAsTypeOnly == lsproto.AddAsTypeOnlyAllowed && (typeOnlyEntry != nil || nonTypeOnlyEntry != nil) {
		if typeOnlyEntry != nil {
			return typeOnlyEntry
		}
		return nonTypeOnlyEntry
	}

	if nonTypeOnlyEntry != nil {
		return nonTypeOnlyEntry
	}

	adder.newImports[nonTypeOnlyKey] = newEntry
	return newEntry
}

func (adder *importAdder) getAllExportsForSymbol(
	symbol *ast.Symbol,
) []*Export {
	if export := SymbolToExport(symbol, adder.checker); export != nil {
		return adder.view.SearchByExportID(export.ExportID)
	}
	return nil
}

func TypeToAutoImportableTypeNode(
	c *checker.Checker,
	importAdder ImportAdder,
	t *checker.Type,
	contextNode *ast.Node, // !!! flags
) *ast.TypeNode {
	idToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)
	typeNode := c.TypeToTypeNode(t, contextNode, nodebuilder.FlagsNone, idToSymbol)
	if typeNode == nil {
		return nil
	}
	return typeNodeToAutoImportableTypeNode(typeNode, importAdder, idToSymbol)
}

func typeNodeToAutoImportableTypeNode(
	typeNode *ast.TypeNode,
	importAdder ImportAdder,
	idToSymbol map[*ast.IdentifierNode]*ast.Symbol,
) *ast.TypeNode {
	referenceTypeNode, importableSymbols := tryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol)
	if referenceTypeNode != nil {
		if importAdder != nil {
			importSymbols(importAdder, importableSymbols)
		}
		typeNode = referenceTypeNode
	}

	// !!! handle type node reuse: nodes needs to be fresh here but also preserve symbols
	return typeNode
}

func importSymbols(importAdder ImportAdder, symbols []*ast.Symbol) {
	for _, symbol := range symbols {
		importAdder.AddImportFromExportedSymbol(symbol, true /*isValidTypeOnlyUseSite*/)
	}
}

// Given a type node containing 'import("./a").SomeType<import("./b").OtherType<...>>',
// returns an equivalent type reference node with any nested ImportTypeNodes also replaced
// with type references, and a list of symbols that must be imported to use the type reference.
func tryGetAutoImportableReferenceFromTypeNode(importTypeNode *ast.TypeNode, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) (*ast.TypeNode, []*ast.Symbol) {
	var symbols []*ast.Symbol
	var visitor *ast.NodeVisitor
	factory := ast.NewNodeFactory(ast.NodeFactoryHooks{})
	visit := func(node *ast.Node) *ast.Node {
		if ast.IsLiteralImportTypeNode(node) && node.AsImportTypeNode().Qualifier != nil {
			importTypeNode := node.AsImportTypeNode()
			// Symbol for the left-most thing after the dot
			firstIdentifier := ast.GetFirstIdentifier(importTypeNode.Qualifier)
			symbol := idToSymbol[firstIdentifier]
			if symbol == nil {
				// if symbol is missing then this doesn't come from a synthesized import type node
				// it has to be an import type node authored by the user and thus it has to be valid
				// it can't refer to reserved internal symbol names and such
				return node.VisitEachChild(visitor)
			}
			name := getNameForExportedSymbol(symbol, false /*preferCapitalized*/)
			var qualifier *ast.EntityName
			if name != firstIdentifier.Text() {
				qualifier = replaceFirstIdentifierOfEntityName(factory, importTypeNode.Qualifier, factory.NewIdentifier(name))
			} else {
				qualifier = importTypeNode.Qualifier
			}
			symbols = append(symbols, symbol)
			typeArguments := visitor.VisitNodes(importTypeNode.TypeArguments)
			return factory.NewTypeReferenceNode(qualifier, typeArguments)
		}
		return visitor.VisitEachChild(node)
	}
	visitor = ast.NewNodeVisitor(visit, factory, ast.NodeVisitorHooks{})

	typeNode := visitor.VisitNode(importTypeNode)
	debug.Assert(typeNode == nil || ast.IsTypeNode(typeNode), "expected a type node")
	return typeNode, symbols
}

// If a type checker and multiple files are available, consider using `forEachNameOfDefaultExport`
// instead, which searches for names of re-exported defaults/namespaces in target files.
func getNameForExportedSymbol(symbol *ast.Symbol, preferCapitalized bool) string {
	if symbol.Name == ast.InternalSymbolNameExportEquals || symbol.Name == ast.InternalSymbolNameDefault {
		// Names for default exports:
		// - export default foo => foo
		// - export { foo as default } => foo
		// - export default 0 => filename converted to camelCase
		name := getDefaultLikeExportNameFromDeclaration(symbol)
		if name != "" {
			return name
		}
		debug.AssertIsDefined(symbol.Parent, "Expected exported symbol to have module symbol as parent")
		return lsutil.ModuleSymbolToValidIdentifier(symbol.Parent, preferCapitalized)
	}
	return symbol.Name
}

func replaceFirstIdentifierOfEntityName(factory *ast.NodeFactory, name *ast.EntityName, newIdentifier *ast.IdentifierNode) *ast.EntityName {
	if name.Kind == ast.KindIdentifier {
		return newIdentifier
	}
	return factory.NewQualifiedName(
		replaceFirstIdentifierOfEntityName(factory, name.AsQualifiedName().Left, newIdentifier),
		name.AsQualifiedName().Right,
	)
}

func (adder *importAdder) getImportFixForSymbol(view *View, file *ast.SourceFile, exports []*Export, isValidTypeOnlyUseSite bool) *Fix {
	fixes := core.FlatMap(exports, func(export *Export) []*Fix {
		return view.GetFixes(adder.ctx, export, false /*forJSX*/, isValidTypeOnlyUseSite, nil /*usagePosition*/)
	})
	slices.SortFunc(fixes, func(a, b *Fix) int {
		return view.CompareFixesForRanking(a, b)
	})
	if len(fixes) > 0 {
		return fixes[0]
	}
	return nil
}
