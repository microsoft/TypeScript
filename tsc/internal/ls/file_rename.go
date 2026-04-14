package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/change"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type pathUpdater func(path string) (string, bool)

type toImport struct {
	newFileName string
	updated     bool
}

func (l *LanguageService) GetEditsForFileRename(ctx context.Context, oldURI lsproto.DocumentUri, newURI lsproto.DocumentUri) []lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile {
	program := l.GetProgram()
	oldPath := oldURI.FileName()
	newPath := newURI.FileName()

	oldToNew := l.createPathUpdater(oldPath, newPath)

	changeTracker := change.NewTracker(ctx, program.Options(), l.FormatOptions(), l.converters)
	l.updateTsconfigFiles(program, changeTracker, oldToNew, oldPath, newPath)
	l.updateImportsForFileRename(program, changeTracker, oldToNew)

	var documentChanges []lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile

	// When renaming e.g. `foo.d.css.ts` -> `bar.d.css.ts`, also rename `foo.css` -> `bar.css` if it exists.
	if tspath.IsDeclarationFileName(oldPath) && tspath.IsDeclarationFileName(newPath) {
		dtsExt := tspath.GetDeclarationFileExtension(oldPath)
		originalExtensions := tspath.GetPossibleOriginalInputExtensionForExtension(dtsExt)
		for _, ext := range originalExtensions {
			oldOriginalPath := tspath.ChangeFullExtension(oldPath, ext)
			if l.host.FileExists(oldOriginalPath) {
				newDtsExt := tspath.GetDeclarationFileExtension(oldPath)
				newOriginalExtensions := tspath.GetPossibleOriginalInputExtensionForExtension(newDtsExt)
				if slices.Contains(newOriginalExtensions, ext) {
					newOriginalPath := tspath.ChangeFullExtension(newPath, ext)
					documentChanges = append(documentChanges, lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile{
						RenameFile: &lsproto.RenameFile{
							OldUri: lsconv.FileNameToDocumentURI(oldOriginalPath),
							NewUri: lsconv.FileNameToDocumentURI(newOriginalPath),
						},
					})
				}
			}
		}
	}

	for fileName, edits := range changeTracker.GetChanges() {
		uri := lsconv.FileNameToDocumentURI(fileName)
		lspEdits := make([]lsproto.TextEditOrAnnotatedTextEditOrSnippetTextEdit, 0, len(edits))
		for _, edit := range edits {
			lspEdits = append(lspEdits, lsproto.TextEditOrAnnotatedTextEditOrSnippetTextEdit{
				TextEdit: edit,
			})
		}
		documentChanges = append(documentChanges, lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile{
			TextDocumentEdit: &lsproto.TextDocumentEdit{
				TextDocument: lsproto.OptionalVersionedTextDocumentIdentifier{Uri: uri},
				Edits:        lspEdits,
			},
		})
	}

	return documentChanges
}

func (l *LanguageService) createPathUpdater(oldPath string, newPath string) pathUpdater {
	compareOptions := tspath.ComparePathsOptions{UseCaseSensitiveFileNames: l.UseCaseSensitiveFileNames()}
	return func(path string) (string, bool) {
		if tspath.ComparePaths(path, oldPath, compareOptions) == 0 {
			return newPath, true
		}
		if tspath.StartsWithDirectory(path, oldPath, l.UseCaseSensitiveFileNames()) {
			return newPath + path[len(oldPath):], true
		}
		return "", false
	}
}

