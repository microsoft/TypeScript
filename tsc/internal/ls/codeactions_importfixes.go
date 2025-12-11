package ls

import (
	"cmp"
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/ls/organizeimports"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var importFixErrorCodes = []int32{
	diagnostics.Cannot_find_name_0.Code(),
	diagnostics.Cannot_find_name_0_Did_you_mean_1.Code(),
	diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.Code(),
	diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.Code(),
	diagnostics.Cannot_find_namespace_0.Code(),
	diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.Code(),
	diagnostics.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here.Code(),
	diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.Code(),
	diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig.Code(),
	diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode.Code(),
	diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig.Code(),
	diagnostics.Cannot_find_namespace_0_Did_you_mean_1.Code(),
	diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.Code(),
	diagnostics.This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found.Code(),
}

const (
	importFixID = "fixMissingImport"
)

// ImportFixProvider is the CodeFixProvider for import-related fixes
var ImportFixProvider = &CodeFixProvider{
	ErrorCodes:     importFixErrorCodes,
	GetCodeActions: getImportCodeActions,
	FixIds:         []string{importFixID},
}

type fixInfo struct {
	fix                 *ImportFix
	symbolName          string
	errorIdentifierText string
	isJsxNamespaceFix   bool
}

func getImportCodeActions(ctx context.Context, fixContext *CodeFixContext) []CodeAction {
	info := getFixInfos(ctx, fixContext, fixContext.ErrorCode, fixContext.Span.Pos(), true /* useAutoImportProvider */)
	if len(info) == 0 {
		return nil
	}

	var actions []CodeAction
	for _, fixInfo := range info {
		tracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
		msg := fixContext.LS.codeActionForFixWorker(
			ctx,
			tracker,
			fixContext.SourceFile,
			fixInfo.symbolName,
			fixInfo.fix,
			fixInfo.symbolName != fixInfo.errorIdentifierText,
		)

		if msg != "" {
			// Convert changes to LSP edits
			changes := tracker.GetChanges()
			var edits []*lsproto.TextEdit
			for _, fileChanges := range changes {
				edits = append(edits, fileChanges...)
			}

			actions = append(actions, CodeAction{
				Description: msg,
				Changes:     edits,
			})
		}
	}
	return actions
}

func getFixInfos(ctx context.Context, fixContext *CodeFixContext, errorCode int32, pos int, useAutoImportProvider bool) []*fixInfo {
	symbolToken := astnav.GetTokenAtPosition(fixContext.SourceFile, pos)

	var info []*fixInfo

	if errorCode == diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.Code() {
		info = getFixesInfoForUMDImport(ctx, fixContext, symbolToken)
	} else if !ast.IsIdentifier(symbolToken) {
		return nil
	} else if errorCode == diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.Code() {
		// Handle type-only import promotion
		ch, done := fixContext.Program.GetTypeChecker(ctx)
		defer done()
		compilerOptions := fixContext.Program.Options()
		symbolNames := getSymbolNamesToImport(fixContext.SourceFile, ch, symbolToken, compilerOptions)
		if len(symbolNames) != 1 {
			panic("Expected exactly one symbol name for type-only import promotion")
		}
		symbolName := symbolNames[0]
		fix := getTypeOnlyPromotionFix(ctx, fixContext.SourceFile, symbolToken, symbolName, fixContext.Program)
		if fix != nil {
			return []*fixInfo{{fix: fix, symbolName: symbolName, errorIdentifierText: symbolToken.Text()}}
		}
		return nil
	} else {
		info = getFixesInfoForNonUMDImport(ctx, fixContext, symbolToken, useAutoImportProvider)
	}

	// Sort fixes by preference
	return sortFixInfo(info, fixContext)
}

