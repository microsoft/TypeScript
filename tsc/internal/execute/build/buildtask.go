package build

import (
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
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type updateKind uint

const (
	updateKindNone updateKind = iota
	updateKindConfig
	updateKindUpdate
)

type buildKind uint

const (
	buildKindNone buildKind = iota
	buildKindPseudo
	buildKindProgram
)

type upstreamTask struct {
	task     *buildTask
	refIndex int
}
type buildInfoEntry struct {
	buildInfo *incremental.BuildInfo
	path      tspath.Path
	mTime     time.Time
	dtsTime   *time.Time
}

type taskResult struct {
	builder            strings.Builder
	reportStatus       tsc.DiagnosticReporter
	diagnosticReporter tsc.DiagnosticReporter
	exitStatus         tsc.ExitStatus
	statistics         *tsc.Statistics
	program            *incremental.Program
	buildKind          buildKind
	filesToDelete      []string
}

type buildTask struct {
	config     string
	resolved   *tsoptions.ParsedCommandLine
	upStream   []*upstreamTask
	downStream []*buildTask // Only set and used in watch mode
	status     *upToDateStatus
	done       chan struct{}

	// task reporting
	result       *taskResult
	prevReporter *buildTask
	reportDone   chan struct{}

	// Watching things
	configTime          time.Time
	extendedConfigTimes []time.Time
	inputFiles          []time.Time

	buildInfoEntry   *buildInfoEntry
	buildInfoEntryMu sync.Mutex

	errors             []*ast.Diagnostic
	pending            atomic.Bool
	isInitialCycle     bool
	downStreamUpdateMu sync.Mutex
	dirty              bool
}

func (t *buildTask) waitOnUpstream() {
	for _, upstream := range t.upStream {
		<-upstream.task.done
	}
}

func (t *buildTask) unblockDownstream() {
	t.pending.Store(false)
	t.isInitialCycle = false
	close(t.done)
}

func (t *buildTask) reportDiagnostic(err *ast.Diagnostic) {
	t.errors = append(t.errors, err)
	t.result.diagnosticReporter(err)
}

func (t *buildTask) report(orchestrator *Orchestrator, configPath tspath.Path, buildResult *orchestratorResult) {
	if t.prevReporter != nil {
		<-t.prevReporter.reportDone
	}
	if len(t.errors) > 0 {
		buildResult.errors = append(core.IfElse(buildResult.errors != nil, buildResult.errors, []*ast.Diagnostic{}), t.errors...)
	}
	fmt.Fprint(orchestrator.opts.Sys.Writer(), t.result.builder.String())
	if t.result.exitStatus > buildResult.result.Status {
		buildResult.result.Status = t.result.exitStatus
	}
	if t.result.statistics != nil {
		buildResult.statistics.Aggregate(t.result.statistics)
	}
	// If we built the program, or updated timestamps, or had errors, we need to
	// delete files that are no longer needed
	switch t.result.buildKind {
	case buildKindProgram:
		if orchestrator.opts.Testing != nil {
			orchestrator.opts.Testing.OnProgram(t.result.program)
		}
		buildResult.statistics.ProjectsBuilt++
	case buildKindPseudo:
		buildResult.statistics.TimestampUpdates++
	}
	buildResult.filesToDelete = append(buildResult.filesToDelete, t.result.filesToDelete...)
	t.result = nil
	close(t.reportDone)
}

func (t *buildTask) buildProject(orchestrator *Orchestrator, path tspath.Path) {
	// Wait on upstream tasks to complete
	t.waitOnUpstream()
	if t.pending.Load() {
		t.status = t.getUpToDateStatus(orchestrator, path)
		t.reportUpToDateStatus(orchestrator)
		if !t.handleStatusThatDoesntRequireBuild(orchestrator) {
			t.compileAndEmit(orchestrator, path)
			t.updateDownstream(orchestrator, path)
		} else {
			if t.resolved != nil {
				for _, diagnostic := range t.resolved.GetConfigFileParsingDiagnostics() {
					t.reportDiagnostic(diagnostic)
				}
			}
			if len(t.errors) > 0 {
				t.result.exitStatus = tsc.ExitStatusDiagnosticsPresent_OutputsSkipped
			}
		}
	} else {
		if len(t.errors) > 0 {
			t.reportUpToDateStatus(orchestrator)
			for _, err := range t.errors {
				// Should not add the diagnostics so just reporting
				t.result.diagnosticReporter(err)
			}
		}
	}
	t.unblockDownstream()
}

func (t *buildTask) updateDownstream(orchestrator *Orchestrator, path tspath.Path) {
	if t.isInitialCycle {
		return
	}
	if orchestrator.opts.Command.BuildOptions.StopBuildOnErrors.IsTrue() && t.status.isError() {
		return
	}

	for _, downStream := range t.downStream {
		downStream.downStreamUpdateMu.Lock()
		if downStream.status != nil {
			switch downStream.status.kind {
			case upToDateStatusTypeUpToDate:
				if !t.result.program.HasChangedDtsFile() {
					downStream.status = &upToDateStatus{kind: upToDateStatusTypeUpToDateWithUpstreamTypes, data: downStream.status.data}
					break
				}
				fallthrough
			case upToDateStatusTypeUpToDateWithUpstreamTypes,
				upToDateStatusTypeUpToDateWithInputFileText:
				if t.result.program.HasChangedDtsFile() {
					downStream.status = &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{t.config, downStream.status.oldestOutputFileName()}}
				}
			case upToDateStatusTypeUpstreamErrors:
				upstreamErrors := downStream.status.upstreamErrors()
				refConfig := core.ResolveConfigFileNameOfProjectReference(upstreamErrors.ref)
				if orchestrator.toPath(refConfig) == path {
					downStream.resetStatus()
				}
			}
		}
		downStream.pending.Store(true)
		downStream.downStreamUpdateMu.Unlock()
	}
}

