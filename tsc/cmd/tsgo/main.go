// tsgo is a test bed for the Go port of TypeScript.
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"runtime/pprof"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	ts "github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnosticwriter"
	"github.com/microsoft/typescript-go/internal/execute"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

func printDiagnostic(d *ast.Diagnostic, level int, comparePathOptions tspath.ComparePathsOptions) {
	file := d.File()
	if file != nil {
		p := tspath.ConvertToRelativePath(file.FileName(), comparePathOptions)
		line, character := scanner.GetLineAndCharacterOfPosition(file, d.Loc().Pos())
		fmt.Printf("%v%v(%v,%v): error TS%v: %v\n", strings.Repeat(" ", level*2), p, line+1, character+1, d.Code(), d.Message())
	} else {
		fmt.Printf("%verror TS%v: %v\n", strings.Repeat(" ", level*2), d.Code(), d.Message())
	}
	printMessageChain(d.MessageChain(), level+1)
	for _, r := range d.RelatedInformation() {
		printDiagnostic(r, level+1, comparePathOptions)
	}
}

func printMessageChain(messageChain []*ast.Diagnostic, level int) {
	for _, c := range messageChain {
		fmt.Printf("%v%v\n", strings.Repeat(" ", level*2), c.Message())
		printMessageChain(c.MessageChain(), level+1)
	}
}

type cliOptions struct {
	tsc struct {
		project       string
		outDir        string
		noEmit        tristateFlag
		noLib         tristateFlag
		noCheck       tristateFlag
		skipLibCheck  tristateFlag
		pretty        tristateFlag
		listFiles     tristateFlag
		listFilesOnly tristateFlag
		showConfig    tristateFlag
	}

	devel struct {
		quiet          bool
		singleThreaded bool
		printTypes     bool
		pprofDir       string
	}
}

func (c *cliOptions) toCompilerOptions(currentDirectory string) *core.CompilerOptions {
	compilerOptions := &core.CompilerOptions{
		NoEmit:        core.Tristate(c.tsc.noEmit),
		NoLib:         core.Tristate(c.tsc.noLib),
		NoCheck:       core.Tristate(c.tsc.noCheck),
		SkipLibCheck:  core.Tristate(c.tsc.skipLibCheck),
		Pretty:        core.Tristate(c.tsc.pretty),
		ListFiles:     core.Tristate(c.tsc.listFiles),
		ListFilesOnly: core.Tristate(c.tsc.listFilesOnly),
		ShowConfig:    core.Tristate(c.tsc.showConfig),
	}

	if c.tsc.outDir != "" {
		compilerOptions.OutDir = tspath.ResolvePath(currentDirectory, c.tsc.outDir)
	}

	return compilerOptions
}

func parseArgs() *cliOptions {
	opts := &cliOptions{}
	opts.tsc.pretty = tristateFlag(core.TSTrue)

	flag.StringVar(&opts.tsc.project, "p", "", diagnostics.Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json.Format())
	flag.StringVar(&opts.tsc.project, "project", "", diagnostics.Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json.Format())
	flag.StringVar(&opts.tsc.outDir, "outDir", "", diagnostics.Specify_an_output_folder_for_all_emitted_files.Format())
	flag.Var(&opts.tsc.noEmit, "noEmit", diagnostics.Disable_emitting_files_from_a_compilation.Format())
	flag.Var(&opts.tsc.noLib, "noLib", diagnostics.Disable_including_any_library_files_including_the_default_lib_d_ts.Format())
	flag.Var(&opts.tsc.noCheck, "noCheck", diagnostics.Disable_full_type_checking_only_critical_parse_and_emit_errors_will_be_reported.Format())
	flag.Var(&opts.tsc.skipLibCheck, "skipLibCheck", diagnostics.Skip_type_checking_all_d_ts_files.Format())
	flag.Var(&opts.tsc.pretty, "pretty", diagnostics.Enable_color_and_formatting_in_TypeScript_s_output_to_make_compiler_errors_easier_to_read.Format())
	flag.Var(&opts.tsc.listFiles, "listFiles", diagnostics.Print_all_of_the_files_read_during_the_compilation.Format())
	flag.Var(&opts.tsc.listFilesOnly, "listFilesOnly", diagnostics.Print_names_of_files_that_are_part_of_the_compilation_and_then_stop_processing.Format())
	flag.Var(&opts.tsc.showConfig, "showConfig", diagnostics.Print_the_final_configuration_instead_of_building.Format())

	flag.BoolVar(&opts.devel.quiet, "q", false, "Do not print diagnostics.")
	flag.BoolVar(&opts.devel.quiet, "quiet", false, "Do not print diagnostics.")
	flag.BoolVar(&opts.devel.singleThreaded, "singleThreaded", false, "Run in single threaded mode.")
	flag.BoolVar(&opts.devel.printTypes, "printTypes", false, "Print types defined in 'main.ts'.")
	flag.StringVar(&opts.devel.pprofDir, "pprofDir", "", "Generate pprof CPU/memory profiles to the given directory.")
	flag.Parse()

	return opts
}

