package build

import (
	"context"
	"fmt"
	"io"
	"slices"
	"strings"
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/execute/watchmanager"
	"github.com/microsoft/typescript-go/internal/fswatch"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
)

type Options struct {
	Sys     tsc.System
	Command *tsoptions.ParsedBuildCommandLine
	Testing tsc.CommandLineTesting
}

type orchestratorResult struct {
	result        tsc.CommandLineResult
	errors        []*ast.Diagnostic
	statistics    tsc.Statistics
	filesToDelete []string
}

func (b *orchestratorResult) report(o *Orchestrator) {
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.watchStatusReporter(ast.NewCompilerDiagnostic(core.IfElse(len(b.errors) == 1, diagnostics.Found_1_error_Watching_for_file_changes, diagnostics.Found_0_errors_Watching_for_file_changes), len(b.errors)))
	} else {
		o.errorSummaryReporter(b.errors)
	}
	if b.filesToDelete != nil {
		o.createBuilderStatusReporter(nil)(
			ast.NewCompilerDiagnostic(
				diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0,
				strings.Join(core.Map(b.filesToDelete, func(f string) string {
					return "\r\n * " + f
				}), ""),
			),
		)
	}
	if !o.opts.Command.CompilerOptions.Diagnostics.IsTrue() && !o.opts.Command.CompilerOptions.ExtendedDiagnostics.IsTrue() {
		return
	}
	b.statistics.SetTotalTime(o.opts.Sys.SinceStart())
	b.statistics.Report(o.opts.Sys.Writer(), o.opts.Testing)
}

type Orchestrator struct {
	opts                Options
	comparePathsOptions tspath.ComparePathsOptions
	host                *host

	// order generation result
	tasks  *collections.SyncMap[tspath.Path, *BuildTask]
	order  []string
	errors []*ast.Diagnostic

	errorSummaryReporter tsc.DiagnosticsReporter
	watchStatusReporter  tsc.DiagnosticReporter

	// fswatch event-based watching
	wm *watchmanager.WatchManager
}

var _ tsc.Watcher = (*Orchestrator)(nil)

func (o *Orchestrator) relativeFileName(fileName string) string {
	return tspath.ConvertToRelativePath(fileName, o.comparePathsOptions)
}

func (o *Orchestrator) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, o.comparePathsOptions.CurrentDirectory, o.comparePathsOptions.UseCaseSensitiveFileNames)
}

func (o *Orchestrator) resolveBuildInfoFileName(fileName string, buildInfoDir string) string {
	if !strings.HasPrefix(fileName, ".") {
		return tspath.CombinePaths(o.host.DefaultLibraryPath(), fileName)
	}
	return tspath.GetNormalizedAbsolutePath(fileName, buildInfoDir)
}

func (o *Orchestrator) Order() []string {
	return o.order
}

func (o *Orchestrator) Upstream(configName string) []string {
	path := o.toPath(configName)
	task := o.getTask(path)
	return core.Map(task.upStream, func(t *upstreamTask) string {
		return t.task.config
	})
}

func (o *Orchestrator) Downstream(configName string) []string {
	path := o.toPath(configName)
	task := o.getTask(path)
	return core.Map(task.downStream, func(t *BuildTask) string {
		return t.config
	})
}

func (o *Orchestrator) getTask(path tspath.Path) *BuildTask {
	task, ok := o.tasks.Load(path)
	if !ok {
		panic("No build task found for " + path)
	}
	return task
}

func (o *Orchestrator) createBuildTasks(oldTasks *collections.SyncMap[tspath.Path, *BuildTask], configs []string, wg core.WorkGroup) {
	for _, config := range configs {
		wg.Queue(func() {
			path := o.toPath(config)
			var task *BuildTask
			var buildInfo *buildInfoEntry
			if oldTasks != nil {
				if existing, ok := oldTasks.Load(path); ok {
					if !existing.dirty {
						// Reuse existing task if config is same
						task = existing
					} else {
						buildInfo = existing.buildInfoEntry
					}
				}
			}
			if task == nil {
				task = &BuildTask{config: config, isInitialCycle: oldTasks == nil}
				task.pending.Store(true)
				task.buildInfoEntry = buildInfo
			}
			if _, loaded := o.tasks.LoadOrStore(path, task); loaded {
				return
			}
			task.resolved = o.host.GetResolvedProjectReference(config, path)
			task.upStream = nil
			if task.resolved != nil {
				o.createBuildTasks(oldTasks, task.resolved.ResolvedProjectReferencePaths(), wg)
			}
		})
	}
}

