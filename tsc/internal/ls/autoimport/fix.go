package autoimport

import (
	"cmp"
	"context"
	"fmt"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/ls/organizeimports"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type newImportBinding struct {
	kind          lsproto.ImportKind
	propertyName  string
	name          string
	addAsTypeOnly lsproto.AddAsTypeOnly
}

type Fix struct {
	*lsproto.AutoImportFix

	ModuleSpecifierKind      modulespecifiers.ResultKind
	IsReExport               bool
	ModuleFileName           string
	TypeOnlyAliasDeclaration *ast.Declaration
}

type addToExistingImportFix struct {
	importClauseOrBindingPattern *ast.ImportClauseOrBindingPattern
	// One of `defaultImport` or `namedImports` will be present
	defaultImport *newImportBinding
	namedImport   *newImportBinding
}

func (f *Fix) Edits(
	ctx context.Context,
	file *ast.SourceFile,
	compilerOptions *core.CompilerOptions,
	formatOptions *lsutil.FormatCodeSettings,
	converters *lsconv.Converters,
	preferences *lsutil.UserPreferences,
) ([]*lsproto.TextEdit, string) {
	locale := locale.FromContext(ctx)
	tracker := change.NewTracker(ctx, compilerOptions, formatOptions, converters)
	switch f.Kind {
	case lsproto.AutoImportFixKindUseNamespace:
		description := addNamespaceQualifier(f, tracker, file, locale)
		return tracker.GetChanges()[file.FileName()], description
	case lsproto.AutoImportFixKindAddToExisting:
		if len(file.Imports()) <= int(f.ImportIndex) {
			panic("import index out of range")
		}
		existingFix := getAddToExistingImportFix(file, f)
		addToExistingImport(tracker, file, existingFix.importClauseOrBindingPattern, existingFix.defaultImport, core.SingleElementSlice(existingFix.namedImport), preferences)
		return tracker.GetChanges()[file.FileName()], diagnostics.Update_import_from_0.Localize(locale, f.ModuleSpecifier)
	case lsproto.AutoImportFixKindAddNew:
		var declarations []*ast.Statement
		defaultImport := core.IfElse(f.ImportKind == lsproto.ImportKindDefault, &newImportBinding{name: f.Name, addAsTypeOnly: f.AddAsTypeOnly}, nil)
		namedImports := core.IfElse(f.ImportKind == lsproto.ImportKindNamed, []*newImportBinding{{name: f.Name, addAsTypeOnly: f.AddAsTypeOnly}}, nil)
		var namespaceLikeImport *newImportBinding
		// qualification := f.qualification()
		if f.ImportKind == lsproto.ImportKindNamespace || f.ImportKind == lsproto.ImportKindCommonJS {
			namespaceLikeImport = &newImportBinding{kind: f.ImportKind, name: f.Name}
			// if qualification != nil && qualification.namespacePref != "" {
			// 	namespaceLikeImport.name = qualification.namespacePref
			// }
		}

		quotePreference := lsutil.GetQuotePreference(file, preferences)
		if f.UseRequire {
			declarations = getNewRequires(tracker, f.ModuleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions)
		} else {
			declarations = getNewImports(tracker, f.ModuleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions, preferences)
		}

		insertImports(
			tracker,
			file,
			declarations,
			/*blankLineBetween*/ true,
			preferences,
		)
		// if qualification != nil {
		// 	addNamespaceQualifier(tracker, file, qualification)
		// }
		return tracker.GetChanges()[file.FileName()], diagnostics.Add_import_from_0.Localize(locale, f.ModuleSpecifier)
	case lsproto.AutoImportFixKindPromoteTypeOnly:
		promotedDeclaration := promoteFromTypeOnly(tracker, f.TypeOnlyAliasDeclaration, compilerOptions, file, preferences)
		if promotedDeclaration.Kind == ast.KindImportSpecifier {
			moduleSpec := getModuleSpecifierText(promotedDeclaration.Parent.Parent)
			return tracker.GetChanges()[file.FileName()], diagnostics.Remove_type_from_import_of_0_from_1.Localize(locale, f.Name, moduleSpec)
		}
		moduleSpec := getModuleSpecifierText(promotedDeclaration)
		return tracker.GetChanges()[file.FileName()], diagnostics.Remove_type_from_import_declaration_from_0.Localize(locale, moduleSpec)
	case lsproto.AutoImportFixKindJsdocTypeImport:
		description := addImportType(f, file, preferences, tracker, locale)
		return tracker.GetChanges()[file.FileName()], description
	default:
		panic("unimplemented fix edit")
	}
}

func addImportType(f *Fix, file *ast.SourceFile, preferences *lsutil.UserPreferences, tracker *change.Tracker, locale locale.Locale) string {
	if f.UsagePosition == nil {
		panic("UsagePosition must be set for JSDoc type import fix")
	}
	quotePreference := lsutil.GetQuotePreference(file, preferences)
	quoteChar := "\""
	if quotePreference == lsutil.QuotePreferenceSingle {
		quoteChar = "'"
	}
	importTypePrefix := fmt.Sprintf("import(%s%s%s).", quoteChar, f.ModuleSpecifier, quoteChar)
	tracker.InsertText(file, *f.UsagePosition, importTypePrefix)
	return diagnostics.Change_0_to_1.Localize(locale, f.Name, importTypePrefix+f.Name)
}

func addNamespaceQualifier(f *Fix, tracker *change.Tracker, file *ast.SourceFile, locale locale.Locale) string {
	if f.UsagePosition == nil || f.NamespacePrefix == "" {
		panic("namespace fix requires usage position and prefix")
	}
	qualified := fmt.Sprintf("%s.%s", f.NamespacePrefix, f.Name)
	tracker.InsertText(file, *f.UsagePosition, f.NamespacePrefix+".")
	return diagnostics.Change_0_to_1.Localize(locale, f.Name, qualified)
}

