package project

import (
	"context"
	"fmt"
	"maps"
	"slices"
	"strings"
	"sync"
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
	DocumentRegistry() *DocumentRegistry
	GetScriptInfoByPath(path tspath.Path) *ScriptInfo
	GetOrCreateScriptInfoForFile(fileName string, path tspath.Path, scriptKind core.ScriptKind) *ScriptInfo
	OnDiscoveredSymlink(info *ScriptInfo)
	Log(s string)
	PositionEncoding() lsproto.PositionEncodingKind

	IsWatchEnabled() bool
	Client() Client
}

var _ compiler.CompilerHost = (*Project)(nil)

type Project struct {
	host ProjectHost

	name string
	kind Kind

	mu                 sync.Mutex
	initialLoadPending bool
	dirty              bool
	version            int
	deferredClose      bool
	pendingReload      PendingReload
	dirtyFilePath      tspath.Path

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
	parsedCommandLine *tsoptions.ParsedCommandLine
	program           *compiler.Program
	checkerPool       *checkerPool

	// Watchers
	rootFilesWatch          *watchedFiles[[]string]
	failedLookupsWatch      *watchedFiles[map[tspath.Path]string]
	affectingLocationsWatch *watchedFiles[map[tspath.Path]string]
}

func NewConfiguredProject(configFileName string, configFilePath tspath.Path, host ProjectHost) *Project {
	project := NewProject(configFileName, KindConfigured, tspath.GetDirectoryPath(configFileName), host)
	project.configFileName = configFileName
	project.configFilePath = configFilePath
	project.initialLoadPending = true
	client := host.Client()
	if host.IsWatchEnabled() && client != nil {
		project.rootFilesWatch = newWatchedFiles(client, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, core.Identity)
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
		project.failedLookupsWatch = newWatchedFiles(client, lsproto.WatchKindCreate, func(data map[tspath.Path]string) []string {
			return slices.Sorted(maps.Values(data))
		})
		project.affectingLocationsWatch = newWatchedFiles(client, lsproto.WatchKindChange|lsproto.WatchKindCreate|lsproto.WatchKindDelete, func(data map[tspath.Path]string) []string {
			return slices.Sorted(maps.Values(data))
		})
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
	return slices.Collect(p.rootFileNames.Values())
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
	p.log(msg)
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
			result = append(result, fmt.Sprintf("%s/%s", dir, core.IfElse(recursive, recursiveFileGlobPattern, fileGlobPattern)))
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
		if updated, err := p.rootFilesWatch.update(ctx, rootFileGlobs); err != nil {
			p.log(fmt.Sprintf("Failed to update root file watch: %v", err))
		} else if updated {
			p.log("Root file watches updated:\n" + formatFileList(rootFileGlobs, "\t", hr))
		}
	}

	if updated, err := p.failedLookupsWatch.update(ctx, failedLookupGlobs); err != nil {
		p.log(fmt.Sprintf("Failed to update failed lookup watch: %v", err))
	} else if updated {
		p.log("Failed lookup watches updated:\n" + formatFileList(p.failedLookupsWatch.globs, "\t", hr))
	}

	if updated, err := p.affectingLocationsWatch.update(ctx, affectingLocationGlobs); err != nil {
		p.log(fmt.Sprintf("Failed to update affecting location watch: %v", err))
	} else if updated {
		p.log("Affecting location watches updated:\n" + formatFileList(p.affectingLocationsWatch.globs, "\t", hr))
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
	p.log("Starting updateGraph: Project: " + p.name)
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
	p.dirty = false
	p.dirtyFilePath = ""
	if writeFileNames {
		p.log(p.print(true /*writeFileNames*/, true /*writeFileExplanation*/, false /*writeFileVersionAndText*/))
	} else if p.program != oldProgram {
		p.log("Different program with same set of root files")
	}
	if !oldProgramReused {
		if oldProgram != nil {
			for _, oldSourceFile := range oldProgram.GetSourceFiles() {
				if p.program.GetSourceFileByPath(oldSourceFile.Path()) == nil {
					p.host.DocumentRegistry().ReleaseDocument(oldSourceFile, oldProgram.GetCompilerOptions())
				}
			}
		}
		// TODO: this is currently always synchronously called by some kind of updating request,
		// but in Strada we throttle, so at least sometimes this should be considered top-level?
		p.updateWatchers(context.TODO())
	}
	p.log(fmt.Sprintf("Finishing updateGraph: Project: %s version: %d in %s", p.name, p.version, time.Since(start)))
	return true
}

func (p *Project) updateProgram() bool {
	if p.checkerPool != nil {
		p.logf("Program %d used %d checker(s)", p.version, p.checkerPool.size())
	}
	var oldProgramReused bool
	if p.program == nil || p.dirtyFilePath == "" {
		rootFileNames := p.GetRootFileNames()
		compilerOptions := p.compilerOptions
		p.program = compiler.NewProgram(compiler.ProgramOptions{
			RootFiles: rootFileNames,
			Host:      p,
			Options:   compilerOptions,
			CreateCheckerPool: func(program *compiler.Program) compiler.CheckerPool {
				p.checkerPool = newCheckerPool(4, program, p.log)
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
		case KindConfigured:
			p.pendingReload = PendingReloadFileNames
		}
	}

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

		p.logf("Config: %s : %s",
			p.configFileName,
			core.Must(core.StringifyJson(map[string]any{
				"rootNames":         parsedCommandLine.FileNames(),
				"options":           parsedCommandLine.CompilerOptions(),
				"projectReferences": parsedCommandLine.ProjectReferences(),
			}, "    ", "  ")),
		)

		p.parsedCommandLine = parsedCommandLine
		p.compilerOptions = parsedCommandLine.CompilerOptions()
		p.setRootFiles(parsedCommandLine.FileNames())
	} else {
		p.compilerOptions = &core.CompilerOptions{}
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

func (p *Project) print(writeFileNames bool, writeFileExplanation bool, writeFileVersionAndText bool) string {
	var builder strings.Builder
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

func (p *Project) log(s string) {
	p.host.Log(s)
}

func (p *Project) logf(format string, args ...interface{}) {
	p.log(fmt.Sprintf(format, args...))
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
