package project

import (
	"context"
	"fmt"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Kind -output=project_stringer_generated.go
//go:generate go tool mvdan.cc/gofumpt -lang=go1.24 -w project_stringer_generated.go

const hr = "-----------------------------------------------"

var projectNamer = &namer{}

type Kind int

const (
	KindInferred Kind = iota
	KindConfigured
	KindAutoImportProvider
	KindAuxiliary
)

type snapshot struct {
	project          *Project
	positionEncoding lsproto.PositionEncodingKind
	program          *compiler.Program
	lineMaps         collections.SyncMap[*ast.SourceFile, *ls.LineMap]
}

// GetLineMap implements ls.Host.
func (s *snapshot) GetLineMap(fileName string) *ls.LineMap {
	file := s.program.GetSourceFile(fileName)
	scriptInfo := s.project.host.DocumentStore().GetScriptInfoByPath(file.Path())
	if s.project.getFileVersion(file) == scriptInfo.Version() {
		return scriptInfo.LineMap()
	}
	// The version changed; recompute the line map.
	// !!! This shouldn't happen so often, but does. Probably removable once snapshotting is finished.
	if cached, ok := s.lineMaps.Load(file); ok {
		return cached
	}
	lineMap, _ := s.lineMaps.LoadOrStore(file, ls.ComputeLineStarts(file.Text()))
	return lineMap
}

// GetPositionEncoding implements ls.Host.
func (s *snapshot) GetPositionEncoding() lsproto.PositionEncodingKind {
	return s.positionEncoding
}

// GetProgram implements ls.Host.
func (s *snapshot) GetProgram() *compiler.Program {
	return s.program
}

var _ ls.Host = (*snapshot)(nil)

type PendingReload int

const (
	PendingReloadNone PendingReload = iota
	PendingReloadFileNames
	PendingReloadFull
)

type ProjectHost interface {
	tsoptions.ParseConfigHost
	module.ResolutionHost
	DefaultLibraryPath() string
	TypingsInstaller() *TypingsInstaller
	DocumentStore() *DocumentStore
	ConfigFileRegistry() *ConfigFileRegistry
	Log(s string)
	PositionEncoding() lsproto.PositionEncodingKind

	IsWatchEnabled() bool
	Client() Client
}

type TypingsInfo struct {
	TypeAcquisition   *core.TypeAcquisition
	CompilerOptions   *core.CompilerOptions
	UnresolvedImports []string
}

func setIsEqualTo(arr1 []string, arr2 []string) bool {
	if len(arr1) == 0 {
		return len(arr2) == 0
	}
	if len(arr2) == 0 {
		return len(arr1) == 0
	}
	if slices.Equal(arr1, arr2) {
		return true
	}
	compact1 := slices.Clone(arr1)
	compact2 := slices.Clone(arr2)
	slices.Sort(compact1)
	slices.Sort(compact2)
	return slices.Equal(compact1, compact2)
}

func typeAcquisitionChanged(opt1 *core.TypeAcquisition, opt2 *core.TypeAcquisition) bool {
	return opt1 != opt2 &&
		(opt1.Enable.IsTrue() != opt2.Enable.IsTrue() ||
			!setIsEqualTo(opt1.Include, opt2.Include) ||
			!setIsEqualTo(opt1.Exclude, opt2.Exclude) ||
			opt1.DisableFilenameBasedTypeAcquisition.IsTrue() != opt2.DisableFilenameBasedTypeAcquisition.IsTrue())
}

var (
	_ compiler.CompilerHost = (*Project)(nil)
	_ watchFileHost         = (*Project)(nil)
)

type Project struct {
	host *projectHostWithCachedFS

	name string
	kind Kind

	mu                     sync.Mutex
	initialLoadPending     bool
	dirty                  bool
	version                int
	deferredClose          bool
	pendingReload          PendingReload
	dirtyFilePath          tspath.Path
	hasAddedorRemovedFiles atomic.Bool

	comparePathsOptions tspath.ComparePathsOptions
	currentDirectory    string
	// Inferred projects only
	rootPath tspath.Path

	configFileName string
	configFilePath tspath.Path
	// rootFileNames was a map from Path to { NormalizedPath, ScriptInfo? } in the original code.
	// But the ProjectService owns script infos, so it's not clear why there was an extra pointer.
	rootFileNames     *collections.OrderedMap[tspath.Path, string]
	rootJSFileCount   int
	compilerOptions   *core.CompilerOptions
	typeAcquisition   *core.TypeAcquisition
	parsedCommandLine *tsoptions.ParsedCommandLine
	programConfig     *tsoptions.ParsedCommandLine
	program           *compiler.Program
	checkerPool       *checkerPool

	typingsCacheMu           sync.Mutex
	unresolvedImportsPerFile map[*ast.SourceFile][]string
	unresolvedImports        []string
	typingsInfo              *TypingsInfo
	typingFiles              []string

	// Watchers
	failedLookupsWatch      *watchedFiles[map[tspath.Path]string]
	affectingLocationsWatch *watchedFiles[map[tspath.Path]string]
	typingsFilesWatch       *watchedFiles[map[tspath.Path]string]
	typingsDirectoryWatch   *watchedFiles[map[tspath.Path]string]
	typingsWatchInvoked     atomic.Bool
}

func NewConfiguredProject(
	configFileName string,
	configFilePath tspath.Path,
	host ProjectHost,
) *Project {
	project := NewProject(configFileName, KindConfigured, tspath.GetDirectoryPath(configFileName), host)
	project.configFileName = configFileName
	project.configFilePath = configFilePath
	project.initialLoadPending = true
	project.pendingReload = PendingReloadFull
	return project
}

func NewInferredProject(
	compilerOptions *core.CompilerOptions,
	currentDirectory string,
	projectRootPath tspath.Path,
	host ProjectHost,
) *Project {
	project := NewProject(projectNamer.next("/dev/null/inferredProject"), KindInferred, currentDirectory, host)
	project.rootPath = projectRootPath
	project.compilerOptions = compilerOptions
	return project
}

func NewProject(name string, kind Kind, currentDirectory string, host ProjectHost) *Project {
	cachedHost := newProjectHostWithCachedFS(host)

	host.Log(fmt.Sprintf("Creating %sProject: %s, currentDirectory: %s", kind.String(), name, currentDirectory))
	project := &Project{
		host:             cachedHost,
		name:             name,
		kind:             kind,
		currentDirectory: currentDirectory,
		rootFileNames:    &collections.OrderedMap[tspath.Path, string]{},
		dirty:            true,
	}
	project.comparePathsOptions = tspath.ComparePathsOptions{
		CurrentDirectory:          currentDirectory,
		UseCaseSensitiveFileNames: project.host.FS().UseCaseSensitiveFileNames(),
	}
	client := project.Client()
	if project.host.IsWatchEnabled() && client != nil {
		globMapper := createResolutionLookupGlobMapper(project.host)
		project.failedLookupsWatch = newWatchedFiles(project, lsproto.WatchKindCreate, globMapper, "failed lookup")
		project.affectingLocationsWatch = newWatchedFiles(project, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, globMapper, "affecting location")
		project.typingsFilesWatch = newWatchedFiles(project, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, globMapperForTypingsInstaller, "typings installer files")
		project.typingsDirectoryWatch = newWatchedFiles(project, lsproto.WatchKindCreate|lsproto.WatchKindDelete, globMapperForTypingsInstaller, "typings installer directories")
	}
	project.markAsDirty()
	return project
}

type projectHostWithCachedFS struct {
	ProjectHost
	fs *cachedvfs.FS
}

func newProjectHostWithCachedFS(host ProjectHost) *projectHostWithCachedFS {
	newHost := &projectHostWithCachedFS{
		ProjectHost: host,
		fs:          cachedvfs.From(host.FS()),
	}
	newHost.fs.DisableAndClearCache()
	return newHost
}

func (p *projectHostWithCachedFS) FS() vfs.FS {
	return p.fs
}

func (p *Project) Client() Client {
	return p.host.Client()
}

// FS implements compiler.CompilerHost.
func (p *Project) FS() vfs.FS {
	return p.host.FS()
}

// DefaultLibraryPath implements compiler.CompilerHost.
func (p *Project) DefaultLibraryPath() string {
	return p.host.DefaultLibraryPath()
}

// GetCurrentDirectory implements compiler.CompilerHost.
func (p *Project) GetCurrentDirectory() string {
	return p.currentDirectory
}

func (p *Project) GetRootFileNames() []string {
	return append(slices.Collect(p.rootFileNames.Values()), p.typingFiles...)
}

func (p *Project) GetCompilerOptions() *core.CompilerOptions {
	return p.compilerOptions
}

// GetSourceFile implements compiler.CompilerHost.
func (p *Project) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	scriptKind := p.getScriptKind(opts.FileName)
	if scriptInfo := p.getOrCreateScriptInfoAndAttachToProject(opts.FileName, scriptKind); scriptInfo != nil {
		var oldSourceFile *ast.SourceFile
		if p.program != nil {
			oldSourceFile = p.program.GetSourceFileByPath(scriptInfo.path)
		}
		return p.host.DocumentStore().documentRegistry.AcquireDocument(scriptInfo, opts, oldSourceFile)
	}
	return nil
}

