package execute

import (
	"context"
	"errors"
	"fmt"
	"io"
	"reflect"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/fswatch"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
	"github.com/microsoft/typescript-go/internal/vfs/trackingvfs"
)

// WatchBackend abstracts fswatch.Watcher for testing
type WatchBackend interface {
	WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error)
}

type commandLineTestingWithWatchBackend interface {
	WatchBackend() WatchBackend
}

type fswatchBackend struct{ inner fswatch.Watcher }

func (b *fswatchBackend) WatchDirectory(dir string, fn fswatch.WatchCallback, recursive bool, ignore func(string) bool) (io.Closer, error) {
	var opts []fswatch.WatchOption
	if recursive {
		opts = append(opts, fswatch.WithRecursive())
	}
	if ignore != nil {
		opts = append(opts, fswatch.WithIgnore(ignore))
	}
	return b.inner.WatchDirectory(dir, fn, opts...)
}

type watchedDir struct {
	closer    io.Closer
	recursive bool
}

type cachedSourceFile struct {
	file    *ast.SourceFile
	modTime time.Time
}

type watchCompilerHost struct {
	compiler.CompilerHost
	cache *collections.SyncMap[tspath.Path, *cachedSourceFile]
}

func (h *watchCompilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	info := h.CompilerHost.FS().Stat(opts.FileName)

	if cached, ok := h.cache.Load(opts.Path); ok {
		if info != nil && info.ModTime().Equal(cached.modTime) {
			return cached.file
		}
	}

	file := h.CompilerHost.GetSourceFile(opts)
	if file != nil {
		if info != nil {
			h.cache.Store(opts.Path, &cachedSourceFile{
				file:    file,
				modTime: info.ModTime(),
			})
		}
	} else {
		h.cache.Delete(opts.Path)
	}
	return file
}

type Watcher struct {
	mu                             sync.Mutex
	sys                            tsc.System
	configFileName                 string
	config                         *tsoptions.ParsedCommandLine
	compilerOptionsFromCommandLine *core.CompilerOptions
	commandLineRaw                 *collections.OrderedMap[string, any]
	reportDiagnostic               tsc.DiagnosticReporter
	reportErrorSummary             tsc.DiagnosticsReporter
	reportWatchStatus              tsc.DiagnosticReporter
	testing                        tsc.CommandLineTesting

	program             *incremental.Program
	extendedConfigCache *tsc.ExtendedConfigCache
	configModified      bool
	configHasErrors     bool
	configFilePaths     []string

	sourceFileCache *collections.SyncMap[tspath.Path, *cachedSourceFile]

	backend      WatchBackend
	watchedDirs  map[string]*watchedDir        // dir path → watch state
	seenFiles    *collections.Set[tspath.Path] // all build dependencies (for event filtering)
	configMtimes map[string]time.Time
	doCycleCh    chan struct{}
	debugLog     io.Writer // nil = silent; set via TS_WATCH_DEBUG

	changedMu       sync.Mutex
	changedPaths    map[string]fswatch.EventKind // event path → last event kind
	changedOverflow bool                         // true on ErrOverflow; forces full scan fallback
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
	w := &Watcher{
		sys:                            sys,
		config:                         configParseResult,
		compilerOptionsFromCommandLine: compilerOptionsFromCommandLine,
		commandLineRaw:                 commandLineRaw,
		reportDiagnostic:               reportDiagnostic,
		reportErrorSummary:             reportErrorSummary,
		reportWatchStatus:              tsc.CreateWatchStatusReporter(sys, configParseResult.Locale(), configParseResult.CompilerOptions(), testing),
		testing:                        testing,
		sourceFileCache:                &collections.SyncMap[tspath.Path, *cachedSourceFile]{},
		doCycleCh:                      make(chan struct{}, 1),
		watchedDirs:                    make(map[string]*watchedDir),
	}
	if configParseResult.ConfigFile != nil {
		w.configFileName = configParseResult.ConfigFile.SourceFile.FileName()
	}
	if t, ok := testing.(commandLineTestingWithWatchBackend); ok {
		w.backend = t.WatchBackend()
	}
	return w
}