func (t *buildTask) compileAndEmit(orchestrator *Orchestrator, path tspath.Path) {
	t.errors = nil
	if orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
		t.result.reportStatus(ast.NewCompilerDiagnostic(diagnostics.Building_project_0, orchestrator.relativeFileName(t.config)))
	}

	// Real build
	var compileTimes tsc.CompileTimes
	configTime, _ := orchestrator.host.configTimes.Load(path)
	compileTimes.ConfigTime = configTime
	buildInfoReadStart := orchestrator.opts.Sys.Now()
	var oldProgram *incremental.Program
	if !orchestrator.opts.Command.BuildOptions.Force.IsTrue() {
		oldProgram = incremental.ReadBuildInfoProgram(t.resolved, orchestrator.host, orchestrator.host)
	}
	compileTimes.BuildInfoReadTime = orchestrator.opts.Sys.Now().Sub(buildInfoReadStart)
	parseStart := orchestrator.opts.Sys.Now()
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config: t.resolved,
		Host: &compilerHost{
			host:  orchestrator.host,
			trace: tsc.GetTraceWithWriterFromSys(&t.result.builder, orchestrator.opts.Testing),
		},
		JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
	})
	compileTimes.ParseTime = orchestrator.opts.Sys.Now().Sub(parseStart)
	changesComputeStart := orchestrator.opts.Sys.Now()
	t.result.program = incremental.NewProgram(program, oldProgram, orchestrator.host, orchestrator.opts.Testing != nil)
	compileTimes.ChangesComputeTime = orchestrator.opts.Sys.Now().Sub(changesComputeStart)

	result, statistics := tsc.EmitAndReportStatistics(tsc.EmitInput{
		Sys:                orchestrator.opts.Sys,
		ProgramLike:        t.result.program,
		Program:            program,
		Config:             t.resolved,
		ReportDiagnostic:   t.reportDiagnostic,
		ReportErrorSummary: tsc.QuietDiagnosticsReporter,
		Writer:             &t.result.builder,
		WriteFile: func(fileName, text string, writeByteOrderMark bool, data *compiler.WriteFileData) error {
			return t.writeFile(orchestrator, fileName, text, writeByteOrderMark, data)
		},
		CompileTimes:       &compileTimes,
		Testing:            orchestrator.opts.Testing,
		TestingMTimesCache: orchestrator.host.mTimes,
	})
	t.result.exitStatus = result.Status
	t.result.statistics = statistics
	if (!program.Options().NoEmitOnError.IsTrue() || len(result.Diagnostics) == 0) &&
		(len(result.EmitResult.EmittedFiles) > 0 || t.status.kind != upToDateStatusTypeOutOfDateBuildInfoWithErrors) {
		// Update time stamps for rest of the outputs
		t.updateTimeStamps(orchestrator, result.EmitResult.EmittedFiles, diagnostics.Updating_unchanged_output_timestamps_of_project_0)
	}
	t.result.buildKind = buildKindProgram
	if result.Status == tsc.ExitStatusDiagnosticsPresent_OutputsSkipped || result.Status == tsc.ExitStatusDiagnosticsPresent_OutputsGenerated {
		t.status = &upToDateStatus{kind: upToDateStatusTypeBuildErrors}
	} else {
		var oldestOutputFileName string
		if len(result.EmitResult.EmittedFiles) > 0 {
			oldestOutputFileName = result.EmitResult.EmittedFiles[0]
		} else {
			oldestOutputFileName = core.FirstOrNilSeq(t.resolved.GetOutputFileNames())
		}
		t.status = &upToDateStatus{kind: upToDateStatusTypeUpToDate, data: oldestOutputFileName}
	}
}