// GetResolvedProjectReference implements compiler.CompilerHost.
func (p *Project) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
	return p.host.ConfigFileRegistry().acquireConfig(fileName, path, p, nil)
}

// Updates the program if needed.
func (p *Project) GetProgram() *compiler.Program {
	program, _ := p.updateGraph()
	return program
}

// Trace implements compiler.CompilerHost.
func (p *Project) Trace(msg string) {
	p.host.Log(msg)
}

// GetDefaultLibraryPath implements compiler.CompilerHost.
func (p *Project) GetDefaultLibraryPath() string {
	return p.host.DefaultLibraryPath()
}

func (p *Project) Name() string {
	return p.name
}

func (p *Project) Kind() Kind {
	return p.kind
}

func (p *Project) Version() int {
	return p.version
}

func (p *Project) CurrentProgram() *compiler.Program {
	return p.program
}

func (p *Project) GetLanguageServiceForRequest(ctx context.Context) (*ls.LanguageService, func()) {
	if core.GetRequestID(ctx) == "" {
		panic("context must already have a request ID")
	}
	program := p.GetProgram()
	if program == nil {
		panic("must have gced by other request")
	}
	checkerPool := p.checkerPool
	snapshot := &snapshot{
		project:          p,
		positionEncoding: p.host.PositionEncoding(),
		program:          program,
	}
	languageService := ls.NewLanguageService(snapshot)
	cleanup := func() {
		if checkerPool.isRequestCheckerInUse(core.GetRequestID(ctx)) {
			panic(fmt.Errorf("checker for request ID %s not returned to pool at end of request", core.GetRequestID(ctx)))
		}
	}
	return languageService, cleanup
}