func (o *Orchestrator) setupBuildTask(
	configName string,
	downStream *BuildTask,
	inCircularContext bool,
	completed *collections.Set[tspath.Path],
	analyzing *collections.Set[tspath.Path],
	circularityStack []string,
) *BuildTask {
	path := o.toPath(configName)
	task := o.getTask(path)
	if !completed.Has(path) {
		if analyzing.Has(path) {
			if !inCircularContext {
				o.errors = append(o.errors, ast.NewCompilerDiagnostic(
					diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
					strings.Join(circularityStack, "\n"),
				))
			}
			return nil
		}
		analyzing.Add(path)
		circularityStack = append(circularityStack, configName)
		if task.resolved != nil {
			for index, subReference := range task.resolved.ResolvedProjectReferencePaths() {
				upstream := o.setupBuildTask(subReference, task, inCircularContext || task.resolved.ProjectReferences()[index].Circular, completed, analyzing, circularityStack)
				if upstream != nil {
					task.upStream = append(task.upStream, &upstreamTask{task: upstream, refIndex: index})
				}
			}
		}
		circularityStack = circularityStack[:len(circularityStack)-1]
		completed.Add(path)
		task.reportDone = make(chan struct{})
		prev := core.LastOrNil(o.order)
		if prev != "" {
			task.prevReporter = o.getTask(o.toPath(prev))
		}
		task.done = make(chan struct{})
		o.order = append(o.order, configName)
	}
	if o.opts.Command.CompilerOptions.Watch.IsTrue() && downStream != nil {
		task.downStream = append(task.downStream, downStream)
	}
	return task
}

func (o *Orchestrator) GenerateGraphReusingOldTasks() {
	tasks := o.tasks
	o.tasks = &collections.SyncMap[tspath.Path, *BuildTask]{}
	o.order = nil
	o.errors = nil
	o.GenerateGraph(tasks)
}

func (o *Orchestrator) GenerateGraph(oldTasks *collections.SyncMap[tspath.Path, *BuildTask]) {
	projects := o.opts.Command.ResolvedProjectPaths()
	// Parse all config files in parallel
	wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
	o.createBuildTasks(oldTasks, projects, wg)
	wg.RunAndWait()

	// Generate the graph
	completed := collections.Set[tspath.Path]{}
	analyzing := collections.Set[tspath.Path]{}
	circularityStack := []string{}
	for _, project := range projects {
		o.setupBuildTask(project, nil, false, &completed, &analyzing, circularityStack)
	}
}

func (o *Orchestrator) Start(ctx context.Context) tsc.CommandLineResult {
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.watchStatusReporter(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
	}
	o.GenerateGraph(nil)
	result := o.buildOrClean()
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.Watch(ctx)
		result.Watcher = o
	}
	return result
}

func (o *Orchestrator) Watch(ctx context.Context) {
	o.wm.Lock()

	if o.opts.Testing == nil {
		if o.opts.Sys.GetEnvironmentVariable("TS_WATCH_DEBUG") != "" {
			o.wm.DebugLog = o.opts.Sys.Writer()
		}
		o.wm.EnsureDefaultBackend()
	}

	o.updateWatch()
	desiredDirs := o.computeDesiredWatches()
	if err := o.wm.ReconcileWatches(desiredDirs); err != nil {
		fmt.Fprintf(o.opts.Sys.Writer(), "%v\n", err)
		o.wm.ForceOverflow()
	}
	o.resetCaches()

	o.wm.Unlock()

	if o.opts.Testing == nil {
		o.wm.RunLoop(ctx, o.DoCycle)
	}
}

func (o *Orchestrator) updateWatch() {
	oldCache := o.host.mTimes
	o.host.mTimes = &collections.SyncMap[tspath.Path, time.Time]{}
	o.rangeTask(func(path tspath.Path, task *BuildTask) {
		task.updateWatch(o, oldCache)
	})
}