func (w *Watcher) start(ctx context.Context) {
	w.mu.Lock()
	w.extendedConfigCache = &tsc.ExtendedConfigCache{}
	host := compiler.NewCompilerHost(w.sys.GetCurrentDirectory(), w.sys.FS(), w.sys.DefaultLibraryPath(), w.extendedConfigCache, getTraceFromSys(w.sys, w.config.Locale(), w.testing))
	w.program = incremental.ReadBuildInfoProgram(w.config, incremental.NewBuildInfoReader(host), host)

	if w.configFileName != "" {
		w.configFilePaths = append([]string{w.configFileName}, w.config.ExtendedSourceFiles()...)
	}

	if w.sys.GetEnvironmentVariable("TS_WATCH_DEBUG") != "" {
		w.debugLog = w.sys.Writer()
	}

	if w.testing == nil && w.backend == nil {
		fsw := fswatch.Default()
		w.backend = &fswatchBackend{inner: fsw}
		if w.debugLog != nil {
			fmt.Fprintf(w.debugLog, "[watch] using %s backend\n", fsw.Name())
		}
	}

	w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
	w.doBuild()
	w.mu.Unlock()

	if w.testing == nil {
		for {
			select {
			case <-ctx.Done():
				w.closeAllWatches()
				return
			case <-w.doCycleCh:
				w.DoCycle()
			}
		}
	}
}

func (w *Watcher) computeDesiredWatches(seenFilePaths []string) map[string]bool {
	cwd := w.sys.GetCurrentDirectory()

	desiredDirs := make(map[string]bool) // dir → recursive

	// Wildcard directories from tsconfig (recursive or non-recursive)
	if w.config.ConfigFile != nil {
		for dir, recursive := range w.config.WildcardDirectories() {
			realDir := w.sys.FS().Realpath(dir)
			desiredDirs[realDir] = recursive
		}
	}

	// For no-config CLI mode, ensure CWD is watched
	if w.config.ConfigFile == nil && len(desiredDirs) == 0 {
		dir := w.sys.FS().Realpath(cwd)
		desiredDirs[dir] = false
	}

	// Config file parent directories as non-recursive watches
	for _, cfgPath := range w.configFilePaths {
		realPath := w.sys.FS().Realpath(cfgPath)
		dir := tspath.GetDirectoryPath(realPath)
		if _, has := desiredDirs[dir]; !has {
			desiredDirs[dir] = false
		}
	}

	// For no-config CLI mode, also watch the CLI-specified files' directories
	if w.config.ConfigFile == nil {
		for _, fileName := range w.config.FileNames() {
			absPath := tspath.GetNormalizedAbsolutePath(fileName, cwd)
			realPath := w.sys.FS().Realpath(absPath)
			dir := tspath.GetDirectoryPath(realPath)
			if _, has := desiredDirs[dir]; !has {
				desiredDirs[dir] = false
			}
		}
	}

	// Add parent directories for seen files not covered by existing dir watches.
	// Resolve ancestor fallbacks first so coverage checks use final dirs.
	resolvedDirs := w.resolveDesiredDirs(desiredDirs)

	opts := w.comparePathsOptions()
	for _, filePath := range seenFilePaths {
		dir := tspath.GetDirectoryPath(filePath)
		covered := false
		for wdir, recursive := range resolvedDirs {
			if recursive {
				if tspath.ContainsPath(wdir, dir, opts) {
					covered = true
					break
				}
			} else if dir == wdir {
				covered = true
				break
			}
		}
		if !covered {
			if canWatchDirectory(dir) {
				resolvedDirs[dir] = false
			}
		}
	}

	// Re-resolve in case newly added dirs don't exist
	return w.resolveDesiredDirs(resolvedDirs)
}

func (w *Watcher) reconcileWatches(seenFilePaths []string) {
	if w.backend == nil {
		return
	}

	desiredDirs := w.computeDesiredWatches(seenFilePaths)

	// Reconcile directory watches using DiffMaps, performing effects inline
	core.DiffMapsFunc(
		w.watchedDirs,
		desiredDirs,
		func(wd *watchedDir, recursive bool) bool { return wd.recursive == recursive },
		func(dir string, recursive bool) {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] watching directory %s (recursive=%v)\n", dir, recursive)
			}
			w.createDirWatch(dir, recursive)
		},
		func(dir string, wd *watchedDir) {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] closing stale dir watch: %s\n", dir)
			}
			wd.closer.Close()
			delete(w.watchedDirs, dir)
		},
		func(dir string, wd *watchedDir, recursive bool) {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] recreating dir watch %s (recursive %v→%v)\n", dir, wd.recursive, recursive)
			}
			wd.closer.Close()
			delete(w.watchedDirs, dir)
			w.createDirWatch(dir, recursive)
		},
	)
}