func getAddToExistingImportFix(file *ast.SourceFile, fix *Fix) *addToExistingImportFix {
	if fix.Kind != lsproto.AutoImportFixKindAddToExisting {
		panic("expected add to existing import fix")
	}
	moduleSpecifier := file.Imports()[fix.ImportIndex]
	importNode := ast.TryGetImportFromModuleSpecifier(moduleSpecifier)
	if importNode == nil {
		panic("expected import declaration")
	}
	var importClauseOrBindingPattern *ast.Node
	switch importNode.Kind {
	case ast.KindImportDeclaration:
		importClauseOrBindingPattern = importNode.ImportClause()
		if importClauseOrBindingPattern == nil {
			panic("expected import clause")
		}
	case ast.KindCallExpression:
		if !ast.IsVariableDeclarationInitializedToRequire(importNode.Parent) {
			panic("expected require call expression to be in variable declaration")
		}
		importClauseOrBindingPattern = importNode.Parent.Name()
		if importClauseOrBindingPattern == nil || !ast.IsObjectBindingPattern(importClauseOrBindingPattern) {
			panic("expected object binding pattern in variable declaration")
		}
	default:
		panic("expected import declaration or require call expression")
	}

	defaultImport := core.IfElse(fix.ImportKind == lsproto.ImportKindDefault, &newImportBinding{kind: lsproto.ImportKindDefault, name: fix.Name, addAsTypeOnly: fix.AddAsTypeOnly}, nil)
	namedImports := core.IfElse(fix.ImportKind == lsproto.ImportKindNamed, &newImportBinding{kind: lsproto.ImportKindNamed, name: fix.Name, addAsTypeOnly: fix.AddAsTypeOnly}, nil)
	return &addToExistingImportFix{
		importClauseOrBindingPattern: importClauseOrBindingPattern,
		defaultImport:                defaultImport,
		namedImport:                  namedImports,
	}
}

func addToExistingImport(
	ct *change.Tracker,
	file *ast.SourceFile,
	importClauseOrBindingPattern *ast.Node,
	defaultImport *newImportBinding,
	namedImports []*newImportBinding,
	preferences *lsutil.UserPreferences,
) {
	switch importClauseOrBindingPattern.Kind {
	case ast.KindObjectBindingPattern:
		bindingPattern := importClauseOrBindingPattern.AsBindingPattern()
		if defaultImport != nil {
			addElementToBindingPattern(ct, file, bindingPattern, defaultImport.name, "default")
		}
		for _, namedImport := range namedImports {
			addElementToBindingPattern(ct, file, bindingPattern, namedImport.name, "")
		}
		return
	case ast.KindImportClause:
		importClause := importClauseOrBindingPattern.AsImportClause()

		// promoteFromTypeOnly = true if we need to promote the entire original clause from type only
		promoteFromTypeOnly := importClause.IsTypeOnly() && core.Some(append(namedImports, defaultImport), func(i *newImportBinding) bool {
			if i == nil {
				return false
			}
			return i.addAsTypeOnly == lsproto.AddAsTypeOnlyNotAllowed
		})

		var existingSpecifiers []*ast.Node
		if importClause.NamedBindings != nil && importClause.NamedBindings.Kind == ast.KindNamedImports {
			existingSpecifiers = importClause.NamedBindings.Elements()
		}

		if defaultImport != nil {
			debug.Assert(importClause.Name() == nil, "Cannot add a default import to an import clause that already has one")
			ct.InsertNodeAt(file, core.TextPos(astnav.GetStartOfNode(importClause.AsNode(), file, false)), ct.NodeFactory.NewIdentifier(defaultImport.name), change.NodeOptions{Suffix: ", "})
		}

		if len(namedImports) > 0 {
			specifierComparer, isSorted := organizeimports.GetNamedImportSpecifierComparerWithDetection(importClause.Parent, file, preferences)
			newSpecifiers := core.Map(namedImports, func(namedImport *newImportBinding) *ast.Node {
				var identifier *ast.Node
				if namedImport.propertyName != "" {
					identifier = ct.NodeFactory.NewIdentifier(namedImport.propertyName).AsIdentifier().AsNode()
				}
				return ct.NodeFactory.NewImportSpecifier(
					shouldUseTypeOnly(namedImport.addAsTypeOnly, preferences),
					identifier,
					ct.NodeFactory.NewIdentifier(namedImport.name),
				)
			})
			slices.SortFunc(newSpecifiers, specifierComparer)
			if len(existingSpecifiers) > 0 && isSorted != core.TSFalse {
				// The sorting preference computed earlier may or may not have validated that these particular
				// import specifiers are sorted. If they aren't, `getImportSpecifierInsertionIndex` will return
				// nonsense. So if there are existing specifiers, even if we know the sorting preference, we
				// need to ensure that the existing specifiers are sorted according to the preference in order
				// to do a sorted insertion.

				// If we're promoting the clause from type-only, we need to transform the existing imports
				// before attempting to insert the new named imports (for comparison purposes only)
				specsToCompareAgainst := existingSpecifiers
				if promoteFromTypeOnly && len(existingSpecifiers) > 0 {
					specsToCompareAgainst = core.Map(existingSpecifiers, func(e *ast.Node) *ast.Node {
						spec := e.AsImportSpecifier()
						var propertyName *ast.Node
						if spec.PropertyName != nil {
							propertyName = spec.PropertyName
						}
						syntheticSpec := ct.NodeFactory.NewImportSpecifier(
							true, // isTypeOnly
							propertyName,
							spec.Name(),
						)
						return syntheticSpec
					})
				}

				for _, spec := range newSpecifiers {
					insertionIndex := organizeimports.GetImportSpecifierInsertionIndex(specsToCompareAgainst, spec, specifierComparer)
					ct.InsertImportSpecifierAtIndex(file, spec, importClause.NamedBindings, insertionIndex)
				}
			} else if len(existingSpecifiers) > 0 && isSorted.IsTrue() {
				// Existing specifiers are sorted, so insert each new specifier at the correct position
				for _, spec := range newSpecifiers {
					insertionIndex := organizeimports.GetImportSpecifierInsertionIndex(existingSpecifiers, spec, specifierComparer)
					if insertionIndex >= len(existingSpecifiers) {
						// Insert at the end
						ct.InsertNodeInListAfter(file, existingSpecifiers[len(existingSpecifiers)-1], spec.AsNode(), existingSpecifiers)
					} else {
						// Insert before the element at insertionIndex
						ct.InsertNodeInListAfter(file, existingSpecifiers[insertionIndex], spec.AsNode(), existingSpecifiers)
					}
				}
			} else if len(existingSpecifiers) > 0 {
				// Existing specifiers may not be sorted, append to the end
				for _, spec := range newSpecifiers {
					ct.InsertNodeInListAfter(file, existingSpecifiers[len(existingSpecifiers)-1], spec.AsNode(), existingSpecifiers)
				}
			} else {
				if len(newSpecifiers) > 0 {
					namedImports := ct.NodeFactory.NewNamedImports(ct.NodeFactory.NewNodeList(newSpecifiers))
					if importClause.NamedBindings != nil {
						ct.ReplaceNode(file, importClause.NamedBindings, namedImports, nil)
					} else {
						if importClause.Name() == nil {
							panic("Import clause must have either named imports or a default import")
						}
						ct.InsertNodeAfter(file, importClause.Name(), namedImports)
					}
				}
			}
		}

		if promoteFromTypeOnly {
			// Delete the 'type' keyword from the import clause
			typeKeyword := getTypeKeywordOfTypeOnlyImport(importClause, file)
			ct.Delete(file, typeKeyword)

			// Add 'type' modifier to existing specifiers (not newly added ones)
			// We preserve the type-onlyness of existing specifiers regardless of whether
			// it would make a difference in emit (user preference).
			if len(existingSpecifiers) > 0 {
				for _, specifier := range existingSpecifiers {
					if !specifier.AsImportSpecifier().IsTypeOnly {
						ct.InsertModifierBefore(file, ast.KindTypeKeyword, specifier)
					}
				}
			}
		}
	default:
		panic("Unsupported clause kind: " + importClauseOrBindingPattern.KindString() + " for addToExistingImport")
	}
}

