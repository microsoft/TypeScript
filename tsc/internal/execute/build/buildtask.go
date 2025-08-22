package build

import (
	"fmt"
	"strings"

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

type buildTask struct {
	config   string
	resolved *tsoptions.ParsedCommandLine
	upStream []*buildTask
	status   *upToDateStatus
	done     chan struct{}

	// task reporting
	builder            strings.Builder
	errors             []*ast.Diagnostic
	reportStatus       tsc.DiagnosticReporter
	diagnosticReporter tsc.DiagnosticReporter
	exitStatus         tsc.ExitStatus
	statistics         *tsc.Statistics
	program            *incremental.Program
	pseudoBuild        bool
	filesToDelete      []string
	prevReporter       *buildTask
	reportDone         chan struct{}
}

func (t *buildTask) waitOnUpstream() []*upToDateStatus {
	upStreamStatus := make([]*upToDateStatus, len(t.upStream))
	for i, upstream := range t.upStream {
		<-upstream.done
		upStreamStatus[i] = upstream.status
	}
	return upStreamStatus
}

func (t *buildTask) unblockDownstream(status *upToDateStatus) {
	t.status = status
	close(t.done)
}

func (t *buildTask) reportDiagnostic(err *ast.Diagnostic) {
	t.errors = append(t.errors, err)
	t.diagnosticReporter(err)
}

func (t *buildTask) report(orchestrator *Orchestrator, configPath tspath.Path, buildResult *orchestratorResult) {
	if t.prevReporter != nil {
		<-t.prevReporter.reportDone
	}
	if len(t.errors) > 0 {
		buildResult.errors = append(core.IfElse(buildResult.errors != nil, buildResult.errors, []*ast.Diagnostic{}), t.errors...)
	}
	fmt.Fprint(orchestrator.opts.Sys.Writer(), t.builder.String())
	if t.exitStatus > buildResult.result.Status {
		buildResult.result.Status = t.exitStatus
	}
	if t.statistics != nil {
		buildResult.programStats = append(buildResult.programStats, t.statistics)
	}
	if t.program != nil {
		if orchestrator.opts.Testing != nil {
			orchestrator.opts.Testing.OnProgram(t.program)
		}
		t.program.MakeReadonly()
		buildResult.statistics.ProjectsBuilt++
	}
	if t.pseudoBuild {
		buildResult.statistics.TimestampUpdates++
	}
	buildResult.filesToDelete = append(buildResult.filesToDelete, t.filesToDelete...)
	close(t.reportDone)
}

func (t *buildTask) buildProject(orchestrator *Orchestrator, path tspath.Path) {
	// Wait on upstream tasks to complete
	upStreamStatus := t.waitOnUpstream()
	status := t.getUpToDateStatus(orchestrator, path, upStreamStatus)
	t.reportUpToDateStatus(orchestrator, status)
	if handled := t.handleStatusThatDoesntRequireBuild(orchestrator, status); handled == nil {
		if orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
			t.reportStatus(ast.NewCompilerDiagnostic(diagnostics.Building_project_0, orchestrator.relativeFileName(t.config)))
		}

		// Real build
		var compileTimes tsc.CompileTimes
		configAndTime, _ := orchestrator.host.resolvedReferences.Load(path)
		compileTimes.ConfigTime = configAndTime.time
		buildInfoReadStart := orchestrator.opts.Sys.Now()
		oldProgram := incremental.ReadBuildInfoProgram(t.resolved, orchestrator.host, orchestrator.host)
		compileTimes.BuildInfoReadTime = orchestrator.opts.Sys.Now().Sub(buildInfoReadStart)
		parseStart := orchestrator.opts.Sys.Now()
		program := compiler.NewProgram(compiler.ProgramOptions{
			Config: t.resolved,
			Host: &compilerHost{
				host:  orchestrator.host,
				trace: tsc.GetTraceWithWriterFromSys(&t.builder, orchestrator.opts.Testing),
			},
			JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
		})
		compileTimes.ParseTime = orchestrator.opts.Sys.Now().Sub(parseStart)
		changesComputeStart := orchestrator.opts.Sys.Now()
		t.program = incremental.NewProgram(program, oldProgram, orchestrator.host, orchestrator.opts.Testing != nil)
		compileTimes.ChangesComputeTime = orchestrator.opts.Sys.Now().Sub(changesComputeStart)

		result, statistics := tsc.EmitAndReportStatistics(
			orchestrator.opts.Sys,
			t.program,
			program,
			t.resolved,
			t.reportDiagnostic,
			tsc.QuietDiagnosticsReporter,
			&t.builder,
			&compileTimes,
			orchestrator.opts.Testing,
		)
		t.exitStatus = result.Status
		t.statistics = statistics
		if (!program.Options().NoEmitOnError.IsTrue() || len(result.Diagnostics) == 0) &&
			(len(result.EmitResult.EmittedFiles) > 0 || status.kind != upToDateStatusTypeOutOfDateBuildInfoWithErrors) {
			// Update time stamps for rest of the outputs
			t.updateTimeStamps(orchestrator, result.EmitResult.EmittedFiles, diagnostics.Updating_unchanged_output_timestamps_of_project_0)
		}

		if result.Status == tsc.ExitStatusDiagnosticsPresent_OutputsSkipped || result.Status == tsc.ExitStatusDiagnosticsPresent_OutputsGenerated {
			status = &upToDateStatus{kind: upToDateStatusTypeBuildErrors}
		} else {
			status = &upToDateStatus{kind: upToDateStatusTypeUpToDate}
		}
	} else {
		status = handled
		if t.resolved != nil {
			for _, diagnostic := range t.resolved.GetConfigFileParsingDiagnostics() {
				t.reportDiagnostic(diagnostic)
			}
		}
		if len(t.errors) > 0 {
			t.exitStatus = tsc.ExitStatusDiagnosticsPresent_OutputsSkipped
		}
	}
	t.unblockDownstream(status)
}

