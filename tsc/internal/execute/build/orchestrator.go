package build

import (
	"context"
	"fmt"
	"io"
	"slices"
	"strings"
	"sync/atomic"
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
)

type Options struct {
	Sys     tsc.System
	Command *tsoptions.ParsedBuildCommandLine
	Testing tsc.CommandLineTesting
}
type OrchestratorResult struct {
	Result        tsc.CommandLineResult
	Errors        []*ast.Diagnostic
	Statistics    tsc.Statistics
	FilesToDelete []tspath.RootedFilePath
}

func (b *OrchestratorResult) report(o *Orchestrator) {
	b.reportWithFilesToDelete(o, true)
}

func (b *OrchestratorResult) reportWithFilesToDelete(o *Orchestrator, reportFilesToDelete bool) {
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.watchStatusReporter(ast.NewCompilerDiagnostic(core.IfElse(len(b.Errors) == 1, diagnostics.Found_1_error_Watching_for_file_changes, diagnostics.Found_0_errors_Watching_for_file_changes), len(b.Errors)))
	} else {
		o.errorSummaryReporter(b.Errors)
	}
	if reportFilesToDelete && b.FilesToDelete != nil {
		o.createBuilderStatusReporter(nil)(
			ast.NewCompilerDiagnostic(
				diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0,
				strings.Join(core.Map(b.FilesToDelete, func(f tspath.RootedFilePath) string {
					return "\r\n * " + f.AsString()
				}), ""),
			),
		)
	}
	if !o.opts.Command.CompilerOptions.Diagnostics.IsTrue() && !o.opts.Command.CompilerOptions.ExtendedDiagnostics.IsTrue() {
		return
	}
	b.Statistics.SetTotalTime(o.opts.Sys.SinceStart())
	b.Statistics.Report(o.opts.Sys.Writer(), o.opts.Testing)
}

type Orchestrator struct {
	opts             Options
	currentDirectory tspath.RootedDirectoryPath
	caseSensitivity  tspath.CaseSensitivity
	host             *host

	// contentMapperHost transforms content-mapped files; it is created once per build session (when
	// enabled) and shared across all projects so mapper processes are consolidated. It closes itself when
	// the session context is cancelled (see contentmapper.New).
	contentMapperHost contentmapper.Host

	// order generation result
	tasks          *collections.SyncMap[tspath.PathKey, *BuildTask]
	order          []*BuildTask
	errors         []*ast.Diagnostic
	graphGenerated bool

	errorSummaryReporter tsc.DiagnosticsReporter
	watchStatusReporter  tsc.DiagnosticReporter

	// fswatch event-based watching
	wm *watchmanager.WatchManager
	// order sorted by dependency depth, to reduce how often builders block on upstream projects
	scheduleOrder []*BuildTask
}

var _ tsc.Watcher = (*Orchestrator)(nil)

func (o *Orchestrator) relativeFileName(fileName tspath.RootedFilePath) string {
	return o.relativePath(fileName.AsPath())
}

func (o *Orchestrator) relativePath(path tspath.RootedPath) string {
	if relative, ok := o.caseSensitivity.RelativePathFromPath(o.currentDirectory, path); ok {
		return relative.AsString()
	}
	return path.AsString()
}

func (o *Orchestrator) Order() []tspath.RootedFilePath {
	return core.Map(o.order, func(task *BuildTask) tspath.RootedFilePath {
		return task.config
	})
}

// ScheduleOrder is the order in which builders pick up projects: Order() stably sorted by dependency depth.
func (o *Orchestrator) ScheduleOrder() []string {
	return core.Map(o.scheduleOrder, func(task *BuildTask) string {
		return task.config.AsString()
	})
}