func (o *Orchestrator) resetCaches() {
	// Clean out all the caches
	cachesVfs := o.host.host.FS().(*cachedvfs.FS)
	cachesVfs.ClearCache()
	o.host.extendedConfigCache = tsc.ExtendedConfigCache{}
	o.host.sourceFiles.reset()
	o.host.configTimes = collections.SyncMap[tspath.Path, time.Duration]{}
}

func (o *Orchestrator) checkTasksForEventChanges(changedPaths map[string]fswatch.EventKind, needsConfigUpdate, needsUpdate *atomic.Bool) {
	normalizedPaths := make(map[tspath.Path]struct{}, len(changedPaths))
	for eventPath := range changedPaths {
		normalizedPaths[o.toPath(eventPath)] = struct{}{}
	}

	for i := range o.order {
		config := o.order[i]
		path := o.toPath(config)
		task := o.getTask(path)

		configPath := o.toPath(task.config)
		if _, changed := normalizedPaths[configPath]; changed {
			task.resetConfig(o, path)
			needsConfigUpdate.Store(true)
			needsUpdate.Store(true)
			continue
		}

		if task.resolved == nil {
			continue
		}

		configChanged := false
		for _, file := range task.resolved.ExtendedSourceFiles() {
			fp := o.toPath(file)
			if _, changed := normalizedPaths[fp]; changed {
				task.resetConfig(o, path)
				needsConfigUpdate.Store(true)
				needsUpdate.Store(true)
				configChanged = true
				break
			}
		}
		if configChanged {
			continue
		}

		rootChanged := false
		fileNames := task.resolved.FileNames()
		roots := collections.NewSetWithSizeHint[tspath.Path](len(fileNames))
		for _, file := range fileNames {
			fp := o.toPath(file)
			roots.Add(fp)
			if !rootChanged {
				if _, changed := normalizedPaths[fp]; changed {
					task.resetStatus()
					needsUpdate.Store(true)
					rootChanged = true
				}
			}
		}

		if !rootChanged {
			task.buildInfoEntryMu.Lock()
			bi := task.buildInfoEntry
			task.buildInfoEntryMu.Unlock()
			if bi != nil && bi.buildInfo != nil {
				buildInfoDir := tspath.GetDirectoryPath(string(bi.path))
				for _, fileName := range bi.buildInfo.FileNames {
					fp := o.toPath(o.resolveBuildInfoFileName(fileName, buildInfoDir))
					if roots.Has(fp) {
						continue
					}
					if _, changed := normalizedPaths[fp]; changed {
						task.resetStatus()
						needsUpdate.Store(true)
						break
					}
				}
			}
		}

		task.reportDone = make(chan struct{})
		task.done = make(chan struct{})

		newConfig := task.resolved.ReloadFileNamesOfParsedCommandLine(o.host.FS())
		if !slices.Equal(task.resolved.FileNames(), newConfig.FileNames()) {
			o.host.resolvedReferences.store(path, newConfig)
			task.resolved = newConfig
			task.resetStatus()
			needsUpdate.Store(true)
		}
	}

	if !needsUpdate.Load() {
		opts := o.comparePathsOptions
		for eventPath := range changedPaths {
			if o.host.FS().DirectoryExists(eventPath) {
				if o.wm.IsPathUnderWatch(eventPath, opts) {
					o.rangeTask(func(path tspath.Path, task *BuildTask) {
						task.resetStatus()
						task.reportDone = make(chan struct{})
						task.done = make(chan struct{})
					})
					needsUpdate.Store(true)
					break
				}
			}
		}
	}
}

