package build

import (
	"io"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
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
	programStats  []*tsc.Statistics
	filesToDelete []string
}

func (b *orchestratorResult) report(s *Orchestrator) {
	tsc.CreateReportErrorSummary(s.opts.Sys, s.opts.Command.CompilerOptions)(b.errors)
	if b.filesToDelete != nil {
		s.createBuilderStatusReporter(nil)(
			ast.NewCompilerDiagnostic(
				diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0,
				strings.Join(core.Map(b.filesToDelete, func(f string) string {
					return "\r\n * " + f
				}), ""),
			))
	}
	if len(b.programStats) == 0 {
		return
	}
	if !s.opts.Command.CompilerOptions.Diagnostics.IsTrue() && !s.opts.Command.CompilerOptions.ExtendedDiagnostics.IsTrue() {
		return
	}
	b.statistics.Aggregate(b.programStats, s.opts.Sys.SinceStart())
	b.statistics.Report(s.opts.Sys.Writer(), s.opts.Testing)
}

type Orchestrator struct {
	opts                Options
	comparePathsOptions tspath.ComparePathsOptions
	host                *host

	// order generation result
	tasks  collections.SyncMap[tspath.Path, *buildTask]
	order  []string
	errors []*ast.Diagnostic
}

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
	task, ok := o.tasks.Load(path)
	if !ok {
		panic("No build task found for " + configName)
	}
	return core.Map(task.upStream, func(t *buildTask) string {
		return t.config
	})
}

func (o *Orchestrator) createBuildTasks(configs []string, wg core.WorkGroup) {
	for _, config := range configs {
		wg.Queue(func() {
			path := o.toPath(config)
			task := &buildTask{config: config}
			if _, loaded := o.tasks.LoadOrStore(path, task); loaded {
				return
			}
			task.resolved = o.host.GetResolvedProjectReference(config, path)
			if task.resolved != nil {
				o.createBuildTasks(task.resolved.ResolvedProjectReferencePaths(), wg)
			}
		})
	}
}

func (o *Orchestrator) setupBuildTask(
	configName string,
	inCircularContext bool,
	completed *collections.Set[tspath.Path],
	analyzing *collections.Set[tspath.Path],
	circularityStack []string,
) *buildTask {
	path := o.toPath(configName)
	task, ok := o.tasks.Load(path)
	if !ok {
		panic("No build task found for " + configName)
	}
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
				upstream := o.setupBuildTask(subReference, inCircularContext || task.resolved.ProjectReferences()[index].Circular, completed, analyzing, circularityStack)
				if upstream != nil {
					task.upStream = append(task.upStream, upstream)
				}
			}
		}
		circularityStack = circularityStack[:len(circularityStack)-1]
		completed.Add(path)
		task.reportDone = make(chan struct{})
		prev := core.LastOrNil(o.order)
		if prev != "" {
			if prevTask, ok := o.tasks.Load(o.toPath(prev)); ok {
				task.prevReporter = prevTask
			} else {
				panic("No previous task found for " + prev)
			}
		}
		task.done = make(chan struct{})
		o.order = append(o.order, configName)
	}
	return task
}

func (o *Orchestrator) GenerateGraph() {
	o.host = &host{
		builder: o,
		host:    compiler.NewCachedFSCompilerHost(o.opts.Sys.GetCurrentDirectory(), o.opts.Sys.FS(), o.opts.Sys.DefaultLibraryPath(), nil, nil),
	}

	projects := o.opts.Command.ResolvedProjectPaths()
	// Parse all config files in parallel
	wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
	o.createBuildTasks(projects, wg)
	wg.RunAndWait()

	// Generate the graph
	completed := collections.Set[tspath.Path]{}
	analyzing := collections.Set[tspath.Path]{}
	circularityStack := []string{}
	for _, project := range projects {
		o.setupBuildTask(project, false, &completed, &analyzing, circularityStack)
	}
}

func (o *Orchestrator) Start() tsc.CommandLineResult {
	o.GenerateGraph()
	build := !o.opts.Command.BuildOptions.Clean.IsTrue()
	if build && o.opts.Command.BuildOptions.Verbose.IsTrue() {
		o.createBuilderStatusReporter(nil)(ast.NewCompilerDiagnostic(
			diagnostics.Projects_in_this_build_Colon_0,
			strings.Join(core.Map(o.Order(), func(p string) string {
				return "\r\n    * " + o.relativeFileName(p)
			}), ""),
		))
	}
	var buildResult orchestratorResult
	if len(o.errors) == 0 {
		wg := core.NewWorkGroup(o.opts.Command.CompilerOptions.SingleThreaded.IsTrue())
		o.tasks.Range(func(path tspath.Path, task *buildTask) bool {
			task.reportStatus = o.createBuilderStatusReporter(task)
			task.diagnosticReporter = o.createDiagnosticReporter(task)
			wg.Queue(func() {
				if build {
					task.buildProject(o, path)
				} else {
					task.cleanProject(o, path)
				}
				task.report(o, path, &buildResult)
			})
			return true
		})
		wg.RunAndWait()
		buildResult.statistics.Projects = len(o.Order())
	} else {
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

func (o *Orchestrator) getWriter(task *buildTask) io.Writer {
	if task == nil {
		return o.opts.Sys.Writer()
	}
	return &task.builder
}

func (o *Orchestrator) createBuilderStatusReporter(task *buildTask) tsc.DiagnosticReporter {
	return tsc.CreateBuilderStatusReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.CompilerOptions, o.opts.Testing)
}

func (o *Orchestrator) createDiagnosticReporter(task *buildTask) tsc.DiagnosticReporter {
	return tsc.CreateDiagnosticReporter(o.opts.Sys, o.getWriter(task), o.opts.Command.CompilerOptions)
}

func NewOrchestrator(opts Options) *Orchestrator {
	return &Orchestrator{
		opts: opts,
		comparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          opts.Sys.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: opts.Sys.FS().UseCaseSensitiveFileNames(),
		},
	}
}