func (t *buildTask) handleStatusThatDoesntRequireBuild(orchestrator *Orchestrator, status *upToDateStatus) *upToDateStatus {
	switch status.kind {
	case upToDateStatusTypeUpToDate:
		if orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
			t.reportStatus(ast.NewCompilerDiagnostic(diagnostics.Project_0_is_up_to_date, t.config))
		}
		return status
	case upToDateStatusTypeUpstreamErrors:
		upstreamStatus := status.data.(*upstreamErrors)
		if orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
			t.reportStatus(ast.NewCompilerDiagnostic(
				core.IfElse(
					upstreamStatus.refHasUpstreamErrors,
					diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built,
					diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors,
				),
				orchestrator.relativeFileName(t.config),
				orchestrator.relativeFileName(upstreamStatus.ref),
			))
		}
		return status
	case upToDateStatusTypeSolution:
		return status
	case upToDateStatusTypeConfigFileNotFound:
		t.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.File_0_not_found, t.config))
		return status
	}

	// update timestamps
	if status.isPseudoBuild() {
		if orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
			t.reportStatus(ast.NewCompilerDiagnostic(diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, t.config))
			status = &upToDateStatus{kind: upToDateStatusTypeUpToDate}
			return status
		}

		t.updateTimeStamps(orchestrator, nil, diagnostics.Updating_output_timestamps_of_project_0)
		status = &upToDateStatus{kind: upToDateStatusTypeUpToDate}
		t.pseudoBuild = true
		return status
	}

	if orchestrator.opts.Command.BuildOptions.Dry.IsTrue() {
		t.reportStatus(ast.NewCompilerDiagnostic(diagnostics.A_non_dry_build_would_build_project_0, t.config))
		status = &upToDateStatus{kind: upToDateStatusTypeUpToDate}
		return status
	}
	return nil
}