func getTypeKeywordOfTypeOnlyImport(importClause *ast.ImportClause, sourceFile *ast.SourceFile) *ast.Node {
	debug.Assert(importClause.IsTypeOnly(), "import clause must be type-only")
	// The first child of a type-only import clause is the 'type' keyword
	// import type { foo } from './bar'
	//        ^^^^
	typeKeyword := astnav.FindChildOfKind(importClause.AsNode(), ast.KindTypeKeyword, sourceFile)
	debug.Assert(typeKeyword != nil, "type-only import clause should have a type keyword")
	return typeKeyword
}

func addElementToBindingPattern(
	ct *change.Tracker,
	file *ast.SourceFile,
	bindingPattern *ast.BindingPattern,
	name string,
	propertyName string,
) {
	element := ct.NodeFactory.NewBindingElement(nil, nil, ct.NodeFactory.NewIdentifier(name), core.IfElse(propertyName == "", nil, ct.NodeFactory.NewIdentifier(propertyName)))
	if len(bindingPattern.Elements.Nodes) > 0 {
		ct.InsertNodeInListAfter(file, bindingPattern.Elements.Nodes[len(bindingPattern.Elements.Nodes)-1], element, bindingPattern.Elements.Nodes)
	} else {
		ct.ReplaceNode(file, bindingPattern.AsNode(), ct.NodeFactory.NewBindingPattern(ast.KindObjectBindingPattern, ct.AsNodeFactory().NewNodeList([]*ast.Node{element})), nil)
	}
}

func getNewImports(
	ct *change.Tracker,
	moduleSpecifier string,
	quotePreference lsutil.QuotePreference,
	defaultImport *newImportBinding,
	namedImports []*newImportBinding,
	namespaceLikeImport *newImportBinding, // { lsproto.importKind: lsproto.ImportKind.CommonJS | lsproto.ImportKind.Namespace; }
	compilerOptions *core.CompilerOptions,
	preferences *lsutil.UserPreferences,
) []*ast.AnyImportSyntax {
	tokenFlags := core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone)
	moduleSpecifierStringLiteral := ct.NodeFactory.NewStringLiteral(moduleSpecifier, tokenFlags)
	var statements []*ast.AnyImportSyntax
	if defaultImport != nil || len(namedImports) > 0 {
		// `verbatimModuleSyntax` should prefer top-level `import type` -
		// even though it's not an error, it would add unnecessary runtime emit.
		topLevelTypeOnly := (defaultImport == nil || needsTypeOnly(defaultImport.addAsTypeOnly)) &&
			core.Every(namedImports, func(i *newImportBinding) bool { return needsTypeOnly(i.addAsTypeOnly) }) ||
			(compilerOptions.VerbatimModuleSyntax.IsTrue() || preferences.PreferTypeOnlyAutoImports.IsTrue()) &&
				(defaultImport == nil || defaultImport.addAsTypeOnly != lsproto.AddAsTypeOnlyNotAllowed) &&
				!core.Some(namedImports, func(i *newImportBinding) bool { return i.addAsTypeOnly == lsproto.AddAsTypeOnlyNotAllowed })

		var defaultImportNode *ast.Node
		if defaultImport != nil {
			defaultImportNode = ct.NodeFactory.NewIdentifier(defaultImport.name)
		}

		statements = append(statements, makeImport(ct, defaultImportNode, core.Map(namedImports, func(namedImport *newImportBinding) *ast.Node {
			var namedImportPropertyName *ast.Node
			if namedImport.propertyName != "" {
				namedImportPropertyName = ct.NodeFactory.NewIdentifier(namedImport.propertyName)
			}
			return ct.NodeFactory.NewImportSpecifier(
				!topLevelTypeOnly && shouldUseTypeOnly(namedImport.addAsTypeOnly, preferences),
				namedImportPropertyName,
				ct.NodeFactory.NewIdentifier(namedImport.name),
			)
		}), moduleSpecifierStringLiteral, topLevelTypeOnly))
	}

	if namespaceLikeImport != nil {
		var declaration *ast.Statement
		if namespaceLikeImport.kind == lsproto.ImportKindCommonJS {
			declaration = ct.NodeFactory.NewImportEqualsDeclaration(
				/*modifiers*/ nil,
				shouldUseTypeOnly(namespaceLikeImport.addAsTypeOnly, preferences),
				ct.NodeFactory.NewIdentifier(namespaceLikeImport.name),
				ct.NodeFactory.NewExternalModuleReference(moduleSpecifierStringLiteral),
			)
		} else {
			declaration = ct.NodeFactory.NewImportDeclaration(
				/*modifiers*/ nil,
				ct.NodeFactory.NewImportClause(
					/*phaseModifier*/ core.IfElse(shouldUseTypeOnly(namespaceLikeImport.addAsTypeOnly, preferences), ast.KindTypeKeyword, ast.KindUnknown),
					/*name*/ nil,
					ct.NodeFactory.NewNamespaceImport(ct.NodeFactory.NewIdentifier(namespaceLikeImport.name)),
				),
				moduleSpecifierStringLiteral,
				/*attributes*/ nil,
			)
		}
		statements = append(statements, declaration)
	}
	if len(statements) == 0 {
		panic("No statements to insert for new imports")
	}
	return statements
}