// computeScheduleOrder sorts the build order by dependency depth (projects with no
// upstream first, then their dependents, and so on). Builders take projects from this
// order and block until upstream projects are done, so with the plain depth-first order
// a builder that picks the root of a long chain sits idle while another builder works
// through the chain, even when unrelated projects are ready to build. Depth order reduces
// that avoidable blocking but does not eliminate it: a shallower project that has been
// picked up may not be done yet, so a builder can take a dependent of a slow project and
// wait on that project while a later project's upstream has already finished. The stable
// sort preserves the original order within a depth, and reporting still follows Order().
func (o *Orchestrator) computeScheduleOrder() []*BuildTask {
	type scheduleEntry struct {
		task  *BuildTask
		depth int
	}
	entries := make([]scheduleEntry, len(o.order))
	depths := make(map[*BuildTask]int, len(o.order))
	for i, task := range o.order {
		depth := 0
		for _, upstream := range task.upStream {
			depth = max(depth, depths[upstream.task]+1)
		}
		depths[task] = depth
		entries[i] = scheduleEntry{task: task, depth: depth}
	}
	slices.SortStableFunc(entries, func(a, b scheduleEntry) int {
		return a.depth - b.depth
	})
	return core.Map(entries, func(entry scheduleEntry) *BuildTask {
		return entry.task
	})
}

func (o *Orchestrator) Upstream(configName string) []string {
	path := o.caseSensitivity.PathKey(tspath.ToRootedPath(configName, o.currentDirectory))
	task := o.getTask(path)
	return core.Map(task.upStream, func(t *upstreamTask) string {
		return t.task.config.AsString()
	})
}

func (o *Orchestrator) Downstream(configName string) []string {
	path := o.caseSensitivity.PathKey(tspath.ToRootedPath(configName, o.currentDirectory))
	task := o.getTask(path)
	return core.Map(task.downStream, func(t *BuildTask) string {
		return t.config.AsString()
	})
}

func (o *Orchestrator) getTask(path tspath.PathKey) *BuildTask {
	task, ok := o.tasks.Load(path)
	if !ok {
		panic("No build task found for " + path.AsString())
	}
	return task
}

