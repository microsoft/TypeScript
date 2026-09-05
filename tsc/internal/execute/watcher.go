package execute

import (
	"context"
	"fmt"
	"reflect"
	"slices"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/execute/watchmanager"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/trackingvfs"
)

type cachedSourceFile struct {
	file    *ast.SourceFile
	modTime time.Time
}

type watchCompilerHost struct {
	compiler.CompilerHost
	cache *collections.SyncMap[tspath.PathKey, *cachedSourceFile]
}

func (h *watchCompilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	info := h.CompilerHost.FS().Stat(opts.FileName.AsPath())

	if cached, ok := h.cache.Load(opts.PathKey); ok {
		if info != nil && info.ModTime().Equal(cached.modTime) {
			return cached.file
		}
	}

	file := h.CompilerHost.GetSourceFile(opts)
	if file != nil {
		if info != nil {
			h.cache.Store(opts.PathKey, &cachedSourceFile{
				file:    file,
				modTime: info.ModTime(),
			})
		}
	} else {
		h.cache.Delete(opts.PathKey)
	}
	return file
}

type Watcher struct {
	sys                            tsc.System
	configFileName                 tspath.RootedFilePath
	config                         *tsoptions.ParsedCommandLine
	compilerOptionsFromCommandLine *core.CompilerOptions
	commandLineRaw                 *collections.OrderedMap[string, any]
	reportDiagnostic               tsc.DiagnosticReporter
	reportErrorSummary             tsc.DiagnosticsReporter
	reportWatchStatus              tsc.DiagnosticReporter
	testing                        tsc.CommandLineTesting

	// contentMapperHost transforms content-mapped files; it is created once per watch session (when
	// enabled) and reused across cycles. It closes itself when the session context is cancelled (see
	// contentmapper.New).
	contentMapperHost    contentmapper.Host
	contentMapperProject contentmapper.Project

	program             *incremental.Program
	extendedConfigCache *tsc.ExtendedConfigCache
	configModified      bool
	configHasErrors     bool
	configFilePaths     []tspath.RootedFilePath

	sourceFileCache *collections.SyncMap[tspath.PathKey, *cachedSourceFile]

	wm            *watchmanager.WatchManager
	seenFiles     *collections.Set[tspath.PathKey] // all build dependencies (for event filtering)
	configMtimes  map[tspath.RootedFilePath]time.Time
	watchSetDirty bool
	// forceFullRebuild records a reason that requires a full NewProgram rebuild
	// (e.g. an event overflow, a mid-cycle watch failure, a newly appeared
	// project file, or a changed non-source dependency). Unlike watchSetDirty,
	// which is only raised to recheck wildcard roots and may be cleared once the
	// file set is confirmed unchanged, this flag is preserved until a full
	// rebuild actually runs so the single-file fast path cannot silently reuse a
	// stale program.
	forceFullRebuild bool
	programReady     bool

	// Test-only observability of which build path was taken.
	fastPathBuilds int
	fullBuilds     int
}

var _ tsc.Watcher = (*Watcher)(nil)

func createWatcher(
	sys tsc.System,
	configParseResult *tsoptions.ParsedCommandLine,
	compilerOptionsFromCommandLine *core.CompilerOptions,
	commandLineRaw *collections.OrderedMap[string, any],
	reportDiagnostic tsc.DiagnosticReporter,
	reportErrorSummary tsc.DiagnosticsReporter,
	testing tsc.CommandLineTesting,
) *Watcher {
	caseSensitivity := sys.FS().CaseSensitivity()
	wm := watchmanager.NewWatchManager(sys.Writer(), sys.FS().DirectoryExists, caseSensitivity)
	if t, ok := testing.(watchmanager.CommandLineTestingWithWatchBackend); ok {
		wm.SetBackend(t.WatchBackend())
	}
	w := &Watcher{
		sys:                            sys,
		config:                         configParseResult,
		compilerOptionsFromCommandLine: compilerOptionsFromCommandLine,
		commandLineRaw:                 commandLineRaw,
		reportDiagnostic:               reportDiagnostic,
		reportErrorSummary:             reportErrorSummary,
		reportWatchStatus:              tsc.CreateWatchStatusReporter(sys, configParseResult.Locale(), configParseResult.CompilerOptions(), testing),
		testing:                        testing,
		sourceFileCache:                &collections.SyncMap[tspath.PathKey, *cachedSourceFile]{},
		wm:                             wm,
	}
	if configParseResult.ConfigFile != nil {
		w.configFileName = configParseResult.ConfigFile.SourceFile.FileName()
	}
	return w
}