func (p *Project) updateModuleResolutionWatches(ctx context.Context) {
	client := p.Client()
	if !p.host.IsWatchEnabled() || client == nil {
		return
	}

	failedLookups := make(map[tspath.Path]string)
	affectingLocations := make(map[tspath.Path]string)
	extractLookups(p, failedLookups, affectingLocations, p.program.GetResolvedModules())
	extractLookups(p, failedLookups, affectingLocations, p.program.GetResolvedTypeReferenceDirectives())

	p.failedLookupsWatch.update(ctx, failedLookups)
	p.affectingLocationsWatch.update(ctx, affectingLocations)
}

type ResolutionWithLookupLocations interface {
	GetLookupLocations() *module.LookupLocations
}

func extractLookups[T ResolutionWithLookupLocations](
	p *Project,
	failedLookups map[tspath.Path]string,
	affectingLocations map[tspath.Path]string,
	cache map[tspath.Path]module.ModeAwareCache[T],
) {
	for _, resolvedModulesInFile := range cache {
		for _, resolvedModule := range resolvedModulesInFile {
			for _, failedLookupLocation := range resolvedModule.GetLookupLocations().FailedLookupLocations {
				path := p.toPath(failedLookupLocation)
				if _, ok := failedLookups[path]; !ok {
					failedLookups[path] = failedLookupLocation
				}
			}
			for _, affectingLocation := range resolvedModule.GetLookupLocations().AffectingLocations {
				path := p.toPath(affectingLocation)
				if _, ok := affectingLocations[path]; !ok {
					affectingLocations[path] = affectingLocation
				}
			}
		}
	}
}

// onWatchEventForNilScriptInfo is fired for watch events that are not the
// project tsconfig, and do not have a ScriptInfo for the associated file.
// This could be a case of one of the following:
//   - A file is being created that will be added to the project.
//   - An affecting location was changed.
//   - A file is being created that matches a watch glob, but is not actually
//     part of the project, e.g., a .js file in a project without --allowJs.
func (p *Project) onWatchEventForNilScriptInfo(fileName string) {
	path := p.toPath(fileName)
	if _, ok := p.failedLookupsWatch.data[path]; ok {
		p.markAsDirty()
	} else if _, ok := p.affectingLocationsWatch.data[path]; ok {
		p.markAsDirty()
	}

	if !p.typingsWatchInvoked.Load() {
		if _, ok := p.typingsFilesWatch.data[path]; ok {
			p.typingsWatchInvoked.Store(true)
			p.enqueueInstallTypingsForProject(nil, true)
		} else if _, ok := p.typingsDirectoryWatch.data[path]; ok {
			p.typingsWatchInvoked.Store(true)
			p.enqueueInstallTypingsForProject(nil, true)
		} else {
			for dir := range p.typingsDirectoryWatch.data {
				if tspath.ContainsPath(string(dir), string(path), p.comparePathsOptions) {
					p.typingsWatchInvoked.Store(true)
					p.enqueueInstallTypingsForProject(nil, true)
					break
				}
			}
		}
	}
}

func (p *Project) getOrCreateScriptInfoAndAttachToProject(fileName string, scriptKind core.ScriptKind) *ScriptInfo {
	if scriptInfo := p.host.DocumentStore().getOrCreateScriptInfoWorker(fileName, p.toPath(fileName), scriptKind, false, "", false, p.host.FS()); scriptInfo != nil {
		scriptInfo.attachToProject(p)
		return scriptInfo
	}
	return nil
}

func (p *Project) getScriptKind(fileName string) core.ScriptKind {
	// Customizing script kind per file extension is a common plugin / LS host customization case
	// which can probably be replaced with static info in the future
	return core.GetScriptKindFromFileName(fileName)
}

func (p *Project) MarkFileAsDirty(path tspath.Path) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if !p.dirty {
		p.dirty = true
		p.dirtyFilePath = path
		p.version++
	} else if path != p.dirtyFilePath {
		p.dirtyFilePath = ""
	}
}

func (p *Project) SetPendingReload(level PendingReload) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if level > p.pendingReload {
		p.pendingReload = level
		p.markAsDirtyLocked()
	}
}

func (p *Project) markAsDirty() {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.markAsDirtyLocked()
}

func (p *Project) markAsDirtyLocked() {
	p.dirtyFilePath = ""
	if !p.dirty {
		p.dirty = true
		p.version++
	}
}