func (t *buildTask) handleStatusThatDoesntRequireBuild(orchestrator *Orchestrator) bool {
	switch t.status.kind {
	case upToDateStatusTypeUpToDate:
		if orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
			t.result.reportStatus(ast.NewCompilerDiagnostic(diagnostics.Project_0_is_up_to_date, t.config))
		}
		return true
	case upToDateStatusTypeUpstreamErrors:
		upstreamStatus := t.status.upstreamErrors()
		if orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
			t.result.reportStatus(ast.NewCompilerDiagnostic(
				core.IfElse(
					upstreamStatus.refHasUpstreamErrors,
					diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built,
					diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors,
				),
				orchestrator.relativeFileName(t.config),
				orchestrator.relativeFileName(upstreamStatus.ref),
			))
		}
		return true
	case upToDateStatusTypeSolution:
		return true
	case upToDateStatusTypeConfigFileNotFound:
		t.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.File_0_not_found, t.config))
		return true
	}

	// update timestamps
	if t.status.isPseudoBuild() {
		if orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
			t.result.reportStatus(ast.NewCompilerDiagnostic(diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, t.config))
			t.status = &upToDateStatus{kind: upToDateStatusTypeUpToDate}
			return true
		}

		t.updateTimeStamps(orchestrator, nil, diagnostics.Updating_output_timestamps_of_project_0)
		t.status = &upToDateStatus{kind: upToDateStatusTypeUpToDate, data: t.status.data}
		t.result.buildKind = buildKindPseudo
		return true
	}

	if orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
		t.result.reportStatus(ast.NewCompilerDiagnostic(diagnostics.A_non_dry_build_would_build_project_0, t.config))
		t.status = &upToDateStatus{kind: upToDateStatusTypeUpToDate}
		return true
	}
	return false
}

