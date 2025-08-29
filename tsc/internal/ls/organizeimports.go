package ls

import (
	"cmp"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// statement = anyImportOrRequireStatement
func getImportDeclarationInsertIndex(sortedImports []*ast.Statement, newImport *ast.Statement, comparer func(a, b *ast.Statement) int) int {
	// !!!
	return len(sortedImports)
}

// returns `-1` if `a` is better than `b`
//
//	note: this sorts in descending order of preference; different than convention in other cmp-like functions
func compareModuleSpecifiers(
	a *ImportFix, // !!! ImportFixWithModuleSpecifier
	b *ImportFix, // !!! ImportFixWithModuleSpecifier
	importingFile *ast.SourceFile, // | FutureSourceFile,
	program *compiler.Program,
	preferences UserPreferences,
	allowsImportingSpecifier func(specifier string) bool,
	toPath func(fileName string) tspath.Path,
) int {
	if a.kind == ImportFixKindUseNamespace || b.kind == ImportFixKindUseNamespace {
		return 0
	}
	if comparison := compareBooleans(
		b.moduleSpecifierKind != modulespecifiers.ResultKindNodeModules || allowsImportingSpecifier(b.moduleSpecifier),
		a.moduleSpecifierKind != modulespecifiers.ResultKindNodeModules || allowsImportingSpecifier(a.moduleSpecifier),
	); comparison != 0 {
		return comparison
	}
	if comparison := compareModuleSpecifierRelativity(a, b, preferences); comparison != 0 {
		return comparison
	}
	if comparison := compareNodeCoreModuleSpecifiers(a.moduleSpecifier, b.moduleSpecifier, importingFile, program); comparison != 0 {
		return comparison
	}
	if comparison := compareBooleans(isFixPossiblyReExportingImportingFile(a, importingFile.Path(), toPath), isFixPossiblyReExportingImportingFile(b, importingFile.Path(), toPath)); comparison != 0 {
		return comparison
	}
	if comparison := compareNumberOfDirectorySeparators(a.moduleSpecifier, b.moduleSpecifier); comparison != 0 {
		return comparison
	}
	return 0
}

// True > False
func compareBooleans(a, b bool) int {
	if a && !b {
		return -1
	} else if !a && b {
		return 1
	}
	return 0
}

// returns `-1` if `a` is better than `b`
func compareModuleSpecifierRelativity(a *ImportFix, b *ImportFix, preferences UserPreferences) int {
	switch preferences.ImportModuleSpecifierPreference {
	case modulespecifiers.ImportModuleSpecifierPreferenceNonRelative, modulespecifiers.ImportModuleSpecifierPreferenceProjectRelative:
		return compareBooleans(a.moduleSpecifierKind == modulespecifiers.ResultKindRelative, b.moduleSpecifierKind == modulespecifiers.ResultKindRelative)
	}
	return 0
}

func compareNodeCoreModuleSpecifiers(a, b string, importingFile *ast.SourceFile, program *compiler.Program) int {
	if strings.HasPrefix(a, "node:") && !strings.HasPrefix(b, "node:") {
		if shouldUseUriStyleNodeCoreModules(importingFile, program) {
			return -1
		}
		return 1
	}
	if strings.HasPrefix(b, "node:") && !strings.HasPrefix(a, "node:") {
		if shouldUseUriStyleNodeCoreModules(importingFile, program) {
			return 1
		}
		return -1
	}
	return 0
}

func shouldUseUriStyleNodeCoreModules(file *ast.SourceFile, program *compiler.Program) bool {
	for _, node := range file.Imports() {
		if core.NodeCoreModules()[node.Text()] && !core.ExclusivelyPrefixedNodeCoreModules[node.Text()] {
			if strings.HasPrefix(node.Text(), "node:") {
				return true
			} else {
				return false
			}
		}
	}

	return program.UsesUriStyleNodeCoreModules()
}

// This is a simple heuristic to try to avoid creating an import cycle with a barrel re-export.
// E.g., do not `import { Foo } from ".."` when you could `import { Foo } from "../Foo"`.
// This can produce false positives or negatives if re-exports cross into sibling directories
// (e.g. `export * from "../whatever"`) or are not named "index".
func isFixPossiblyReExportingImportingFile(fix *ImportFix, importingFilePath tspath.Path, toPath func(fileName string) tspath.Path) bool {
	if fix.isReExport != nil && *(fix.isReExport) &&
		fix.exportInfo != nil && fix.exportInfo.moduleFileName != "" && isIndexFileName(fix.exportInfo.moduleFileName) {
		reExportDir := toPath(tspath.GetDirectoryPath(fix.exportInfo.moduleFileName))
		return strings.HasPrefix(string(importingFilePath), string(reExportDir))
	}
	return false
}

func compareNumberOfDirectorySeparators(path1, path2 string) int {
	return cmp.Compare(strings.Count(path1, "/"), strings.Count(path2, "/"))
}

func isIndexFileName(fileName string) bool {
	fileName = tspath.GetBaseFileName(fileName)
	if tspath.FileExtensionIsOneOf(fileName, []string{".js", ".jsx", ".d.ts", ".ts", ".tsx"}) {
		fileName = tspath.RemoveFileExtension(fileName)
	}
	return fileName == "index"
}
