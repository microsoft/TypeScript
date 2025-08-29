package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) getExportInfos(
	ctx context.Context,
	ch *checker.Checker,
	importingFile *ast.SourceFile,
	preferences *UserPreferences,
	exportMapKey ExportInfoMapKey,
) []*SymbolExportInfo {
	expInfoMap := NewExportInfoMap(l.GetProgram().GetGlobalTypingsCacheLocation())
	moduleCount := 0
	symbolNameMatch := func(symbolName string) bool {
		return symbolName == exportMapKey.SymbolName
	}
	forEachExternalModuleToImportFrom(
		ch,
		l.GetProgram(),
		preferences,
		// /*useAutoImportProvider*/ true,
		func(moduleSymbol *ast.Symbol, moduleFile *ast.SourceFile, ch *checker.Checker, isFromPackageJson bool) {
			if moduleCount = moduleCount + 1; moduleCount%100 == 0 && ctx.Err() != nil {
				return
			}
			if moduleFile == nil && moduleSymbol.Name != exportMapKey.AmbientModuleName {
				return
			}
			seenExports := collections.Set[string]{}
			defaultInfo := getDefaultLikeExportInfo(moduleSymbol, ch)
			var exportingModuleSymbol *ast.Symbol
			if defaultInfo != nil {
				exportingModuleSymbol = defaultInfo.exportingModuleSymbol
				// Note: I think we shouldn't actually see resolved module symbols here, but weird merges
				// can cause it to happen: see 'completionsImport_mergedReExport.ts'
				if isImportableSymbol(exportingModuleSymbol, ch) {
					expInfoMap.add(
						importingFile.Path(),
						exportingModuleSymbol,
						core.IfElse(defaultInfo.exportKind == ExportKindDefault, ast.InternalSymbolNameDefault, ast.InternalSymbolNameExportEquals),
						moduleSymbol,
						moduleFile,
						defaultInfo.exportKind,
						isFromPackageJson,
						ch,
						symbolNameMatch,
						nil,
					)
				}
			}
			ch.ForEachExportAndPropertyOfModule(moduleSymbol, func(exported *ast.Symbol, key string) {
				if exported != exportingModuleSymbol && isImportableSymbol(exported, ch) && seenExports.AddIfAbsent(key) {
					expInfoMap.add(
						importingFile.Path(),
						exported,
						key,
						moduleSymbol,
						moduleFile,
						ExportKindNamed,
						isFromPackageJson,
						ch,
						symbolNameMatch,
						nil,
					)
				}
			})
		})
	return expInfoMap.get(importingFile.Path(), ch, exportMapKey)
}

func (l *LanguageService) searchExportInfosForCompletions(
	ctx context.Context,
	ch *checker.Checker,
	importingFile *ast.SourceFile,
	preferences *UserPreferences,
	isForImportStatementCompletion bool,
	isRightOfOpenTag bool,
	isTypeOnlyLocation bool,
	lowerCaseTokenText string,
	action func([]*SymbolExportInfo, string, bool, ExportInfoMapKey) []*SymbolExportInfo,
) {
	symbolNameMatches := map[string]bool{}
	symbolNameMatch := func(symbolName string) bool {
		if !scanner.IsIdentifierText(symbolName, importingFile.LanguageVariant) {
			return false
		}
		if b, ok := symbolNameMatches[symbolName]; ok {
			return b
		}
		if isNonContextualKeyword(scanner.StringToToken(symbolName)) {
			symbolNameMatches[symbolName] = false
			return false
		}
		// Do not try to auto-import something with a lowercase first letter for a JSX tag
		firstChar := rune(symbolName[0])
		if isRightOfOpenTag && (firstChar < 'A' || firstChar > 'Z') {
			symbolNameMatches[symbolName] = false
			return false
		}

		symbolNameMatches[symbolName] = charactersFuzzyMatchInString(symbolName, lowerCaseTokenText)
		return symbolNameMatches[symbolName]
	}
	flagMatch := func(targetFlags ast.SymbolFlags) bool {
		if !isTypeOnlyLocation && !isForImportStatementCompletion && (targetFlags&ast.SymbolFlagsValue) == 0 {
			return false
		}
		if isTypeOnlyLocation && (targetFlags&(ast.SymbolFlagsModule|ast.SymbolFlagsType) == 0) {
			return false
		}
		return true
	}

	expInfoMap := NewExportInfoMap(l.GetProgram().GetGlobalTypingsCacheLocation())
	moduleCount := 0
	forEachExternalModuleToImportFrom(
		ch,
		l.GetProgram(),
		preferences,
		// /*useAutoImportProvider*/ true,
		func(moduleSymbol *ast.Symbol, moduleFile *ast.SourceFile, ch *checker.Checker, isFromPackageJson bool) {
			if moduleCount = moduleCount + 1; moduleCount%100 == 0 && ctx.Err() != nil {
				return
			}
			seenExports := collections.Set[string]{}
			defaultInfo := getDefaultLikeExportInfo(moduleSymbol, ch)
			// Note: I think we shouldn't actually see resolved module symbols here, but weird merges
			// can cause it to happen: see 'completionsImport_mergedReExport.ts'
			if defaultInfo != nil && isImportableSymbol(defaultInfo.exportingModuleSymbol, ch) {
				expInfoMap.add(
					importingFile.Path(),
					defaultInfo.exportingModuleSymbol,
					core.IfElse(defaultInfo.exportKind == ExportKindDefault, ast.InternalSymbolNameDefault, ast.InternalSymbolNameExportEquals),
					moduleSymbol,
					moduleFile,
					defaultInfo.exportKind,
					isFromPackageJson,
					ch,
					symbolNameMatch,
					flagMatch,
				)
			}
			var exportingModuleSymbol *ast.Symbol
			if defaultInfo != nil {
				exportingModuleSymbol = defaultInfo.exportingModuleSymbol
			}
			ch.ForEachExportAndPropertyOfModule(moduleSymbol, func(exported *ast.Symbol, key string) {
				if exported != exportingModuleSymbol && isImportableSymbol(exported, ch) && seenExports.AddIfAbsent(key) {
					expInfoMap.add(
						importingFile.Path(),
						exported,
						key,
						moduleSymbol,
						moduleFile,
						ExportKindNamed,
						isFromPackageJson,
						ch,
						symbolNameMatch,
						flagMatch,
					)
				}
			})
		})
	expInfoMap.search(
		ch,
		importingFile.Path(),
		/*preferCapitalized*/ isRightOfOpenTag,
		func(symbolName string, targetFlags ast.SymbolFlags) bool {
			return symbolNameMatch(symbolName) && flagMatch(targetFlags)
		},
		action,
	)
}