func (t *buildTask) getUpToDateStatus(orchestrator *Orchestrator, configPath tspath.Path) *upToDateStatus {
	if t.status != nil {
		return t.status
	}
	// Config file not found
	if t.resolved == nil {
		return &upToDateStatus{kind: upToDateStatusTypeConfigFileNotFound}
	}

	// Solution - nothing to build
	if len(t.resolved.FileNames()) == 0 && t.resolved.ProjectReferences() != nil {
		return &upToDateStatus{kind: upToDateStatusTypeSolution}
	}

	for _, upstream := range t.upStream {
		if orchestrator.opts.Command.BuildOptions.StopBuildOnErrors.IsTrue() && upstream.task.status.isError() {
			// Upstream project has errors, so we cannot build this project
			return &upToDateStatus{kind: upToDateStatusTypeUpstreamErrors, data: &upstreamErrors{t.resolved.ProjectReferences()[upstream.refIndex].Path, upstream.task.status.kind == upToDateStatusTypeUpstreamErrors}}
		}
	}

	if orchestrator.opts.Command.BuildOptions.Force.IsTrue() {
		return &upToDateStatus{kind: upToDateStatusTypeForceBuild}
	}

	// Check the build info
	buildInfoPath := t.resolved.GetBuildInfoFileName()
	buildInfo, buildInfoTime := t.loadOrStoreBuildInfo(orchestrator, configPath, buildInfoPath)
	if buildInfo == nil {
		return &upToDateStatus{kind: upToDateStatusTypeOutputMissing, data: buildInfoPath}
	}

	// build info version
	if !buildInfo.IsValidVersion() {
		return &upToDateStatus{kind: upToDateStatusTypeTsVersionOutputOfDate, data: buildInfo.Version}
	}

	// Report errors if build info indicates errors
	if buildInfo.Errors || // Errors that need to be reported irrespective of "--noCheck"
		(!t.resolved.CompilerOptions().NoCheck.IsTrue() && (buildInfo.SemanticErrors || buildInfo.CheckPending)) { // Errors without --noCheck
		return &upToDateStatus{kind: upToDateStatusTypeOutOfDateBuildInfoWithErrors, data: buildInfoPath}
	}

	if t.resolved.CompilerOptions().IsIncremental() {
		if !buildInfo.IsIncremental() {
			// Program options out of date
			return &upToDateStatus{kind: upToDateStatusTypeOutOfDateOptions, data: buildInfoPath}
		}

		// Errors need to be reported if build info has errors
		if (t.resolved.CompilerOptions().GetEmitDeclarations() && buildInfo.EmitDiagnosticsPerFile != nil) || // Always reported errors
			(!t.resolved.CompilerOptions().NoCheck.IsTrue() && // Semantic errors if not --noCheck
				(buildInfo.ChangeFileSet != nil || buildInfo.SemanticDiagnosticsPerFile != nil)) {
			return &upToDateStatus{kind: upToDateStatusTypeOutOfDateBuildInfoWithErrors, data: buildInfoPath}
		}

		// Pending emit files
		if !t.resolved.CompilerOptions().NoEmit.IsTrue() &&
			(buildInfo.ChangeFileSet != nil || buildInfo.AffectedFilesPendingEmit != nil) {
			return &upToDateStatus{kind: upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit, data: buildInfoPath}
		}

		// Some of the emit files like source map or dts etc are not yet done
		if buildInfo.IsEmitPending(t.resolved, tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(buildInfoPath, orchestrator.comparePathsOptions.CurrentDirectory))) {
			return &upToDateStatus{kind: upToDateStatusTypeOutOfDateOptions, data: buildInfoPath}
		}
	}
	var inputTextUnchanged bool
	oldestOutputFileAndTime := fileAndTime{buildInfoPath, buildInfoTime}
	var newestInputFileAndTime fileAndTime
	var seenRoots collections.Set[tspath.Path]
	var buildInfoRootInfoReader *incremental.BuildInfoRootInfoReader
	for _, inputFile := range t.resolved.FileNames() {
		inputTime := orchestrator.host.GetMTime(inputFile)
		if inputTime.IsZero() {
			return &upToDateStatus{kind: upToDateStatusTypeInputFileMissing, data: inputFile}
		}
		inputPath := orchestrator.toPath(inputFile)
		if inputTime.After(oldestOutputFileAndTime.time) {
			var version string
			var currentVersion string
			if buildInfo.IsIncremental() {
				if buildInfoRootInfoReader == nil {
					buildInfoRootInfoReader = buildInfo.GetBuildInfoRootInfoReader(tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(buildInfoPath, orchestrator.comparePathsOptions.CurrentDirectory)), orchestrator.comparePathsOptions)
				}
				buildInfoFileInfo, resolvedInputPath := buildInfoRootInfoReader.GetBuildInfoFileInfo(inputPath)
				if fileInfo := buildInfoFileInfo.GetFileInfo(); fileInfo != nil && fileInfo.Version() != "" {
					version = fileInfo.Version()
					if text, ok := orchestrator.host.FS().ReadFile(string(resolvedInputPath)); ok {
						currentVersion = incremental.ComputeHash(text, orchestrator.opts.Testing != nil)
						if version == currentVersion {
							inputTextUnchanged = true
						}
					}
				}
			}

			if version == "" || version != currentVersion {
				return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{inputFile, buildInfoPath}}
			}
		}
		if inputTime.After(newestInputFileAndTime.time) {
			newestInputFileAndTime = fileAndTime{inputFile, inputTime}
		}
		seenRoots.Add(inputPath)
	}

	if buildInfoRootInfoReader == nil {
		buildInfoRootInfoReader = buildInfo.GetBuildInfoRootInfoReader(tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(buildInfoPath, orchestrator.comparePathsOptions.CurrentDirectory)), orchestrator.comparePathsOptions)
	}
	for root := range buildInfoRootInfoReader.Roots() {
		if !seenRoots.Has(root) {
			// File was root file when project was built but its not any more
			return &upToDateStatus{kind: upToDateStatusTypeOutOfDateRoots, data: &inputOutputName{string(root), buildInfoPath}}
		}
	}

	if !t.resolved.CompilerOptions().IsIncremental() {
		// Check output file stamps
		for outputFile := range t.resolved.GetOutputFileNames() {
			outputTime := orchestrator.host.GetMTime(outputFile)
			if outputTime.IsZero() {
				// Output file missing
				return &upToDateStatus{kind: upToDateStatusTypeOutputMissing, data: outputFile}
			}

			if outputTime.Before(newestInputFileAndTime.time) {
				// Output file is older than input file
				return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{newestInputFileAndTime.file, outputFile}}
			}

			if outputTime.Before(oldestOutputFileAndTime.time) {
				oldestOutputFileAndTime = fileAndTime{outputFile, outputTime}
			}
		}
	}

	var refDtsUnchanged bool
	for _, upstream := range t.upStream {
		if upstream.task.status.kind == upToDateStatusTypeSolution {
			// Not dependent on the status or this upstream project
			// (eg: expected cycle was detected and hence skipped, or is solution)
			continue
		}

		// If the upstream project's newest file is older than our oldest output,
		// we can't be out of date because of it
		// inputTime will not be present if we just built this project or updated timestamps
		// - in that case we do want to either build or update timestamps
		refInputOutputFileAndTime := upstream.task.status.inputOutputFileAndTime()
		if refInputOutputFileAndTime != nil && !refInputOutputFileAndTime.input.time.IsZero() && refInputOutputFileAndTime.input.time.Before(oldestOutputFileAndTime.time) {
			continue
		}

		// Check if tsbuildinfo path is shared, then we need to rebuild
		if t.hasConflictingBuildInfo(orchestrator, upstream.task) {
			// We have an output older than an upstream output - we are out of date
			return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{t.resolved.ProjectReferences()[upstream.refIndex].Path, oldestOutputFileAndTime.file}}
		}

		// If the upstream project has only change .d.ts files, and we've built
		// *after* those files, then we're "pseudo up to date" and eligible for a fast rebuild
		newestDtsChangeTime := upstream.task.getLatestChangedDtsMTime(orchestrator)
		if !newestDtsChangeTime.IsZero() && newestDtsChangeTime.Before(oldestOutputFileAndTime.time) {
			refDtsUnchanged = true
			continue
		}

		// We have an output older than an upstream output - we are out of date
		return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{t.resolved.ProjectReferences()[upstream.refIndex].Path, oldestOutputFileAndTime.file}}
	}

	checkInputFileTime := func(inputFile string) *upToDateStatus {
		inputTime := orchestrator.host.GetMTime(inputFile)
		if inputTime.After(oldestOutputFileAndTime.time) {
			// Output file is older than input file
			return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{inputFile, oldestOutputFileAndTime.file}}
		}
		return nil
	}

	configStatus := checkInputFileTime(t.config)
	if configStatus != nil {
		return configStatus
	}

	for _, extendedConfig := range t.resolved.ExtendedSourceFiles() {
		extendedConfigStatus := checkInputFileTime(extendedConfig)
		if extendedConfigStatus != nil {
			return extendedConfigStatus
		}
	}

	// !!! sheetal TODO : watch??
	// // Check package file time
	// const packageJsonLookups = state.lastCachedPackageJsonLookups.get(resolvedPath);
	// const dependentPackageFileStatus = packageJsonLookups && forEachKey(
	//     packageJsonLookups,
	//     path => checkConfigFileUpToDateStatus(state, path, oldestOutputFileTime, oldestOutputFileName),
	// );
	// if (dependentPackageFileStatus) return dependentPackageFileStatus;

	return &upToDateStatus{
		kind: core.IfElse(
			refDtsUnchanged,
			upToDateStatusTypeUpToDateWithUpstreamTypes,
			core.IfElse(inputTextUnchanged, upToDateStatusTypeUpToDateWithInputFileText, upToDateStatusTypeUpToDate),
		),
		data: &inputOutputFileAndTime{newestInputFileAndTime, oldestOutputFileAndTime, buildInfoPath},
	}
}

