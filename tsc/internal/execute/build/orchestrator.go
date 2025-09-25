package build

import (
	"io"
	"strings"
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
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
			))
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
	tasks  *collections.SyncMap[tspath.Path, *buildTask]
	order  []string
	errors []*ast.Diagnostic

	errorSummaryReporter tsc.DiagnosticsReporter
	watchStatusReporter  tsc.DiagnosticReporter
}

var _ tsc.Watcher = (*Orchestrator)(nil)

func (o *Orchestrator) relativeFileName(fileName string) string {
	return tspath.ConvertToRelativePath(fileName, o.comparePathsOptions)
}

func (o *Orchestrator) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, o.comparePathsOptions.CurrentDirectory, o.comparePathsOptions.UseCaseSensitiveFileNames)
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
	return core.Map(task.downStream, func(t *buildTask) string {
		return t.config
	})
}

func (o *Orchestrator) getTask(path tspath.Path) *buildTask {
	task, ok := o.tasks.Load(path)
	if !ok {
		panic("No build task found for " + path)
	}
	return task
}

func (o *Orchestrator) createBuildTasks(oldTasks *collections.SyncMap[tspath.Path, *buildTask], configs []string, wg core.WorkGroup) {
	for _, config := range configs {
		wg.Queue(func() {
			path := o.toPath(config)
			var task *buildTask
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
				task = &buildTask{config: config, isInitialCycle: oldTasks == nil}
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
	downStream *buildTask,
	inCircularContext bool,
	completed *collections.Set[tspath.Path],
	analyzing *collections.Set[tspath.Path],
	circularityStack []string,
) *buildTask {
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
	o.tasks = &collections.SyncMap[tspath.Path, *buildTask]{}
	o.order = nil
	o.errors = nil
	o.GenerateGraph(tasks)
}

func (o *Orchestrator) GenerateGraph(oldTasks *collections.SyncMap[tspath.Path, *buildTask]) {
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

func (o *Orchestrator) Start() tsc.CommandLineResult {
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.watchStatusReporter(ast.NewCompilerDiagnostic(diagnostics.Starting_compilation_in_watch_mode))
	}
	o.GenerateGraph(nil)
	result := o.buildOrClean()
	if o.opts.Command.CompilerOptions.Watch.IsTrue() {
		o.Watch()
		result.Watcher = o
	}
	return result
}

func (o *Orchestrator) Watch() {
	o.updateWatch()
	o.resetCaches()

	// Start watching for file changes
	if o.opts.Testing == nil {
		watchInterval := o.opts.Command.WatchOptions.WatchInterval()
		for {
			// Testing mode: run a single cycle and exit
			time.Sleep(watchInterval)
			o.DoCycle()
		}
	}
}

func (o *Orchestrator) updateWatch() {
	oldCache := o.host.mTimes
	o.host.mTimes = &collections.SyncMap[tspath.Path, time.Time]{}
	wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
	o.tasks.Range(func(path tspath.Path, task *buildTask) bool {
		wg.Queue(func() {
			task.updateWatch(o, oldCache)
		})
		return true
	})
	wg.RunAndWait()
}

func (o *Orchestrator) resetCaches() {
	// Clean out all the caches
	cachesVfs := o.host.host.FS().(*cachedvfs.FS)
	cachesVfs.ClearCache()
	o.host.extendedConfigCache = tsc.ExtendedConfigCache{}
	o.host.sourceFiles.reset()
	o.host.configTimes = collections.SyncMap[tspath.Path, time.Duration]{}
}

func (o *Orchestrator) DoCycle() {
	var needsConfigUpdate atomic.Bool
	var needsUpdate atomic.Bool
	mTimes := o.host.mTimes.Clone()
	wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
	o.tasks.Range(func(path tspath.Path, task *buildTask) bool {
		wg.Queue(func() {
			if updateKind := task.hasUpdate(o, path); updateKind != updateKindNone {
				needsUpdate.Store(true)
				if updateKind == updateKindConfig {
					needsConfigUpdate.Store(true)
				}
			}
		})
		// Watch for file changes
		return true
	})
	wg.RunAndWait()

	if !needsUpdate.Load() {
		o.host.mTimes = mTimes
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
		if o.opts.Command.CompilerOptions.SingleThreaded.IsTrue() {
			o.singleThreadedBuildOrClean(&buildResult)
		} else {
			o.multiThreadedBuildOrClean(&buildResult)
		}
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

func (o *Orchestrator) singleThreadedBuildOrClean(buildResult *orchestratorResult) {
	// Go in the order since only one project can be built at a time so that random order isnt picked by work group creating deadlock
	for _, config := range o.Order() {
		path := o.toPath(config)
		task := o.getTask(path)
		o.buildOrCleanProject(task, path, buildResult)
	}
}

func (o *Orchestrator) multiThreadedBuildOrClean(buildResult *orchestratorResult) {
	// Spin off the threads with waiting on upstream to build before actual project build
	wg := core.NewWorkGroup(false)
	o.tasks.Range(func(path tspath.Path, task *buildTask) bool {
		wg.Queue(func() {
			o.buildOrCleanProject(task, path, buildResult)
		})
		return true
	})
	wg.RunAndWait()
}

func (o *Orchestrator) buildOrCleanProject(task *buildTask, path tspath.Path, buildResult *orchestratorResult) {
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

func (o *Orchestrator) getWriter(task *buildTask) io.Writer {
	if task == nil {
		return o.opts.Sys.Writer()
	}
	return &task.result.builder
}

func (o *Orchestrator) createBuilderStatusReporter(task *buildTask) tsc.DiagnosticReporter {
	return tsc.CreateBuilderStatusReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.CompilerOptions, o.opts.Testing)
}

func (o *Orchestrator) createDiagnosticReporter(task *buildTask) tsc.DiagnosticReporter {
	return tsc.CreateDiagnosticReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.CompilerOptions)
}

func NewOrchestrator(opts Options) *Orchestrator {
	orchestrator := &Orchestrator{
		opts: opts,
		comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          opts.Sys.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: opts.Sys.FS().UseCaseSensitiveFileNames(),
		},
		tasks: &collections.SyncMap[tspath.Path, *buildTask]{},
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
		orchestrator.watchStatusReporter = tsc.CreateWatchStatusReporter(opts.Sys, opts.Command.CompilerOptions, opts.Testing)
	} else {
		orchestrator.errorSummaryReporter = tsc.CreateReportErrorSummary(opts.Sys, opts.Command.CompilerOptions)
	}
	return orchestrator
}