func (o *Orchestrator) createBuildTasks(oldTasks *collections.SyncMap[tspath.PathKey, *BuildTask], configs []tspath.RootedFilePath, wg core.WorkGroup) {
	for _, config := range configs {
		wg.Queue(func() {
			path := o.caseSensitivity.PathKey(tspath.RootedPath(config))
			var task *BuildTask
			var buildInfo *buildInfoEntry
			if oldTasks != nil {
				if existing, ok := oldTasks.Load(path); ok {
					if !existing.dirty {
						// Reuse existing task if config is same
						task = existing
					} else {
						if existing.contentMapperProject != nil {
							_ = existing.contentMapperProject.Close()
						}
						buildInfo = existing.buildInfoEntry
					}
				}
			}
			if task == nil {
				task = &BuildTask{config: config, path: path, isInitialCycle: oldTasks == nil}
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
	configName tspath.RootedFilePath,
	downStream *BuildTask,
	inCircularContext bool,
	completed *collections.Set[tspath.PathKey],
	analyzing *collections.Set[tspath.PathKey],
	circularityStack []string,
) *BuildTask {
	path := o.caseSensitivity.PathKey(tspath.RootedPath(configName))
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
		circularityStack = append(circularityStack, configName.AsString())
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
		task.built = make(chan struct{})
		task.done = make(chan struct{})
		o.order = append(o.order, task)
	}
	if o.opts.Command.CompilerOptions.Watch.IsTrue() && downStream != nil {
		task.downStream = append(task.downStream, downStream)
	}
	return task
}

func (o *Orchestrator) GenerateGraphReusingOldTasks() {
	tasks := o.tasks
	o.tasks = &collections.SyncMap[tspath.PathKey, *BuildTask]{}
	o.order = nil
	o.errors = nil
	o.GenerateGraph(tasks)
}

func (o *Orchestrator) GenerateGraph(oldTasks *collections.SyncMap[tspath.PathKey, *BuildTask]) {
	projects := o.opts.Command.ResolvedProjectPaths()
	// Parse all config files in parallel
	wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
	o.createBuildTasks(oldTasks, projects, wg)
	wg.RunAndWait()

	// Generate the graph
	completed := collections.Set[tspath.PathKey]{}
	analyzing := collections.Set[tspath.PathKey]{}
	circularityStack := []string{}
	for _, project := range projects {
		o.setupBuildTask(project, nil, false, &completed, &analyzing, circularityStack)
	}
	o.scheduleOrder = o.computeScheduleOrder()
	if oldTasks != nil {
		oldTasks.Range(func(path tspath.PathKey, oldTask *BuildTask) bool {
			if task, ok := o.tasks.Load(path); ok && task == oldTask {
				return true
			}
			if oldTask.contentMapperProject != nil {
				_ = oldTask.contentMapperProject.Close()
			}
			return true
		})
	}
	o.graphGenerated = true
}

// tsc -b entrypoint
func (o *Orchestrator) Start(ctx context.Context) tsc.CommandLineResult {
	return o.start(ctx, "", false /*onlyReferences*/).Result
}

// orchestrator.Build() entrypoint for api
func (o *Orchestrator) Build(ctx context.Context, project string) *OrchestratorResult {
	o.recheckAllProjects(project)
	return o.start(ctx, project, false /*onlyReferences*/)
}

// orchestrator.BuildReferences() entrypoint for api
func (o *Orchestrator) BuildReferences(ctx context.Context, project string) *OrchestratorResult {
	o.recheckAllProjects(project)
	return o.start(ctx, project, true /*onlyReferences*/)
}

func (o *Orchestrator) start(ctx context.Context, project string, onlyReferences bool) *OrchestratorResult {
	o.contentMapperHost = tsc.NewContentMapperHost(ctx, o.opts.Sys, o.opts.Command.CompilerOptions)
	if o.contentMapperHost != nil && (!o.opts.Command.CompilerOptions.Watch.IsTrue() || o.opts.Testing == nil) {
		defer o.contentMapperHost.Close()
	}
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.watchStatusReporter(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
	}
	if o.graphGenerated {
		o.GenerateGraphReusingOldTasks()
	} else {
		o.GenerateGraph(nil)
	}
	order, ok := o.getBuildOrderFor(project)
	if !ok {
		return &OrchestratorResult{Result: tsc.CommandLineResult{Status: tsc.ExitStatusInvalidProject_OutputsSkipped}}
	}
	if onlyReferences && len(o.errors) == 0 {
		if project == "" {
			return &OrchestratorResult{Result: tsc.CommandLineResult{Status: tsc.ExitStatusInvalidProject_OutputsSkipped}}
		}
		order = order[:len(order)-1]
	}
	result := o.buildOrCleanOrder(order)
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.Watch(ctx)
		result.Result.Watcher = o
	}
	return result
}

func (o *Orchestrator) recheckAllProjects(project string) {
	if !o.graphGenerated {
		return
	}
	order, ok := o.getBuildOrderFor(project)
	if !ok {
		return
	}
	o.rangeTasks(order, func(path tspath.PathKey, task *BuildTask) {
		task.resetStatus()
		task.resetConfig(o, path)
	})
	o.host.mTimes = &collections.SyncMap[tspath.PathKey, time.Time]{}
	o.resetCaches()
}

// orchestrator.Clean() entrypoint for api
func (o *Orchestrator) Clean(project string) *OrchestratorResult {
	return o.clean(project, false)
}

// orchestrator.CleanReferences() entrypoint for api
func (o *Orchestrator) CleanReferences(project string) *OrchestratorResult {
	return o.clean(project, true)
}

func (o *Orchestrator) clean(project string, onlyReferences bool) *OrchestratorResult {
	if !o.graphGenerated {
		o.GenerateGraph(nil)
	}
	if len(o.errors) != 0 {
		result := &OrchestratorResult{
			Result: tsc.CommandLineResult{Status: tsc.ExitStatusProjectReferenceCycle_OutputsSkipped},
			Errors: o.errors,
		}
		result.reportWithFilesToDelete(o, true)
		return result
	}

	order, ok := o.getBuildOrderFor(project)
	if !ok {
		return &OrchestratorResult{Result: tsc.CommandLineResult{Status: tsc.ExitStatusInvalidProject_OutputsSkipped}}
	}
	if onlyReferences {
		order = order[:len(order)-1]
	}

	result := &OrchestratorResult{}
	result.Statistics.Projects = len(order)
	dry := o.opts.Command.BuildOptions.Dry.IsTrue()
	reportDiagnostic := o.createDiagnosticReporter(nil)
	for _, task := range order {
		if task.resolved == nil {
			diagnostic := ast.NewCompilerDiagnostic(diagnostics.File_0_not_found, task.config)
			reportDiagnostic(diagnostic)
			result.Errors = append(result.Errors, diagnostic)
			continue
		}

		inputs := collections.NewSetFromItems(core.Map(task.resolved.FileNames(), func(fileName tspath.RootedFilePath) tspath.PathKey {
			return o.caseSensitivity.PathKey(fileName.AsPath())
		})...)
		projectOutputs := task.resolved.GetOutputFileNames()
		deleted := false
		for outputFile := range projectOutputs {
			deleted = o.cleanProjectOutput(outputFile, inputs, dry, &result.FilesToDelete, reportDiagnostic) || deleted
		}
		deleted = o.cleanProjectOutput(task.resolved.GetBuildInfoFileName(), inputs, dry, &result.FilesToDelete, reportDiagnostic) || deleted
		if deleted {
			task.resetStatus()
			task.buildInfoEntryMu.Lock()
			task.buildInfoEntry = nil
			task.buildInfoEntryMu.Unlock()
		}
	}

	result.reportWithFilesToDelete(o, dry)
	return result
}

func (o *Orchestrator) getBuildOrderFor(project string) ([]*BuildTask, bool) {
	if project == "" {
		return o.order, true
	}

	config := core.ResolveConfigFileNameOfProjectReference(
		tspath.ToRootedPath(project, o.currentDirectory),
	)
	target, ok := o.tasks.Load(o.caseSensitivity.PathKey(config.AsPath()))
	if !ok {
		return nil, false
	}

	projects := collections.Set[tspath.PathKey]{}
	var addProjectAndReferences func(*BuildTask)
	addProjectAndReferences = func(task *BuildTask) {
		if projects.Has(task.path) {
			return
		}
		projects.Add(task.path)
		for _, upstream := range task.upStream {
			addProjectAndReferences(upstream.task)
		}
	}
	addProjectAndReferences(target)

	order := make([]*BuildTask, 0, len(projects.M))
	for _, task := range o.order {
		if projects.Has(task.path) {
			order = append(order, task)
		}
	}
	return order, true
}

func (o *Orchestrator) cleanProjectOutput(
	outputFile tspath.RootedFilePath,
	inputs *collections.Set[tspath.PathKey],
	dry bool,
	filesToDelete *[]tspath.RootedFilePath,
	reportDiagnostic tsc.DiagnosticReporter,
) bool {
	if outputFile == "" || inputs.Has(o.caseSensitivity.PathKey(outputFile.AsPath())) || !o.host.FS().FileExists(outputFile) {
		return false
	}
	*filesToDelete = append(*filesToDelete, outputFile)
	if dry {
		return false
	}
	if err := o.host.FS().Remove(outputFile.AsPath()); err != nil {
		reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Failed_to_delete_file_0, outputFile))
		return false
	}
	return true
}