// Always called when p.mu lock was already acquired.
func (p *Project) onFileAddedOrRemoved() {
	p.hasAddedorRemovedFiles.Store(true)
}

// updateGraph updates the set of files that contribute to the project.
// Returns true if the set of files in has changed. NOTE: this is the
// opposite of the return value in Strada, which was frequently inverted,
// as in `updateProjectIfDirty()`.
func (p *Project) updateGraph() (*compiler.Program, bool) {
	p.mu.Lock()
	defer p.mu.Unlock()

	if !p.dirty || p.isClosed() {
		return p.program, false
	}

	p.host.fs.Enable()
	defer p.host.fs.DisableAndClearCache()

	start := time.Now()
	p.Log("Starting updateGraph: Project: " + p.name)
	oldProgram := p.program
	p.initialLoadPending = false

	if p.kind == KindConfigured && p.pendingReload != PendingReloadNone {
		switch p.pendingReload {
		case PendingReloadFileNames:
			p.parsedCommandLine = p.GetResolvedProjectReference(p.configFileName, p.configFilePath)
			p.setRootFiles(p.parsedCommandLine.FileNames())
			p.programConfig = nil
			p.pendingReload = PendingReloadNone
		case PendingReloadFull:
			err := p.LoadConfig()
			if err != nil {
				panic(fmt.Sprintf("failed to reload config: %v", err))
			}
		}
	}
	oldProgramReused := p.updateProgram()
	hasAddedOrRemovedFiles := p.hasAddedorRemovedFiles.Load()
	p.hasAddedorRemovedFiles.Store(false)
	p.dirty = false
	p.dirtyFilePath = ""
	if hasAddedOrRemovedFiles {
		p.Log(p.print(true /*writeFileNames*/, true /*writeFileExplanation*/, false /*writeFileVersionAndText*/, &strings.Builder{}))
	} else if p.program != oldProgram {
		p.Log("Different program with same set of root files")
	}
	if !oldProgramReused {
		if oldProgram != nil {
			for _, oldSourceFile := range oldProgram.GetSourceFiles() {
				if p.program.GetSourceFileByPath(oldSourceFile.Path()) == nil {
					p.host.DocumentStore().documentRegistry.ReleaseDocument(oldSourceFile)
					p.detachScriptInfoIfNotInferredRoot(oldSourceFile.Path())
				}
			}

			oldProgram.ForEachResolvedProjectReference(func(path tspath.Path, ref *tsoptions.ParsedCommandLine) {
				if _, ok := p.program.GetResolvedProjectReferenceFor(path); !ok {
					p.host.ConfigFileRegistry().releaseConfig(path, p)
				}
			})
		}
		p.enqueueInstallTypingsForProject(oldProgram, hasAddedOrRemovedFiles)
		// TODO: this is currently always synchronously called by some kind of updating request,
		// but in Strada we throttle, so at least sometimes this should be considered top-level?
		p.updateModuleResolutionWatches(context.TODO())
	}
	p.Logf("Finishing updateGraph: Project: %s version: %d in %s", p.name, p.version, time.Since(start))
	return p.program, true
}

func (p *Project) updateProgram() bool {
	if p.checkerPool != nil {
		p.Logf("Program %d used %d checker(s)", p.version, p.checkerPool.size())
	}
	var oldProgramReused bool
	if p.program == nil || p.dirtyFilePath == "" {
		if p.programConfig == nil {
			// Get from config file = config file root files + typings files
			if p.parsedCommandLine != nil {
				// There are no typing files so use the parsed command line as is
				if len(p.typingFiles) == 0 {
					p.programConfig = p.parsedCommandLine
				} else {
					// Update the fileNames
					parsedConfig := *p.parsedCommandLine.ParsedConfig
					parsedConfig.FileNames = append(p.parsedCommandLine.FileNames(), p.typingFiles...)
					p.programConfig = &tsoptions.ParsedCommandLine{
						ParsedConfig: &parsedConfig,
						ConfigFile:   p.parsedCommandLine.ConfigFile,
						Errors:       p.parsedCommandLine.Errors,
					}
				}
			} else {
				rootFileNames := p.GetRootFileNames()
				compilerOptions := p.compilerOptions

				if compilerOptions.MaxNodeModuleJsDepth == nil && p.rootJSFileCount > 0 {
					compilerOptions = compilerOptions.Clone()
					compilerOptions.MaxNodeModuleJsDepth = ptrTo(2)
				}

				p.programConfig = &tsoptions.ParsedCommandLine{
					ParsedConfig: &core.ParsedOptions{
						CompilerOptions: compilerOptions,
						FileNames:       rootFileNames,
					},
				}
			}
		}
		var typingsLocation string
		if typeAcquisition := p.getTypeAcquisition(); typeAcquisition != nil && typeAcquisition.Enable.IsTrue() {
			typingsInstaller := p.host.TypingsInstaller()
			if typingsInstaller != nil {
				typingsLocation = typingsInstaller.TypingsLocation
			}
		}
		p.program = compiler.NewProgram(compiler.ProgramOptions{
			Config:                      p.programConfig,
			Host:                        p,
			UseSourceOfProjectReference: true,
			TypingsLocation:             typingsLocation,
			CreateCheckerPool: func(program *compiler.Program) compiler.CheckerPool {
				p.checkerPool = newCheckerPool(4, program, p.Log)
				return p.checkerPool
			},
			JSDocParsingMode: ast.JSDocParsingModeParseAll,
		})
	} else {
		// The only change in the current program is the contents of the file named by p.dirtyFilePath.
		// If possible, use data from the old program to create the new program.
		p.program, oldProgramReused = p.program.UpdateProgram(p.dirtyFilePath)
	}
	p.program.BindSourceFiles()
	return oldProgramReused
}