func (l *LanguageService) updateTsconfigFiles(program *compiler.Program, changeTracker *change.Tracker, oldToNew pathUpdater, oldPath string, newPath string) {
	commandLine := program.CommandLine()
	if commandLine == nil || commandLine.ConfigFile == nil {
		return
	}

	configFile := commandLine.ConfigFile.SourceFile
	if configFile == nil {
		return
	}
	configDir := tspath.GetDirectoryPath(configFile.FileName())
	jsonObjectLiteral := getTsConfigObjectLiteralExpression(configFile)
	if jsonObjectLiteral == nil {
		return
	}

	forEachObjectProperty(jsonObjectLiteral, func(property *ast.PropertyAssignment, propertyName string) {
		switch propertyName {
		case "files", "include", "exclude":
			foundExactMatch := updatePathsProperty(configFile, configDir, property, changeTracker, oldToNew, l.converters, l.UseCaseSensitiveFileNames())
			if foundExactMatch || propertyName != "include" || !ast.IsArrayLiteralExpression(property.Initializer) {
				return
			}
			if oldSpec, isDefault := commandLine.GetMatchedIncludeSpec(oldPath); oldSpec != "" && !isDefault {
				if newSpec, _ := commandLine.GetMatchedIncludeSpec(newPath); newSpec == "" {
					elements := property.Initializer.Elements()
					if len(elements) > 0 {
						changeTracker.InsertNodeAfter(
							configFile,
							elements[len(elements)-1],
							changeTracker.NodeFactory.NewStringLiteral(relativePathFromDirectory(configDir, newPath, l.UseCaseSensitiveFileNames()), ast.TokenFlagsNone),
						)
					}
				}
			}
		case "compilerOptions":
			if !ast.IsObjectLiteralExpression(property.Initializer) {
				return
			}
			forEachObjectProperty(property.Initializer.AsObjectLiteralExpression(), func(property *ast.PropertyAssignment, propertyName string) {
				option := tsoptions.CommandLineCompilerOptionsMap.Get(propertyName)
				if option != nil {
					elementOption := option.Elements()
					if option.IsFilePath || (option.Kind == tsoptions.CommandLineOptionTypeList && elementOption != nil && elementOption.IsFilePath) {
						updatePathsProperty(configFile, configDir, property, changeTracker, oldToNew, l.converters, l.UseCaseSensitiveFileNames())
						return
					}
				}

				if propertyName != "paths" || !ast.IsObjectLiteralExpression(property.Initializer) {
					return
				}
				forEachObjectProperty(property.Initializer.AsObjectLiteralExpression(), func(pathsProperty *ast.PropertyAssignment, _ string) {
					if !ast.IsArrayLiteralExpression(pathsProperty.Initializer) {
						return
					}
					for _, element := range pathsProperty.Initializer.Elements() {
						tryUpdateConfigString(configFile, configDir, element, changeTracker, oldToNew, l.converters, l.UseCaseSensitiveFileNames())
					}
				})
			})
		}
	})
}

func updatePathsProperty(configFile *ast.SourceFile, configDir string, property *ast.PropertyAssignment, changeTracker *change.Tracker, oldToNew pathUpdater, converters *lsconv.Converters, useCaseSensitiveFileNames bool) bool {
	elements := []*ast.Node{property.Initializer}
	if ast.IsArrayLiteralExpression(property.Initializer) {
		elements = property.Initializer.Elements()
	}

	foundExactMatch := false
	for _, element := range elements {
		foundExactMatch = tryUpdateConfigString(configFile, configDir, element, changeTracker, oldToNew, converters, useCaseSensitiveFileNames) || foundExactMatch
	}
	return foundExactMatch
}

func tryUpdateConfigString(configFile *ast.SourceFile, configDir string, element *ast.Node, changeTracker *change.Tracker, oldToNew pathUpdater, converters *lsconv.Converters, useCaseSensitiveFileNames bool) bool {
	if !ast.IsStringLiteral(element) {
		return false
	}

	elementFileName := tspath.NormalizePath(tspath.CombinePaths(configDir, element.Text()))
	updated, ok := oldToNew(elementFileName)
	if !ok {
		return false
	}

	changeTracker.ReplaceRangeWithText(configFile, lsproto.Range{
		Start: converters.PositionToLineAndCharacter(configFile, core.TextPos(scanner.GetTokenPosOfNode(element, configFile, false)+1)),
		End:   converters.PositionToLineAndCharacter(configFile, core.TextPos(element.End()-1)),
	}, relativePathFromDirectory(configDir, updated, useCaseSensitiveFileNames))
	return true
}