func (t *buildTask) reportUpToDateStatus(orchestrator *Orchestrator) {
	if !orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
		return
	}
	switch t.status.kind {
	case upToDateStatusTypeConfigFileNotFound:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_config_file_does_not_exist,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeUpstreamErrors:
		upstreamStatus := t.status.upstreamErrors()
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			core.IfElse(
				upstreamStatus.refHasUpstreamErrors,
				diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built,
				diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
			),
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(upstreamStatus.ref),
		))
	case upToDateStatusTypeBuildErrors:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_it_has_errors,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeUpToDate:
		// This is to ensure skipping verbose log for projects that were built,
		// and then some other package changed but this package doesnt need update
		if inputOutputFileAndTime := t.status.inputOutputFileAndTime(); inputOutputFileAndTime != nil {
			t.result.reportStatus(ast.NewCompilerDiagnostic(
				diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2,
				orchestrator.relativeFileName(t.config),
				orchestrator.relativeFileName(inputOutputFileAndTime.input.file),
				orchestrator.relativeFileName(inputOutputFileAndTime.output.file),
			))
		}
	case upToDateStatusTypeUpToDateWithUpstreamTypes:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeUpToDateWithInputFileText:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeInputFileMissing:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_input_1_does_not_exist,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(t.status.data.(string)),
		))
	case upToDateStatusTypeOutputMissing:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(t.status.data.(string)),
		))
	case upToDateStatusTypeInputFileNewer:
		inputOutput := t.status.inputOutputName()
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(inputOutput.output),
			orchestrator.relativeFileName(inputOutput.input),
		))
	case upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(t.status.data.(string)),
		))
	case upToDateStatusTypeOutOfDateBuildInfoWithErrors:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_program_needs_to_report_errors,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(t.status.data.(string)),
		))
	case upToDateStatusTypeOutOfDateOptions:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(t.status.data.(string)),
		))
	case upToDateStatusTypeOutOfDateRoots:
		inputOutput := t.status.inputOutputName()
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_but_not_any_more,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(inputOutput.output),
			orchestrator.relativeFileName(inputOutput.input),
		))
	case upToDateStatusTypeTsVersionOutputOfDate:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(t.status.data.(string)),
			core.Version(),
		))
	case upToDateStatusTypeForceBuild:
		t.result.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_being_forcibly_rebuilt,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeSolution:
		// Does not need to report status
	default:
		panic(fmt.Sprintf("Unknown up to date status kind: %v", t.status.kind))
	}
}