func (p *Project) allRootFilesAreJsOrDts() bool {
	for _, fileName := range p.rootFileNames.Entries() {
		switch p.getScriptKind(fileName) {
		case core.ScriptKindTS:
			if tspath.IsDeclarationFileName(fileName) {
				break
			}
			fallthrough
		case core.ScriptKindTSX:
			return false
		}
	}
	return true
}

func (p *Project) getTypeAcquisition() *core.TypeAcquisition {
	// !!! sheetal Remove local @types from include list which was done in Strada
	if p.kind == KindInferred && p.typeAcquisition == nil {
		var enable core.Tristate
		if p.allRootFilesAreJsOrDts() {
			enable = core.TSTrue
		}
		p.typeAcquisition = &core.TypeAcquisition{
			Enable: enable,
		}
	}
	return p.typeAcquisition
}

func (p *Project) setTypeAcquisition(typeAcquisition *core.TypeAcquisition) {
	if typeAcquisition == nil || !typeAcquisition.Enable.IsTrue() {
		p.unresolvedImports = nil
		p.unresolvedImportsPerFile = nil
		p.typingFiles = nil
	}
	p.typeAcquisition = typeAcquisition
}

func (p *Project) enqueueInstallTypingsForProject(oldProgram *compiler.Program, forceRefresh bool) {
	typingsInstaller := p.host.TypingsInstaller()
	if typingsInstaller == nil {
		return
	}

	typeAcquisition := p.getTypeAcquisition()
	if typeAcquisition == nil || !typeAcquisition.Enable.IsTrue() {
		return
	}

	p.typingsCacheMu.Lock()
	unresolvedImports := p.extractUnresolvedImports(oldProgram)
	if forceRefresh ||
		p.typingsInfo == nil ||
		p.typingsInfo.CompilerOptions.GetAllowJS() != p.compilerOptions.GetAllowJS() ||
		typeAcquisitionChanged(typeAcquisition, p.typingsInfo.TypeAcquisition) ||
		!slices.Equal(p.typingsInfo.UnresolvedImports, unresolvedImports) {
		// Note: entry is now poisoned since it does not really contain typings for a given combination of compiler options\typings options.
		// instead it acts as a placeholder to prevent issuing multiple requests
		typingsInfo := &TypingsInfo{
			TypeAcquisition:   typeAcquisition,
			CompilerOptions:   p.compilerOptions,
			UnresolvedImports: unresolvedImports,
		}
		p.typingsInfo = typingsInfo
		p.typingsCacheMu.Unlock()
		// something has been changed, issue a request to update typings
		typingsInstaller.EnqueueInstallTypingsRequest(p, typingsInfo)
	} else {
		p.typingsCacheMu.Unlock()
	}
}

func (p *Project) extractUnresolvedImports(oldProgram *compiler.Program) []string {
	// We dont want to this unless imports/resolutions have changed for any of the file - for later

	// tracing?.push(tracing.Phase.Session, "getUnresolvedImports", { count: sourceFiles.length });
	hasChanges := false
	sourceFiles := p.program.GetSourceFiles()
	sourceFilesSet := collections.NewSetWithSizeHint[*ast.SourceFile](len(sourceFiles))

	// !!! sheetal remove ambient module names from unresolved imports
	// const ambientModules = program.getTypeChecker().getAmbientModules().map(mod => stripQuotes(mod.getName()));
	for _, sourceFile := range sourceFiles {
		if p.extractUnresolvedImportsFromSourceFile(sourceFile, oldProgram) {
			hasChanges = true
		}
		sourceFilesSet.Add(sourceFile)
	}

	if hasChanges || len(p.unresolvedImportsPerFile) != sourceFilesSet.Len() {
		unResolvedImports := []string{}
		for sourceFile, unResolvedInFile := range p.unresolvedImportsPerFile {
			if sourceFilesSet.Has(sourceFile) {
				unResolvedImports = append(unResolvedImports, unResolvedInFile...)
			} else {
				delete(p.unresolvedImportsPerFile, sourceFile)
			}
		}

		slices.Sort(unResolvedImports)
		p.unresolvedImports = slices.Compact(unResolvedImports)
	}
	// tracing?.pop();
	return p.unresolvedImports
}