func (w *Watcher) comparePathsOptions() tspath.ComparePathsOptions {
	return tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: w.sys.FS().UseCaseSensitiveFileNames(),
		CurrentDirectory:          w.sys.GetCurrentDirectory(),
	}
}

func (w *Watcher) resolveDesiredDirs(desiredDirs map[string]bool) map[string]bool {
	resolved := make(map[string]bool, len(desiredDirs))
	for dir, recursive := range desiredDirs {
		watchDir := dir
		watchRecursive := recursive
		for !w.sys.FS().DirectoryExists(watchDir) {
			parent := tspath.GetDirectoryPath(watchDir)
			if parent == watchDir {
				break
			}
			watchDir = parent
			watchRecursive = false // ancestor fallbacks are always non-recursive
		}
		if !w.sys.FS().DirectoryExists(watchDir) || !canWatchDirectory(watchDir) {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] no watchable ancestor for %s\n", dir)
			}
			continue
		}
		if watchDir != dir && w.debugLog != nil {
			fmt.Fprintf(w.debugLog, "[watch] resolved %s to ancestor %s\n", dir, watchDir)
		}
		if existing, has := resolved[watchDir]; has {
			resolved[watchDir] = existing || watchRecursive
		} else {
			resolved[watchDir] = watchRecursive
		}
	}
	return resolved
}

func canWatchDirectory(dir string) bool {
	components := tspath.GetPathComponents(dir, "")
	length := len(components)
	if length <= 2 {
		return false
	}
	rootLength := perceivedOsRootLengthForWatching(components)
	return length > rootLength+1
}

func perceivedOsRootLengthForWatching(components []string) int {
	length := len(components)
	if length <= 1 {
		return 1
	}
	root := components[0]
	indexAfterOsRoot := 1
	isDosStyle := len(root) >= 2 && tspath.IsVolumeCharacter(root[0]) && root[1] == ':'

	if root != "/" && !isDosStyle && len(components) > 1 {
		// Check for UNC-like paths: //server/c$/...
		if len(components[1]) >= 2 && tspath.IsVolumeCharacter(components[1][0]) && strings.HasSuffix(components[1], "$") {
			if length == 2 {
				return 2
			}
			indexAfterOsRoot = 2
			isDosStyle = true
		}
	}

	if isDosStyle && (indexAfterOsRoot >= length || !strings.EqualFold(components[indexAfterOsRoot], "users")) {
		return indexAfterOsRoot
	}

	if indexAfterOsRoot < length && strings.EqualFold(components[indexAfterOsRoot], "workspaces") {
		// Codespaces: /workspaces repos are hoisted here
		return indexAfterOsRoot + 1
	}

	// /home/username or C:/Users/username
	return indexAfterOsRoot + 2
}

func (w *Watcher) createDirWatch(dir string, recursive bool) {
	entry := &watchedDir{recursive: recursive}
	cb := func(events []fswatch.Event, err error) {
		if err != nil && errors.Is(err, fswatch.ErrWatchTerminated) {
			w.handleWatchTerminated(dir, entry)
			return
		}
		w.onWatchEvents(events, err)
	}
	watch, err := w.backend.WatchDirectory(dir, cb, recursive, shouldIgnoreWatchPath)
	if err != nil {
		if w.debugLog != nil {
			fmt.Fprintf(w.debugLog, "[watch] failed to watch directory %s: %v\n", dir, err)
		}
		return
	}
	entry.closer = watch
	w.watchedDirs[dir] = entry
}

func (w *Watcher) closeAllWatches() {
	w.mu.Lock()
	dirs := make([]io.Closer, 0, len(w.watchedDirs))
	for dir, wd := range w.watchedDirs {
		dirs = append(dirs, wd.closer)
		delete(w.watchedDirs, dir)
	}
	w.mu.Unlock()
	for _, c := range dirs {
		c.Close()
	}
}