func (o *Orchestrator) computeDesiredWatches() map[string]bool {
	desiredDirs := make(map[string]bool)

	for i := range o.order {
		config := o.order[i]
		path := o.toPath(config)
		task := o.getTask(path)

		// Watch config file directory
		configDir := tspath.GetDirectoryPath(task.config)
		realConfigDir := o.host.FS().Realpath(configDir)
		if _, has := desiredDirs[realConfigDir]; !has {
			desiredDirs[realConfigDir] = false
		}

		if task.resolved == nil {
			continue
		}

		// Extended config file directories
		for _, cfgPath := range task.resolved.ExtendedSourceFiles() {
			realPath := o.host.FS().Realpath(cfgPath)
			dir := tspath.GetDirectoryPath(realPath)
			if _, has := desiredDirs[dir]; !has {
				desiredDirs[dir] = false
			}
		}

		// Wildcard directories from tsconfig
		for dir, recursive := range task.resolved.WildcardDirectories() {
			realDir := o.host.FS().Realpath(dir)
			if existing, has := desiredDirs[realDir]; has {
				desiredDirs[realDir] = existing || recursive
			} else {
				desiredDirs[realDir] = recursive
			}
		}

		// Input file directories not already covered
		for _, fileName := range task.resolved.FileNames() {
			absPath := tspath.GetNormalizedAbsolutePath(fileName, o.opts.Sys.GetCurrentDirectory())
			dir := tspath.GetDirectoryPath(absPath)
			if !watchmanager.IsDirCoveredByWatch(desiredDirs, dir, o.comparePathsOptions) {
				if watchmanager.CanWatchDirectory(dir) {
					desiredDirs[dir] = false
				}
			}
		}

		// Non-root dependency directories from buildinfo (e.g. node_modules .d.ts files).
		task.buildInfoEntryMu.Lock()
		bi := task.buildInfoEntry
		task.buildInfoEntryMu.Unlock()
		if bi != nil && bi.buildInfo != nil {
			buildInfoDir := tspath.GetDirectoryPath(string(bi.path))
			roots := collections.NewSetFromItems(core.Map(task.resolved.FileNames(), o.toPath)...)
			for _, fileName := range bi.buildInfo.FileNames {
				absPath := o.resolveBuildInfoFileName(fileName, buildInfoDir)
				fp := o.toPath(absPath)
				if roots.Has(fp) {
					continue
				}
				dir := tspath.GetDirectoryPath(absPath)
				if !watchmanager.IsDirCoveredByWatch(desiredDirs, dir, o.comparePathsOptions) {
					if watchmanager.CanWatchDirectory(dir) {
						desiredDirs[dir] = false
					}
				}
			}
		}
	}

	return o.wm.ResolveDesiredDirs(desiredDirs)
}

func (o *Orchestrator) DoCycle() {
	o.wm.Lock()
	defer o.wm.Unlock()

	changedPaths, overflow := o.wm.DrainEvents()
	hasEvents := len(changedPaths) > 0 || overflow

	if !hasEvents {
		if o.wm.DebugLog != nil {
			fmt.Fprintf(o.wm.DebugLog, "[watch] DoCycle: no events, skipping\n")
		}
		return
	}

	var needsConfigUpdate atomic.Bool
	var needsUpdate atomic.Bool

	if overflow {
		// Overflow: reset all tasks to force a full rebuild.
		o.rangeTask(func(path tspath.Path, task *BuildTask) {
			task.resetConfig(o, path)
			task.reportDone = make(chan struct{})
			task.done = make(chan struct{})
		})
		needsConfigUpdate.Store(true)
		needsUpdate.Store(true)
	} else {
		// Event-driven: check only tasks affected by changed paths
		o.checkTasksForEventChanges(changedPaths, &needsConfigUpdate, &needsUpdate)
	}

	if !needsUpdate.Load() {
		o.resetCaches()
		return
	}

	o.watchStatusReporter(ast.NewCompilerDiagnostic(diagnostics.File_change_detected_Starting_incremental_compilation))
	if needsConfigUpdate.Load() {
		// Generate new tasks
		o.GenerateGraphReusingOldTasks()
	}

	o.buildOrClean()
	o.updateWatch()
	desiredDirs := o.computeDesiredWatches()
	if err := o.wm.ReconcileWatches(desiredDirs); err != nil {
		fmt.Fprintf(o.opts.Sys.Writer(), "%v\n", err)
		// Mark overflow so the next event triggers a full rebuild
		o.wm.ForceOverflow()
	}
	o.resetCaches()
}

func (o *Orchestrator) buildOrClean() tsc.CommandLineResult {
	if !o.opts.Command.BuildOptions.Clean.IsTrue() && o.opts.Command.BuildOptions.Verbose.IsTrue() {
		o.createBuilderStatusReporter(nil)(ast.NewCompilerDiagnostic(
			diagnostics.Projects_in_this_build_Colon_0,
			strings.Join(core.Map(o.Order(), func(p string) string {
				return "\r\n    * " + o.relativeFileName(p)
			}), ""),
		))
	}
	var buildResult orchestratorResult
	if len(o.errors) == 0 {
		buildResult.statistics.Projects = len(o.Order())
		o.rangeTask(func(path tspath.Path, task *BuildTask) {
			o.buildOrCleanProject(task, path, &buildResult)
		})
	} else {
		// Circularity errors prevent any project from being built
		buildResult.result.Status = tsc.ExitStatusProjectReferenceCycle_OutputsSkipped
		reportDiagnostic := o.createDiagnosticReporter(nil)
		for _, err := range o.errors {
			reportDiagnostic(err)
		}
		buildResult.errors = o.errors
	}
	buildResult.report(o)
	return buildResult.result
}