func getFixesInfoForUMDImport(ctx context.Context, fixContext *CodeFixContext, token *ast.Node) []*fixInfo {
	ch, done := fixContext.Program.GetTypeChecker(ctx)
	defer done()

	umdSymbol := getUmdSymbol(token, ch)
	if umdSymbol == nil {
		return nil
	}

	symbol := ch.GetAliasedSymbol(umdSymbol)
	symbolName := umdSymbol.Name
	exportInfo := []*SymbolExportInfo{{
		symbol:            umdSymbol,
		moduleSymbol:      symbol,
		moduleFileName:    "",
		exportKind:        ExportKindUMD,
		targetFlags:       symbol.Flags,
		isFromPackageJson: false,
	}}

	useRequire := shouldUseRequire(fixContext.SourceFile, fixContext.Program)
	// `usagePosition` is undefined because `token` may not actually be a usage of the symbol we're importing.
	// For example, we might need to import `React` in order to use an arbitrary JSX tag. We could send a position
	// for other UMD imports, but `usagePosition` is currently only used to insert a namespace qualification
	// before a named import, like converting `writeFile` to `fs.writeFile` (whether `fs` is already imported or
	// not), and this function will only be called for UMD symbols, which are necessarily an `export =`, not a
	// named export.
	_, fixes := fixContext.LS.getImportFixes(
		ch,
		exportInfo,
		nil, // usagePosition undefined for UMD
		ptrTo(false),
		&useRequire,
		fixContext.SourceFile,
		false, // fromCacheOnly
	)

	var result []*fixInfo
	for _, fix := range fixes {
		errorIdentifierText := ""
		if ast.IsIdentifier(token) {
			errorIdentifierText = token.Text()
		}
		result = append(result, &fixInfo{
			fix:                 fix,
			symbolName:          symbolName,
			errorIdentifierText: errorIdentifierText,
		})
	}
	return result
}

func getUmdSymbol(token *ast.Node, ch *checker.Checker) *ast.Symbol {
	// try the identifier to see if it is the umd symbol
	var umdSymbol *ast.Symbol
	if ast.IsIdentifier(token) {
		umdSymbol = ch.GetResolvedSymbol(token)
	}
	if isUMDExportSymbol(umdSymbol) {
		return umdSymbol
	}

	// The error wasn't for the symbolAtLocation, it was for the JSX tag itself, which needs access to e.g. `React`.
	parent := token.Parent
	if (ast.IsJsxOpeningLikeElement(parent) && parent.TagName() == token) ||
		ast.IsJsxOpeningFragment(parent) {
		var location *ast.Node
		if ast.IsJsxOpeningLikeElement(parent) {
			location = token
		} else {
			location = parent
		}
		jsxNamespace := ch.GetJsxNamespace(parent)
		parentSymbol := ch.ResolveName(jsxNamespace, location, ast.SymbolFlagsValue, false /* excludeGlobals */)
		if isUMDExportSymbol(parentSymbol) {
			return parentSymbol
		}
	}
	return nil
}

func isUMDExportSymbol(symbol *ast.Symbol) bool {
	return symbol != nil && len(symbol.Declarations) > 0 &&
		symbol.Declarations[0] != nil &&
		ast.IsNamespaceExportDeclaration(symbol.Declarations[0])
}