func (w *Watcher) start(ctx context.Context) {
	w.contentMapperHost = tsc.NewContentMapperHost(ctx, w.sys, w.config.CompilerOptions())
	if w.contentMapperHost != nil && w.testing == nil {
		defer w.contentMapperHost.Close()
	}
	w.replaceContentMapperProject(w.config)
	w.wm.Lock()
	w.extendedConfigCache = &tsc.ExtendedConfigCache{}
	host := compiler.NewCompilerHost(
		w.sys.FS(),
		w.sys.DefaultLibraryPath(),
		w.extendedConfigCache,
		getTraceFromSys(w.sys, w.config.Locale(), w.testing),
		w.contentMapperProject,
	)
	w.program = incremental.ReadBuildInfoProgram(w.config, incremental.NewBuildInfoReader(host), host)

	if w.configFileName != "" {
		w.configFilePaths = append([]tspath.RootedFilePath{w.configFileName}, w.config.ExtendedSourceFiles()...)
	}

	if value, _ := w.sys.GetEnvironmentVariable("TS_WATCH_DEBUG"); value != "" {
		w.wm.DebugLog = w.sys.Writer()
	}

	if w.testing == nil {
		w.wm.EnsureDefaultBackend()
	}

	w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
	w.watchSetDirty = true
	if err := w.doBuild(); err != nil {
		w.wm.ForceOverflow()
	}
	w.wm.Unlock()

	if w.testing == nil {
		// The content mapper host closes itself when ctx is cancelled (see contentmapper.New).
		w.wm.RunLoop(ctx, w.DoCycle)
	}
}

func (w *Watcher) replaceContentMapperProject(config *tsoptions.ParsedCommandLine) {
	if w.contentMapperHost == nil {
		return
	}
	project := w.contentMapperHost.Project(contentmapper.ProjectSpec{
		ConfigFileName:  config.ConfigName(),
		Mappers:         config.ContentMappers(),
		CompilerOptions: config.CompilerOptions(),
	})
	if w.contentMapperProject != nil {
		_ = w.contentMapperProject.Close()
	}
	w.contentMapperProject = project
}

func (w *Watcher) contentMapperWatchedFiles() []tspath.RootedFilePath {
	var files []tspath.RootedFilePath
	for _, mapper := range w.config.ContentMappers() {
		if mapper.PackageDirectory != "" && mapper.ContributionID == "" {
			files = append(files, mapper.PackageDirectory.ResolveFile("package.json"))
		}
	}
	if w.contentMapperProject != nil {
		dynamicFiles, err := w.contentMapperProject.WatchedFiles()
		if err != nil {
			w.reportDiagnostic(compiler.ContentMapperProjectDiagnostic(err))
			return files
		}
		files = append(files, dynamicFiles...)
	}
	slices.Sort(files)
	files = slices.Compact(files)
	return files
}

func (w *Watcher) computeDesiredWatches(seenFilePaths []tspath.RootedPath) map[tspath.RootedDirectoryPath]bool {
	cwd := w.sys.GetCurrentDirectory()

	desiredDirs := make(map[tspath.RootedDirectoryPath]bool) // dir → recursive

	// Wildcard directories from tsconfig (recursive or non-recursive)
	if w.config.ConfigFile != nil {
		for dir, recursive := range w.config.WildcardDirectories() {
			realDir := tspath.RootedDirectoryPathFromPath(w.sys.FS().Realpath(dir.AsPath()))
			desiredDirs[realDir] = recursive
		}
	}

	// For no-config CLI mode, ensure CWD is watched
	if w.config.ConfigFile == nil && len(desiredDirs) == 0 {
		dir := tspath.RootedDirectoryPathFromPath(w.sys.FS().Realpath(cwd.AsPath()))
		desiredDirs[dir] = false
	}

	// Config file parent directories as non-recursive watches
	for _, cfgPath := range w.configFilePaths {
		realPath := w.sys.FS().Realpath(cfgPath.AsPath())
		dir := realPath.Directory()
		if _, has := desiredDirs[dir]; !has {
			desiredDirs[dir] = false
		}
	}

	// For no-config CLI mode, also watch the CLI-specified files' directories
	if w.config.ConfigFile == nil {
		for _, fileName := range w.config.FileNames() {
			realPath := w.sys.FS().Realpath(fileName.AsPath())
			dir := realPath.Directory()
			if _, has := desiredDirs[dir]; !has {
				desiredDirs[dir] = false
			}
		}
	}

	// Add parent directories for seen files not covered by existing dir watches.
	// Resolve ancestor fallbacks first so coverage checks use final dirs.
	resolvedDirs := w.wm.ResolveDesiredDirs(desiredDirs)

	coverage := watchmanager.NewDirWatchSet(w.caseSensitivity())
	for dir, recursive := range resolvedDirs {
		coverage.Set(dir, recursive)
	}
	for _, filePath := range seenFilePaths {
		dir := filePath.Directory()
		if !coverage.Covered(dir) && watchmanager.CanWatchDirectory(dir) {
			coverage.Set(dir, false)
		}
	}

	// Re-resolve in case newly added dirs don't exist
	return w.wm.ResolveDesiredDirs(coverage.Dirs())
}

