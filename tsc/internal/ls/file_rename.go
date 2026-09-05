package ls

import (
	"context"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/ls/change"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/modulespecifiers"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type pathUpdater func(path tspath.RootedFilePath) (tspath.RootedFilePath, bool)

type toImport struct {
	newFileName tspath.RootedFilePath
	updated     bool
}

type movedFile struct {
	sourceFile  *ast.SourceFile
	newFileName tspath.RootedFilePath
}

func (l *LanguageService) GetEditsForFileRename(ctx context.Context, oldURI lsproto.DocumentUri, newURI lsproto.DocumentUri) []lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile {
	program := l.GetProgram()
	oldPath := tspath.RootedPath(oldURI.FileName())
	newPath := tspath.RootedPath(newURI.FileName())

	oldToNew := l.createPathUpdater(oldPath, newPath)

	changeTracker := change.NewTracker(ctx, program.Options(), l.FormatOptions(), l.converters)
	l.updateTsconfigFiles(program, changeTracker, oldToNew, tspath.RootedFilePathFromPath(oldPath), tspath.RootedFilePathFromPath(newPath))
	l.updateImportsForFileRename(program, changeTracker, oldToNew)

	var documentChanges []lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile

	// When renaming e.g. `foo.d.css.ts` -> `bar.d.css.ts`, also rename `foo.css` -> `bar.css` if it exists.
	oldFile := tspath.RootedFilePathFromPath(oldPath)
	newFile := tspath.RootedFilePathFromPath(newPath)
	if oldFile.IsDeclarationFile() && newFile.IsDeclarationFile() {
		dtsExt := oldFile.DeclarationFileExtension()
		originalExtensions := tspath.GetPossibleOriginalInputExtensionForExtension(dtsExt)
		for _, ext := range originalExtensions {
			oldOriginalPath := oldFile.ChangeFullExtension(ext)
			if l.host.FileExists(oldOriginalPath) {
				newDtsExt := newFile.DeclarationFileExtension()
				newOriginalExtensions := tspath.GetPossibleOriginalInputExtensionForExtension(newDtsExt)
				if slices.Contains(newOriginalExtensions, ext) {
					newOriginalPath := newFile.ChangeFullExtension(ext)
					documentChanges = append(documentChanges, lsproto.TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile{
						RenameFile: &lsproto.RenameFile{
							OldUri: lsconv.FilePathToDocumentURI(oldOriginalPath),
							NewUri: lsconv.FilePathToDocumentURI(newOriginalPath),
						},
					})
				}
			}
		}
	}

	changes, _ := changeTracker.GetChanges()
	for fileName, edits := range changes {
		uri := lsconv.FilePathToDocumentURI(fileName)
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

func (l *LanguageService) createPathUpdater(oldPath tspath.RootedPath, newPath tspath.RootedPath) pathUpdater {
	caseSensitivity := l.CaseSensitivity()
	return func(path tspath.RootedFilePath) (tspath.RootedFilePath, bool) {
		if caseSensitivity.CompareFilePaths(path, tspath.RootedFilePathFromPath(oldPath)) == 0 {
			return tspath.RootedFilePathFromPath(newPath), true
		}
		if relativePath, ok := caseSensitivity.RelativeFilePathFromDirectory(tspath.RootedDirectoryPathFromPath(oldPath), path); ok {
			return tspath.RootedDirectoryPathFromPath(newPath).ResolveRelativeFile(relativePath), true
		}
		return "", false
	}
}

func (l *LanguageService) updateTsconfigFiles(program *compiler.Program, changeTracker *change.Tracker, oldToNew pathUpdater, oldPath tspath.RootedFilePath, newPath tspath.RootedFilePath) {
	commandLine := program.CommandLine()
	if commandLine == nil || commandLine.ConfigFile == nil {
		return
	}

	configFile := commandLine.ConfigFile.SourceFile
	if configFile == nil {
		return
	}
	configDir := configFile.FileName().Directory()
	jsonObjectLiteral := getTsConfigObjectLiteralExpression(configFile)
	if jsonObjectLiteral == nil {
		return
	}

	forEachObjectProperty(jsonObjectLiteral, func(property *ast.PropertyAssignment, propertyName string) {
		switch propertyName {
		case "files", "include", "exclude":
			foundExactMatch := updatePathsProperty(configFile, configDir, property, changeTracker, oldToNew, l.converters, l.CaseSensitivity())
			if foundExactMatch || propertyName != "include" || !ast.IsArrayLiteralExpression(property.Initializer) {
				return
			}
			if oldSpec, isDefault := commandLine.GetMatchedIncludeSpec(oldPath); oldSpec != "" && !isDefault {
				if newSpec, _ := commandLine.GetMatchedIncludeSpec(newPath); newSpec == "" {
					elements := property.Initializer.Elements()
					if len(elements) > 0 {
						newPathText := newPath.AsString()
						if relativePath, ok := l.CaseSensitivity().RelativePathFromDirectory(configDir, newPath); ok {
							newPathText = relativePath.AsString()
						}
						changeTracker.InsertNodeAfter(
							configFile,
							elements[len(elements)-1],
							changeTracker.NodeFactory.NewStringLiteral(newPathText, ast.TokenFlagsNone),
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
					if option.PathKind.IsRooted() || (option.Kind == tsoptions.CommandLineOptionTypeList && elementOption != nil && elementOption.PathKind.IsRooted()) {
						updatePathsProperty(configFile, configDir, property, changeTracker, oldToNew, l.converters, l.CaseSensitivity())
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
						tryUpdateConfigString(configFile, configDir, element, changeTracker, oldToNew, l.converters, l.CaseSensitivity())
					}
				})
			})
		}
	})
}

func updatePathsProperty(configFile *ast.SourceFile, configDir tspath.RootedDirectoryPath, property *ast.PropertyAssignment, changeTracker *change.Tracker, oldToNew pathUpdater, converters *lsconv.Converters, caseSensitivity tspath.CaseSensitivity) bool {
	elements := []*ast.Node{property.Initializer}
	if ast.IsArrayLiteralExpression(property.Initializer) {
		elements = property.Initializer.Elements()
	}

	foundExactMatch := false
	for _, element := range elements {
		foundExactMatch = tryUpdateConfigString(configFile, configDir, element, changeTracker, oldToNew, converters, caseSensitivity) || foundExactMatch
	}
	return foundExactMatch
}

func tryUpdateConfigString(configFile *ast.SourceFile, configDir tspath.RootedDirectoryPath, element *ast.Node, changeTracker *change.Tracker, oldToNew pathUpdater, converters *lsconv.Converters, caseSensitivity tspath.CaseSensitivity) bool {
	if !ast.IsStringLiteral(element) {
		return false
	}

	elementFileName := configDir.ResolveFile(element.Text())
	updated, ok := oldToNew(elementFileName)
	if !ok {
		return false
	}

	textRange := core.NewTextRange(scanner.GetTokenPosOfNode(element, configFile, false)+1, element.End()-1)
	lspRange, fidelity := converters.ToLSPRange(configFile, textRange)
	debug.Assert(fidelity.IsExact(), "config files are not content-mapped")
	changeTracker.ReplaceRangeWithText(configFile, lspRange, relativePathFromDirectory(configDir, updated, caseSensitivity))
	return true
}

func (l *LanguageService) updateRelativePath(oldToNew pathUpdater, oldImportFromPath tspath.RootedFilePath, newImportFromPath tspath.RootedFilePath, relativeSpecifier tspath.ModuleSpecifier) tspath.ModuleSpecifier {
	oldAbsolute := oldImportFromPath.Directory().ResolveFile(relativeSpecifier.AsString())
	newAbsolute, ok := oldToNew(oldAbsolute)
	if !ok {
		newAbsolute = oldAbsolute
	}
	return relativeImportPathFromDirectory(newImportFromPath.Directory(), newAbsolute, l.CaseSensitivity())
}

func (l *LanguageService) updateImportsForFileRename(program *compiler.Program, changeTracker *change.Tracker, oldToNew pathUpdater) {
	allFiles := program.GetSourceFiles()
	checker, done := program.GetTypeChecker(context.Background())
	defer done()
	moduleSpecifierPreferences := l.UserPreferences().ModuleSpecifierPreferences()

	var movedFiles []movedFile
	for _, sourceFile := range allFiles {
		if newFileName, ok := oldToNew(sourceFile.OriginalFileName()); ok {
			movedFiles = append(movedFiles, movedFile{sourceFile: sourceFile, newFileName: newFileName})
		}
	}

	for _, sourceFile := range allFiles {
		oldFileName := sourceFile.OriginalFileName()
		newFromOld, fileMoved := oldToNew(oldFileName)
		newImportFromPath := oldFileName
		if fileMoved {
			newImportFromPath = newFromOld
		}

		for _, ref := range sourceFile.ReferencedFiles {
			if !tspath.IsExternalModuleNameRelative(ref.FileName) {
				continue
			}
			updated := l.updateRelativePath(oldToNew, oldFileName, newImportFromPath, tspath.ToModuleSpecifier(ref.FileName))
			if updated.AsString() != ref.FileName {
				changeTracker.ReplaceTextRangeWithText(sourceFile, ref.TextRange, updated.AsString())
			}
		}

		for _, importStringLiteral := range sourceFile.Imports() {
			updated := l.getUpdatedImportSpecifier(program, checker, sourceFile, importStringLiteral, oldToNew, movedFiles, newImportFromPath, fileMoved, moduleSpecifierPreferences)
			if updated != "" && updated != importStringLiteral.Text() {
				changeTracker.ReplaceTextRangeWithText(sourceFile, createStringTextRange(sourceFile, importStringLiteral), updated)
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
	movedFiles []movedFile,
	newImportFromPath tspath.RootedFilePath,
	importingSourceFileMoved bool,
	userPreferences modulespecifiers.UserPreferences,
) string {
	importedModuleSymbol := checker.GetSymbolAtLocation(importLiteral)
	if isAmbientModuleSymbol(importedModuleSymbol) {
		return ""
	}

	target := getSourceFileToImport(program, sourceFile, importLiteral, oldToNew)

	if target == nil {
		// First fall back: try every file affected by the rename to see if any of them would match the import specifier, and if so, obtain the updated specifier for that file.
		if updated := getUpdatedImportSpecifierFromMovedSourceFiles(program, sourceFile, importLiteral, movedFiles, newImportFromPath, userPreferences); updated != "" && updated != importLiteral.Text() {
			return updated
		}
		// Fall back to a regular path update for unresolved module.
		if tspath.IsExternalModuleNameRelative(importLiteral.Text()) {
			return l.updateRelativePath(oldToNew, sourceFile.FileName(), newImportFromPath, tspath.ToModuleSpecifier(importLiteral.Text())).AsString()
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
		tspath.ToModuleSpecifier(importLiteral.Text()),
		target.newFileName,
		userPreferences,
		modulespecifiers.ModuleSpecifierOptions{
			OverrideImportMode: program.GetModeForUsageLocation(sourceFile, importLiteral),
		},
	)
	return updated.AsString()
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

// As a fall back for unresolved modules, we'll check every file affected by the rename to see if any of them would match
// the import specifier, and if so, we'll obtain the updated specifier for that file.
func getUpdatedImportSpecifierFromMovedSourceFiles(program *compiler.Program, sourceFile *ast.SourceFile, importLiteral *ast.StringLiteralLike, movedFiles []movedFile, importingSourceFileName tspath.RootedFilePath, userPreferences modulespecifiers.UserPreferences) string {
	resolutionMode := program.GetModeForUsageLocation(sourceFile, importLiteral)
	for _, candidate := range movedFiles {
		oldSpecifier := modulespecifiers.UpdateModuleSpecifier(
			program.Options(),
			program,
			sourceFile,
			importingSourceFileName,
			tspath.ToModuleSpecifier(importLiteral.Text()),
			candidate.sourceFile.FileName(),
			userPreferences,
			modulespecifiers.ModuleSpecifierOptions{
				OverrideImportMode: resolutionMode,
			},
		)
		if oldSpecifier.AsString() != importLiteral.Text() {
			continue
		}

		return modulespecifiers.UpdateModuleSpecifier(
			program.Options(),
			program,
			sourceFile,
			importingSourceFileName,
			tspath.ToModuleSpecifier(importLiteral.Text()),
			candidate.newFileName,
			userPreferences,
			modulespecifiers.ModuleSpecifierOptions{
				OverrideImportMode: resolutionMode,
			},
		).AsString()
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

func relativePathFromDirectory(fromDirectory tspath.RootedDirectoryPath, to tspath.RootedFilePath, caseSensitivity tspath.CaseSensitivity) string {
	if relativePath, ok := caseSensitivity.RelativePathFromDirectory(fromDirectory, to); ok {
		return relativePath.AsString()
	}
	return to.AsString()
}

func relativeImportPathFromDirectory(fromDirectory tspath.RootedDirectoryPath, to tspath.RootedFilePath, caseSensitivity tspath.CaseSensitivity) tspath.ModuleSpecifier {
	if relativePath, ok := caseSensitivity.RelativePathFromDirectory(fromDirectory, to); ok {
		return relativePath.AsModuleSpecifier()
	}
	return to.AsModuleSpecifier()
}

func isAmbientModuleSymbol(symbol *ast.Symbol) bool {
	if symbol == nil {
		return false
	}
	return slices.ContainsFunc(symbol.Declarations, ast.IsModuleWithStringLiteralName)
}