func getNewRequires(
	changeTracker *change.Tracker,
	moduleSpecifier string,
	quotePreference lsutil.QuotePreference,
	defaultImport *newImportBinding,
	namedImports []*newImportBinding,
	namespaceLikeImport *newImportBinding,
	compilerOptions *core.CompilerOptions,
) []*ast.Statement {
	quotedModuleSpecifier := changeTracker.NodeFactory.NewStringLiteral(
		moduleSpecifier,
		core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone),
	)
	var statements []*ast.Statement

	// const { default: foo, bar, etc } = require('./mod');
	if defaultImport != nil || len(namedImports) > 0 {
		bindingElements := []*ast.Node{}
		for _, namedImport := range namedImports {
			var propertyName *ast.Node
			if namedImport.propertyName != "" {
				propertyName = changeTracker.NodeFactory.NewIdentifier(namedImport.propertyName)
			}
			bindingElements = append(bindingElements, changeTracker.NodeFactory.NewBindingElement(
				/*dotDotDotToken*/ nil,
				propertyName,
				changeTracker.NodeFactory.NewIdentifier(namedImport.name),
				/*initializer*/ nil,
			))
		}
		if defaultImport != nil {
			bindingElements = append([]*ast.Node{
				changeTracker.NodeFactory.NewBindingElement(
					/*dotDotDotToken*/ nil,
					changeTracker.NodeFactory.NewIdentifier("default"),
					changeTracker.NodeFactory.NewIdentifier(defaultImport.name),
					/*initializer*/ nil,
				),
			}, bindingElements...)
		}
		declaration := createConstEqualsRequireDeclaration(
			changeTracker,
			changeTracker.NodeFactory.NewBindingPattern(
				ast.KindObjectBindingPattern,
				changeTracker.NodeFactory.NewNodeList(bindingElements),
			),
			quotedModuleSpecifier,
		)
		statements = append(statements, declaration)
	}

	// const foo = require('./mod');
	if namespaceLikeImport != nil {
		declaration := createConstEqualsRequireDeclaration(
			changeTracker,
			changeTracker.NodeFactory.NewIdentifier(namespaceLikeImport.name),
			quotedModuleSpecifier,
		)
		statements = append(statements, declaration)
	}

	debug.AssertIsDefined(statements)
	return statements
}

func createConstEqualsRequireDeclaration(changeTracker *change.Tracker, name *ast.Node, quotedModuleSpecifier *ast.Node) *ast.Statement {
	return changeTracker.NodeFactory.NewVariableStatement(
		/*modifiers*/ nil,
		changeTracker.NodeFactory.NewVariableDeclarationList(
			ast.NodeFlagsConst,
			changeTracker.NodeFactory.NewNodeList([]*ast.Node{
				changeTracker.NodeFactory.NewVariableDeclaration(
					name,
					/*exclamationToken*/ nil,
					/*type*/ nil,
					changeTracker.NodeFactory.NewCallExpression(
						changeTracker.NodeFactory.NewIdentifier("require"),
						/*questionDotToken*/ nil,
						/*typeArguments*/ nil,
						changeTracker.NodeFactory.NewNodeList([]*ast.Node{quotedModuleSpecifier}),
						ast.NodeFlagsNone,
					),
				),
			}),
		),
	)
}

func insertImports(ct *change.Tracker, sourceFile *ast.SourceFile, imports []*ast.AnyImportOrRequireStatement, blankLineBetween bool, preferences *lsutil.UserPreferences) {
	var existingImportStatements []*ast.Statement

	if imports[0].Kind == ast.KindVariableStatement {
		existingImportStatements = core.Filter(sourceFile.Statements.Nodes, ast.IsRequireVariableStatement)
	} else {
		existingImportStatements = core.Filter(sourceFile.Statements.Nodes, ast.IsAnyImportSyntax)
	}
	comparer, isSorted := organizeimports.GetOrganizeImportsStringComparerWithDetection(existingImportStatements, preferences)
	sortedNewImports := slices.Clone(imports)
	slices.SortFunc(sortedNewImports, func(a, b *ast.Statement) int {
		return organizeimports.CompareImportsOrRequireStatements(a, b, comparer)
	})

	if len(existingImportStatements) > 0 && isSorted {
		// Existing imports are sorted, insert each new import at the correct position
		for _, newImport := range sortedNewImports {
			insertionIndex := organizeimports.GetImportDeclarationInsertIndex(existingImportStatements, newImport, func(a, b *ast.Statement) stringutil.Comparison {
				return organizeimports.CompareImportsOrRequireStatements(a, b, comparer)
			})
			if insertionIndex == 0 {
				// If the first import is top-of-file, insert after the leading comment which is likely the header
				ct.InsertNodeAt(sourceFile, core.TextPos(astnav.GetStartOfNode(existingImportStatements[0], sourceFile, false)), newImport.AsNode(), change.NodeOptions{})
			} else {
				prevImport := existingImportStatements[insertionIndex-1]
				ct.InsertNodeAfter(sourceFile, prevImport.AsNode(), newImport.AsNode())
			}
		}
	} else if len(existingImportStatements) > 0 {
		ct.InsertNodesAfter(sourceFile, existingImportStatements[len(existingImportStatements)-1], sortedNewImports)
	} else {
		ct.InsertAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween)
	}
}

func makeImport(ct *change.Tracker, defaultImport *ast.IdentifierNode, namedImports []*ast.Node, moduleSpecifier *ast.Expression, isTypeOnly bool) *ast.Statement {
	var newNamedImports *ast.Node
	if len(namedImports) > 0 {
		newNamedImports = ct.NodeFactory.NewNamedImports(ct.NodeFactory.NewNodeList(namedImports))
	}
	var importClause *ast.Node
	if defaultImport != nil || newNamedImports != nil {
		importClause = ct.NodeFactory.NewImportClause(core.IfElse(isTypeOnly, ast.KindTypeKeyword, ast.KindUnknown), defaultImport, newNamedImports)
	}
	return ct.NodeFactory.NewImportDeclaration( /*modifiers*/ nil, importClause, moduleSpecifier, nil /*attributes*/)
}

func (v *View) GetFixes(ctx context.Context, export *Export, forJSX bool, isValidTypeOnlyUseSite bool, usagePosition *lsproto.Position) []*Fix {
	var fixes []*Fix
	if namespaceFix := v.tryUseExistingNamespaceImport(ctx, export, usagePosition); namespaceFix != nil {
		fixes = append(fixes, namespaceFix)
	}

	if fix := v.tryAddToExistingImport(ctx, export, isValidTypeOnlyUseSite); fix != nil {
		return append(fixes, fix)
	}

	// !!! getNewImportFromExistingSpecifier - even worth it?

	moduleSpecifier, moduleSpecifierKind := v.GetModuleSpecifier(export, v.preferences)
	if moduleSpecifier == "" {
		if len(fixes) > 0 {
			return fixes
		}
		return nil
	}

	// Check if we need a JSDoc import type fix (for JS files with type-only imports)
	isJs := tspath.HasJSFileExtension(v.importingFile.FileName())
	importedSymbolHasValueMeaning := export.Flags&ast.SymbolFlagsValue != 0 || export.IsUnresolvedAlias()
	if !importedSymbolHasValueMeaning && isJs && usagePosition != nil {
		// For pure types in JS files, use JSDoc import type syntax
		return []*Fix{
			{
				AutoImportFix: &lsproto.AutoImportFix{
					Kind:            lsproto.AutoImportFixKindJsdocTypeImport,
					ModuleSpecifier: moduleSpecifier,
					Name:            export.Name(),
					UsagePosition:   usagePosition,
				},
				ModuleSpecifierKind: moduleSpecifierKind,
				IsReExport:          export.Target.ModuleID != export.ModuleID,
				ModuleFileName:      export.ModuleFileName,
			},
		}
	}

	importKind := getImportKind(v.importingFile, export, v.program)
	addAsTypeOnly := getAddAsTypeOnly(isValidTypeOnlyUseSite, export, v.program.Options())

	name := export.Name()
	startsWithUpper := unicode.IsUpper(rune(name[0]))
	if forJSX && !startsWithUpper {
		if export.IsRenameable() {
			name = fmt.Sprintf("%c%s", unicode.ToUpper(rune(name[0])), name[1:])
		} else {
			return nil
		}
	}

	return append(fixes, &Fix{
		AutoImportFix: &lsproto.AutoImportFix{
			Kind:            lsproto.AutoImportFixKindAddNew,
			ImportKind:      importKind,
			ModuleSpecifier: moduleSpecifier,
			Name:            name,
			UseRequire:      v.shouldUseRequire(),
			AddAsTypeOnly:   addAsTypeOnly,
		},
		ModuleSpecifierKind: moduleSpecifierKind,
		IsReExport:          export.Target.ModuleID != export.ModuleID,
		ModuleFileName:      export.ModuleFileName,
	})
}

