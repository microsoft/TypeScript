// tsgo is a test bed for the Go port of TypeScript.
package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"runtime/pprof"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/bundled"
	ts "github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

var (
	quiet            = false
	singleThreaded   = false
	parseAndBindOnly = false
	printTypes       = false
	pretty           = true
	listFiles        = false
	noLib            = false
	pprofDir         = ""
	outDir           = ""
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

func main() {
	flag.BoolVar(&quiet, "q", false, "Quiet output")
	flag.BoolVar(&singleThreaded, "s", false, "Single threaded")
	flag.BoolVar(&parseAndBindOnly, "p", false, "Parse and bind only")
	flag.BoolVar(&printTypes, "t", false, "Print types defined in main.ts")
	flag.BoolVar(&pretty, "pretty", true, "Get prettier errors")
	flag.BoolVar(&listFiles, "listfiles", false, "List files in the program")
	flag.BoolVar(&noLib, "nolib", false, "Do not load lib.d.ts files")
	flag.StringVar(&pprofDir, "pprofdir", "", "Generate pprof CPU/memory profiles to the given directory")
	flag.StringVar(&outDir, "outdir", "", "Emit to the given directory")
	flag.Parse()

	rootPath := flag.Arg(0)
	compilerOptions := &core.CompilerOptions{Strict: core.TSTrue, Target: core.ScriptTargetESNext, ModuleKind: core.ModuleKindNodeNext, NoEmit: core.TSTrue}
	if noLib {
		compilerOptions.NoLib = core.TSTrue
	}

	currentDirectory, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
		os.Exit(1)
	}

	if len(outDir) > 0 {
		compilerOptions.NoEmit = core.TSFalse
		compilerOptions.OutDir = tspath.ResolvePath(currentDirectory, outDir)
	}

	fs := bundled.WrapFS(vfs.FromOS())
	useCaseSensitiveFileNames := fs.UseCaseSensitiveFileNames()
	host := ts.NewCompilerHost(compilerOptions, currentDirectory, fs)

	normalizedRootPath := tspath.ResolvePath(currentDirectory, rootPath)
	if !fs.DirectoryExists(normalizedRootPath) {
		fmt.Fprintf(os.Stderr, "Error: The directory %v does not exist.\n", normalizedRootPath)
		os.Exit(1)
	}
	compilerOptions.ConfigFilePath = normalizedRootPath // This matters for type reference directive resolution

	programOptions := ts.ProgramOptions{
		RootPath:           normalizedRootPath,
		Options:            compilerOptions,
		SingleThreaded:     singleThreaded,
		Host:               host,
		DefaultLibraryPath: bundled.LibPath(),
	}

	if pprofDir != "" {
		profileSession := beginProfiling(pprofDir)
		defer profileSession.stop()
	}

	startTime := time.Now()
	program := ts.NewProgram(programOptions)
	diagnostics := program.GetSyntacticDiagnostics(nil)
	if len(diagnostics) == 0 {
		if parseAndBindOnly {
			diagnostics = program.GetBindDiagnostics(nil)
		} else {
			if printTypes {
				program.PrintSourceFileWithTypes()
			} else {
				diagnostics = program.GetSemanticDiagnostics(nil)
			}
		}
	}
	compileTime := time.Since(startTime)

	startTime = time.Now()
	if len(outDir) > 0 {
		result := program.Emit(&ts.EmitOptions{})
		diagnostics = append(diagnostics, result.Diagnostics...)
	}
	emitTime := time.Since(startTime)

	var memStats runtime.MemStats
	runtime.GC()
	runtime.GC()
	runtime.ReadMemStats(&memStats)

	if !quiet && len(diagnostics) != 0 {
		comparePathOptions := tspath.ComparePathsOptions{
			CurrentDirectory:          currentDirectory,
			UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
		}
		if pretty {
			formatOpts := ts.DiagnosticsFormattingOptions{
				NewLine:             "\n",
				ComparePathsOptions: comparePathOptions,
			}
			ts.FormatDiagnosticsWithColorAndContext(os.Stdout, diagnostics, &formatOpts)
			fmt.Fprintln(os.Stdout)
			ts.WriteErrorSummaryText(os.Stdout, diagnostics, &formatOpts)
		} else {
			for _, diagnostic := range diagnostics {
				printDiagnostic(diagnostic, 0, comparePathOptions)
			}
		}
	}

	if listFiles {
		for _, file := range program.SourceFiles() {
			fmt.Println(file.FileName())
		}
	}

	fmt.Printf("Files:         %v\n", len(program.SourceFiles()))
	fmt.Printf("Types:         %v\n", program.TypeCount())
	fmt.Printf("Compile time:  %v\n", compileTime)
	fmt.Printf("Emit time:     %v\n", emitTime)
	fmt.Printf("Memory used:   %vK\n", memStats.Alloc/1024)
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