func (p *Project) extractUnresolvedImportsFromSourceFile(file *ast.SourceFile, oldProgram *compiler.Program) bool {
	_, ok := p.unresolvedImportsPerFile[file]
	if ok {
		return false
	}

	unresolvedImports := []string{}
	resolvedModules := p.program.GetResolvedModules()[file.Path()]
	for cacheKey, resolution := range resolvedModules {
		resolved := resolution.IsResolved()
		if (!resolved || !tspath.ExtensionIsOneOf(resolution.Extension, tspath.SupportedTSExtensionsWithJsonFlat)) &&
			!tspath.IsExternalModuleNameRelative(cacheKey.Name) {
			//  !ambientModules.some(m => m === name)
			unresolvedImports = append(unresolvedImports, cacheKey.Name)
		}
	}

	hasChanges := true
	if oldProgram != nil {
		oldFile := oldProgram.GetSourceFileByPath(file.Path())
		if oldFile != nil {
			oldUnresolvedImports, ok := p.unresolvedImportsPerFile[oldFile]
			if ok {
				delete(p.unresolvedImportsPerFile, oldFile)
				if slices.Equal(oldUnresolvedImports, unresolvedImports) {
					unresolvedImports = oldUnresolvedImports
				} else {
					hasChanges = true
				}

			}
		}
	}
	if p.unresolvedImportsPerFile == nil {
		p.unresolvedImportsPerFile = make(map[*ast.SourceFile][]string, len(p.program.GetSourceFiles()))
	}
	p.unresolvedImportsPerFile[file] = unresolvedImports
	return hasChanges
}

func (p *Project) UpdateTypingFiles(typingsInfo *TypingsInfo, typingFiles []string) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.isClosed() || p.typingsInfo != typingsInfo {
		return
	}

	typeAcquisition := p.getTypeAcquisition()
	if typeAcquisition == nil || !typeAcquisition.Enable.IsTrue() {
		typingFiles = nil
	} else {
		slices.Sort(typingFiles)
	}
	if !slices.Equal(typingFiles, p.typingFiles) {
		// If typing files changed, then only schedule project update
		p.typingFiles = typingFiles
		p.programConfig = nil

		// 	// Invalidate files with unresolved imports
		// 	this.resolutionCache.setFilesWithInvalidatedNonRelativeUnresolvedImports(this.cachedUnresolvedImportsPerFile);

		p.markAsDirtyLocked()
		client := p.Client()
		if client != nil {
			err := client.RefreshDiagnostics(context.Background())
			if err != nil {
				p.Logf("Error when refreshing diagnostics from updateTypingFiles %v", err)
			}
		}
	}
}

func (p *Project) WatchTypingLocations(files []string) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.isClosed() {
		return
	}

	client := p.Client()
	if !p.host.IsWatchEnabled() || client == nil {
		return
	}

	p.typingsWatchInvoked.Store(false)
	var typingsInstallerFileGlobs map[tspath.Path]string
	var typingsInstallerDirectoryGlobs map[tspath.Path]string
	// Create watches from list of files
	for _, file := range files {
		basename := tspath.GetBaseFileName(file)
		if basename == "package.json" || basename == "bower.json" {
			// package.json or bower.json exists, watch the file to detect changes and update typings
			if typingsInstallerFileGlobs == nil {
				typingsInstallerFileGlobs = map[tspath.Path]string{}
			}
			typingsInstallerFileGlobs[p.toPath(file)] = file
		} else {
			var globLocation string
			// path in projectRoot, watch project root
			if tspath.ContainsPath(p.currentDirectory, file, p.comparePathsOptions) {
				currentDirectoryLen := len(p.currentDirectory) + 1
				subDirectory := strings.IndexRune(file[currentDirectoryLen:], tspath.DirectorySeparator)
				if subDirectory != -1 {
					// Watch subDirectory
					globLocation = file[0 : currentDirectoryLen+subDirectory]
				} else {
					// Watch the directory itself
					globLocation = file
				}
			} else {
				// path in global cache, watch global cache
				// else watch node_modules or bower_components
				typingsLocation := p.host.TypingsInstaller().TypingsLocation
				globLocation = core.IfElse(tspath.ContainsPath(typingsLocation, file, p.comparePathsOptions), typingsLocation, file)
			}
			// package.json or bower.json exists, watch the file to detect changes and update typings
			if typingsInstallerDirectoryGlobs == nil {
				typingsInstallerDirectoryGlobs = map[tspath.Path]string{}
			}
			typingsInstallerDirectoryGlobs[p.toPath(globLocation)] = fmt.Sprintf("%s/%s", globLocation, recursiveFileGlobPattern)
		}
	}
	ctx := context.Background()
	p.typingsFilesWatch.update(ctx, typingsInstallerFileGlobs)
	p.typingsDirectoryWatch.update(ctx, typingsInstallerDirectoryGlobs)
}

func (p *Project) isSourceFromProjectReference(info *ScriptInfo) bool {
	program := p.program
	return program != nil && program.IsSourceFromProjectReference(info.Path())
}

func (p *Project) containsScriptInfo(info *ScriptInfo) bool {
	if p.isRoot(info) {
		return true
	}
	program := p.program
	return program != nil && program.GetSourceFileByPath(info.Path()) != nil
}

