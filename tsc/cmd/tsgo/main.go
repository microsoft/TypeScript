// tsgo is a test bed for the Go port of TypeScript.
package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	ts "github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

var quiet = false
var singleThreaded = false
var parseAndBindOnly = false
var printTypes = false
var pretty = true

func printDiagnostic(d *ast.Diagnostic, level int) {
	file := d.File()
	if file != nil {
		line, character := scanner.GetLineAndCharacterOfPosition(file, d.Loc().Pos())
		fmt.Printf("%v%v(%v,%v): error TS%v: %v\n", strings.Repeat(" ", level*2), file.FileName(), line+1, character+1, d.Code(), d.Message())
	} else {
		fmt.Printf("%verror TS%v: %v\n", strings.Repeat(" ", level*2), d.Code(), d.Message())
	}
	printMessageChain(d.MessageChain(), level+1)
	for _, r := range d.RelatedInformation() {
		printDiagnostic(r, level+1)
	}
}

func printMessageChain(messageChain []*ast.MessageChain, level int) {
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
	flag.Parse()

	rootPath := flag.Arg(0)
	compilerOptions := &core.CompilerOptions{Strict: core.TSTrue, Target: core.ScriptTargetESNext, ModuleKind: core.ModuleKindNodeNext}
	currentDirectory, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
		os.Exit(1)
	}
	fs := vfs.FromOS()
	useCaseSensitiveFileNames := fs.UseCaseSensitiveFileNames()
	host := ts.NewCompilerHost(compilerOptions, singleThreaded, currentDirectory, fs)

	normalizedRootPath := tspath.ResolvePath(currentDirectory, rootPath)
	if !fs.DirectoryExists(normalizedRootPath) {
		fmt.Fprintf(os.Stderr, "Error: The directory %v does not exist.\n", normalizedRootPath)
		os.Exit(1)
	}

	programOptions := ts.ProgramOptions{RootPath: normalizedRootPath, Options: compilerOptions, SingleThreaded: singleThreaded, Host: host}

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
	var memStats runtime.MemStats
	runtime.GC()
	runtime.GC()
	runtime.ReadMemStats(&memStats)
	if !quiet && len(diagnostics) != 0 {
		if pretty {
			var output strings.Builder
			formatOpts := ts.DiagnosticsFormattingOptions{
				NewLine: "\n",
				ComparePathsOptions: tspath.ComparePathsOptions{
					CurrentDirectory:          currentDirectory,
					UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
				},
			}
			ts.FormatDiagnosticsWithColorAndContext(&output, diagnostics, &formatOpts)
			output.WriteByte('\n')
			ts.WriteErrorSummaryText(&output, diagnostics, &formatOpts)
			fmt.Print(output.String())
		} else {
			for _, diagnostic := range diagnostics {
				printDiagnostic(diagnostic, 0)
			}
		}
	}

	fmt.Printf("Files:         %v\n", len(program.SourceFiles()))
	fmt.Printf("Types:         %v\n", program.TypeCount())
	fmt.Printf("Compile time:  %v\n", compileTime)
	fmt.Printf("Memory used:   %vK\n", memStats.Alloc/1024)
}