func (t *buildTask) getUpToDateStatus(orchestrator *Orchestrator, configPath tspath.Path, upStreamStatus []*upToDateStatus) *upToDateStatus {
	// Config file not found
	if t.resolved == nil {
		return &upToDateStatus{kind: upToDateStatusTypeConfigFileNotFound}
	}

	// Solution - nothing to build
	if len(t.resolved.FileNames()) == 0 && t.resolved.ProjectReferences() != nil {
		return &upToDateStatus{kind: upToDateStatusTypeSolution}
	}

	for index, upstreamStatus := range upStreamStatus {
		if upstreamStatus == nil {
			// Not dependent on this upstream project (expected cycle was detected and hence skipped)
			continue
		}

		if orchestrator.opts.Command.BuildOptions.StopBuildOnErrors.IsTrue() && upstreamStatus.isError() {
			// Upstream project has errors, so we cannot build this project
			return &upToDateStatus{kind: upToDateStatusTypeUpstreamErrors, data: &upstreamErrors{t.resolved.ProjectReferences()[index].Path, upstreamStatus.kind == upToDateStatusTypeUpstreamErrors}}
		}
	}

	if orchestrator.opts.Command.BuildOptions.Force.IsTrue() {
		return &upToDateStatus{kind: upToDateStatusTypeForceBuild}
	}

	// Check the build info
	buildInfoPath := t.resolved.GetBuildInfoFileName()
	buildInfo := orchestrator.host.readOrStoreBuildInfo(configPath, buildInfoPath)
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
	oldestOutputFileAndTime := fileAndTime{buildInfoPath, orchestrator.host.GetMTime(buildInfoPath)}
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
	for index, upstreamStatus := range upStreamStatus {
		if upstreamStatus == nil || upstreamStatus.kind == upToDateStatusTypeSolution {
			// Not dependent on the status or this upstream project
			// (eg: expected cycle was detected and hence skipped, or is solution)
			continue
		}

		// If the upstream project's newest file is older than our oldest output,
		// we can't be out of date because of it
		// inputTime will not be present if we just built this project or updated timestamps
		// - in that case we do want to either build or update timestamps
		refInputOutputFileAndTime := upstreamStatus.inputOutputFileAndTime()
		if refInputOutputFileAndTime != nil && !refInputOutputFileAndTime.input.time.IsZero() && refInputOutputFileAndTime.input.time.Before(oldestOutputFileAndTime.time) {
			continue
		}

		// Check if tsbuildinfo path is shared, then we need to rebuild
		if orchestrator.host.hasConflictingBuildInfo(configPath) {
			return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{t.resolved.ProjectReferences()[index].Path, oldestOutputFileAndTime.file}}
		}

		// If the upstream project has only change .d.ts files, and we've built
		// *after* those files, then we're "pseudo up to date" and eligible for a fast rebuild
		newestDtsChangeTime := orchestrator.host.getLatestChangedDtsMTime(t.resolved.ResolvedProjectReferencePaths()[index])
		if !newestDtsChangeTime.IsZero() && newestDtsChangeTime.Before(oldestOutputFileAndTime.time) {
			refDtsUnchanged = true
			continue
		}

		// We have an output older than an upstream output - we are out of date
		return &upToDateStatus{kind: upToDateStatusTypeInputFileNewer, data: &inputOutputName{t.resolved.ProjectReferences()[index].Path, oldestOutputFileAndTime.file}}
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

func (t *buildTask) reportUpToDateStatus(orchestrator *Orchestrator, status *upToDateStatus) {
	if !orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
		return
	}
	switch status.kind {
	case upToDateStatusTypeConfigFileNotFound:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_config_file_does_not_exist,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeUpstreamErrors:
		upstreamStatus := status.data.(*upstreamErrors)
		t.reportStatus(ast.NewCompilerDiagnostic(
			core.IfElse(
				upstreamStatus.refHasUpstreamErrors,
				diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built,
				diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
			),
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(upstreamStatus.ref),
		))
	case upToDateStatusTypeUpToDate:
		inputOutputFileAndTime := status.data.(*inputOutputFileAndTime)
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(inputOutputFileAndTime.input.file),
			orchestrator.relativeFileName(inputOutputFileAndTime.output.file),
		))
	case upToDateStatusTypeUpToDateWithUpstreamTypes:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeUpToDateWithInputFileText:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeInputFileMissing:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_input_1_does_not_exist,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(status.data.(string)),
		))
	case upToDateStatusTypeOutputMissing:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(status.data.(string)),
		))
	case upToDateStatusTypeInputFileNewer:
		inputOutput := status.data.(*inputOutputName)
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(inputOutput.output),
			orchestrator.relativeFileName(inputOutput.input),
		))
	case upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(status.data.(string)),
		))
	case upToDateStatusTypeOutOfDateBuildInfoWithErrors:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_program_needs_to_report_errors,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(status.data.(string)),
		))
	case upToDateStatusTypeOutOfDateOptions:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(status.data.(string)),
		))
	case upToDateStatusTypeOutOfDateRoots:
		inputOutput := status.data.(*inputOutputName)
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_but_not_any_more,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(inputOutput.output),
			orchestrator.relativeFileName(inputOutput.input),
		))
	case upToDateStatusTypeTsVersionOutputOfDate:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2,
			orchestrator.relativeFileName(t.config),
			orchestrator.relativeFileName(status.data.(string)),
			core.Version(),
		))
	case upToDateStatusTypeForceBuild:
		t.reportStatus(ast.NewCompilerDiagnostic(
			diagnostics.Project_0_is_being_forcibly_rebuilt,
			orchestrator.relativeFileName(t.config),
		))
	case upToDateStatusTypeSolution:
		// Does not need to report status
	default:
		panic(fmt.Sprintf("Unknown up to date status kind: %v", status.kind))
	}
}

func (t *buildTask) updateTimeStamps(orchestrator *Orchestrator, emittedFiles []string, verboseMessage *diagnostics.Message) {
	if t.resolved.CompilerOptions().NoEmit.IsTrue() {
		return
	}
	emitted := collections.NewSetFromItems(emittedFiles...)
	var verboseMessageReported bool
	updateTimeStamp := func(file string) {
		if emitted.Has(file) {
			return
		}
		if !verboseMessageReported && orchestrator.opts.Command.BuildOptions.Verbose.IsTrue() {
			t.reportStatus(ast.NewCompilerDiagnostic(verboseMessage, orchestrator.relativeFileName(t.config)))
			verboseMessageReported = true
		}
		err := orchestrator.host.SetMTime(file, orchestrator.opts.Sys.Now())
		if err != nil {
			t.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.Failed_to_update_timestamp_of_file_0, file))
		}
	}

	if t.resolved.CompilerOptions().IsIncremental() {
		updateTimeStamp(t.resolved.GetBuildInfoFileName())
	} else {
		for outputFile := range t.resolved.GetOutputFileNames() {
			updateTimeStamp(outputFile)
		}
	}
}

func (t *buildTask) cleanProject(orchestrator *Orchestrator, path tspath.Path) {
	if t.resolved == nil {
		t.reportDiagnostic(ast.NewCompilerDiagnostic(diagnostics.File_0_not_found, t.config))
		t.exitStatus = tsc.ExitStatusDiagnosticsPresent_OutputsSkipped
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
			t.filesToDelete = append(t.filesToDelete, outputFile)
		}
	}
}