func (w *Watcher) handleWatchTerminated(dir string, identity *watchedDir) {
	if w.debugLog != nil {
		fmt.Fprintf(w.debugLog, "[watch] watch terminated: %s\n", dir)
	}
	var staleCloser io.Closer
	w.mu.Lock()
	if wd, ok := w.watchedDirs[dir]; ok && wd == identity {
		staleCloser = wd.closer
		delete(w.watchedDirs, dir)
	}
	w.mu.Unlock()
	if staleCloser != nil {
		staleCloser.Close()
	}
	w.changedMu.Lock()
	w.changedOverflow = true
	w.changedMu.Unlock()
	w.signalDoCycle()
}

func shouldIgnoreWatchPath(path string) bool {
	p := tspath.NormalizeSlashes(path)
	return strings.HasSuffix(p, "/.git") ||
		strings.Contains(p, "/.git/") ||
		strings.Contains(p, "/node_modules/.") ||
		strings.Contains(p, "/.#")
}

func (w *Watcher) onWatchEvents(events []fswatch.Event, err error) {
	if err != nil {
		if errors.Is(err, fswatch.ErrOverflow) {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] event overflow, triggering rebuild\n")
			}
			w.changedMu.Lock()
			w.changedOverflow = true
			w.changedMu.Unlock()
			w.signalDoCycle()
			return
		}
		fmt.Fprintf(w.sys.Writer(), "Warning: File watch error: %v\n", err)
		return
	}

	if len(events) > 0 {
		if w.debugLog != nil {
			fmt.Fprintf(w.debugLog, "[watch] %d event(s): ", len(events))
			for i, e := range events {
				if i > 0 {
					fmt.Fprint(w.debugLog, ", ")
				}
				if i >= 5 {
					fmt.Fprintf(w.debugLog, "... and %d more", len(events)-i)
					break
				}
				fmt.Fprintf(w.debugLog, "%s %s", e.Kind, e.Path)
			}
			fmt.Fprintln(w.debugLog)
		}
		w.changedMu.Lock()
		if w.changedPaths == nil {
			w.changedPaths = make(map[string]fswatch.EventKind, len(events))
		}
		for _, e := range events {
			w.changedPaths[e.Path] = e.Kind
		}
		w.changedMu.Unlock()
		w.signalDoCycle()
	}
}

func (w *Watcher) signalDoCycle() {
	select {
	case w.doCycleCh <- struct{}{}:
		// Signal sent; the DoCycle loop will pick it up.
	default:
		// A signal is already pending; coalesced.
	}
}

func (w *Watcher) DoCycle() {
	w.mu.Lock()
	defer w.mu.Unlock()

	w.changedMu.Lock()
	changedPaths := w.changedPaths
	overflow := w.changedOverflow
	w.changedPaths = nil
	w.changedOverflow = false
	w.changedMu.Unlock()

	hasEvents := len(changedPaths) > 0 || overflow

	if w.recheckTsConfig() {
		return
	}

	if hasEvents && !overflow && !w.configModified {
		// Filter fswatch events against known dependencies
		if w.isRelevantChange(changedPaths) {
			w.evictChangedSourceFiles(changedPaths)
		} else {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] DoCycle: %d event(s) not relevant to compilation, skipping rebuild\n", len(changedPaths))
			}
			if w.testing != nil {
				w.testing.OnProgram(w.program)
			}
			return
		}
	} else if overflow {
		// Overflow: evict the entire source file cache to force re-build
		w.sourceFileCache = &collections.SyncMap[tspath.Path, *cachedSourceFile]{}
	} else if !hasEvents && !w.configModified {
		// No events and no config change
		if w.debugLog != nil {
			fmt.Fprintf(w.debugLog, "[watch] DoCycle: no events, skipping\n")
		}
		if w.testing != nil {
			w.testing.OnProgram(w.program)
		}
		return
	}

	w.reportWatchStatus(ast.NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation))
	w.doBuild()
}