func (w *Watcher) reconcileWatches(seenFilePaths []tspath.RootedPath) error {
	desiredDirs := w.computeDesiredWatches(seenFilePaths)
	return w.wm.ReconcileWatches(desiredDirs)
}

func (w *Watcher) caseSensitivity() tspath.CaseSensitivity {
	return w.sys.FS().CaseSensitivity()
}

func (w *Watcher) DoCycle() {
	w.wm.Lock()
	defer w.wm.Unlock()

	changedPaths, overflow := w.wm.DrainEvents()
	hasEvents := len(changedPaths) > 0 || overflow

	if w.recheckTsConfig(w.contentMapperManifestChanged(changedPaths)) {
		return
	}

	if hasEvents && !overflow && !w.configModified {
		// Filter fswatch events against known dependencies
		if w.isRelevantChange(changedPaths) {
			w.evictChangedSourceFiles(changedPaths)
			caseSensitivity := w.sys.FS().CaseSensitivity()
			programFiles := w.program.GetProgram().FilesByPath()
			contentMapperWatchedFiles := collections.NewSetFromItems(core.Map(w.contentMapperWatchedFiles(), func(fileName tspath.RootedFilePath) tspath.PathKey {
				return caseSensitivity.PathKey(tspath.RootedPath(fileName))
			})...)
			contentMapperConfigChanged := false
			for eventPath := range changedPaths {
				if w.sys.FS().DirectoryExists(tspath.RootedDirectoryPathFromPath(tspath.RootedPath(eventPath))) {
					// A watched directory changed: the wildcard file set may have
					// changed, so reload file names on the next build.
					w.watchSetDirty = true
					continue
				}
				p := w.caseSensitivity().PathKey(tspath.RootedPath(eventPath))
				if contentMapperWatchedFiles.Has(p) {
					contentMapperConfigChanged = true
					w.forceFullRebuild = true
				}
				if w.config.ConfigFile != nil && w.config.PossiblyMatchesFileName(eventPath) {
					if !w.seenFiles.Has(p) {
						// A file that matches the project but was not previously
						// seen appeared: a structural change that requires a full
						// rebuild, not the single-file fast path.
						w.watchSetDirty = true
						w.forceFullRebuild = true
						continue
					}
				}
				if sourceFile := programFiles[p]; sourceFile != nil && sourceFile.ContentMapper() != "" {
					// Canonical mapped files must be transformed again, and supplemental paths are failed
					// physical lookups reserved for virtual files. Neither can use single-file AST reuse.
					w.forceFullRebuild = true
				} else if _, isSource := programFiles[p]; !isSource && w.seenFiles.Has(p) {
					// A non-source build dependency changed. Such dependencies
					// (e.g. package.json or a previously-missing module path) are
					// tracked in seenFiles but are not program source files, so a
					// missing sourceFileCache entry would not account for them.
					// Module resolution may now differ, so the single-file fast
					// path is unsafe; force a full rebuild.
					w.forceFullRebuild = true
				}
			}
			if contentMapperConfigChanged && w.contentMapperProject != nil {
				if err := w.contentMapperProject.Refresh(); err != nil {
					w.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.The_content_mapper_process_could_not_be_started_or_initialized))
					return
				}
			}
		} else {
			if w.wm.DebugLog != nil {
				fmt.Fprintf(w.wm.DebugLog, "[watch] DoCycle: %d event(s) not relevant to compilation, skipping rebuild\n", len(changedPaths))
			}
			if w.testing != nil {
				w.testing.OnProgram(w.program)
			}
			return
		}
	} else if overflow {
		// Overflow: evict the entire source file cache and force a full rebuild.
		// The fast path must not run here: after clearing the cache a one-file
		// program would present exactly one cache miss and be misread as a
		// single-file content edit, silently reusing a stale (e.g. unresolved
		// import) program instead of rediscovering the file graph.
		w.sourceFileCache = &collections.SyncMap[tspath.PathKey, *cachedSourceFile]{}
		w.watchSetDirty = true
		w.forceFullRebuild = true
	} else if !hasEvents && !w.configModified {
		// No events and no config change
		if w.wm.DebugLog != nil {
			fmt.Fprintf(w.wm.DebugLog, "[watch] DoCycle: no events, skipping\n")
		}
		if w.testing != nil {
			w.testing.OnProgram(w.program)
		}
		return
	}

	w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation))
	if err := w.doBuild(); err != nil {
		// Mid-cycle watch failure; force a full rebuild on the next event
		w.wm.ForceOverflow()
	}
}

