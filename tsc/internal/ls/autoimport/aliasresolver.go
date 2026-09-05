package autoimport

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type pathAndFileName struct {
	path     tspath.PathKey
	fileName tspath.RootedFilePath
}

type aliasResolver struct {
	caseSensitivity tspath.CaseSensitivity
	host            RegistryCloneHost
	moduleResolver  *module.Resolver

	rootFiles []*ast.SourceFile
	// symlinks maps from realpath to symlinked path and file name
	symlinks                    map[tspath.PathKey]pathAndFileName
	onFailedAmbientModuleLookup func(source ast.HasFileName, moduleName string)
	resolvedModules             collections.SyncMap[tspath.PathKey, *collections.SyncMap[module.ModeAwareCacheKey, *module.ResolvedModule]]
}

func newAliasResolver(
	rootFiles []*ast.SourceFile,
	symlinks map[tspath.PathKey]pathAndFileName,
	host RegistryCloneHost,
	moduleResolver *module.Resolver,
	onFailedAmbientModuleLookup func(source ast.HasFileName, moduleName string),
) *aliasResolver {
	r := &aliasResolver{
		caseSensitivity:             host.FS().CaseSensitivity(),
		host:                        host,
		moduleResolver:              moduleResolver,
		rootFiles:                   rootFiles,
		symlinks:                    symlinks,
		onFailedAmbientModuleLookup: onFailedAmbientModuleLookup,
	}
	return r
}

// BindSourceFiles implements checker.Program.
func (r *aliasResolver) BindSourceFiles() {
	// We will bind as we parse
}

// SourceFiles implements checker.Program.
func (r *aliasResolver) SourceFiles() []*ast.SourceFile {
	return r.rootFiles
}

// Options implements checker.Program.
func (r *aliasResolver) Options() *core.CompilerOptions {
	return &core.CompilerOptions{
		NoCheck: core.TSTrue,
	}
}

// BaseDirectory implements checker.Program.
func (r *aliasResolver) BaseDirectory() tspath.RootedDirectoryPath {
	return r.host.GetCurrentDirectory()
}

// CaseSensitivity implements checker.Program.
func (r *aliasResolver) CaseSensitivity() tspath.CaseSensitivity {
	return r.caseSensitivity
}

// GetSourceFile implements checker.Program.
func (r *aliasResolver) GetSourceFile(fileName tspath.RootedFilePath) *ast.SourceFile {
	return r.getSourceFile(fileName, r.caseSensitivity.PathKey(tspath.RootedPath(fileName)))
}

func (r *aliasResolver) getSourceFile(fileName tspath.RootedFilePath, path tspath.PathKey) *ast.SourceFile {
	file := r.host.GetSourceFile(fileName, path)
	// file may be nil due to symlink/realpath mismatch; see TestAutoImportBuilderFS
	if file == nil {
		return nil
	}
	binder.BindSourceFile(file)
	return file
}

func (r *aliasResolver) getSourceFileByFileName(fileName tspath.RootedFilePath, path tspath.PathKey) *ast.SourceFile {
	return r.getSourceFile(fileName, path)
}

// GetDefaultResolutionModeForFile implements checker.Program.
func (r *aliasResolver) GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode {
	return core.ModuleKindESNext
}

// GetEmitModuleFormatOfFile implements checker.Program.
func (r *aliasResolver) GetEmitModuleFormatOfFile(sourceFile ast.HasFileName) core.ModuleKind {
	return core.ModuleKindESNext
}

// GetEmitSyntaxForUsageLocation implements checker.Program.
func (r *aliasResolver) GetEmitSyntaxForUsageLocation(sourceFile ast.HasFileName, usageLocation *ast.StringLiteralLike) core.ResolutionMode {
	return core.ModuleKindESNext
}

// GetImpliedNodeFormatForEmit implements checker.Program.
func (r *aliasResolver) GetImpliedNodeFormatForEmit(sourceFile ast.HasFileName) core.ModuleKind {
	return core.ModuleKindESNext
}

// GetModeForUsageLocation implements checker.Program.
func (r *aliasResolver) GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode {
	return core.ModuleKindESNext
}

// GetResolvedModule implements checker.Program.
func (r *aliasResolver) GetResolvedModule(currentSourceFile ast.HasFileName, moduleReference string, mode core.ResolutionMode) *module.ResolvedModule {
	cache, _ := r.resolvedModules.LoadOrStore(currentSourceFile.PathKey(), &collections.SyncMap[module.ModeAwareCacheKey, *module.ResolvedModule]{})
	if resolved, ok := cache.Load(module.ModeAwareCacheKey{Name: moduleReference, Mode: mode}); ok {
		return resolved
	}
	resolved, _ := r.moduleResolver.ResolveModuleName(moduleReference, currentSourceFile.FileName(), mode, nil)
	resolved, _ = cache.LoadOrStore(module.ModeAwareCacheKey{Name: moduleReference, Mode: mode}, resolved)
	if !resolved.IsResolved() && !tspath.PathIsRelative(moduleReference) {
		r.onFailedAmbientModuleLookup(currentSourceFile, moduleReference)
	}
	return resolved
}