func main() {
	if args := os.Args[1:]; len(args) > 0 {
		switch args[0] {
		case "tsc":
			os.Exit(int(execute.CommandLine(newSystem(), nil, args[1:])))
		case "lsp":
			os.Exit(runLSP(args[1:]))
		}
	}
	opts := parseArgs()

	if opts.devel.pprofDir != "" {
		profileSession := beginProfiling(opts.devel.pprofDir)
		defer profileSession.stop()
	}

	startTime := time.Now()

	currentDirectory, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
		os.Exit(1)
	}

	fs := bundled.WrapFS(osvfs.FS())
	defaultLibraryPath := bundled.LibPath()

	configFileName := tspath.ResolvePath(currentDirectory, opts.tsc.project)
	if !fs.FileExists(configFileName) {
		configFileName = tspath.CombinePaths(configFileName, "tsconfig.json")
		if !fs.FileExists(configFileName) {
			fmt.Fprintf(os.Stderr, "Error: The file %v does not exist.\n", configFileName)
			os.Exit(1)
		}
	}

	// Set up CLI option overrides
	compilerOptions := opts.toCompilerOptions(currentDirectory)

	currentDirectory = tspath.GetDirectoryPath(configFileName)
	// !!! is the working directory actually the config path?
	host := ts.NewCompilerHost(compilerOptions, currentDirectory, fs, defaultLibraryPath)

	parseStart := time.Now()
	program := ts.NewProgram(ts.ProgramOptions{
		ConfigFileName: configFileName,
		Options:        compilerOptions,
		SingleThreaded: opts.devel.singleThreaded,
		Host:           host,
	})
	parseTime := time.Since(parseStart)

	compilerOptions = program.Options()

	if compilerOptions.ListFilesOnly.IsTrue() {
		listFiles(program)
		os.Exit(0)
	}

	if compilerOptions.ShowConfig.IsTrue() {
		enc := json.NewEncoder(os.Stdout)
		enc.SetIndent("", "    ")
		if err := enc.Encode(compilerOptions); err != nil {
			fmt.Fprintf(os.Stderr, "Error encoding JSON: %v\n", err)
			os.Exit(1)
		}
		os.Exit(0)
	}

	var bindTime, checkTime time.Duration

	diagnostics := program.GetConfigFileParsingDiagnostics()
	if len(diagnostics) != 0 {
		printDiagnostics(diagnostics, host, compilerOptions)
		os.Exit(1)
	}

	diagnostics = program.GetSyntacticDiagnostics(nil)
	if len(diagnostics) == 0 {
		if opts.devel.printTypes {
			program.PrintSourceFileWithTypes()
		} else {
			bindStart := time.Now()
			_ = program.GetBindDiagnostics(nil)
			bindTime = time.Since(bindStart)

			// !!! the checker already reads noCheck, but do it here just for stats printing for now
			if compilerOptions.NoCheck.IsFalseOrUnknown() {
				checkStart := time.Now()
				diagnostics = slices.Concat(program.GetGlobalDiagnostics(), program.GetSemanticDiagnostics(nil))
				checkTime = time.Since(checkStart)
			}
		}
	}

	var emitTime time.Duration
	if compilerOptions.NoEmit.IsFalseOrUnknown() {
		emitStart := time.Now()
		result := program.Emit(&ts.EmitOptions{})
		diagnostics = append(diagnostics, result.Diagnostics...)
		emitTime = time.Since(emitStart)
	}

	totalTime := time.Since(startTime)

	var memStats runtime.MemStats
	runtime.GC()
	runtime.GC()
	runtime.ReadMemStats(&memStats)

	if !opts.devel.quiet && len(diagnostics) != 0 {
		printDiagnostics(ts.SortAndDeduplicateDiagnostics(diagnostics), host, compilerOptions)
	}

	if compilerOptions.ListFiles.IsTrue() {
		listFiles(program)
	}

	var stats table

	stats.add("Files", len(program.SourceFiles()))
	stats.add("Types", program.TypeCount())
	stats.add("Parse time", parseTime)
	if bindTime != 0 {
		stats.add("Bind time", bindTime)
	}
	if checkTime != 0 {
		stats.add("Check time", checkTime)
	}
	if emitTime != 0 {
		stats.add("Emit time", emitTime)
	}
	stats.add("Total time", totalTime)
	stats.add("Memory used", fmt.Sprintf("%vK", memStats.Alloc/1024))

	stats.print()
}