func (t *buildTask) canUpdateJsDtsOutputTimestamps() bool {
	return !t.resolved.CompilerOptions().NoEmit.IsTrue() && !t.resolved.CompilerOptions().IsIncremental()
}

func (t *buildTask) updateTimeStamps(orchestrator *Orchestrator, emittedFiles []string, verboseMessage *diagnostics.Message) {
	emitted := collections.NewSetFromItems(emittedFiles...)
	var verboseMessageReported bool
	buildInfoName := t.resolved.GetBuildInfoFileName()
	now := orchestrator.opts.Sys.Now()
	updateTimeStamp := func(file string) {
		if emitted.Has(file) {
			return
		}
		if !verboseMessageReported && orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
			t.result.reportStatus(ast.NewCompilerDiagnostic(verboseMessage, orchestrator.relativeFileName(t.config)))
			verboseMessageReported = true
		}
		err := orchestrator.host.SetMTime(file, now)
		if err == nil {
			if file == buildInfoName {
				t.buildInfoEntryMu.Lock()
				if t.buildInfoEntry != nil {
					t.buildInfoEntry.mTime = now
				}
				t.buildInfoEntryMu.Unlock()
			} else if t.storeOutputTimeStamp(orchestrator) {
				orchestrator.host.storeMTime(file, now)
			}
		}
	}

	if t.canUpdateJsDtsOutputTimestamps() {
		for outputFile := range t.resolved.GetOutputFileNames() {
			updateTimeStamp(outputFile)
		}
	}
	updateTimeStamp(t.resolved.GetBuildInfoFileName())
}