// getAddAsTypeOnly determines if an import should be type-only based on usage context
func getAddAsTypeOnly(isValidTypeOnlyUseSite bool, export *Export, compilerOptions *core.CompilerOptions) lsproto.AddAsTypeOnly {
	if !isValidTypeOnlyUseSite {
		// Can't use a type-only import if the usage is an emitting position
		return lsproto.AddAsTypeOnlyNotAllowed
	}
	if compilerOptions.VerbatimModuleSyntax.IsTrue() && (export.IsTypeOnly || export.Flags&ast.SymbolFlagsValue == 0) ||
		export.IsTypeOnly && export.Flags&ast.SymbolFlagsValue != 0 {
		// A type-only import is required for this symbol if under verbatimModuleSyntax and it's purely a type
		return lsproto.AddAsTypeOnlyRequired
	}
	return lsproto.AddAsTypeOnlyAllowed
}

func (v *View) tryUseExistingNamespaceImport(ctx context.Context, export *Export, usagePosition *lsproto.Position) *Fix {
	if usagePosition == nil {
		return nil
	}

	if getImportKind(v.importingFile, export, v.program) != lsproto.ImportKindNamed {
		return nil
	}

	existingImports := v.getExistingImports(ctx)
	matchingDeclarations := existingImports.Get(export.ModuleID)
	for _, existingImport := range matchingDeclarations {
		namespacePrefix := getNamespaceLikeImportText(existingImport.node)
		if namespacePrefix == "" || existingImport.moduleSpecifier == "" {
			continue
		}
		return &Fix{
			AutoImportFix: &lsproto.AutoImportFix{
				Kind:            lsproto.AutoImportFixKindUseNamespace,
				Name:            export.Name(),
				ModuleSpecifier: existingImport.moduleSpecifier,
				ImportKind:      lsproto.ImportKindNamespace,
				AddAsTypeOnly:   lsproto.AddAsTypeOnlyAllowed,
				ImportIndex:     int32(existingImport.index),
				UsagePosition:   usagePosition,
				NamespacePrefix: namespacePrefix,
			},
		}
	}

	return nil
}

func getNamespaceLikeImportText(declaration *ast.Node) string {
	switch declaration.Kind {
	case ast.KindVariableDeclaration:
		name := declaration.Name()
		if name != nil && name.Kind == ast.KindIdentifier {
			return name.Text()
		}
		return ""
	case ast.KindImportEqualsDeclaration:
		return declaration.Name().Text()
	case ast.KindJSDocImportTag, ast.KindImportDeclaration:
		importClause := declaration.ImportClause()
		if importClause != nil && importClause.AsImportClause().NamedBindings != nil && importClause.AsImportClause().NamedBindings.Kind == ast.KindNamespaceImport {
			return importClause.AsImportClause().NamedBindings.Name().Text()
		}
		return ""
	default:
		return ""
	}
}

func (v *View) tryAddToExistingImport(
	ctx context.Context,
	export *Export,
	isValidTypeOnlyUseSite bool,
) *Fix {
	existingImports := v.getExistingImports(ctx)
	matchingDeclarations := existingImports.Get(export.ModuleID)
	if len(matchingDeclarations) == 0 {
		return nil
	}

	// Can't use an es6 import for a type in JS.
	if ast.IsSourceFileJS(v.importingFile) && export.Flags&ast.SymbolFlagsValue == 0 && !core.Every(matchingDeclarations, func(i existingImport) bool {
		return ast.IsJSDocImportTag(i.node)
	}) {
		return nil
	}

	importKind := getImportKind(v.importingFile, export, v.program)
	if importKind == lsproto.ImportKindCommonJS || importKind == lsproto.ImportKindNamespace {
		return nil
	}

	addAsTypeOnly := getAddAsTypeOnly(isValidTypeOnlyUseSite, export, v.program.Options())

	for _, existingImport := range matchingDeclarations {
		if existingImport.node.Kind == ast.KindImportEqualsDeclaration {
			continue
		}

		if existingImport.node.Kind == ast.KindVariableDeclaration {
			if (importKind == lsproto.ImportKindNamed || importKind == lsproto.ImportKindDefault) && existingImport.node.Name().Kind == ast.KindObjectBindingPattern {
				return &Fix{
					AutoImportFix: &lsproto.AutoImportFix{
						Kind:            lsproto.AutoImportFixKindAddToExisting,
						Name:            export.Name(),
						ImportKind:      importKind,
						ImportIndex:     int32(existingImport.index),
						ModuleSpecifier: existingImport.moduleSpecifier,
						AddAsTypeOnly:   addAsTypeOnly,
					},
				}
			}
			continue
		}

		importClauseNode := existingImport.node.ImportClause()
		if importClauseNode == nil || !ast.IsStringLiteralLike(existingImport.node.ModuleSpecifier()) {
			// Side-effect import (no import clause) - can't add to it
			continue
		}
		importClause := importClauseNode.AsImportClause()

		namedBindings := importClause.NamedBindings
		// A type-only import may not have both a default and named imports, so the only way a name can
		// be added to an existing type-only import is adding a named import to existing named bindings.
		if importClause.IsTypeOnly() && !(importKind == lsproto.ImportKindNamed && namedBindings != nil) {
			continue
		}

		if importKind == lsproto.ImportKindDefault && importClause.Name() != nil {
			// Cannot add a default import to a declaration that already has one
			continue
		}

		// Cannot add a named import to a declaration that has a namespace import
		if importKind == lsproto.ImportKindNamed && namedBindings != nil && namedBindings.Kind == ast.KindNamespaceImport {
			continue
		}

		return &Fix{
			AutoImportFix: &lsproto.AutoImportFix{
				Kind:            lsproto.AutoImportFixKindAddToExisting,
				Name:            export.Name(),
				ImportKind:      importKind,
				ImportIndex:     int32(existingImport.index),
				ModuleSpecifier: existingImport.moduleSpecifier,
				AddAsTypeOnly:   addAsTypeOnly,
			},
		}
	}

	return nil
}

