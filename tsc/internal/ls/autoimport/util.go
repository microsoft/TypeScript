package autoimport

import (
	"context"
	"runtime"
	"sync/atomic"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/modulespecifiers"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/wrapvfs"
)

func tryGetModuleIDAndFileNameOfModuleSymbol(symbol *ast.Symbol) (ModuleID, tspath.RootedFilePath, bool) {
	if !symbol.IsExternalModule() {
		return ModuleID{}, "", false
	}
	decl := ast.GetNonAugmentationDeclaration(symbol)
	if decl == nil {
		return ModuleID{}, "", false
	}
	if decl.Kind == ast.KindSourceFile {
		return fileModuleID(decl.AsSourceFile().PathKey()), decl.AsSourceFile().FileName(), true
	}
	if ast.IsModuleWithStringLiteralName(decl) {
		return ambientModuleID(decl.Name().Text()), "", true
	}
	return ModuleID{}, "", false
}

func getModuleIDAndFileNameOfModuleSymbol(symbol *ast.Symbol) (ModuleID, tspath.RootedFilePath) {
	if !symbol.IsExternalModule() {
		panic("symbol is not an external module")
	}
	decl := ast.GetNonAugmentationDeclaration(symbol)
	if decl == nil {
		panic("module symbol has no non-augmentation declaration")
	}
	if decl.Kind == ast.KindSourceFile {
		return fileModuleID(decl.AsSourceFile().PathKey()), decl.AsSourceFile().FileName()
	}
	if ast.IsModuleWithStringLiteralName(decl) {
		return ambientModuleID(decl.Name().Text()), ""
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

func getPackageNamesInNodeModules(nodeModulesDir tspath.RootedDirectoryPath, fs vfs.FS) *collections.Set[string] {
	packageNames := &collections.Set[string]{}
	if nodeModulesDir.AsPath().BaseName() != "node_modules" {
		panic("nodeModulesDir is not a node_modules directory")
	}
	// A missing node_modules directory yields no entries (GetAccessibleEntries returns
	// empty), so there's no need to check existence first: a deleted node_modules is
	// handled upstream in updateBucketAndDirectoryExistence, which drops the bucket.
	entries := fs.GetAccessibleEntries(nodeModulesDir)
	for _, baseName := range entries.Directories {
		if baseName[0] == '.' {
			continue
		}
		if baseName[0] == '@' {
			scopedDirPath := nodeModulesDir.ResolveDirectory(baseName)
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
	return packageNames
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
	rawNames := program.ResolvedPackageNames()
	unresolvedPackageNames := program.UnresolvedPackageNames()

	// Normalize @types/ package names to their actual package names
	// (e.g., "@types/react" → "react"). ResolvedPackageNames can contain
	// @types names when the program resolves an import like "react" to
	// "@types/react/index.d.ts" via the PackageId.Name field.
	resolvedPackageNames := collections.NewSetWithSizeHint[string](rawNames.Len())
	for name := range rawNames.Keys() {
		resolvedPackageNames.Add(module.GetPackageNameFromTypesPackageName(name))
	}

	for _, name := range program.Options().Types {
		if name != "*" {
			resolvedPackageNames.Add(module.GetPackageNameFromTypesPackageName(name))
		}
	}

	if unresolvedPackageNames.Len() > 0 {
		checker, done := program.GetTypeChecker(ctx)
		defer done()
		for name := range unresolvedPackageNames.Keys() {
			if symbol := checker.TryFindAmbientModule(name); symbol != nil {
				declaringFile := ast.GetSourceFileOfModule(symbol)
				if packageName := modulespecifiers.GetPackageNameFromDirectory(tspath.RootedPath(declaringFile.FileName())); packageName != "" {
					resolvedPackageNames.Add(module.GetPackageNameFromTypesPackageName(packageName))
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
func addProjectReferenceOutputMappings(program *compiler.Program, result map[tspath.PathKey]tspath.RootedFilePath) {
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
					ch := core.FirstResult(checker.NewChecker(program, nil))
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
		if name == "" || name == "@types/" || name[0] == '.' {
			// Edge cases that could make us blow up probably
			return true
		}
		if field == "dependencies" || field == "peerDependencies" {
			deps.Add(module.GetPackageNameFromTypesPackageName(name))
		}
		return true
	})
}

// getPackageRealpathFuncs returns functions to transform between symlink and realpath for files within a package.
// It calls FS.Realpath once per package directory and uses prefix substitution for files within that directory,
// avoiding expensive realpath syscalls for each file. For files outside the package (e.g. re-exported
// dependencies reached through node_modules symlinks), it resolves the file's directory realpath once,
// finds the symlink boundary (the package root where the symlink lives), and caches that prefix mapping.
// All subsequent files under the same symlinked package directory use prefix substitution with no syscalls.
func getPackageRealpathFuncs(fs vfs.FS, packageDirectory tspath.RootedDirectoryPath) (toRealpath, toSymlink func(tspath.RootedFilePath) tspath.RootedFilePath) {
	realPackageDirectory := tspath.RootedDirectoryPathFromPath(fs.Realpath(packageDirectory.AsPath()))
	isSymlinked := realPackageDirectory != packageDirectory
	// Cache of package-directory-level symlink→realpath prefix mappings for
	// external packages encountered via re-exports. Keyed by the node_modules
	// package directory (e.g. "/app/node_modules/dep"), so all files under
	// that package reuse a single realpath lookup.
	dirCache := make(map[tspath.RootedDirectoryPath]tspath.RootedDirectoryPath)
	toRealpath = func(fileName tspath.RootedFilePath) tspath.RootedFilePath {
		// Fast path: files within the package use prefix substitution.
		if isSymlinked {
			if relative, ok := fileName.RelativeTo(packageDirectory); ok {
				return realPackageDirectory.ResolveRelativeFile(relative)
			}
		}
		// Files outside the package (e.g. re-exports into symlinked deps):
		// find the node_modules package directory, resolve it once, and cache.
		packageDir := module.NodeModulePackageRootForFile(fileName)
		if packageDir == "" {
			return fileName
		}
		// The wrapped FS also calls Realpath while traversing directories.
		// The two parses differ only when the path may be a package root,
		// so establish its kind before using the package cache.
		directory := tspath.RootedDirectoryPathFromPath(tspath.RootedPath(fileName))
		if directoryPackage := module.NodeModulePackageRootForDirectory(directory); directoryPackage != packageDir {
			if fs.DirectoryExists(directory) {
				packageDir = directoryPackage
			}
		}
		if realDir, ok := dirCache[packageDir]; ok {
			if realDir == packageDir {
				return fileName
			}
			relative, _ := fileName.RelativeTo(packageDir)
			return realDir.ResolveRelativeFile(relative)
		}
		realDir := tspath.RootedDirectoryPathFromPath(fs.Realpath(packageDir.AsPath()))
		dirCache[packageDir] = realDir
		if realDir == packageDir {
			return fileName
		}
		relative, _ := fileName.RelativeTo(packageDir)
		return realDir.ResolveRelativeFile(relative)
	}
	if !isSymlinked {
		return toRealpath, core.Identity
	}
	// toSymlink only handles files within the package directory (reversing the
	// packageDir→realPackageDir substitution). It does not handle arbitrary external
	// paths; callers should only use it for files known to be within the package.
	toSymlink = func(fileName tspath.RootedFilePath) tspath.RootedFilePath {
		if relative, ok := fileName.RelativeTo(realPackageDirectory); ok {
			return packageDirectory.ResolveRelativeFile(relative)
		}
		return fileName
	}
	return toRealpath, toSymlink
}

type resolutionHost struct {
	fs               vfs.FS
	currentDirectory tspath.RootedDirectoryPath
}

var _ module.ResolutionHost = (*resolutionHost)(nil)

func (rh *resolutionHost) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return rh.currentDirectory
}

func (rh *resolutionHost) FS() vfs.FS {
	return rh.fs
}

func getModuleResolver(host RegistryCloneHost, realpath func(tspath.RootedFilePath) tspath.RootedFilePath, opts module.ResolverOptions) *module.Resolver {
	realpathPath := func(path tspath.RootedPath) tspath.RootedPath {
		return realpath(tspath.RootedFilePathFromPath(path)).AsPath()
	}
	rh := &resolutionHost{
		fs:               wrapvfs.Wrap(host.FS(), wrapvfs.Replacements{Realpath: realpathPath}),
		currentDirectory: host.GetCurrentDirectory(),
	}
	return module.NewResolverWithOptions(rh, rh.GetCurrentDirectory(), core.EmptyCompilerOptions, "", "", opts)
}
