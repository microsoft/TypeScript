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
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Kind -output=project_stringer_generated.go
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
}

// GetLineMap implements ls.Host.
func (s *snapshot) GetLineMap(fileName string) *ls.LineMap {
	file := s.program.GetSourceFile(fileName)
	scriptInfo := s.project.host.GetScriptInfoByPath(file.Path())
	if file.Version == scriptInfo.Version() {
		return scriptInfo.LineMap()
	}
	return ls.ComputeLineStarts(file.Text())
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
	NewLine() string
	DefaultLibraryPath() string
	TypingsInstaller() *TypingsInstaller
	DocumentRegistry() *DocumentRegistry
	GetScriptInfoByPath(path tspath.Path) *ScriptInfo
	GetOrCreateScriptInfoForFile(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo
	OnDiscoveredSymlink(info *ScriptInfo)
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
	compact1 := slices.Compact(arr1)
	compact2 := slices.Compact(arr2)
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

var _ compiler.CompilerHost = (*Project)(nil)

type Project struct {
	host ProjectHost

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
	compilerOptions   *core.CompilerOptions
	typeAcquisition   *core.TypeAcquisition
	parsedCommandLine *tsoptions.ParsedCommandLine
	program           *compiler.Program
	checkerPool       *checkerPool

	typingsCacheMu           sync.Mutex
	unresolvedImportsPerFile map[*ast.SourceFile][]string
	unresolvedImports        []string
	typingsInfo              *TypingsInfo
	typingFiles              []string

	// Watchers
	rootFilesWatch          *watchedFiles[[]string]
	failedLookupsWatch      *watchedFiles[map[tspath.Path]string]
	affectingLocationsWatch *watchedFiles[map[tspath.Path]string]
	typingsFilesWatch       *watchedFiles[map[tspath.Path]string]
	typingsDirectoryWatch   *watchedFiles[map[tspath.Path]string]
	typingsWatchInvoked     atomic.Bool
}

func NewConfiguredProject(configFileName string, configFilePath tspath.Path, host ProjectHost) *Project {
	project := NewProject(configFileName, KindConfigured, tspath.GetDirectoryPath(configFileName), host)
	project.configFileName = configFileName
	project.configFilePath = configFilePath
	project.initialLoadPending = true
	client := host.Client()
	if host.IsWatchEnabled() && client != nil {
		project.rootFilesWatch = newWatchedFiles(project, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, core.Identity, "root files")
	}
	return project
}

func NewInferredProject(compilerOptions *core.CompilerOptions, currentDirectory string, projectRootPath tspath.Path, host ProjectHost) *Project {
	project := NewProject(projectNamer.next("/dev/null/inferredProject"), KindInferred, currentDirectory, host)
	project.rootPath = projectRootPath
	project.compilerOptions = compilerOptions
	return project
}

func NewProject(name string, kind Kind, currentDirectory string, host ProjectHost) *Project {
	host.Log(fmt.Sprintf("Creating %sProject: %s, currentDirectory: %s", kind.String(), name, currentDirectory))
	project := &Project{
		host:             host,
		name:             name,
		kind:             kind,
		currentDirectory: currentDirectory,
		rootFileNames:    &collections.OrderedMap[tspath.Path, string]{},
	}
	project.comparePathsOptions = tspath.ComparePathsOptions{
		CurrentDirectory:          currentDirectory,
		UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
	}
	client := host.Client()
	if host.IsWatchEnabled() && client != nil {
		globMapper := createResolutionLookupGlobMapper(host)
		project.failedLookupsWatch = newWatchedFiles(project, lsproto.WatchKindCreate, globMapper, "failed lookup")
		project.affectingLocationsWatch = newWatchedFiles(project, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, globMapper, "affecting location")
		project.typingsFilesWatch = newWatchedFiles(project, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, globMapperForTypingsInstaller, "typings installer files")
		project.typingsDirectoryWatch = newWatchedFiles(project, lsproto.WatchKindCreate|lsproto.WatchKindDelete, globMapperForTypingsInstaller, "typings installer directories")
	}
	project.markAsDirty()
	return project
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
func (p *Project) GetSourceFile(fileName string, path tspath.Path, languageVersion core.ScriptTarget) *ast.SourceFile {
	scriptKind := p.getScriptKind(fileName)
	if scriptInfo := p.getOrCreateScriptInfoAndAttachToProject(fileName, scriptKind); scriptInfo != nil {
		var (
			oldSourceFile      *ast.SourceFile
			oldCompilerOptions *core.CompilerOptions
		)
		if p.program != nil {
			oldSourceFile = p.program.GetSourceFileByPath(scriptInfo.path)
			oldCompilerOptions = p.program.GetCompilerOptions()
		}
		return p.host.DocumentRegistry().AcquireDocument(scriptInfo, p.compilerOptions, oldSourceFile, oldCompilerOptions)
	}
	return nil
}

// Updates the program if needed.
func (p *Project) GetProgram() *compiler.Program {
	p.updateGraph()
	return p.program
}

// NewLine implements compiler.CompilerHost.
func (p *Project) NewLine() string {
	return p.host.NewLine()
}

// Trace implements compiler.CompilerHost.
func (p *Project) Trace(msg string) {
	p.Log(msg)
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
	checkerPool := p.checkerPool
	snapshot := &snapshot{
		project:          p,
		positionEncoding: p.host.PositionEncoding(),
		program:          program,
	}
	languageService := ls.NewLanguageService(ctx, snapshot)
	cleanup := func() {
		if checkerPool.isRequestCheckerInUse(core.GetRequestID(ctx)) {
			panic(fmt.Errorf("checker for request ID %s not returned to pool at end of request", core.GetRequestID(ctx)))
		}
	}
	return languageService, cleanup
}

func (p *Project) getRootFileWatchGlobs() []string {
	if p.kind == KindConfigured {
		globs := p.parsedCommandLine.WildcardDirectories()
		result := make([]string, 0, len(globs)+1)
		result = append(result, p.configFileName)
		for dir, recursive := range globs {
			result = append(result, fmt.Sprintf("%s/%s", tspath.NormalizePath(dir), core.IfElse(recursive, recursiveFileGlobPattern, fileGlobPattern)))
		}
		for _, fileName := range p.parsedCommandLine.LiteralFileNames() {
			result = append(result, fileName)
		}
		return result
	}
	return nil
}

func (p *Project) getModuleResolutionWatchGlobs() (failedLookups map[tspath.Path]string, affectingLocaions map[tspath.Path]string) {
	failedLookups = make(map[tspath.Path]string)
	affectingLocaions = make(map[tspath.Path]string)
	for _, resolvedModulesInFile := range p.program.GetResolvedModules() {
		for _, resolvedModule := range resolvedModulesInFile {
			for _, failedLookupLocation := range resolvedModule.FailedLookupLocations {
				path := p.toPath(failedLookupLocation)
				if _, ok := failedLookups[path]; !ok {
					failedLookups[path] = failedLookupLocation
				}
			}
			for _, affectingLocation := range resolvedModule.AffectingLocations {
				path := p.toPath(affectingLocation)
				if _, ok := affectingLocaions[path]; !ok {
					affectingLocaions[path] = affectingLocation
				}
			}
		}
	}
	return failedLookups, affectingLocaions
}

func (p *Project) updateWatchers(ctx context.Context) {
	client := p.host.Client()
	if !p.host.IsWatchEnabled() || client == nil {
		return
	}

	rootFileGlobs := p.getRootFileWatchGlobs()
	failedLookupGlobs, affectingLocationGlobs := p.getModuleResolutionWatchGlobs()

	if rootFileGlobs != nil {
		p.rootFilesWatch.update(ctx, rootFileGlobs)
	}

	p.failedLookupsWatch.update(ctx, failedLookupGlobs)
	p.affectingLocationsWatch.update(ctx, affectingLocationGlobs)
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
	if p.kind == KindConfigured {
		if p.rootFileNames.Has(path) || p.parsedCommandLine.MatchesFileName(fileName) {
			p.pendingReload = PendingReloadFileNames
			p.markAsDirty()
			return
		}
	}

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
	if scriptInfo := p.host.GetOrCreateScriptInfoForFile(fileName, p.toPath(fileName), scriptKind); scriptInfo != nil {
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
func (p *Project) updateGraph() bool {
	p.mu.Lock()
	defer p.mu.Unlock()

	if !p.dirty {
		return false
	}

	start := time.Now()
	p.Log("Starting updateGraph: Project: " + p.name)
	var writeFileNames bool
	oldProgram := p.program
	p.initialLoadPending = false

	if p.kind == KindConfigured && p.pendingReload != PendingReloadNone {
		switch p.pendingReload {
		case PendingReloadFileNames:
			p.parsedCommandLine = tsoptions.ReloadFileNamesOfParsedCommandLine(p.parsedCommandLine, p.host.FS())
			writeFileNames = p.setRootFiles(p.parsedCommandLine.FileNames())
		case PendingReloadFull:
			if err := p.loadConfig(); err != nil {
				panic(fmt.Sprintf("failed to reload config: %v", err))
			}
		}
		p.pendingReload = PendingReloadNone
	}

	oldProgramReused := p.updateProgram()
	hasAddedOrRemovedFiles := p.hasAddedorRemovedFiles.Load()
	p.hasAddedorRemovedFiles.Store(false)
	p.dirty = false
	p.dirtyFilePath = ""
	if writeFileNames {
		p.Log(p.print(true /*writeFileNames*/, true /*writeFileExplanation*/, false /*writeFileVersionAndText*/, &strings.Builder{}))
	} else if p.program != oldProgram {
		p.Log("Different program with same set of root files")
	}
	if !oldProgramReused {
		if oldProgram != nil {
			for _, oldSourceFile := range oldProgram.GetSourceFiles() {
				if p.program.GetSourceFileByPath(oldSourceFile.Path()) == nil {
					p.host.DocumentRegistry().ReleaseDocument(oldSourceFile, oldProgram.GetCompilerOptions())
				}
			}
		}
		p.enqueueInstallTypingsForProject(oldProgram, hasAddedOrRemovedFiles)
		// TODO: this is currently always synchronously called by some kind of updating request,
		// but in Strada we throttle, so at least sometimes this should be considered top-level?
		p.updateWatchers(context.TODO())
	}
	p.Logf("Finishing updateGraph: Project: %s version: %d in %s", p.name, p.version, time.Since(start))
	return true
}

func (p *Project) updateProgram() bool {
	if p.checkerPool != nil {
		p.Logf("Program %d used %d checker(s)", p.version, p.checkerPool.size())
	}
	var oldProgramReused bool
	if p.program == nil || p.dirtyFilePath == "" {
		rootFileNames := p.GetRootFileNames()
		compilerOptions := p.compilerOptions
		var typingsLocation string
		if typeAcquisition := p.getTypeAcquisition(); typeAcquisition != nil && typeAcquisition.Enable.IsTrue() {
			typingsLocation = p.host.TypingsInstaller().TypingsLocation
		}
		p.program = compiler.NewProgram(compiler.ProgramOptions{
			RootFiles:       rootFileNames,
			Host:            p,
			Options:         compilerOptions,
			TypingsLocation: typingsLocation,
			CreateCheckerPool: func(program *compiler.Program) compiler.CheckerPool {
				p.checkerPool = newCheckerPool(4, program, p.Log)
				return p.checkerPool
			},
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

func (p *Project) enqueueInstallTypingsForProject(oldProgram *compiler.Program, forceRefresh bool) {
	typingsInstaller := p.host.TypingsInstaller()
	if typingsInstaller == nil {
		return
	}

	typeAcquisition := p.getTypeAcquisition()
	if typeAcquisition == nil || !typeAcquisition.Enable.IsTrue() {
		// !!! sheetal Should be probably done where we set typeAcquisition
		p.unresolvedImports = nil
		p.unresolvedImportsPerFile = nil
		p.typingFiles = nil
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
	sourceFilesSet := core.NewSetWithSizeHint[*ast.SourceFile](len(sourceFiles))

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
	if p.typingsInfo != typingsInfo {
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

		// 	// Invalidate files with unresolved imports
		// 	this.resolutionCache.setFilesWithInvalidatedNonRelativeUnresolvedImports(this.cachedUnresolvedImportsPerFile);

		p.markAsDirtyLocked()
		client := p.host.Client()
		if client != nil {
			err := client.RefreshDiagnostics(context.Background())
			if err != nil {
				p.Logf("Error when refreshing diagnostics from updateTypingFiles %v", err)
			}
		}
	}
}

func (p *Project) WatchTypingLocations(files []string) {
	client := p.host.Client()
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

func (p *Project) RemoveFile(info *ScriptInfo, fileExists bool, detachFromProject bool) {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.removeFile(info, fileExists, detachFromProject)
	p.markAsDirtyLocked()
}

func (p *Project) removeFile(info *ScriptInfo, fileExists bool, detachFromProject bool) {
	if p.isRoot(info) {
		switch p.kind {
		case KindInferred:
			p.rootFileNames.Delete(info.path)
			p.typeAcquisition = nil
		case KindConfigured:
			p.pendingReload = PendingReloadFileNames
		}
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
	if detachFromProject {
		info.detachFromProject(p)
	}
}

func (p *Project) AddRoot(info *ScriptInfo) {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.addRoot(info)
	p.markAsDirtyLocked()
}

func (p *Project) addRoot(info *ScriptInfo) {
	// !!!
	// if p.kind == KindInferred {
	// 	p.host.startWatchingConfigFilesForInferredProjectRoot(info.path);
	//  // handle JS toggling
	// }
	if p.isRoot(info) {
		panic("script info is already a root")
	}
	p.rootFileNames.Set(info.path, info.fileName)
	if p.kind == KindInferred {
		p.typeAcquisition = nil
	}
	info.attachToProject(p)
}

func (p *Project) LoadConfig() error {
	if err := p.loadConfig(); err != nil {
		return err
	}
	p.markAsDirty()
	return nil
}

func (p *Project) loadConfig() error {
	if p.kind != KindConfigured {
		panic("loadConfig called on non-configured project")
	}

	if configFileContent, ok := p.host.FS().ReadFile(p.configFileName); ok {
		configDir := tspath.GetDirectoryPath(p.configFileName)
		tsConfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(p.configFileName, p.configFilePath, configFileContent)
		parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
			tsConfigSourceFile,
			p.host,
			configDir,
			nil, /*existingOptions*/
			p.configFileName,
			nil, /*resolutionStack*/
			nil, /*extraFileExtensions*/
			nil, /*extendedConfigCache*/
		)

		p.Logf("Config: %s : %s",
			p.configFileName,
			core.Must(core.StringifyJson(map[string]any{
				"rootNames":         parsedCommandLine.FileNames(),
				"options":           parsedCommandLine.CompilerOptions(),
				"projectReferences": parsedCommandLine.ProjectReferences(),
			}, "    ", "  ")),
		)

		p.parsedCommandLine = parsedCommandLine
		p.compilerOptions = parsedCommandLine.CompilerOptions()
		p.typeAcquisition = parsedCommandLine.TypeAcquisition()
		p.setRootFiles(parsedCommandLine.FileNames())
	} else {
		p.compilerOptions = &core.CompilerOptions{}
		p.typeAcquisition = nil
		return fmt.Errorf("could not read file %q", p.configFileName)
	}
	return nil
}

// setRootFiles returns true if the set of root files has changed.
func (p *Project) setRootFiles(rootFileNames []string) bool {
	var hasChanged bool
	newRootScriptInfos := make(map[tspath.Path]struct{}, len(rootFileNames))
	for _, file := range rootFileNames {
		scriptKind := p.getScriptKind(file)
		path := p.toPath(file)
		// !!! updateNonInferredProjectFiles uses a fileExists check, which I guess
		// could be needed if a watcher fails?
		scriptInfo := p.host.GetOrCreateScriptInfoForFile(file, path, scriptKind)
		newRootScriptInfos[path] = struct{}{}
		isAlreadyRoot := p.rootFileNames.Has(path)
		hasChanged = hasChanged || !isAlreadyRoot

		if !isAlreadyRoot && scriptInfo != nil {
			p.addRoot(scriptInfo)
			if scriptInfo.isOpen {
				// !!!
				// s.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo)
			}
		} else if !isAlreadyRoot {
			p.rootFileNames.Set(path, file)
		}
	}

	if p.rootFileNames.Size() > len(rootFileNames) {
		hasChanged = true
		for root := range p.rootFileNames.Keys() {
			if _, ok := newRootScriptInfos[root]; !ok {
				if info := p.host.GetScriptInfoByPath(root); info != nil {
					p.removeFile(info, true /*fileExists*/, true /*detachFromProject*/)
				} else {
					p.rootFileNames.Delete(root)
				}
			}
		}
	}
	return hasChanged
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
		// if excludeFilesFromExternalLibraries && p.program.IsSourceFileFromExternalLibrary(sourceFile) {
		//     continue;
		// }
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
	builder.WriteString(fmt.Sprintf("Project '%s' (%s)\n", p.name, p.kind.String()))
	if p.initialLoadPending {
		builder.WriteString("\tFiles (0) InitialLoadPending\n")
	} else if p.program == nil {
		builder.WriteString("\tFiles (0) NoProgram\n")
	} else {
		sourceFiles := p.program.GetSourceFiles()
		builder.WriteString(fmt.Sprintf("\tFiles (%d)\n", len(sourceFiles)))
		if writeFileNames {
			for _, sourceFile := range sourceFiles {
				builder.WriteString("\t\t" + sourceFile.FileName())
				if writeFileVersionAndText {
					builder.WriteString(fmt.Sprintf(" %d %s", sourceFile.Version, sourceFile.Text()))
				}
				builder.WriteRune('\n')
			}
			// !!!
			// if writeFileExplanation {}
		}
	}
	builder.WriteString(hr)
	return builder.String()
}

func (p *Project) Log(s string) {
	p.host.Log(s)
}

func (p *Project) Logf(format string, args ...interface{}) {
	p.Log(fmt.Sprintf(format, args...))
}

func (p *Project) Close() {
	// !!!
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