func getImportKind(importingFile *ast.SourceFile, export *Export, program *compiler.Program) lsproto.ImportKind {
	if program.Options().VerbatimModuleSyntax.IsTrue() && program.GetEmitModuleFormatOfFile(importingFile) == core.ModuleKindCommonJS {
		return lsproto.ImportKindCommonJS
	}
	switch export.Syntax {
	case ExportSyntaxDefaultModifier, ExportSyntaxDefaultDeclaration:
		return lsproto.ImportKindDefault
	case ExportSyntaxNamed:
		if export.ExportName == ast.InternalSymbolNameDefault {
			return lsproto.ImportKindDefault
		}
		fallthrough
	case ExportSyntaxModifier, ExportSyntaxStar, ExportSyntaxCommonJSExportsProperty:
		return lsproto.ImportKindNamed
	case ExportSyntaxEquals, ExportSyntaxCommonJSModuleExports, ExportSyntaxUMD:
		// export.Syntax will be ExportSyntaxEquals for named exports/properties of an export='s target.
		if export.ExportName != ast.InternalSymbolNameExportEquals {
			return lsproto.ImportKindNamed
		}
		// !!! cache this?
		for _, statement := range importingFile.Statements.Nodes {
			// `import foo` parses as an ImportEqualsDeclaration even though it could be an ImportDeclaration
			if ast.IsImportEqualsDeclaration(statement) && !ast.NodeIsMissing(statement.AsImportEqualsDeclaration().ModuleReference) {
				return lsproto.ImportKindCommonJS
			}
		}
		// !!! this logic feels weird; we're basically trying to predict if shouldUseRequire is going to
		//     be true. The meaning of "default import" is different depending on whether we write it as
		//     a require or an es6 import. The latter, compiled to CJS, has interop built in that will
		//     avoid accessing .default, but if we write a require directly and call it a default import,
		//     we emit an unconditional .default access.
		if importingFile.ExternalModuleIndicator != nil || !ast.IsSourceFileJS(importingFile) {
			return lsproto.ImportKindDefault
		}
		return lsproto.ImportKindCommonJS
	default:
		panic("unhandled export syntax kind: " + export.Syntax.String())
	}
}

type existingImport struct {
	node            *ast.Node
	moduleSpecifier string
	index           int
}

func (v *View) getExistingImports(ctx context.Context) *collections.MultiMap[ModuleID, existingImport] {
	if v.existingImports != nil {
		return v.existingImports
	}

	result := collections.NewMultiMapWithSizeHint[ModuleID, existingImport](len(v.importingFile.Imports()))
	ch, done := v.program.GetTypeChecker(ctx)
	defer done()

	for i, moduleSpecifier := range v.importingFile.Imports() {
		node := ast.TryGetImportFromModuleSpecifier(moduleSpecifier)
		if node == nil {
			panic("error: did not expect node kind " + moduleSpecifier.Kind.String())
		} else if ast.IsVariableDeclarationInitializedToRequire(node.Parent) {
			if moduleSymbol := ch.ResolveExternalModuleName(moduleSpecifier); moduleSymbol != nil {
				result.Add(core.FirstResult(getModuleIDAndFileNameOfModuleSymbol(moduleSymbol)), existingImport{node: node.Parent, moduleSpecifier: moduleSpecifier.Text(), index: i})
			}
		} else if node.Kind == ast.KindImportDeclaration || node.Kind == ast.KindImportEqualsDeclaration || node.Kind == ast.KindJSDocImportTag {
			if moduleSymbol := ch.GetSymbolAtLocation(moduleSpecifier); moduleSymbol != nil {
				result.Add(core.FirstResult(getModuleIDAndFileNameOfModuleSymbol(moduleSymbol)), existingImport{node: node, moduleSpecifier: moduleSpecifier.Text(), index: i})
			}
		}
	}
	v.existingImports = result
	return result
}

func (v *View) shouldUseRequire() bool {
	if v.shouldUseRequireForFixes != nil {
		return *v.shouldUseRequireForFixes
	}
	shouldUseRequire := v.computeShouldUseRequire()
	v.shouldUseRequireForFixes = &shouldUseRequire
	return shouldUseRequire
}

func (v *View) computeShouldUseRequire() bool {
	// 1. TypeScript files don't use require variable declarations
	if !tspath.HasJSFileExtension(v.importingFile.FileName()) {
		return false
	}

	// 2. If the current source file is unambiguously CJS or ESM, go with that
	switch {
	case v.importingFile.CommonJSModuleIndicator != nil && v.importingFile.ExternalModuleIndicator == nil:
		return true
	case v.importingFile.ExternalModuleIndicator != nil && v.importingFile.CommonJSModuleIndicator == nil:
		return false
	}

	// 3. If there's a tsconfig/jsconfig, use its module setting
	if v.program.Options().ConfigFilePath != "" {
		return v.program.Options().GetEmitModuleKind() < core.ModuleKindES2015
	}

	// 4. In --module nodenext, assume we're not emitting JS -> JS, so use
	//    whatever syntax Node expects based on the detected module kind
	//    TODO: consider removing `impliedNodeFormatForEmit`
	switch v.program.GetImpliedNodeFormatForEmit(v.importingFile) {
	case core.ModuleKindCommonJS:
		return true
	case core.ModuleKindESNext:
		return false
	}

	// 5. Match the first other JS file in the program that's unambiguously CJS or ESM
	for _, otherFile := range v.program.GetSourceFiles() {
		switch {
		case otherFile == v.importingFile, !ast.IsSourceFileJS(otherFile), v.program.IsSourceFileFromExternalLibrary(otherFile):
			continue
		case otherFile.CommonJSModuleIndicator != nil && otherFile.ExternalModuleIndicator == nil:
			return true
		case otherFile.ExternalModuleIndicator != nil && otherFile.CommonJSModuleIndicator == nil:
			return false
		}
	}

	// 6. Literally nothing to go on
	return true
}

func needsTypeOnly(addAsTypeOnly lsproto.AddAsTypeOnly) bool {
	return addAsTypeOnly == lsproto.AddAsTypeOnlyRequired
}

func shouldUseTypeOnly(addAsTypeOnly lsproto.AddAsTypeOnly, preferences *lsutil.UserPreferences) bool {
	return needsTypeOnly(addAsTypeOnly) || addAsTypeOnly != lsproto.AddAsTypeOnlyNotAllowed && preferences.PreferTypeOnlyAutoImports.IsTrue()
}