func (w *Watcher) isRelevantChange(changedPaths map[tspath.RootedFilePath]fswatch.EventKind) bool {
	caseSensitivity := w.sys.FS().CaseSensitivity()
	opts := w.caseSensitivity()
	contentMapperWatchedFiles := collections.NewSetFromItems(core.Map(w.contentMapperWatchedFiles(), func(fileName tspath.RootedFilePath) tspath.PathKey {
		return caseSensitivity.PathKey(tspath.RootedPath(fileName))
	})...)
	for eventPath := range changedPaths {
		p := opts.PathKey(tspath.RootedPath(eventPath))
		if contentMapperWatchedFiles.Has(p) {
			return true
		}
		if w.seenFiles.Has(p) {
			return true
		}
		if w.config.ConfigFile != nil && w.config.PossiblyMatchesFileName(eventPath) {
			return true
		}
		if w.config.ConfigFile != nil && w.config.PossiblyMatchesDirectoryName(p) {
			return true
		}
		if w.sys.FS().DirectoryExists(tspath.RootedDirectoryPathFromPath(tspath.RootedPath(eventPath))) {
			if w.wm.IsPathUnderWatch(eventPath) {
				return true
			}
		}
	}
	return false
}

func (w *Watcher) doBuild() error {
	if w.configModified {
		w.sourceFileCache = &collections.SyncMap[tspath.PathKey, *cachedSourceFile]{}
		w.watchSetDirty = true
	}

	reloadedFileNames := false
	if w.watchSetDirty {
		if w.config.ConfigFile != nil && len(w.config.WildcardDirectories()) > 0 {
			newConfig := w.config.ReloadFileNamesOfParsedCommandLine(w.sys.FS())
			reloadedFileNames = true
			if !slices.Equal(w.config.FileNames(), newConfig.FileNames()) {
				w.config = newConfig
			} else {
				w.watchSetDirty = false
				w.config = newConfig
			}
		} else if !w.configModified {
			w.watchSetDirty = false
		}
	}

	if w.program != nil && w.programReady && !w.configModified && !w.watchSetDirty && !w.forceFullRebuild {
		cached := cachedvfs.From(w.sys.FS())
		innerHost := compiler.NewCompilerHost(
			cached,
			w.sys.DefaultLibraryPath(),
			w.extendedConfigCache,
			getTraceFromSys(w.sys, w.config.Locale(), w.testing),
			w.contentMapperProject,
		)
		host := &watchCompilerHost{CompilerHost: innerHost, cache: w.sourceFileCache}

		if w.tryUpdateProgram(host) {
			w.fastPathBuilds++
			result := w.compileAndEmit()
			cached.DisableAndClearCache()

			w.configMtimes = make(map[tspath.RootedFilePath]time.Time, len(w.configFilePaths))
			for _, cfgPath := range w.configFilePaths {
				if s := w.sys.FS().Stat(cfgPath.AsPath()); s != nil {
					w.configMtimes[cfgPath] = s.ModTime()
				}
			}
			w.configModified = false

			errorCount := len(result.Diagnostics)
			if errorCount == 1 {
				w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_1_error_Watching_for_file_changes))
			} else {
				w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_0_errors_Watching_for_file_changes, errorCount))
			}
			if w.testing != nil {
				w.testing.OnProgram(w.program)
			}
			return nil
		}
		cached.DisableAndClearCache()
	}

	cached := cachedvfs.From(w.sys.FS())
	tfs := &trackingvfs.FS{Inner: cached}
	innerHost := compiler.NewCompilerHost(
		tfs,
		w.sys.DefaultLibraryPath(),
		w.extendedConfigCache,
		getTraceFromSys(w.sys, w.config.Locale(), w.testing),
		w.contentMapperProject,
	)
	host := &watchCompilerHost{CompilerHost: innerHost, cache: w.sourceFileCache}

	if w.config.ConfigFile != nil {
		for dir := range w.config.WildcardDirectories() {
			tfs.SeenFiles.Add(dir.AsPath())
		}
		if !reloadedFileNames && !w.watchSetDirty && len(w.config.WildcardDirectories()) > 0 {
			w.config = w.config.ReloadFileNamesOfParsedCommandLine(w.sys.FS())
		}
	}
	for _, path := range w.configFilePaths {
		tfs.SeenFiles.Add(path.AsPath())
	}
	for _, path := range w.contentMapperWatchedFiles() {
		tfs.SeenFiles.Add(path.AsPath())
	}

	w.program = incremental.NewProgram(compiler.NewProgram(compiler.ProgramOptions{
		Config: w.config,
		Host:   host,
	}), w.program, nil, w.sys.Now, w.testing != nil)
	w.programReady = true
	w.fullBuilds++

	result := w.compileAndEmit()
	cached.DisableAndClearCache()

	caseSensitivity := w.sys.FS().CaseSensitivity()
	seenSlice := tfs.SeenFiles.ToSlice()
	w.seenFiles = collections.NewSetWithSizeHint[tspath.PathKey](len(seenSlice))
	for _, p := range seenSlice {
		w.seenFiles.Add(caseSensitivity.PathKey(p))
	}

	w.configMtimes = make(map[tspath.RootedFilePath]time.Time, len(w.configFilePaths))
	for _, cfgPath := range w.configFilePaths {
		if s := w.sys.FS().Stat(cfgPath.AsPath()); s != nil {
			w.configMtimes[cfgPath] = s.ModTime()
		}
	}

	if err := w.reconcileWatches(seenSlice); err != nil {
		fmt.Fprintf(w.sys.Writer(), "%v\n", err)
		return err
	}
	w.watchSetDirty = false
	w.configModified = false
	w.forceFullRebuild = false

	programFiles := w.program.GetProgram().FilesByPath()
	w.sourceFileCache.Range(func(path tspath.PathKey, _ *cachedSourceFile) bool {
		if _, ok := programFiles[path]; !ok {
			w.sourceFileCache.Delete(path)
		}
		return true
	})

	errorCount := len(result.Diagnostics)
	if errorCount == 1 {
		w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_1_error_Watching_for_file_changes))
	} else {
		w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_0_errors_Watching_for_file_changes, errorCount))
	}

	if w.testing != nil {
		w.testing.OnProgram(w.program)
	}
	return nil
}

