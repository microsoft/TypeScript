package autoimport

import (
	"context"
	"runtime"
	"strings"
	"sync/atomic"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func tryGetModuleIDAndFileNameOfModuleSymbol(symbol *ast.Symbol) (ModuleID, string, bool) {
	if !symbol.IsExternalModule() {
		return "", "", false
	}
	decl := ast.GetNonAugmentationDeclaration(symbol)
	if decl == nil {
		return "", "", false
	}
	if decl.Kind == ast.KindSourceFile {
		return ModuleID(decl.AsSourceFile().Path()), decl.AsSourceFile().FileName(), true
	}
	if ast.IsModuleWithStringLiteralName(decl) {
		return ModuleID(decl.Name().Text()), "", true
	}
	return "", "", false
}

func getModuleIDAndFileNameOfModuleSymbol(symbol *ast.Symbol) (ModuleID, string) {
	if !symbol.IsExternalModule() {
		panic("symbol is not an external module")
	}
	decl := ast.GetNonAugmentationDeclaration(symbol)
	if decl == nil {
		panic("module symbol has no non-augmentation declaration")
	}
	if decl.Kind == ast.KindSourceFile {
		return ModuleID(decl.AsSourceFile().Path()), decl.AsSourceFile().FileName()
	}
	if ast.IsModuleWithStringLiteralName(decl) {
		return ModuleID(decl.Name().Text()), ""
	}
	panic("could not determine module ID of module symbol")
}

// wordIndices splits an identifier into its constituent words based on camelCase and snake_case conventions
// by returning the starting byte indices of each word. The first index is always 0.
//   - CamelCase
//     ^    ^
//   - snake_case
//     ^     ^
//   - ParseURL
//     ^    ^
//   - __proto__
//     ^
func wordIndices(s string) []int {
	var indices []int
	for byteIndex, runeValue := range s {
		if byteIndex == 0 {
			indices = append(indices, byteIndex)
			continue
		}
		if runeValue == '_' {
			if byteIndex+1 < len(s) && s[byteIndex+1] != '_' {
				indices = append(indices, byteIndex+1)
			}
			continue
		}
		if unicode.IsUpper(runeValue) && (unicode.IsLower(core.FirstResult(utf8.DecodeLastRuneInString(s[:byteIndex]))) || (byteIndex+1 < len(s) && unicode.IsLower(core.FirstResult(utf8.DecodeRuneInString(s[byteIndex+1:]))))) {
			indices = append(indices, byteIndex)
		}
	}
	return indices
}

func getPackageNamesInNodeModules(nodeModulesDir string, fs vfs.FS) (*collections.Set[string], error) {
	packageNames := &collections.Set[string]{}
	if tspath.GetBaseFileName(nodeModulesDir) != "node_modules" {
		panic("nodeModulesDir is not a node_modules directory")
	}
	if !fs.DirectoryExists(nodeModulesDir) {
		return nil, vfs.ErrNotExist
	}
	entries := fs.GetAccessibleEntries(nodeModulesDir)
	for _, baseName := range entries.Directories {
		if baseName[0] == '.' {
			continue
		}
		if baseName[0] == '@' {
			scopedDirPath := tspath.CombinePaths(nodeModulesDir, baseName)
			for _, scopedPackageDirName := range fs.GetAccessibleEntries(scopedDirPath).Directories {
				scopedBaseName := tspath.GetBaseFileName(scopedPackageDirName)
				if baseName == "@types" {
					packageNames.Add(module.GetPackageNameFromTypesPackageName(tspath.CombinePaths("@types", scopedBaseName)))
				} else {
					packageNames.Add(tspath.CombinePaths(baseName, scopedBaseName))
				}
			}
			continue
		}
		packageNames.Add(baseName)
	}
	return packageNames, nil
}

func getDefaultLikeExportNameFromDeclaration(symbol *ast.Symbol) string {
	for _, d := range symbol.Declarations {
		// "export default" in this case. See `ExportAssignment`for more details.
		if ast.IsExportAssignment(d) {
			if innerExpression := ast.SkipOuterExpressions(d.Expression(), ast.OEKAll); ast.IsIdentifier(innerExpression) {
				return innerExpression.Text()
			}
			continue
		}
		// "export { ~ as default }"
		if ast.IsExportSpecifier(d) && d.Symbol().Flags == ast.SymbolFlagsAlias && d.PropertyName() != nil {
			if d.PropertyName().Kind == ast.KindIdentifier {
				return d.PropertyName().Text()
			}
			continue
		}
		// GH#52694
		if name := ast.GetNameOfDeclaration(d); name != nil && name.Kind == ast.KindIdentifier {
			return name.Text()
		}
		if symbol.Parent != nil && !checker.IsExternalModuleSymbol(symbol.Parent) {
			return symbol.Parent.Name
		}
	}
	return ""
}

func getResolvedPackageNames(ctx context.Context, program *compiler.Program) *collections.Set[string] {
	resolvedPackageNames := program.ResolvedPackageNames().Clone()
	unresolvedPackageNames := program.UnresolvedPackageNames()
	if unresolvedPackageNames.Len() > 0 {
		checker, done := program.GetTypeChecker(ctx)
		defer done()
		for name := range unresolvedPackageNames.Keys() {
			if symbol := checker.TryFindAmbientModule(name); symbol != nil {
				declaringFile := ast.GetSourceFileOfModule(symbol)
				if packageName := modulespecifiers.GetPackageNameFromDirectory(declaringFile.FileName()); packageName != "" {
					resolvedPackageNames.Add(packageName)
				}
			}
		}
	}
	return resolvedPackageNames
}

// addProjectReferenceOutputMappings adds output .d.ts to source file mappings
// from a program's project references to the provided map.
// This is used during node_modules bucket building to redirect extraction
// from output files to source files when the output is from a project reference.
func addProjectReferenceOutputMappings(program *compiler.Program, result map[tspath.Path]string) {
	refs := program.GetResolvedProjectReferences()
	for _, ref := range refs {
		if ref == nil {
			continue
		}
		ref.ParseInputOutputNames()
		for outputDtsPath, mapping := range ref.OutputDtsToProjectReference() {
			// Only add if not already present (first program wins)
			if _, exists := result[outputDtsPath]; !exists {
				result[outputDtsPath] = mapping.Source
			}
		}
	}
}

func createCheckerPool(program checker.Program) (getChecker func() (*checker.Checker, func()), closePool func(), getCreatedCount func() int32) {
	maxSize := int32(runtime.GOMAXPROCS(0))
	pool := make(chan *checker.Checker, maxSize)
	var created atomic.Int32

	return func() (*checker.Checker, func()) {
			// Try to get an existing checker
			select {
			case ch := <-pool:
				return ch, func() { pool <- ch }
			default:
				break
			}
			// Try to create a new one if under limit
			for {
				current := created.Load()
				if current >= maxSize {
					// At limit, wait for one to become available
					ch := <-pool
					return ch, func() { pool <- ch }
				}
				if created.CompareAndSwap(current, current+1) {
					ch := core.FirstResult(checker.NewChecker(program))
					return ch, func() { pool <- ch }
				}
			}
		}, func() {
			close(pool)
		}, func() int32 {
			return created.Load()
		}
}

// addPackageJsonDependencies adds all dependencies and peerDependencies from a package.json
// to the given set, canonicalizing @types package names to their base names.
func addPackageJsonDependencies(contents *packagejson.PackageJson, deps *collections.Set[string]) {
	contents.RangeDependencies(func(name, _, field string) bool {
		if field == "dependencies" || field == "peerDependencies" {
			deps.Add(module.GetPackageNameFromTypesPackageName(name))
		}
		return true
	})
}

// getPackageRealpathFuncs returns functions to transform between symlink and realpath for files within a package.
// It calls FS.Realpath once per package directory and uses string replacement for files,
// avoiding expensive realpath syscalls for each file.
func getPackageRealpathFuncs(fs vfs.FS, packageDir string) (toRealpath, toSymlink func(string) string) {
	realPackageDir := fs.Realpath(packageDir)
	if realPackageDir == packageDir {
		// Not a symlink, both directions are identity
		return core.Identity, core.Identity
	}
	// Package is symlinked; derive paths by replacing the prefix
	toRealpath = func(fileName string) string {
		if after, ok := strings.CutPrefix(fileName, packageDir); ok {
			return realPackageDir + after
		}
		return fileName
	}
	toSymlink = func(fileName string) string {
		if after, ok := strings.CutPrefix(fileName, realPackageDir); ok {
			return packageDir + after
		}
		return fileName
	}
	return toRealpath, toSymlink
}