func (o *Orchestrator) Watch(ctx context.Context) {
	o.wm.Lock()

	if o.opts.Testing == nil {
		if value, _ := o.opts.Sys.GetEnvironmentVariable("TS_WATCH_DEBUG"); value != "" {
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
	o.host.mTimes = &collections.SyncMap[tspath.PathKey, time.Time]{}
	o.rangeTask(func(path tspath.PathKey, task *BuildTask) {
		task.updateWatch(o, oldCache)
	})
}

func (o *Orchestrator) resetCaches() {
	// Clean out all the caches
	cachesVfs := o.host.host.FS().(*cachedvfs.FS)
	cachesVfs.ClearCache()
	o.host.extendedConfigCache = tsc.ExtendedConfigCache{}
	o.host.sourceFiles.reset()
	o.host.configTimes = collections.SyncMap[tspath.PathKey, time.Duration]{}
}

func (o *Orchestrator) checkTasksForEventChanges(changedPaths map[tspath.RootedPath]fswatch.EventKind, needsConfigUpdate, needsUpdate *atomic.Bool) {
	normalizedPaths := make(map[tspath.PathKey]fswatch.EventKind, len(changedPaths))
	for eventPath, kind := range changedPaths {
		normalizedPaths[o.caseSensitivity.PathKey(eventPath)] = kind
	}

	for i := range o.order {
		task := o.order[i]
		path := task.path

		if _, changed := normalizedPaths[path]; changed {
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
			fp := o.caseSensitivity.PathKey(tspath.RootedPath(file))
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
		for _, mapper := range task.resolved.ContentMappers() {
			if mapper.PackageDirectory == "" || mapper.ContributionID != "" {
				continue
			}
			manifestPath := o.caseSensitivity.PathKey(tspath.RootedPath(mapper.PackageDirectory.ResolveFile("package.json")))
			if _, changed := normalizedPaths[manifestPath]; changed {
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
		if task.contentMapperProject != nil {
			watchedFiles, err := task.contentMapperProject.WatchedFiles()
			if err != nil {
				task.contentMapperProjectErr = err
				task.resetStatus()
				needsUpdate.Store(true)
				rootChanged = true
			}
			for _, fileName := range watchedFiles {
				if _, changed := normalizedPaths[o.caseSensitivity.PathKey(tspath.RootedPath(fileName))]; changed {
					task.refreshContentMapperProject(o)
					task.resetStatus()
					needsUpdate.Store(true)
					rootChanged = true
					break
				}
			}
		}
		fileNames := task.resolved.FileNames()
		roots := collections.NewSetWithSizeHint[tspath.PathKey](len(fileNames))
		for _, file := range fileNames {
			fp := o.caseSensitivity.PathKey(tspath.RootedPath(file))
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
				buildInfoDir := bi.fileName.Directory()
				for _, fileName := range bi.buildInfo.FileNames {
					fp := o.caseSensitivity.PathKey(tspath.RootedPath(incremental.ResolveBuildInfoFileName(fileName, buildInfoDir, o.host.DefaultLibraryPath())))
					if roots.Has(fp) {
						continue
					}
					if _, changed := normalizedPaths[fp]; changed {
						task.resetStatus()
						needsUpdate.Store(true)
						break
					}
				}
				for packageJson := range bi.buildInfo.GetPackageJsons(buildInfoDir) {
					if o.packageJsonLookupChanged(packageJson, normalizedPaths) {
						task.resetStatus()
						needsUpdate.Store(true)
						break
					}
				}
				for packageJson := range bi.buildInfo.GetMissingPackageJsons(buildInfoDir) {
					if o.packageJsonLookupChanged(packageJson, normalizedPaths) {
						task.resetStatus()
						needsUpdate.Store(true)
						break
					}
				}
			}
			for _, packageJson := range task.packageJsons {
				if o.packageJsonLookupChanged(packageJson, normalizedPaths) {
					task.resetStatus()
					needsUpdate.Store(true)
					break
				}
			}
		}

		task.built = make(chan struct{})
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
		for eventPath := range changedPaths {
			if o.host.FS().DirectoryExists(tspath.RootedDirectoryPathFromPath(eventPath)) {
				if o.wm.IsPathUnderWatch(eventPath) {
					o.rangeTask(func(path tspath.PathKey, task *BuildTask) {
						task.resetStatus()
						task.built = make(chan struct{})
						task.done = make(chan struct{})
					})
					needsUpdate.Store(true)
					break
				}
			}
		}
	}
}

func (o *Orchestrator) packageJsonLookupChanged(packageJson tspath.RootedFilePath, changedPaths map[tspath.PathKey]fswatch.EventKind) bool {
	packageJsonPath := o.caseSensitivity.PathKey(tspath.RootedPath(packageJson))
	if _, changed := changedPaths[packageJsonPath]; changed {
		return true
	}
	for changedPath, kind := range changedPaths {
		if kind == fswatch.EventDelete && changedPath.ContainsPath(packageJsonPath) {
			return true
		}
	}
	return false
}

func (o *Orchestrator) computeDesiredWatches() map[tspath.RootedDirectoryPath]bool {
	desiredDirs := watchmanager.NewDirWatchSet(o.caseSensitivity)

	for i := range o.order {
		task := o.order[i]

		// Watch config file directory
		configDir := task.config.Directory()
		realConfigDir := tspath.RootedDirectoryPathFromPath(o.host.FS().Realpath(configDir.AsPath()))
		desiredDirs.Set(realConfigDir, false)

		if task.resolved == nil {
			continue
		}

		// Extended config file directories
		for _, cfgPath := range task.resolved.ExtendedSourceFiles() {
			realPath := o.host.FS().Realpath(cfgPath.AsPath())
			desiredDirs.Set(realPath.Directory(), false)
		}

		// Wildcard directories from tsconfig
		for dir, recursive := range task.resolved.WildcardDirectories() {
			realDir := tspath.RootedDirectoryPathFromPath(o.host.FS().Realpath(dir.AsPath()))
			desiredDirs.Set(realDir, recursive)
		}

		// Input file directories not already covered
		for _, fileName := range task.resolved.FileNames() {
			o.addProgramFileWatchDir(desiredDirs, fileName.Directory())
			for _, mapper := range task.resolved.ContentMappers() {
				if mapper.PackageDirectory == "" || mapper.ContributionID != "" {
					continue
				}
				dir := mapper.PackageDirectory
				if !desiredDirs.Covered(dir) && watchmanager.CanWatchDirectory(dir) {
					desiredDirs.Set(dir, false)
				}
			}
		}
		if task.contentMapperProject != nil {
			watchedFiles, err := task.contentMapperProject.WatchedFiles()
			if err != nil {
				task.contentMapperProjectErr = err
			}
			for _, fileName := range watchedFiles {
				absPath := o.host.FS().Realpath(fileName.AsPath())
				dir := absPath.Directory()
				if !desiredDirs.Covered(dir) && watchmanager.CanWatchDirectory(dir) {
					desiredDirs.Set(dir, false)
				}
			}
		}

		// Non-root dependency directories from buildinfo (e.g. node_modules .d.ts files).
		task.buildInfoEntryMu.Lock()
		bi := task.buildInfoEntry
		task.buildInfoEntryMu.Unlock()
		if bi != nil && bi.buildInfo != nil {
			buildInfoDir := bi.fileName.Directory()
			roots := collections.NewSetFromItems(core.Map(task.resolved.FileNames(), func(fileName tspath.RootedFilePath) tspath.PathKey {
				return o.caseSensitivity.PathKey(fileName.AsPath())
			})...)
			for _, fileName := range bi.buildInfo.FileNames {
				absPath := o.host.FS().Realpath(incremental.ResolveBuildInfoFileName(fileName, buildInfoDir, o.host.DefaultLibraryPath()).AsPath())
				fp := o.caseSensitivity.PathKey(absPath)
				if roots.Has(fp) {
					continue
				}
				o.addProgramFileWatchDir(desiredDirs, absPath.Directory())
			}
			for packageJson := range bi.buildInfo.GetPackageJsons(buildInfoDir) {
				o.addPackageJsonWatchDirs(desiredDirs, packageJson)
			}
			for packageJson := range bi.buildInfo.GetMissingPackageJsons(buildInfoDir) {
				o.addPackageJsonWatchDirs(desiredDirs, packageJson)
			}
		}
		for _, packageJson := range task.packageJsons {
			o.addPackageJsonWatchDirs(desiredDirs, packageJson)
		}
	}

	return o.wm.ResolveDesiredDirs(desiredDirs.Dirs())
}

func (o *Orchestrator) addWatchDir(desiredDirs *watchmanager.DirWatchSet, dir tspath.RootedDirectoryPath) {
	if !desiredDirs.Covered(dir) && watchmanager.CanWatchDirectory(dir) {
		desiredDirs.Set(dir, false)
	}
}

// addProgramFileWatchDir watches the directory of a program file at any depth, unlike addWatchDir, which guards lookup
// locations against watching something as generic as / or /home.
func (o *Orchestrator) addProgramFileWatchDir(desiredDirs *watchmanager.DirWatchSet, dir tspath.RootedDirectoryPath) {
	if !desiredDirs.Covered(dir) {
		desiredDirs.Set(dir, false)
	}
}

func (o *Orchestrator) addPackageJsonWatchDirs(desiredDirs *watchmanager.DirWatchSet, packageJson tspath.RootedFilePath) {
	dir := packageJson.Directory()
	dirs := []tspath.RootedDirectoryPath{dir}
	foundNodeModules := false
	for current := dir; ; {
		parent := current.AsPath().Directory()
		if parent == "" || parent == current {
			break
		}
		dirs = append(dirs, parent)
		if parent.BaseName() == "node_modules" {
			foundNodeModules = true
			if grandparent := parent.AsPath().Directory(); grandparent != "" && grandparent != parent {
				dirs = append(dirs, grandparent)
			}
			break
		}
		current = parent
	}

	if !foundNodeModules {
		o.addWatchDir(desiredDirs, dir)
		return
	}
	for _, dir := range dirs {
		o.addWatchDir(desiredDirs, dir)
	}
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
		o.rangeTask(func(path tspath.PathKey, task *BuildTask) {
			task.resetConfig(o, path)
			task.built = make(chan struct{})
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
	return o.buildOrCleanOrder(o.order).Result
}

func (o *Orchestrator) buildOrCleanOrder(order []*BuildTask) *OrchestratorResult {
	if !o.opts.Command.BuildOptions.Clean.IsTrue() && o.opts.Command.BuildOptions.Verbose.IsTrue() {
		o.createBuilderStatusReporter(nil)(ast.NewCompilerDiagnostic(
			diagnostics.Projects_in_this_build_Colon_0,
			strings.Join(core.Map(order, func(task *BuildTask) string {
				return "\r\n    * " + o.relativeFileName(task.config)
			}), ""),
		))
	}
	var buildResult *OrchestratorResult = &OrchestratorResult{}
	if len(o.errors) == 0 {
		// var prevReporter *BuildTask
		// for _, config := range order {
		// 	task := o.getTask(o.toPath(config))
		// 	task.prevReporter = prevReporter
		// 	prevReporter = task
		// }
		buildResult.Statistics.Projects = len(order)
		// Builders pick up projects in scheduleOrder; results are reported in Order(), waiting for each project to finish
		reported := make(chan struct{})
		go func() {
			defer close(reported)
			for _, task := range order {
				<-task.built
				task.report(o, task.path, buildResult)
			}
		}()
		o.rangeTasks(order, func(path tspath.PathKey, task *BuildTask) {
			o.buildOrCleanProject(task, path)
		})
		<-reported
	} else {
		// Circularity errors prevent any project from being built
		buildResult.Result.Status = tsc.ExitStatusProjectReferenceCycle_OutputsSkipped
		reportDiagnostic := o.createDiagnosticReporter(nil)
		for _, err := range o.errors {
			reportDiagnostic(err)
		}
		buildResult.Errors = o.errors
	}
	buildResult.report(o)
	return buildResult
}

func (o *Orchestrator) rangeTask(f func(path tspath.PathKey, task *BuildTask)) {
	o.rangeTasks(o.order, f)
}

func (o *Orchestrator) rangeTasks(order []*BuildTask, f func(path tspath.PathKey, task *BuildTask)) {
	numRoutines := 4
	if o.opts.Command.CompilerOptions.SingleThreaded.IsTrue() {
		numRoutines = 1
	} else if builders := o.opts.Command.BuildOptions.Builders; builders != nil {
		numRoutines = *builders
	}

	var currentTaskIndex atomic.Int64
	getNextTask := func() (tspath.PathKey, *BuildTask, bool) {
		index := int(currentTaskIndex.Add(1) - 1)
		if index >= len(order) {
			return "", nil, false
		}
		task := order[index]
		return task.path, task, true
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

func (o *Orchestrator) buildOrCleanProject(task *BuildTask, path tspath.PathKey) {
	task.result = &taskResult{}
	task.result.reportStatus = o.createBuilderStatusReporter(task)
	task.result.diagnosticReporter = o.createDiagnosticReporter(task)
	if !o.opts.Command.BuildOptions.Clean.IsTrue() {
		task.buildProject(o, path)
	} else {
		task.cleanProject(o, path)
	}
	if o.opts.Testing == nil {
		// The program is only needed by Testing.OnProgram at report time; drop it now so a task
		// that has finished but is not yet reported does not keep its program alive.
		task.result.program = nil
	}
	close(task.built)
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
	currentDirectory := opts.Sys.GetCurrentDirectory()
	caseSensitivity := opts.Sys.FS().CaseSensitivity()
	wm := watchmanager.NewWatchManager(opts.Sys.Writer(), opts.Sys.FS().DirectoryExists, caseSensitivity)
	orchestrator := &Orchestrator{
		opts:             opts,
		currentDirectory: currentDirectory,
		caseSensitivity:  caseSensitivity,
		tasks:            &collections.SyncMap[tspath.PathKey, *BuildTask]{},
		wm:               wm,
	}
	orchestrator.host = &host{
		orchestrator: orchestrator,
		host: compiler.NewCachedFSCompilerHost(
			orchestrator.opts.Sys.FS(),
			orchestrator.opts.Sys.DefaultLibraryPath(),
			nil,
			nil,
			nil,
		),
		mTimes: &collections.SyncMap[tspath.PathKey, time.Time]{},
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
