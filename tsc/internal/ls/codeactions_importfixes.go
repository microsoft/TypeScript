package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
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
	fix                 *autoimport.Fix
	symbolName          string
	errorIdentifierText string
	isJsxNamespaceFix   bool
}

func getImportCodeActions(ctx context.Context, fixContext *CodeFixContext) ([]CodeAction, error) {
	info, err := getFixInfos(ctx, fixContext, fixContext.ErrorCode, fixContext.Span.Pos())
	if err != nil {
		return nil, err
	}
	if len(info) == 0 {
		return nil, nil
	}

	var actions []CodeAction
	for _, fixInfo := range info {
		edits, description := fixInfo.fix.Edits(
			ctx,
			fixContext.SourceFile,
			fixContext.Program.Options(),
			fixContext.LS.FormatOptions(),
			fixContext.LS.converters,
			fixContext.LS.UserPreferences(),
		)

		actions = append(actions, CodeAction{
			Description: description,
			Changes:     edits,
		})
	}
	return actions, nil
}

func getFixInfos(ctx context.Context, fixContext *CodeFixContext, errorCode int32, pos int) ([]*fixInfo, error) {
	// Can't compute import fixes for dynamic/untitled files since they don't have real file paths
	if tspath.IsDynamicFileName(fixContext.SourceFile.FileName()) {
		return nil, nil
	}

	symbolToken := astnav.GetTokenAtPosition(fixContext.SourceFile, pos)

	var view *autoimport.View
	var info []*fixInfo

	if errorCode == diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.Code() {
		view = fixContext.LS.getCurrentAutoImportView(fixContext.SourceFile)
		info = getFixesInfoForUMDImport(ctx, fixContext, symbolToken, view)
	} else if !ast.IsIdentifier(symbolToken) {
		return nil, nil
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
			return []*fixInfo{{fix: fix, symbolName: symbolName, errorIdentifierText: symbolToken.Text()}}, nil
		}
		return nil, nil
	} else {
		var err error
		view, err = fixContext.LS.getPreparedAutoImportView(fixContext.SourceFile)
		if err != nil {
			return nil, err
		}
		info = getFixesInfoForNonUMDImport(ctx, fixContext, symbolToken, view)
	}

	// Sort fixes by preference
	if view == nil {
		view = fixContext.LS.getCurrentAutoImportView(fixContext.SourceFile)
	}
	return sortFixInfo(info, fixContext, view), nil
}

func getFixesInfoForUMDImport(ctx context.Context, fixContext *CodeFixContext, token *ast.Node, view *autoimport.View) []*fixInfo {
	ch, done := fixContext.Program.GetTypeChecker(ctx)
	defer done()

	umdSymbol := getUmdSymbol(token, ch)
	if umdSymbol == nil {
		return nil
	}

	export := autoimport.SymbolToExport(umdSymbol, ch)
	isValidTypeOnlyUseSite := ast.IsValidTypeOnlyAliasUseSite(token)

	var result []*fixInfo
	for _, fix := range view.GetFixes(ctx, export, false, isValidTypeOnlyUseSite, nil) {
		errorIdentifierText := ""
		if ast.IsIdentifier(token) {
			errorIdentifierText = token.Text()
		}
		result = append(result, &fixInfo{
			fix:                 fix,
			symbolName:          umdSymbol.Name,
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

func getFixesInfoForNonUMDImport(ctx context.Context, fixContext *CodeFixContext, symbolToken *ast.Node, view *autoimport.View) []*fixInfo {
	ch, done := fixContext.Program.GetTypeChecker(ctx)
	defer done()
	compilerOptions := fixContext.Program.Options()

	isValidTypeOnlyUseSite := ast.IsValidTypeOnlyAliasUseSite(symbolToken)
	symbolNames := getSymbolNamesToImport(fixContext.SourceFile, ch, symbolToken, compilerOptions)
	var allInfo []*fixInfo

	// Compute usage position for JSDoc import type fixes
	usagePosition := fixContext.LS.converters.PositionToLineAndCharacter(fixContext.SourceFile, core.TextPos(scanner.GetTokenPosOfNode(symbolToken, fixContext.SourceFile, false)))

	for _, symbolName := range symbolNames {
		// "default" is a keyword and not a legal identifier for the import
		if symbolName == "default" {
			continue
		}

		isJSXTagName := symbolName == symbolToken.Text() && ast.IsJsxTagName(symbolToken)
		queryKind := autoimport.QueryKindExactMatch
		if isJSXTagName {
			queryKind = autoimport.QueryKindCaseInsensitiveMatch
		}

		exports := view.Search(symbolName, queryKind)
		for _, export := range exports {
			if isJSXTagName && !(export.Name() == symbolName || export.IsRenameable()) {
				continue
			}

			fixes := view.GetFixes(ctx, export, isJSXTagName, isValidTypeOnlyUseSite, &usagePosition)
			for _, fix := range fixes {
				allInfo = append(allInfo, &fixInfo{
					fix:        fix,
					symbolName: symbolName,
				})
			}
		}
	}

	return allInfo
}

func getTypeOnlyPromotionFix(ctx context.Context, sourceFile *ast.SourceFile, symbolToken *ast.Node, symbolName string, program *compiler.Program) *autoimport.Fix {
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

	return &autoimport.Fix{
		AutoImportFix: &lsproto.AutoImportFix{
			Kind: lsproto.AutoImportFixKindPromoteTypeOnly,
		},
		TypeOnlyAliasDeclaration: typeOnlyAliasDeclaration,
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

func sortFixInfo(fixes []*fixInfo, fixContext *CodeFixContext, view *autoimport.View) []*fixInfo {
	if len(fixes) == 0 {
		return fixes
	}

	// Create a copy to avoid modifying the original
	sorted := make([]*fixInfo, len(fixes))
	copy(sorted, fixes)

	// Sort by:
	// 1. JSX namespace fixes last
	// 2. Fix comparison using view.CompareFixes
	slices.SortFunc(sorted, func(a, b *fixInfo) int {
		// JSX namespace fixes should come last
		if cmp := core.CompareBooleans(a.isJsxNamespaceFix, b.isJsxNamespaceFix); cmp != 0 {
			return cmp
		}
		return view.CompareFixesForSorting(a.fix, b.fix)
	})

	return sorted
}