func getFixesInfoForNonUMDImport(ctx context.Context, fixContext *CodeFixContext, symbolToken *ast.Node, useAutoImportProvider bool) []*fixInfo {
	ch, done := fixContext.Program.GetTypeChecker(ctx)
	defer done()
	compilerOptions := fixContext.Program.Options()

	symbolNames := getSymbolNamesToImport(fixContext.SourceFile, ch, symbolToken, compilerOptions)
	var allInfo []*fixInfo

	for _, symbolName := range symbolNames {
		// "default" is a keyword and not a legal identifier for the import
		if symbolName == "default" {
			continue
		}

		isValidTypeOnlyUseSite := ast.IsValidTypeOnlyAliasUseSite(symbolToken)
		useRequire := shouldUseRequire(fixContext.SourceFile, fixContext.Program)
		exportInfosMap := getExportInfos(
			ctx,
			symbolName,
			ast.IsJsxTagName(symbolToken),
			getMeaningFromLocation(symbolToken),
			fixContext.SourceFile,
			fixContext.Program,
			fixContext.LS,
		)

		// Flatten all export infos from the map into a single slice
		var allExportInfos []*SymbolExportInfo
		for exportInfoList := range exportInfosMap.Values() {
			allExportInfos = append(allExportInfos, exportInfoList...)
		}

		// Sort by moduleFileName to ensure deterministic iteration order
		// TODO: This might not work 100% of the time; need to revisit this
		slices.SortStableFunc(allExportInfos, func(a, b *SymbolExportInfo) int {
			return strings.Compare(a.moduleFileName, b.moduleFileName)
		})

		if len(allExportInfos) > 0 {
			usagePos := scanner.GetTokenPosOfNode(symbolToken, fixContext.SourceFile, false)
			lspPos := fixContext.LS.converters.PositionToLineAndCharacter(fixContext.SourceFile, core.TextPos(usagePos))
			_, fixes := fixContext.LS.getImportFixes(
				ch,
				allExportInfos,
				&lspPos,
				&isValidTypeOnlyUseSite,
				&useRequire,
				fixContext.SourceFile,
				false, // fromCacheOnly
			)

			for _, fix := range fixes {
				allInfo = append(allInfo, &fixInfo{
					fix:                 fix,
					symbolName:          symbolName,
					errorIdentifierText: symbolToken.Text(),
					isJsxNamespaceFix:   symbolName != symbolToken.Text(),
				})
			}
		}
	}

	return allInfo
}

func getTypeOnlyPromotionFix(ctx context.Context, sourceFile *ast.SourceFile, symbolToken *ast.Node, symbolName string, program *compiler.Program) *ImportFix {
	ch, done := program.GetTypeChecker(ctx)
	defer done()

	// Get the symbol at the token location
	symbol := ch.ResolveName(symbolName, symbolToken, ast.SymbolFlagsValue, true /* excludeGlobals */)
	if symbol == nil {
		return nil
	}

	// Get the type-only alias declaration
	typeOnlyAliasDeclaration := ch.GetTypeOnlyAliasDeclaration(symbol)
	if typeOnlyAliasDeclaration == nil || ast.GetSourceFileOfNode(typeOnlyAliasDeclaration) != sourceFile {
		return nil
	}

	return &ImportFix{
		kind:                     ImportFixKindPromoteTypeOnly,
		typeOnlyAliasDeclaration: typeOnlyAliasDeclaration,
	}
}

func getSymbolNamesToImport(sourceFile *ast.SourceFile, ch *checker.Checker, symbolToken *ast.Node, compilerOptions *core.CompilerOptions) []string {
	parent := symbolToken.Parent
	if (ast.IsJsxOpeningLikeElement(parent) || ast.IsJsxClosingElement(parent)) &&
		parent.TagName() == symbolToken &&
		jsxModeNeedsExplicitImport(compilerOptions.Jsx) {
		jsxNamespace := ch.GetJsxNamespace(sourceFile.AsNode())
		if needsJsxNamespaceFix(jsxNamespace, symbolToken, ch) {
			needsComponentNameFix := !scanner.IsIntrinsicJsxName(symbolToken.Text()) &&
				ch.ResolveName(symbolToken.Text(), symbolToken, ast.SymbolFlagsValue, false /* excludeGlobals */) == nil
			if needsComponentNameFix {
				return []string{symbolToken.Text(), jsxNamespace}
			}
			return []string{jsxNamespace}
		}
	}
	return []string{symbolToken.Text()}
}