func (l *LanguageService) updateRelativePath(oldToNew pathUpdater, oldImportFromPath, newImportFromPath, relativeSpecifier string) string {
	oldAbsolute := tspath.NormalizePath(tspath.CombinePaths(tspath.GetDirectoryPath(oldImportFromPath), relativeSpecifier))
	newAbsolute, ok := oldToNew(oldAbsolute)
	if !ok {
		newAbsolute = oldAbsolute
	}
	return relativeImportPathFromDirectory(tspath.GetDirectoryPath(newImportFromPath), newAbsolute, l.UseCaseSensitiveFileNames())
}

func (l *LanguageService) updateImportsForFileRename(program *compiler.Program, changeTracker *change.Tracker, oldToNew pathUpdater) {
	allFiles := program.GetSourceFiles()
	checker, done := program.GetTypeChecker(context.Background())
	defer done()
	moduleSpecifierPreferences := l.UserPreferences().ModuleSpecifierPreferences()

	for _, sourceFile := range allFiles {
		oldFileName := sourceFile.FileName()
		newFromOld, fileMoved := oldToNew(sourceFile.FileName())
		newImportFromPath := sourceFile.FileName()
		if fileMoved {
			newImportFromPath = newFromOld
		}

		for _, ref := range sourceFile.ReferencedFiles {
			if !tspath.IsExternalModuleNameRelative(ref.FileName) {
				continue
			}
			updated := l.updateRelativePath(oldToNew, oldFileName, newImportFromPath, ref.FileName)
			if updated != ref.FileName {
				changeTracker.ReplaceRangeWithText(sourceFile, l.converters.ToLSPRange(sourceFile, ref.TextRange), updated)
			}
		}

		for _, importStringLiteral := range sourceFile.Imports() {
			updated := l.getUpdatedImportSpecifier(program, checker, sourceFile, importStringLiteral, oldToNew, newImportFromPath, fileMoved, moduleSpecifierPreferences)
			if updated != "" && updated != importStringLiteral.Text() {
				changeTracker.ReplaceRangeWithText(sourceFile, l.converters.ToLSPRange(sourceFile, createStringTextRange(sourceFile, importStringLiteral)), updated)
			}
		}
	}
}

// We assume the source file did not move to a different program.
func (l *LanguageService) getUpdatedImportSpecifier(
	program *compiler.Program,
	checker *checker.Checker,
	sourceFile *ast.SourceFile, // old importing source file
	importLiteral *ast.StringLiteralLike,
	oldToNew pathUpdater,
	newImportFromPath string,
	importingSourceFileMoved bool,
	userPreferences modulespecifiers.UserPreferences,
) string {
	importedModuleSymbol := checker.GetSymbolAtLocation(importLiteral)
	if isAmbientModuleSymbol(importedModuleSymbol) {
		return ""
	}

	target := getSourceFileToImport(program, sourceFile, importLiteral, oldToNew)

	if target == nil {
		// First fall back: try every file in the program to see if any of them would match the import specifier, and if so, obtain the updated specifier for that file.
		if updated := getUpdatedImportSpecifierFromMovedSourceFiles(program, sourceFile, importLiteral, oldToNew, newImportFromPath, userPreferences); updated != "" && updated != importLiteral.Text() {
			return updated
		}
		// Fall back to a regular path update for unresolved module.
		if tspath.IsExternalModuleNameRelative(importLiteral.Text()) {
			return l.updateRelativePath(oldToNew, sourceFile.FileName(), newImportFromPath, importLiteral.Text())
		}
		return ""
	}

	// Optimization: neither the importing or imported file changed.
	if !target.updated && !(importingSourceFileMoved && tspath.IsExternalModuleNameRelative(importLiteral.Text())) {
		return ""
	}

	updated := modulespecifiers.UpdateModuleSpecifier(
		program.Options(),
		program,
		sourceFile,
		newImportFromPath,
		importLiteral.Text(),
		target.newFileName,
		userPreferences,
		modulespecifiers.ModuleSpecifierOptions{
			OverrideImportMode: program.GetModeForUsageLocation(sourceFile, importLiteral),
		},
	)
	return updated
}