// GetSourceFileForResolvedModule implements checker.Program.
func (r *aliasResolver) GetSourceFileForResolvedModule(resolved *module.ResolvedModule) *ast.SourceFile {
	return r.getSourceFile(resolved.ResolvedFileName, resolved.ResolvedPath)
}

// GetResolvedModules implements checker.Program.
func (r *aliasResolver) GetResolvedModules() map[tspath.PathKey]module.ModeAwareCache[*module.ResolvedModule] {
	// only used when producing diagnostics, which hopefully the checker won't do
	return nil
}

// ---

// GetSymlinkCache implements checker.Program.
func (r *aliasResolver) GetSymlinkCache() *symlinks.KnownSymlinks {
	panic("unimplemented")
}

// GetSourceFileMetaData implements checker.Program.
func (r *aliasResolver) GetSourceFileMetaData(path tspath.PathKey) ast.SourceFileMetaData {
	panic("unimplemented")
}

// CommonSourceDirectory implements checker.Program.
func (r *aliasResolver) CommonSourceDirectory() tspath.RootedDirectoryPath {
	panic("unimplemented")
}

// ContentMapperExtensions implements checker.Program.
func (r *aliasResolver) ContentMapperExtensions() []string {
	return nil
}

// FileExists implements checker.Program.
func (r *aliasResolver) FileExists(fileName tspath.RootedFilePath) bool {
	panic("unimplemented")
}

// GetGlobalTypingsCacheLocation implements checker.Program.
func (r *aliasResolver) GetGlobalTypingsCacheLocation() tspath.RootedDirectoryPath {
	panic("unimplemented")
}

// GetImportHelpersImportSpecifier implements checker.Program.
func (r *aliasResolver) GetImportHelpersImportSpecifier(path tspath.PathKey) *ast.Node {
	panic("unimplemented")
}

// GetJSXRuntimeImportSpecifier implements checker.Program.
func (r *aliasResolver) GetJSXRuntimeImportSpecifier(path tspath.PathKey) (moduleReference string, specifier *ast.Node) {
	panic("unimplemented")
}

// GetNearestAncestorDirectoryWithPackageJson implements checker.Program.
func (r *aliasResolver) GetNearestAncestorDirectoryWithPackageJson(dirname tspath.RootedDirectoryPath) tspath.RootedDirectoryPath {
	panic("unimplemented")
}

// GetPackageJsonInfo implements checker.Program.
func (r *aliasResolver) GetPackageJsonInfo(pkgJsonPath tspath.RootedFilePath) *packagejson.InfoCacheEntry {
	panic("unimplemented")
}

// GetProjectReferenceFromOutputDts implements checker.Program.
func (r *aliasResolver) GetProjectReferenceFromOutputDts(path tspath.PathKey) *tsoptions.SourceOutputAndProjectReference {
	panic("unimplemented")
}

// GetProjectReferenceFromSource implements checker.Program.
func (r *aliasResolver) GetProjectReferenceFromSource(path tspath.PathKey) *tsoptions.SourceOutputAndProjectReference {
	panic("unimplemented")
}

// GetRedirectForResolution implements checker.Program.
func (r *aliasResolver) GetRedirectForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
	panic("unimplemented")
}

// GetRedirectTargets implements checker.Program.
func (r *aliasResolver) GetRedirectTargets(path tspath.PathKey) []tspath.RootedFilePath {
	panic("unimplemented")
}

// GetResolvedModuleFromModuleSpecifier implements checker.Program.
func (r *aliasResolver) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
	panic("unimplemented")
}

// GetSourceOfProjectReferenceIfOutputIncluded implements checker.Program.
func (r *aliasResolver) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) tspath.RootedFilePath {
	panic("unimplemented")
}

// IsSourceFileDefaultLibrary implements checker.Program.
func (r *aliasResolver) IsSourceFileDefaultLibrary(path tspath.PathKey) bool {
	return false
}

// IsSourceFromProjectReference implements checker.Program.
func (r *aliasResolver) IsSourceFromProjectReference(path tspath.PathKey) bool {
	panic("unimplemented")
}

// SourceFileMayBeEmitted implements checker.Program.
func (r *aliasResolver) SourceFileMayBeEmitted(sourceFile *ast.SourceFile, forceDtsEmit bool) bool {
	panic("unimplemented")
}

func (r *aliasResolver) GetPackagesMap() map[string]bool {
	return nil
}

var _ checker.Program = (*aliasResolver)(nil)