func (w *Watcher) tryUpdateProgram(host *watchCompilerHost) bool {
	oldProgram := w.program.GetProgram()

	var changedPath tspath.PathKey
	var changedCount int
	for path, file := range oldProgram.FilesByPath() {
		if file.ContentMapper() != "" {
			continue
		}
		if _, ok := w.sourceFileCache.Load(path); !ok {
			changedPath = path
			changedCount++
			if changedCount > 1 {
				return false
			}
		}
	}
	if changedCount == 0 {
		return false
	}

	if oldFile := oldProgram.FilesByPath()[changedPath]; oldFile != nil {
		if newFile := host.GetSourceFile(oldFile.ParseOptions()); newFile != nil {
			if !equalJSXImplicitImport(oldProgram.Options(), oldFile, newFile) {
				return false
			}
		}
	}

	newProgram, _, reused := oldProgram.ReuseProgram(changedPath, host, nil)
	if reused {
		w.program = incremental.NewProgram(newProgram, w.program, nil, w.sys.Now, w.testing != nil)
	}
	return reused
}

// FastPathBuilds reports how many builds reused an existing program via the
// UpdateProgram single-file fast path. It is intended for tests that need to
// verify which build path was taken.
func (w *Watcher) FastPathBuilds() int { return w.fastPathBuilds }

// FullBuilds reports how many builds constructed a full program via NewProgram.
// It is intended for tests that need to verify which build path was taken.
func (w *Watcher) FullBuilds() int { return w.fullBuilds }