func (t *buildTask) cleanProject(orchestrator *Orchestrator, path tspath.Path) {
	if t.resolved == nil {
		t.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.File_0_not_found, t.config))
		t.result.exitStatus = tsc.ExitStatusDiagnosticsPresent_OutputsSkipped
		return
	}

	inputs := collections.NewSetFromItems(core.Map(t.resolved.FileNames(), orchestrator.toPath)...)
	for outputFile := range t.resolved.GetOutputFileNames() {
		t.cleanProjectOutput(orchestrator, outputFile, inputs)
	}
	t.cleanProjectOutput(orchestrator, t.resolved.GetBuildInfoFileName(), inputs)
}

func (t *buildTask) cleanProjectOutput(orchestrator *Orchestrator, outputFile string, inputs *collections.Set[tspath.Path]) {
	outputPath := orchestrator.toPath(outputFile)
	// If output name is same as input file name, do not delete and ignore the error
	if inputs.Has(outputPath) {
		return
	}
	if orchestrator.host.FS().FileExists(outputFile) {
		if !orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
			err := orchestrator.host.FS().Remove(outputFile)
			if err != nil {
				t.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Failed_to_delete_file_0, outputFile))
			}
		} else {
			t.result.filesToDelete = append(t.result.filesToDelete, outputFile)
		}
	}
}

func (t *buildTask) updateWatch(orchestrator *Orchestrator, oldCache *collections.SyncMap[tspath.Path, time.Time]) {
	t.configTime = orchestrator.host.loadOrStoreMTime(t.config, oldCache, false)
	if t.resolved != nil {
		t.extendedConfigTimes = core.Map(t.resolved.ExtendedSourceFiles(), func(p string) time.Time {
			return orchestrator.host.loadOrStoreMTime(p, oldCache, false)
		})
		t.inputFiles = core.Map(t.resolved.FileNames(), func(p string) time.Time {
			return orchestrator.host.loadOrStoreMTime(p, oldCache, false)
		})
		if t.canUpdateJsDtsOutputTimestamps() {
			for outputFile := range t.resolved.GetOutputFileNames() {
				orchestrator.host.storeMTimeFromOldCache(outputFile, oldCache)
			}
		}
	}
}

func (t *buildTask) resetStatus() {
	t.status = nil
	t.pending.Store(true)
	t.errors = nil
}

func (t *buildTask) resetConfig(orchestrator *Orchestrator, path tspath.Path) {
	t.dirty = true
	orchestrator.host.resolvedReferences.delete(path)
}

func (t *buildTask) hasUpdate(orchestrator *Orchestrator, path tspath.Path) updateKind {
	var needsConfigUpdate bool
	var needsUpdate bool
	if configTime := orchestrator.host.GetMTime(t.config); configTime != t.configTime {
		t.resetConfig(orchestrator, path)
		needsConfigUpdate = true
	}
	if t.resolved != nil {
		for index, file := range t.resolved.ExtendedSourceFiles() {
			if orchestrator.host.GetMTime(file) != t.extendedConfigTimes[index] {
				t.resetConfig(orchestrator, path)
				needsConfigUpdate = true
			}
		}
		for index, file := range t.resolved.FileNames() {
			if orchestrator.host.GetMTime(file) != t.inputFiles[index] {
				t.resetStatus()
				needsUpdate = true
			}
		}
		if !needsConfigUpdate {
			configStart := orchestrator.opts.Sys.Now()
			newConfig := t.resolved.ReloadFileNamesOfParsedCommandLine(orchestrator.host.FS())
			configTime := orchestrator.opts.Sys.Now().Sub(configStart)
			// Make new channels if needed later
			t.reportDone = make(chan struct{})
			t.done = make(chan struct{})
			if !slices.Equal(t.resolved.FileNames(), newConfig.FileNames()) {
				orchestrator.host.resolvedReferences.store(path, newConfig)
				orchestrator.host.configTimes.Store(path, configTime)
				t.resolved = newConfig
				t.resetStatus()
				needsUpdate = true
			}
		}
	}
	return core.IfElse(needsConfigUpdate, updateKindConfig, core.IfElse(needsUpdate, updateKindUpdate, updateKindNone))
}