func needsJsxNamespaceFix(jsxNamespace string, symbolToken *ast.Node, ch *checker.Checker) bool {
	if scanner.IsIntrinsicJsxName(symbolToken.Text()) {
		return true
	}
	namespaceSymbol := ch.ResolveName(jsxNamespace, symbolToken, ast.SymbolFlagsValue, true /* excludeGlobals */)
	if namespaceSymbol == nil {
		return true
	}
	// Check if all declarations are type-only
	if slices.ContainsFunc(namespaceSymbol.Declarations, ast.IsTypeOnlyImportOrExportDeclaration) {
		return (namespaceSymbol.Flags & ast.SymbolFlagsValue) == 0
	}
	return false
}

func jsxModeNeedsExplicitImport(jsx core.JsxEmit) bool {
	return jsx == core.JsxEmitReact || jsx == core.JsxEmitReactNative
}

func getExportInfos(
	ctx context.Context,
	symbolName string,
	isJsxTagName bool,
	currentTokenMeaning ast.SemanticMeaning,
	fromFile *ast.SourceFile,
	program *compiler.Program,
	ls *LanguageService,
) *collections.MultiMap[ast.SymbolId, *SymbolExportInfo] {
	// For each original symbol, keep all re-exports of that symbol together
	// Maps symbol id to info for modules providing that symbol (original export + re-exports)
	originalSymbolToExportInfos := &collections.MultiMap[ast.SymbolId, *SymbolExportInfo]{}

	ch, done := program.GetTypeChecker(ctx)
	defer done()

	packageJsonFilter := ls.createPackageJsonImportFilter(fromFile)

	// Helper to add a symbol to the results map
	addSymbol := func(moduleSymbol *ast.Symbol, toFile *ast.SourceFile, exportedSymbol *ast.Symbol, exportKind ExportKind, isFromPackageJson bool) {
		if !ls.isImportable(fromFile, toFile, moduleSymbol, packageJsonFilter) {
			return
		}

		// Get unique ID for the exported symbol
		symbolID := ast.GetSymbolId(exportedSymbol)

		moduleFileName := ""
		if toFile != nil {
			moduleFileName = toFile.FileName()
		}

		originalSymbolToExportInfos.Add(symbolID, &SymbolExportInfo{
			symbol:            exportedSymbol,
			moduleSymbol:      moduleSymbol,
			moduleFileName:    moduleFileName,
			exportKind:        exportKind,
			targetFlags:       ch.SkipAlias(exportedSymbol).Flags,
			isFromPackageJson: isFromPackageJson,
		})
	}

	// Iterate through all external modules
	forEachExternalModuleToImportFrom(
		ch,
		program,
		ls.UserPreferences(),
		func(moduleSymbol *ast.Symbol, sourceFile *ast.SourceFile, checker *checker.Checker, isFromPackageJson bool) {
			// Check for cancellation
			if ctx.Err() != nil {
				return
			}

			compilerOptions := program.Options()

			// Check default export
			defaultInfo := getDefaultLikeExportInfo(moduleSymbol, checker)
			if defaultInfo != nil &&
				symbolFlagsHaveMeaning(checker.GetSymbolFlags(defaultInfo.exportingModuleSymbol), currentTokenMeaning) &&
				forEachNameOfDefaultExport(defaultInfo.exportingModuleSymbol, checker, compilerOptions.GetEmitScriptTarget(), func(name, capitalizedName string) string {
					actualName := name
					if isJsxTagName && capitalizedName != "" {
						actualName = capitalizedName
					}
					if actualName == symbolName {
						return actualName
					}
					return ""
				}) != "" {
				addSymbol(moduleSymbol, sourceFile, defaultInfo.exportingModuleSymbol, defaultInfo.exportKind, isFromPackageJson)
			}
			// Check for named export with identical name
			exportSymbol := checker.TryGetMemberInModuleExportsAndProperties(symbolName, moduleSymbol)
			if exportSymbol != nil && symbolFlagsHaveMeaning(checker.GetSymbolFlags(exportSymbol), currentTokenMeaning) {
				addSymbol(moduleSymbol, sourceFile, exportSymbol, ExportKindNamed, isFromPackageJson)
			}
		},
	)

	return originalSymbolToExportInfos
}