func equalJSXImplicitImport(options *core.CompilerOptions, oldFile *ast.SourceFile, newFile *ast.SourceFile) bool {
	isJSX := func(file *ast.SourceFile) bool {
		return file.ScriptKind == core.ScriptKindJSX || file.ScriptKind == core.ScriptKindTSX
	}
	if !isJSX(oldFile) && !isJSX(newFile) {
		return true
	}
	oldImport := ast.GetJSXRuntimeImport(ast.GetJSXImplicitImportBase(options, oldFile), options)
	newImport := ast.GetJSXRuntimeImport(ast.GetJSXImplicitImportBase(options, newFile), options)
	return oldImport == newImport
}

func (w *Watcher) evictChangedSourceFiles(changedPaths map[tspath.RootedFilePath]fswatch.EventKind) {
	caseSensitivity := w.sys.FS().CaseSensitivity()
	for eventPath := range changedPaths {
		p := caseSensitivity.PathKey(tspath.RootedPath(eventPath))
		if _, ok := w.sourceFileCache.Load(p); ok {
			if w.wm.DebugLog != nil {
				fmt.Fprintf(w.wm.DebugLog, "[watch] evicting cached source file: %s\n", p)
			}
			w.sourceFileCache.Delete(p)
		}
	}
}

func (w *Watcher) compileAndEmit() tsc.CompileAndEmitResult {
	return tsc.EmitFilesAndReportErrors(tsc.EmitInput{
		Sys:                w.sys,
		ProgramLike:        w.program,
		Program:            w.program.GetProgram(),
		Config:             w.config,
		ReportDiagnostic:   w.reportDiagnostic,
		ReportErrorSummary: w.reportErrorSummary,
		Writer:             w.sys.Writer(),
		CompileTimes:       &tsc.CompileTimes{},
		Testing:            w.testing,
	})
}

func (w *Watcher) contentMapperManifestChanged(changedPaths map[tspath.RootedFilePath]fswatch.EventKind) bool {
	caseSensitivity := w.caseSensitivity()
	var changedPathKeys map[tspath.PathKey]struct{}
	for _, mapper := range w.config.ContentMappers() {
		if mapper.PackageDirectory == "" || mapper.ContributionID != "" {
			continue
		}
		if changedPathKeys == nil {
			changedPathKeys = make(map[tspath.PathKey]struct{}, len(changedPaths))
			for path := range changedPaths {
				changedPathKeys[caseSensitivity.PathKey(path.AsPath())] = struct{}{}
			}
		}
		manifestPath := mapper.PackageDirectory.ResolveFile("package.json")
		if _, changed := changedPathKeys[caseSensitivity.PathKey(manifestPath.AsPath())]; changed {
			return true
		}
	}
	return false
}

func (w *Watcher) recheckTsConfig(force bool) bool {
	if w.configFileName == "" {
		return false
	}

	if !force && !w.configHasErrors && len(w.configFilePaths) > 0 {
		changed := false
		for _, path := range w.configFilePaths {
			oldMtime, ok := w.configMtimes[path]
			s := w.sys.FS().Stat(path.AsPath())
			if !ok {
				if s != nil {
					changed = true
					break
				}
			} else if s == nil || !s.ModTime().Equal(oldMtime) {
				changed = true
				break
			}
		}
		if !changed {
			return false
		}
	}

	configParseResult := w.parseConfigFile()
	if configParseResult == nil {
		return true
	}
	if w.configHasErrors {
		w.configModified = true
	}
	w.configHasErrors = false
	w.configFilePaths = append([]tspath.RootedFilePath{w.configFileName}, configParseResult.ExtendedSourceFiles()...)
	if !reflect.DeepEqual(w.config.ParsedConfig, configParseResult.ParsedConfig) {
		w.configModified = true
	}
	w.replaceContentMapperProject(configParseResult)
	w.config = configParseResult
	return false
}

func (w *Watcher) parseConfigFile() *tsoptions.ParsedCommandLine {
	extendedConfigCache := &tsc.ExtendedConfigCache{}
	configParseResult, errors := tsoptions.GetParsedCommandLineOfConfigFile(w.configFileName, w.compilerOptionsFromCommandLine, w.commandLineRaw, w.sys, extendedConfigCache)
	if len(errors) > 0 {
		for _, e := range errors {
			w.reportDiagnostic(e)
		}
		w.configHasErrors = true
		errorCount := len(errors)
		if errorCount == 1 {
			w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_1_error_Watching_for_file_changes))
		} else {
			w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Found_0_errors_Watching_for_file_changes, errorCount))
		}
		return nil
	}
	w.extendedConfigCache = extendedConfigCache
	return configParseResult
}