type tableRow struct {
	name  string
	value string
}

type table struct {
	rows []tableRow
}

func (t *table) add(name string, value any) {
	if d, ok := value.(time.Duration); ok {
		value = formatDuration(d)
	}
	t.rows = append(t.rows, tableRow{name, fmt.Sprint(value)})
}

func (t *table) print() {
	nameWidth := 0
	valueWidth := 0
	for _, r := range t.rows {
		nameWidth = max(nameWidth, len(r.name))
		valueWidth = max(valueWidth, len(r.value))
	}

	for _, r := range t.rows {
		fmt.Printf("%-*s %*s\n", nameWidth+1, r.name+":", valueWidth, r.value)
	}
}

func formatDuration(d time.Duration) string {
	return fmt.Sprintf("%.3fs", d.Seconds())
}

func listFiles(p *ts.Program) {
	for _, file := range p.SourceFiles() {
		fmt.Println(file.FileName())
	}
}

func getFormatOpts(host ts.CompilerHost) *diagnosticwriter.FormattingOptions {
	return &diagnosticwriter.FormattingOptions{
		NewLine: host.NewLine(),
		ComparePathsOptions: tspath.ComparePathsOptions{
			CurrentDirectory:          host.GetCurrentDirectory(),
			UseCaseSensitiveFileNames: host.FS().UseCaseSensitiveFileNames(),
		},
	}
}

func printDiagnostics(diagnostics []*ast.Diagnostic, host ts.CompilerHost, compilerOptions *core.CompilerOptions) {
	formatOpts := getFormatOpts(host)
	if compilerOptions.Pretty.IsTrueOrUnknown() {
		diagnosticwriter.FormatDiagnosticsWithColorAndContext(os.Stdout, diagnostics, formatOpts)
		fmt.Fprintln(os.Stdout)
		diagnosticwriter.WriteErrorSummaryText(os.Stdout, diagnostics, formatOpts)
	} else {
		for _, diagnostic := range diagnostics {
			printDiagnostic(diagnostic, 0, formatOpts.ComparePathsOptions)
		}
	}
}

type profileSession struct {
	cpuFilePath string
	memFilePath string
	cpuFile     *os.File
	memFile     *os.File
}

func beginProfiling(profileDir string) *profileSession {
	if err := os.MkdirAll(profileDir, 0o755); err != nil {
		panic(err)
	}

	pid := os.Getpid()

	cpuProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-cpuprofile.pb.gz", pid))
	memProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-memprofile.pb.gz", pid))
	cpuFile, err := os.Create(cpuProfilePath)
	if err != nil {
		panic(err)
	}
	memFile, err := os.Create(memProfilePath)
	if err != nil {
		panic(err)
	}

	if err := pprof.StartCPUProfile(cpuFile); err != nil {
		panic(err)
	}

	return &profileSession{
		cpuFilePath: cpuProfilePath,
		memFilePath: memProfilePath,
		cpuFile:     cpuFile,
		memFile:     memFile,
	}
}

func (p *profileSession) stop() {
	pprof.StopCPUProfile()
	err := pprof.Lookup("allocs").WriteTo(p.memFile, 0)
	if err != nil {
		panic(err)
	}

	p.cpuFile.Close()
	p.memFile.Close()

	fmt.Printf("CPU profile: %v\n", p.cpuFilePath)
	fmt.Printf("Memory profile: %v\n", p.memFilePath)
}