func sortFixInfo(fixes []*fixInfo, fixContext *CodeFixContext) []*fixInfo {
	if len(fixes) == 0 {
		return fixes
	}

	// Create a copy to avoid modifying the original
	sorted := make([]*fixInfo, len(fixes))
	copy(sorted, fixes)

	// Create package.json filter for import filtering
	packageJsonFilter := fixContext.LS.createPackageJsonImportFilter(fixContext.SourceFile)

	// Sort by:
	// 1. JSX namespace fixes last
	// 2. Fix kind (UseNamespace and AddToExisting preferred)
	// 3. Module specifier comparison
	slices.SortFunc(sorted, func(a, b *fixInfo) int {
		// JSX namespace fixes should come last
		if cmp := core.CompareBooleans(a.isJsxNamespaceFix, b.isJsxNamespaceFix); cmp != 0 {
			return cmp
		}

		// Compare fix kinds (lower is better)
		if cmp := cmp.Compare(int(a.fix.kind), int(b.fix.kind)); cmp != 0 {
			return cmp
		}

		// Compare module specifiers
		return fixContext.LS.compareModuleSpecifiers(
			a.fix,
			b.fix,
			fixContext.SourceFile,
			packageJsonFilter.allowsImportingSpecifier,
			func(fileName string) tspath.Path { return tspath.Path(fileName) },
		)
	})

	return sorted
}

func promoteFromTypeOnly(
	changes *change.Tracker,
	aliasDeclaration *ast.Declaration,
	program *compiler.Program,
	sourceFile *ast.SourceFile,
	ls *LanguageService,
) *ast.Declaration {
	compilerOptions := program.Options()
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
			promoteImportClause(changes, spec.Parent.Parent.AsImportClause(), program, sourceFile, ls, convertExistingToTypeOnly, aliasDeclaration)
			return spec.Parent.Parent
		}

	case ast.KindImportClause:
		promoteImportClause(changes, aliasDeclaration.AsImportClause(), program, sourceFile, ls, convertExistingToTypeOnly, aliasDeclaration)
		return aliasDeclaration

	case ast.KindNamespaceImport:
		// Promote the parent import clause
		if aliasDeclaration.Parent == nil || aliasDeclaration.Parent.Kind != ast.KindImportClause {
			panic("NamespaceImport parent must be ImportClause")
		}
		promoteImportClause(changes, aliasDeclaration.Parent.AsImportClause(), program, sourceFile, ls, convertExistingToTypeOnly, aliasDeclaration)
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
	program *compiler.Program,
	sourceFile *ast.SourceFile,
	ls *LanguageService,
	convertExistingToTypeOnly core.Tristate,
	aliasDeclaration *ast.Declaration,
) {
	// Delete the 'type' keyword
	if importClause.PhaseModifier == ast.KindTypeKeyword {
		deleteTypeKeyword(changes, sourceFile, importClause.Pos())
	}

	// Handle .ts extension conversion to .js if necessary
	compilerOptions := program.Options()
	if compilerOptions.AllowImportingTsExtensions.IsFalse() {
		moduleSpecifier := checker.TryGetModuleSpecifierFromDeclaration(importClause.Parent)
		if moduleSpecifier != nil {
			resolvedModule := program.GetResolvedModuleFromModuleSpecifier(sourceFile, moduleSpecifier)
			if resolvedModule != nil && resolvedModule.ResolvedUsingTsExtension {
				moduleText := moduleSpecifier.AsStringLiteral().Text
				changedExtension := tspath.ChangeExtension(
					moduleText,
					outputpaths.GetOutputExtension(moduleText, compilerOptions.Jsx),
				)
				// Replace the module specifier with the new extension
				newStringLiteral := changes.NewStringLiteral(changedExtension, moduleSpecifier.AsStringLiteral().TokenFlags)
				changes.ReplaceNode(sourceFile, moduleSpecifier, newStringLiteral, nil)
			}
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
					ls.UserPreferences(),
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