// CompareFixesForSorting returns negative if `a` is better than `b`.
// Sorting with this comparator will place the best fix first.
// After rank sorting, fixes will be sorted by arbitrary but stable criteria
// to ensure a deterministic order.
func (v *View) CompareFixesForSorting(a, b *Fix) int {
	if res := v.CompareFixesForRanking(a, b); res != 0 {
		return res
	}
	return v.compareModuleSpecifiersForSorting(a, b)
}

// CompareFixesForRanking returns negative if `a` is better than `b`.
// Sorting with this comparator will place the best fix first.
// Fixes of equal desirability will be considered equal.
func (v *View) CompareFixesForRanking(a, b *Fix) int {
	if res := compareFixKinds(a.Kind, b.Kind); res != 0 {
		return res
	}
	return v.compareModuleSpecifiersForRanking(a, b)
}

func compareFixKinds(a, b lsproto.AutoImportFixKind) int {
	return int(a) - int(b)
}

func (v *View) compareModuleSpecifiersForRanking(a, b *Fix) int {
	if comparison := compareModuleSpecifierRelativity(a, b, v.preferences); comparison != 0 {
		return comparison
	}
	if a.ModuleSpecifierKind == modulespecifiers.ResultKindAmbient && b.ModuleSpecifierKind == modulespecifiers.ResultKindAmbient {
		if comparison := v.compareNodeCoreModuleSpecifiers(a.ModuleSpecifier, b.ModuleSpecifier, v.importingFile, v.program); comparison != 0 {
			return comparison
		}
	}
	if a.ModuleSpecifierKind == modulespecifiers.ResultKindRelative && b.ModuleSpecifierKind == modulespecifiers.ResultKindRelative {
		if comparison := core.CompareBooleans(
			isFixPossiblyReExportingImportingFile(a, v.importingFile.FileName()),
			isFixPossiblyReExportingImportingFile(b, v.importingFile.FileName()),
		); comparison != 0 {
			return comparison
		}
	}
	if comparison := tspath.CompareNumberOfDirectorySeparators(a.ModuleSpecifier, b.ModuleSpecifier); comparison != 0 {
		return comparison
	}
	return 0
}

func (v *View) compareModuleSpecifiersForSorting(a, b *Fix) int {
	if res := v.compareModuleSpecifiersForRanking(a, b); res != 0 {
		return res
	}
	// Sort ./foo before ../foo for equal-length specifiers
	if strings.HasPrefix(a.ModuleSpecifier, "./") && !strings.HasPrefix(b.ModuleSpecifier, "./") {
		return -1
	}
	if strings.HasPrefix(b.ModuleSpecifier, "./") && !strings.HasPrefix(a.ModuleSpecifier, "./") {
		return 1
	}
	if comparison := strings.Compare(a.ModuleSpecifier, b.ModuleSpecifier); comparison != 0 {
		return comparison
	}
	if comparison := cmp.Compare(a.ImportKind, b.ImportKind); comparison != 0 {
		return comparison
	}
	// !!! further tie-breakers? In practice this is only called on fixes with the same name
	return 0
}

func (v *View) compareNodeCoreModuleSpecifiers(a, b string, importingFile *ast.SourceFile, program *compiler.Program) int {
	if strings.HasPrefix(a, "node:") && !strings.HasPrefix(b, "node:") {
		if v.shouldUseUriStyleNodeCoreModules.IsTrue() {
			return -1
		} else if v.shouldUseUriStyleNodeCoreModules.IsFalse() {
			return 1
		}
		return 0
	}
	if strings.HasPrefix(b, "node:") && !strings.HasPrefix(a, "node:") {
		if v.shouldUseUriStyleNodeCoreModules.IsTrue() {
			return 1
		} else if v.shouldUseUriStyleNodeCoreModules.IsFalse() {
			return -1
		}
	}
	return 0
}

// This is a simple heuristic to try to avoid creating an import cycle with a barrel re-export.
// E.g., do not `import { Foo } from ".."` when you could `import { Foo } from "../Foo"`.
// This can produce false positives or negatives if re-exports cross into sibling directories
// (e.g. `export * from "../whatever"`) or are not named "index". Technically this should do
// a tspath.Path comparison, but it's not worth it to run a heuristic in such a hot path.
func isFixPossiblyReExportingImportingFile(fix *Fix, importingFileName string) bool {
	if fix.IsReExport && isIndexFileName(fix.ModuleFileName) {
		reExportDir := tspath.GetDirectoryPath(fix.ModuleFileName)
		return strings.HasPrefix(importingFileName, reExportDir)
	}
	return false
}

func isIndexFileName(fileName string) bool {
	lastSlash := strings.LastIndexByte(fileName, '/')
	if lastSlash < 0 || len(fileName) <= lastSlash+1 {
		return false
	}
	fileName = fileName[lastSlash+1:]
	switch fileName {
	case "index.js", "index.jsx", "index.d.ts", "index.ts", "index.tsx":
		return true
	}
	return false
}

func promoteFromTypeOnly(
	changes *change.Tracker,
	aliasDeclaration *ast.Declaration,
	compilerOptions *core.CompilerOptions,
	sourceFile *ast.SourceFile,
	preferences *lsutil.UserPreferences,
) *ast.Declaration {
	// See comment in `doAddExistingFix` on constant with the same name.
	convertExistingToTypeOnly := compilerOptions.VerbatimModuleSyntax

	switch aliasDeclaration.Kind {
	case ast.KindImportSpecifier:
		spec := aliasDeclaration.AsImportSpecifier()
		if spec.IsTypeOnly {
			if spec.Parent != nil && spec.Parent.Kind == ast.KindNamedImports {
				// TypeScript creates a new specifier with isTypeOnly=false, computes insertion index,
				// and if different from current position, deletes and re-inserts at new position.
				// For now, we just delete the range from the first token (type keyword) to the property name or name.
				firstToken := lsutil.GetFirstToken(aliasDeclaration, sourceFile)
				typeKeywordPos := scanner.GetTokenPosOfNode(firstToken, sourceFile, false)
				var targetNode *ast.DeclarationName
				if spec.PropertyName != nil {
					targetNode = spec.PropertyName
				} else {
					targetNode = spec.Name()
				}
				targetPos := scanner.GetTokenPosOfNode(targetNode.AsNode(), sourceFile, false)
				changes.DeleteRange(sourceFile, core.NewTextRange(typeKeywordPos, targetPos))
			}
			return aliasDeclaration
		} else {
			// The parent import clause is type-only
			if spec.Parent == nil || spec.Parent.Kind != ast.KindNamedImports {
				panic("ImportSpecifier parent must be NamedImports")
			}
			if spec.Parent.Parent == nil || spec.Parent.Parent.Kind != ast.KindImportClause {
				panic("NamedImports parent must be ImportClause")
			}
			promoteImportClause(changes, spec.Parent.Parent.AsImportClause(), compilerOptions, sourceFile, preferences, convertExistingToTypeOnly, aliasDeclaration)
			return spec.Parent.Parent
		}

	case ast.KindImportClause:
		promoteImportClause(changes, aliasDeclaration.AsImportClause(), compilerOptions, sourceFile, preferences, convertExistingToTypeOnly, aliasDeclaration)
		return aliasDeclaration

	case ast.KindNamespaceImport:
		// Promote the parent import clause
		if aliasDeclaration.Parent == nil || aliasDeclaration.Parent.Kind != ast.KindImportClause {
			panic("NamespaceImport parent must be ImportClause")
		}
		promoteImportClause(changes, aliasDeclaration.Parent.AsImportClause(), compilerOptions, sourceFile, preferences, convertExistingToTypeOnly, aliasDeclaration)
		return aliasDeclaration.Parent

	case ast.KindImportEqualsDeclaration:
		// Remove the 'type' keyword (which is the second token: 'import' 'type' name '=' ...)
		importEqDecl := aliasDeclaration.AsImportEqualsDeclaration()
		// The type keyword is after 'import' and before the name
		scan := scanner.GetScannerForSourceFile(sourceFile, importEqDecl.Pos())
		// Skip 'import' keyword to get to 'type'
		scan.Scan()
		deleteTypeKeyword(changes, sourceFile, scan.TokenStart())
		return aliasDeclaration
	default:
		panic(fmt.Sprintf("Unexpected alias declaration kind: %v", aliasDeclaration.Kind))
	}
}