func (w *Watcher) isRelevantChange(changedPaths map[string]fswatch.EventKind) bool {
	caseSensitive := w.sys.FS().UseCaseSensitiveFileNames()
	cwd := w.sys.GetCurrentDirectory()
	opts := w.comparePathsOptions()
	for eventPath := range changedPaths {
		p := tspath.ToPath(eventPath, cwd, caseSensitive)
		if w.seenFiles.Has(p) {
			return true
		}
		if w.config.ConfigFile != nil && w.config.PossiblyMatchesFileName(eventPath) {
			return true
		}
		if w.config.ConfigFile != nil && w.config.PossiblyMatchesDirectoryName(p) {
			return true
		}
		// If a directory was created under an ancestor fallback watch,
		// treat it as relevant — it may be on the path to a previously
		// non-existent directory we want to watch. Err on the side of
		// false positives (unnecessary rebuild) over false negatives
		// (missed rebuild).
		if w.sys.FS().DirectoryExists(eventPath) {
			for dir := range w.watchedDirs {
				if tspath.ContainsPath(dir, eventPath, opts) {
					return true
				}
			}
		}
	}
	return false
}

func (w *Watcher) doBuild() {
	if w.configModified {
		w.sourceFileCache = &collections.SyncMap[tspath.Path, *cachedSourceFile]{}
	}

	cached := cachedvfs.From(w.sys.FS())
	tfs := &trackingvfs.FS{Inner: cached}
	innerHost := compiler.NewCompilerHost(w.sys.GetCurrentDirectory(), tfs, w.sys.DefaultLibraryPath(), w.extendedConfigCache, getTraceFromSys(w.sys, w.config.Locale(), w.testing))
	host := &watchCompilerHost{CompilerHost: innerHost, cache: w.sourceFileCache}

	var wildcardDirs map[string]bool
	if w.config.ConfigFile != nil {
		wildcardDirs = w.config.WildcardDirectories()
		for dir := range wildcardDirs {
			tfs.SeenFiles.Add(dir)
		}
		if len(wildcardDirs) > 0 {
			w.config = w.config.ReloadFileNamesOfParsedCommandLine(w.sys.FS())
		}
	}
	for _, path := range w.configFilePaths {
		tfs.SeenFiles.Add(path)
	}

	w.program = incremental.NewProgram(compiler.NewProgram(compiler.ProgramOptions{
		Config: w.config,
		Host:   host,
	}), w.program, nil, w.testing != nil)

	result := w.compileAndEmit()
	cached.DisableAndClearCache()

	caseSensitive := w.sys.FS().UseCaseSensitiveFileNames()
	cwd := w.sys.GetCurrentDirectory()
	seenSlice := tfs.SeenFiles.ToSlice()
	w.seenFiles = collections.NewSetWithSizeHint[tspath.Path](len(seenSlice))
	for _, p := range seenSlice {
		w.seenFiles.Add(tspath.ToPath(p, cwd, caseSensitive))
	}

	w.configMtimes = make(map[string]time.Time, len(w.configFilePaths))
	for _, cfgPath := range w.configFilePaths {
		if s := w.sys.FS().Stat(cfgPath); s != nil {
			w.configMtimes[cfgPath] = s.ModTime()
		}
	}

	w.reconcileWatches(seenSlice)
	w.configModified = false

	programFiles := w.program.GetProgram().FilesByPath()
	w.sourceFileCache.Range(func(path tspath.Path, _ *cachedSourceFile) bool {
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
}

func (w *Watcher) evictChangedSourceFiles(changedPaths map[string]fswatch.EventKind) {
	caseSensitive := w.sys.FS().UseCaseSensitiveFileNames()
	cwd := w.sys.GetCurrentDirectory()
	for eventPath := range changedPaths {
		p := tspath.ToPath(eventPath, cwd, caseSensitive)
		if _, ok := w.sourceFileCache.Load(p); ok {
			if w.debugLog != nil {
				fmt.Fprintf(w.debugLog, "[watch] evicting cached source file: %s\n", p)
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

func (w *Watcher) recheckTsConfig() bool {
	if w.configFileName == "" {
		return false
	}

	if !w.configHasErrors && len(w.configFilePaths) > 0 {
		changed := false
		for _, path := range w.configFilePaths {
			oldMtime, ok := w.configMtimes[path]
			s := w.sys.FS().Stat(path)
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
	w.configFilePaths = append([]string{w.configFileName}, configParseResult.ExtendedSourceFiles()...)
	if !reflect.DeepEqual(w.config.ParsedConfig, configParseResult.ParsedConfig) {
		w.configModified = true
	}
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