func (o *Orchestrator) rangeTask(f func(path tspath.Path, task *BuildTask)) {
	numRoutines := 4
	if o.opts.Command.CompilerOptions.SingleThreaded.IsTrue() {
		numRoutines = 1
	} else if builders := o.opts.Command.BuildOptions.Builders; builders != nil {
		numRoutines = *builders
	}

	var currentTaskIndex atomic.Int64
	getNextTask := func() (tspath.Path, *BuildTask, bool) {
		index := int(currentTaskIndex.Add(1) - 1)
		if index >= len(o.order) {
			return "", nil, false
		}
		config := o.order[index]
		path := o.toPath(config)
		task := o.getTask(path)
		return path, task, true
	}
	runTask := func() {
		for path, task, ok := getNextTask(); ok; path, task, ok = getNextTask() {
			f(path, task)
		}
	}

	if numRoutines == 1 {
		runTask()
	} else {
		wg := core.NewWorkGroup(false)
		for range numRoutines {
			wg.Queue(runTask)
		}
		wg.RunAndWait()
	}
}

func (o *Orchestrator) buildOrCleanProject(task *BuildTask, path tspath.Path, buildResult *orchestratorResult) {
	task.result = &taskResult{}
	task.result.reportStatus = o.createBuilderStatusReporter(task)
	task.result.diagnosticReporter = o.createDiagnosticReporter(task)
	if !o.opts.Command.BuildOptions.Clean.IsTrue() {
		task.buildProject(o, path)
	} else {
		task.cleanProject(o, path)
	}
	task.report(o, path, buildResult)
}

func (o *Orchestrator) getWriter(task *BuildTask) io.Writer {
	if task == nil {
		return o.opts.Sys.Writer()
	}
	return &task.result.builder
}

func (o *Orchestrator) createBuilderStatusReporter(task *BuildTask) tsc.DiagnosticReporter {
	return tsc.CreateBuilderStatusReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.Locale(), o.opts.Command.CompilerOptions, o.opts.Testing)
}

func (o *Orchestrator) createDiagnosticReporter(task *BuildTask) tsc.DiagnosticReporter {
	return tsc.CreateDiagnosticReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.Locale(), o.opts.Command.CompilerOptions)
}

func NewOrchestrator(opts Options) *Orchestrator {
	wm := watchmanager.NewWatchManager(opts.Sys.Writer(), opts.Sys.FS().DirectoryExists)
	orchestrator := &Orchestrator{
		opts: opts,
		comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          opts.Sys.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: opts.Sys.FS().UseCaseSensitiveFileNames(),
		},
		tasks: &collections.SyncMap[tspath.Path, *BuildTask]{},
		wm:    wm,
	}
	orchestrator.host = &host{
		orchestrator: orchestrator,
		host: compiler.NewCachedFSCompilerHost(
			orchestrator.opts.Sys.GetCurrentDirectory(),
			orchestrator.opts.Sys.FS(),
			orchestrator.opts.Sys.DefaultLibraryPath(),
			nil,
			nil,
		),
		mTimes: &collections.SyncMap[tspath.Path, time.Time]{},
	}
	if opts.Command.CompilerOptions.Watch.IsTrue() {
		orchestrator.watchStatusReporter = tsc.CreateWatchStatusReporter(opts.Sys, opts.Command.Locale(), opts.Command.CompilerOptions, opts.Testing)
		if t, ok := opts.Testing.(watchmanager.CommandLineTestingWithWatchBackend); ok {
			wm.SetBackend(t.WatchBackend())
		}
	} else {
		orchestrator.errorSummaryReporter = tsc.CreateReportErrorSummary(opts.Sys, opts.Command.Locale(), opts.Command.CompilerOptions)
	}
	return orchestrator
}