// promoteImportClause removes the type keyword from an import clause
func promoteImportClause(
	changes *change.Tracker,
	importClause *ast.ImportClause,
	compilerOptions *core.CompilerOptions,
	sourceFile *ast.SourceFile,
	preferences *lsutil.UserPreferences,
	convertExistingToTypeOnly core.Tristate,
	aliasDeclaration *ast.Declaration,
) {
	// Delete the 'type' keyword
	if importClause.PhaseModifier == ast.KindTypeKeyword {
		deleteTypeKeyword(changes, sourceFile, importClause.Pos())
	}

	// Handle .ts extension conversion to .js if necessary
	if compilerOptions.AllowImportingTsExtensions.IsFalse() {
		moduleSpecifier := checker.TryGetModuleSpecifierFromDeclaration(importClause.Parent)
		if moduleSpecifier != nil {
			// Note: We can't check ResolvedUsingTsExtension without program, so we'll skip this optimization
			// The fix will still work, just might not change .ts to .js extensions in all cases
		}
	}

	// Handle verbatimModuleSyntax conversion
	// If convertExistingToTypeOnly is true, we need to add 'type' to other specifiers
	// in the same import declaration
	if convertExistingToTypeOnly.IsTrue() {
		namedImports := importClause.NamedBindings
		if namedImports != nil && namedImports.Kind == ast.KindNamedImports {
			namedImportsData := namedImports.AsNamedImports()
			if len(namedImportsData.Elements.Nodes) > 1 {
				// Check if the list is sorted and if we need to reorder
				_, isSorted := organizeimports.GetNamedImportSpecifierComparerWithDetection(
					importClause.Parent,
					sourceFile,
					preferences,
				)

				// If the alias declaration is an ImportSpecifier and the list is sorted,
				// move it to index 0 (since it will be the only non-type-only import)
				if isSorted.IsFalse() == false && // isSorted !== false
					aliasDeclaration != nil &&
					aliasDeclaration.Kind == ast.KindImportSpecifier {
					// Find the index of the alias declaration
					aliasIndex := -1
					for i, element := range namedImportsData.Elements.Nodes {
						if element == aliasDeclaration {
							aliasIndex = i
							break
						}
					}
					// If not already at index 0, move it there
					if aliasIndex > 0 {
						// Delete the specifier from its current position
						changes.Delete(sourceFile, aliasDeclaration)
						// Insert it at index 0
						changes.InsertImportSpecifierAtIndex(sourceFile, aliasDeclaration, namedImports, 0)
					}
				}

				// Add 'type' keyword to all other import specifiers that aren't already type-only
				for _, element := range namedImportsData.Elements.Nodes {
					spec := element.AsImportSpecifier()
					// Skip the specifier being promoted (if aliasDeclaration is an ImportSpecifier)
					if aliasDeclaration != nil && aliasDeclaration.Kind == ast.KindImportSpecifier {
						if element == aliasDeclaration {
							continue
						}
					}
					// Skip if already type-only
					if !spec.IsTypeOnly {
						changes.InsertModifierBefore(sourceFile, ast.KindTypeKeyword, element)
					}
				}
			}
		}
	}
}

// deleteTypeKeyword deletes the 'type' keyword token starting at the given position,
// including any trailing whitespace.
func deleteTypeKeyword(changes *change.Tracker, sourceFile *ast.SourceFile, startPos int) {
	scan := scanner.GetScannerForSourceFile(sourceFile, startPos)
	if scan.Token() != ast.KindTypeKeyword {
		return
	}
	typeStart := scan.TokenStart()
	typeEnd := scan.TokenEnd()
	// Skip trailing whitespace
	text := sourceFile.Text()
	for typeEnd < len(text) && (text[typeEnd] == ' ' || text[typeEnd] == '\t') {
		typeEnd++
	}
	changes.DeleteRange(sourceFile, core.NewTextRange(typeStart, typeEnd))
}

func getModuleSpecifierText(promotedDeclaration *ast.Node) string {
	if promotedDeclaration.Kind == ast.KindImportEqualsDeclaration {
		importEqualsDeclaration := promotedDeclaration.AsImportEqualsDeclaration()
		if ast.IsExternalModuleReference(importEqualsDeclaration.ModuleReference) {
			expr := importEqualsDeclaration.ModuleReference.Expression()
			if expr != nil && expr.Kind == ast.KindStringLiteral {
				return expr.Text()
			}

		}
		return importEqualsDeclaration.ModuleReference.Text()
	}
	return promotedDeclaration.Parent.ModuleSpecifier().Text()
}

// returns `-1` if `a` is better than `b`
func compareModuleSpecifierRelativity(a *Fix, b *Fix, preferences modulespecifiers.UserPreferences) int {
	switch preferences.ImportModuleSpecifierPreference {
	case modulespecifiers.ImportModuleSpecifierPreferenceNonRelative, modulespecifiers.ImportModuleSpecifierPreferenceProjectRelative:
		return core.CompareBooleans(a.ModuleSpecifierKind == modulespecifiers.ResultKindRelative, b.ModuleSpecifierKind == modulespecifiers.ResultKindRelative)
	}
	return 0
}