func (t *buildTask) loadOrStoreBuildInfo(orchestrator *Orchestrator, configPath tspath.Path, buildInfoFileName string) (*incremental.BuildInfo, time.Time) {
	path := orchestrator.toPath(buildInfoFileName)
	t.buildInfoEntryMu.Lock()
	defer t.buildInfoEntryMu.Unlock()
	if t.buildInfoEntry != nil && t.buildInfoEntry.path == path {
		return t.buildInfoEntry.buildInfo, t.buildInfoEntry.mTime
	}
	t.buildInfoEntry = &buildInfoEntry{
		buildInfo: incremental.NewBuildInfoReader(orchestrator.host).ReadBuildInfo(t.resolved),
		path:      path,
	}
	var mTime time.Time
	if t.buildInfoEntry.buildInfo != nil {
		mTime = orchestrator.host.GetMTime(buildInfoFileName)
	}
	t.buildInfoEntry.mTime = mTime
	return t.buildInfoEntry.buildInfo, mTime
}

func (t *buildTask) onBuildInfoEmit(orchestrator *Orchestrator, buildInfoFileName string, buildInfo *incremental.BuildInfo, hasChangedDtsFile bool) {
	t.buildInfoEntryMu.Lock()
	defer t.buildInfoEntryMu.Unlock()
	var dtsTime *time.Time
	mTime := orchestrator.opts.Sys.Now()
	if hasChangedDtsFile {
		dtsTime = &mTime
	} else if t.buildInfoEntry != nil {
		dtsTime = t.buildInfoEntry.dtsTime
	}
	t.buildInfoEntry = &buildInfoEntry{
		buildInfo: buildInfo,
		path:      orchestrator.toPath(buildInfoFileName),
		mTime:     mTime,
		dtsTime:   dtsTime,
	}
}

func (t *buildTask) hasConflictingBuildInfo(orchestrator *Orchestrator, upstream *buildTask) bool {
	if t.buildInfoEntry != nil && upstream.buildInfoEntry != nil {
		return t.buildInfoEntry.path == upstream.buildInfoEntry.path
	}
	return false
}

func (t *buildTask) getLatestChangedDtsMTime(orchestrator *Orchestrator) time.Time {
	t.buildInfoEntryMu.Lock()
	defer t.buildInfoEntryMu.Unlock()
	if t.buildInfoEntry.dtsTime != nil {
		return *t.buildInfoEntry.dtsTime
	}
	dtsTime := orchestrator.host.GetMTime(
		tspath.GetNormalizedAbsolutePath(
			t.buildInfoEntry.buildInfo.LatestChangedDtsFile,
			tspath.GetDirectoryPath(string(t.buildInfoEntry.path)),
		),
	)
	t.buildInfoEntry.dtsTime = &dtsTime
	return dtsTime
}

func (t *buildTask) storeOutputTimeStamp(orchestrator *Orchestrator) bool {
	return orchestrator.opts.Command.CompilerOptions.Watch.IsTrue() && !t.resolved.CompilerOptions().IsIncremental()
}

func (t *buildTask) writeFile(orchestrator *Orchestrator, fileName string, text string, writeByteOrderMark bool, data *compiler.WriteFileData) error {
	err := orchestrator.host.FS().WriteFile(fileName, text, writeByteOrderMark)
	if err == nil {
		if data != nil && data.BuildInfo != nil {
			t.onBuildInfoEmit(orchestrator, fileName, data.BuildInfo.(*incremental.BuildInfo), t.result.program.HasChangedDtsFile())
		} else if t.storeOutputTimeStamp(orchestrator) {
			// Store time stamps
			orchestrator.host.storeMTime(fileName, orchestrator.opts.Sys.Now())
		}
	}
	return err
}