func (p *Project) isOrphan() bool {
	switch p.kind {
	case KindInferred:
		return p.rootFileNames.Size() == 0
	case KindConfigured:
		return p.deferredClose
	default:
		panic("unhandled project kind")
	}
}

func (p *Project) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, p.GetCurrentDirectory(), p.FS().UseCaseSensitiveFileNames())
}

func (p *Project) isRoot(info *ScriptInfo) bool {
	return p.rootFileNames.Has(info.path)
}

func (p *Project) RemoveFile(info *ScriptInfo, fileExists bool) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.isRoot(info) && p.kind == KindInferred {
		p.deleteRootFileNameOfInferred(info.path)
		p.setTypeAcquisition(nil)
		p.programConfig = nil
	}
	p.onFileAddedOrRemoved()

	// !!!
	// if (fileExists) {
	// 	// If file is present, just remove the resolutions for the file
	// 	this.resolutionCache.removeResolutionsOfFile(info.path);
	// } else {
	// 	this.resolutionCache.invalidateResolutionOfFile(info.path);
	// }
	// this.cachedUnresolvedImportsPerFile.delete(info.path);
	p.markAsDirtyLocked()
}

func (p *Project) AddInferredProjectRoot(info *ScriptInfo) {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.isRoot(info) {
		panic("script info is already a root")
	}
	p.setRootFileNameOfInferred(info.path, info.fileName)
	p.programConfig = nil
	p.setTypeAcquisition(nil)
	// !!!
	// if p.kind == KindInferred {
	// 	p.host.startWatchingConfigFilesForInferredProjectRoot(info.path);
	// }
	info.attachToProject(p)
	p.markAsDirtyLocked()
}

func (p *Project) LoadConfig() error {
	if p.kind != KindConfigured {
		panic("loadConfig called on non-configured project")
	}

	p.programConfig = nil
	p.pendingReload = PendingReloadNone
	p.parsedCommandLine = p.GetResolvedProjectReference(p.configFileName, p.configFilePath)
	if p.parsedCommandLine != nil {
		p.Logf("Config: %s : %s",
			p.configFileName,
			core.Must(core.StringifyJson(map[string]any{
				"rootNames":         p.parsedCommandLine.FileNames(),
				"options":           p.parsedCommandLine.CompilerOptions(),
				"projectReferences": p.parsedCommandLine.ProjectReferences(),
			}, "    ", "  ")),
		)

		p.compilerOptions = p.parsedCommandLine.CompilerOptions()
		p.setTypeAcquisition(p.parsedCommandLine.TypeAcquisition())
		p.setRootFiles(p.parsedCommandLine.FileNames())
	} else {
		p.compilerOptions = &core.CompilerOptions{}
		p.setTypeAcquisition(nil)
		return fmt.Errorf("could not read file %q", p.configFileName)
	}
	return nil
}

// setRootFiles returns true if the set of root files has changed.
func (p *Project) setRootFiles(rootFileNames []string) {
	newRootScriptInfos := make(map[tspath.Path]struct{}, len(rootFileNames))
	for _, file := range rootFileNames {
		path := p.toPath(file)
		// !!! updateNonInferredProjectFiles uses a fileExists check, which I guess
		// could be needed if a watcher fails?
		newRootScriptInfos[path] = struct{}{}
		p.rootFileNames.Set(path, file)
		// if !isAlreadyRoot {
		// 	if scriptInfo.isOpen {
		// 		!!!s.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo)
		// 	}
		// }
	}

	if p.rootFileNames.Size() > len(rootFileNames) {
		for root := range p.rootFileNames.Keys() {
			if _, ok := newRootScriptInfos[root]; !ok {
				p.rootFileNames.Delete(root)
			}
		}
	}
}

func (p *Project) setRootFileNameOfInferred(path tspath.Path, fileName string) {
	if p.kind != KindInferred {
		panic("setRootFileNameOfInferred called on non-inferred project")
	}

	has := p.rootFileNames.Has(path)
	p.rootFileNames.Set(path, fileName)
	if !has && tspath.HasJSFileExtension(fileName) {
		p.rootJSFileCount++
	}
}

func (p *Project) deleteRootFileNameOfInferred(path tspath.Path) {
	if p.kind != KindInferred {
		panic("deleteRootFileNameOfInferred called on non-inferred project")
	}

	fileName, ok := p.rootFileNames.Get(path)
	if !ok {
		return
	}
	p.rootFileNames.Delete(path)
	if tspath.HasJSFileExtension(fileName) {
		p.rootJSFileCount--
	}
}

func (p *Project) clearSourceMapperCache() {
	// !!!
}