func getSourceFileToImport(
	program *compiler.Program,
	sourceFile *ast.SourceFile,
	importLiteral *ast.StringLiteralLike,
	oldToNew pathUpdater,
) *toImport {
	if resolved := program.GetResolvedModuleFromModuleSpecifier(sourceFile, importLiteral); resolved != nil && resolved.ResolvedFileName != "" {
		oldFileName := resolved.ResolvedFileName
		if newFileName, ok := oldToNew(oldFileName); ok {
			return &toImport{newFileName: newFileName, updated: true}
		}
		return &toImport{newFileName: oldFileName, updated: false}
	}

	return nil
}

// As a fall back for unresolved modules, we'll check all files in the program to see if any of them would match
// the import specifier, and if so, we'll obtain the updated specifier for that file.
func getUpdatedImportSpecifierFromMovedSourceFiles(program *compiler.Program, sourceFile *ast.SourceFile, importLiteral *ast.StringLiteralLike, oldToNew pathUpdater, importingSourceFileName string, userPreferences modulespecifiers.UserPreferences) string {
	resolutionMode := program.GetModeForUsageLocation(sourceFile, importLiteral)
	for _, candidate := range program.GetSourceFiles() {
		newFileName, ok := oldToNew(candidate.FileName())
		if !ok {
			continue
		}

		oldSpecifier := modulespecifiers.UpdateModuleSpecifier(
			program.Options(),
			program,
			sourceFile,
			importingSourceFileName,
			importLiteral.Text(),
			candidate.FileName(),
			userPreferences,
			modulespecifiers.ModuleSpecifierOptions{
				OverrideImportMode: resolutionMode,
			},
		)
		if oldSpecifier != importLiteral.Text() {
			continue
		}

		return modulespecifiers.UpdateModuleSpecifier(
			program.Options(),
			program,
			sourceFile,
			importingSourceFileName,
			importLiteral.Text(),
			newFileName,
			userPreferences,
			modulespecifiers.ModuleSpecifierOptions{
				OverrideImportMode: resolutionMode,
			},
		)
	}
	return ""
}

func createStringTextRange(sourceFile *ast.SourceFile, node *ast.LiteralLikeNode) core.TextRange {
	return core.NewTextRange(scanner.GetTokenPosOfNode(node, sourceFile, false)+1, node.End()-1)
}

func getTsConfigObjectLiteralExpression(tsConfigSourceFile *ast.SourceFile) *ast.ObjectLiteralExpression {
	if tsConfigSourceFile != nil && tsConfigSourceFile.Statements != nil && len(tsConfigSourceFile.Statements.Nodes) > 0 {
		expression := tsConfigSourceFile.Statements.Nodes[0].Expression()
		if ast.IsObjectLiteralExpression(expression) {
			return expression.AsObjectLiteralExpression()
		}
	}
	return nil
}

func forEachObjectProperty(objectLiteral *ast.ObjectLiteralExpression, cb func(property *ast.PropertyAssignment, propertyName string)) {
	if objectLiteral == nil {
		return
	}
	for _, property := range objectLiteral.Properties.Nodes {
		if !ast.IsPropertyAssignment(property) {
			continue
		}
		if name, ok := ast.TryGetTextOfPropertyName(property.Name()); ok {
			cb(property.AsPropertyAssignment(), name)
		}
	}
}

func relativePathFromDirectory(fromDirectory string, to string, useCaseSensitiveFileNames bool) string {
	return tspath.GetRelativePathFromDirectory(fromDirectory, to, tspath.ComparePathsOptions{UseCaseSensitiveFileNames: useCaseSensitiveFileNames})
}

func relativeImportPathFromDirectory(fromDirectory string, to string, useCaseSensitiveFileNames bool) string {
	return tspath.EnsurePathIsNonModuleName(relativePathFromDirectory(fromDirectory, to, useCaseSensitiveFileNames))
}

func isAmbientModuleSymbol(symbol *ast.Symbol) bool {
	if symbol == nil {
		return false
	}
	return slices.ContainsFunc(symbol.Declarations, ast.IsModuleWithStringLiteralName)
}
