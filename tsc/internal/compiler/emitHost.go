package compiler

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers/declarations"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// NOTE: EmitHost operations must be thread-safe
type EmitHost interface {
	printer.EmitHost
	declarations.DeclarationEmitHost
	Options() *core.CompilerOptions
	SourceFiles() []*ast.SourceFile
	UseCaseSensitiveFileNames() bool
	GetCurrentDirectory() string
	CommonSourceDirectory() string
	IsEmitBlocked(file string) bool
}

var _ EmitHost = (*emitHost)(nil)

// NOTE: emitHost operations must be thread-safe
type emitHost struct {
	program      *Program
	emitResolver printer.EmitResolver
}

func newEmitHost(ctx context.Context, program *Program, file *ast.SourceFile) (*emitHost, func()) {
	checker, done := program.GetTypeCheckerForFile(ctx, file)
	return &emitHost{
		program:      program,
		emitResolver: checker.GetEmitResolver(),
	}, done
}

func (host *emitHost) GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode {
	return host.program.GetModeForUsageLocation(file, moduleSpecifier)
}

func (host *emitHost) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
	return host.program.GetResolvedModuleFromModuleSpecifier(file, moduleSpecifier)
}

func (host *emitHost) GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode {
	return host.program.GetDefaultResolutionModeForFile(file)
}

func (host *emitHost) GetEmitModuleFormatOfFile(file ast.HasFileName) core.ModuleKind {
	return host.program.GetEmitModuleFormatOfFile(file)
}

func (host *emitHost) FileExists(path string) bool {
	return host.program.FileExists(path)
}

func (host *emitHost) GetGlobalTypingsCacheLocation() string {
	return host.program.GetGlobalTypingsCacheLocation()
}

func (host *emitHost) GetNearestAncestorDirectoryWithPackageJson(dirname string) string {
	return host.program.GetNearestAncestorDirectoryWithPackageJson(dirname)
}

func (host *emitHost) GetPackageJsonInfo(pkgJsonPath string) modulespecifiers.PackageJsonInfo {
	return host.program.GetPackageJsonInfo(pkgJsonPath)
}

func (host *emitHost) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string {
	return host.program.GetSourceOfProjectReferenceIfOutputIncluded(file)
}

func (host *emitHost) GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return host.program.GetProjectReferenceFromSource(path)
}

func (host *emitHost) GetRedirectTargets(path tspath.Path) []string {
	return host.program.GetRedirectTargets(path)
}

func (host *emitHost) GetEffectiveDeclarationFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags {
	return host.GetEmitResolver().GetEffectiveDeclarationFlags(node, flags)
}

func (host *emitHost) GetOutputPathsFor(file *ast.SourceFile, forceDtsPaths bool) declarations.OutputPaths {
	// TODO: cache
	return outputpaths.GetOutputPathsFor(file, host.Options(), host, forceDtsPaths)
}

func (host *emitHost) GetResolutionModeOverride(node *ast.Node) core.ResolutionMode {
	return host.GetEmitResolver().GetResolutionModeOverride(node)
}

func (host *emitHost) GetSourceFileFromReference(origin *ast.SourceFile, ref *ast.FileReference) *ast.SourceFile {
	return host.program.GetSourceFileFromReference(origin, ref)
}

func (host *emitHost) Options() *core.CompilerOptions { return host.program.Options() }
func (host *emitHost) SourceFiles() []*ast.SourceFile { return host.program.SourceFiles() }
func (host *emitHost) GetCurrentDirectory() string    { return host.program.GetCurrentDirectory() }
func (host *emitHost) CommonSourceDirectory() string  { return host.program.CommonSourceDirectory() }
func (host *emitHost) UseCaseSensitiveFileNames() bool {
	return host.program.UseCaseSensitiveFileNames()
}

func (host *emitHost) IsEmitBlocked(file string) bool {
	return host.program.IsEmitBlocked(file)
}

func (host *emitHost) WriteFile(fileName string, text string, writeByteOrderMark bool) error {
	return host.program.Host().FS().WriteFile(fileName, text, writeByteOrderMark)
}

func (host *emitHost) GetEmitResolver() printer.EmitResolver {
	return host.emitResolver
}

func (host *emitHost) IsSourceFileFromExternalLibrary(file *ast.SourceFile) bool {
	return host.program.IsSourceFileFromExternalLibrary(file)
}