func (p *Project) GetFileNames(excludeFilesFromExternalLibraries bool, excludeConfigFiles bool) []string {
	if p.program == nil {
		return []string{}
	}

	// !!! sheetal incomplete code
	// if (!this.languageServiceEnabled) {
	//     // if language service is disabled assume that all files in program are root files + default library
	//     let rootFiles = this.getRootFiles();
	//     if (this.compilerOptions) {
	//         const defaultLibrary = getDefaultLibFilePath(this.compilerOptions);
	//         if (defaultLibrary) {
	//             (rootFiles || (rootFiles = [])).push(asNormalizedPath(defaultLibrary));
	//         }
	//     }
	//     return rootFiles;
	// }
	result := []string{}
	sourceFiles := p.program.GetSourceFiles()
	for _, sourceFile := range sourceFiles {
		if excludeFilesFromExternalLibraries && p.program.IsSourceFileFromExternalLibrary(sourceFile) {
			continue
		}
		result = append(result, sourceFile.FileName())
	}
	// if (!excludeConfigFiles) {
	//     const configFile = p.program.GetCompilerOptions().configFile;
	//     if (configFile) {
	//         result = append(result, configFile.fileName);
	//         if (configFile.extendedSourceFiles) {
	//             for (const f of configFile.extendedSourceFiles) {
	//                 result.push(asNormalizedPath(f));
	//             }
	//         }
	//     }
	// }
	return result
}

func (p *Project) print(writeFileNames bool, writeFileExplanation bool, writeFileVersionAndText bool, builder *strings.Builder) string {
	builder.WriteString(fmt.Sprintf("\nProject '%s' (%s)\n", p.name, p.kind.String()))
	if p.initialLoadPending {
		builder.WriteString("\n\tFiles (0) InitialLoadPending\n")
	} else if p.program == nil {
		builder.WriteString("\n\tFiles (0) NoProgram\n")
	} else {
		sourceFiles := p.program.GetSourceFiles()
		builder.WriteString(fmt.Sprintf("\n\tFiles (%d)\n", len(sourceFiles)))
		if writeFileNames {
			for _, sourceFile := range sourceFiles {
				builder.WriteString("\n\t\t" + sourceFile.FileName())
				if writeFileVersionAndText {
					builder.WriteString(fmt.Sprintf(" %d %s", p.getFileVersion(sourceFile), sourceFile.Text()))
				}
			}
			// !!!
			// if writeFileExplanation {}
		}
	}
	builder.WriteString(hr)
	return builder.String()
}

func (p *Project) getFileVersion(file *ast.SourceFile) int {
	return p.host.DocumentStore().documentRegistry.getFileVersion(file)
}

func (p *Project) Log(s string) {
	p.host.Log(s)
}

func (p *Project) Logf(format string, args ...interface{}) {
	p.Log(fmt.Sprintf(format, args...))
}

func (p *Project) detachScriptInfoIfNotInferredRoot(path tspath.Path) {
	// We might not find the script info in case its not associated with the project any more
	// and project graph was not updated (eg delayed update graph in case of files changed/deleted on the disk)
	if scriptInfo := p.host.DocumentStore().GetScriptInfoByPath(path); scriptInfo != nil &&
		(p.kind != KindInferred || !p.isRoot(scriptInfo)) {
		scriptInfo.detachFromProject(p)
	}
}

func (p *Project) Close() {
	p.mu.Lock()
	defer p.mu.Unlock()

	if p.program != nil {
		for _, sourceFile := range p.program.GetSourceFiles() {
			p.host.DocumentStore().documentRegistry.ReleaseDocument(sourceFile)
			// Detach script info if its not root or is root of non inferred project
			p.detachScriptInfoIfNotInferredRoot(sourceFile.Path())
		}
		p.program.ForEachResolvedProjectReference(func(path tspath.Path, ref *tsoptions.ParsedCommandLine) {
			p.host.ConfigFileRegistry().releaseConfig(path, p)
		})
		if p.kind == KindConfigured {
			p.host.ConfigFileRegistry().releaseConfig(p.configFilePath, p)
		}
		p.program = nil
	}

	if p.kind == KindInferred {
		// Release root script infos for inferred projects.
		for path := range p.rootFileNames.Keys() {
			if info := p.host.DocumentStore().GetScriptInfoByPath(path); info != nil {
				info.detachFromProject(p)
			}
		}
	}
	p.rootFileNames = nil
	p.rootJSFileCount = 0
	p.parsedCommandLine = nil
	p.programConfig = nil
	p.checkerPool = nil
	p.unresolvedImportsPerFile = nil
	p.unresolvedImports = nil
	p.typingsInfo = nil
	p.typingFiles = nil

	// Clean up file watchers waiting for missing files
	client := p.Client()
	if p.host.IsWatchEnabled() && client != nil {
		ctx := context.Background()
		p.failedLookupsWatch.update(ctx, nil)
		p.affectingLocationsWatch.update(ctx, nil)
		p.typingsFilesWatch.update(ctx, nil)
		p.typingsDirectoryWatch.update(ctx, nil)
	}
}

func (p *Project) isClosed() bool {
	return p.rootFileNames == nil
}

func formatFileList(files []string, linePrefix string, groupSuffix string) string {
	var builder strings.Builder
	length := len(groupSuffix)
	for _, file := range files {
		length += len(file) + len(linePrefix) + 1
	}
	builder.Grow(length)
	for _, file := range files {
		builder.WriteString(linePrefix)
		builder.WriteString(file)
		builder.WriteRune('\n')
	}
	builder.WriteString(groupSuffix)
	return builder.String()
}
