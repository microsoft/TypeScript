// tsgo is a test bed for the Go port of TypeScript.
package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"
	"strings"
	"time"
	"unicode"

	ts "github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var quiet = false
var singleThreaded = false
var parseAndBindOnly = false
var printTypes = false
var pretty = true

func printDiagnostic(d *ts.Diagnostic, level int) {
	file := d.File()
	if file != nil {
		line, character := ts.GetLineAndCharacterOfPosition(file, d.Loc().Pos())
		fmt.Printf("%v%v(%v,%v): error TS%v: %v\n", strings.Repeat(" ", level*2), file.FileName(), line+1, character+1, d.Code(), d.Message())
	} else {
		fmt.Printf("%verror TS%v: %v\n", strings.Repeat(" ", level*2), d.Code(), d.Message())
	}
	printMessageChain(d.MessageChain(), level+1)
	for _, r := range d.RelatedInformation() {
		printDiagnostic(r, level+1)
	}
}

func printMessageChain(messageChain []*ts.MessageChain, level int) {
	for _, c := range messageChain {
		fmt.Printf("%v%v\n", strings.Repeat(" ", level*2), c.Message())
		printMessageChain(c.MessageChain(), level+1)
	}
}

func main() {
	flag.BoolVar(&quiet, "q", false, "Quiet output")
	flag.BoolVar(&singleThreaded, "s", false, "Single threaded")
	flag.BoolVar(&parseAndBindOnly, "p", false, "Parse and bind only")
	flag.BoolVar(&printTypes, "t", false, "Print type aliases defined in main.ts")
	flag.BoolVar(&pretty, "pretty", true, "Get prettier errors")
	flag.Parse()

	rootPath := flag.Arg(0)
	compilerOptions := &ts.CompilerOptions{Strict: ts.TSTrue, Target: ts.ScriptTargetESNext, ModuleKind: ts.ModuleKindNodeNext}
	programOptions := ts.ProgramOptions{RootPath: rootPath, Options: compilerOptions, SingleThreaded: singleThreaded}
	useCaseSensitiveFileNames := isFileSystemCaseSensitive()

	startTime := time.Now()
	program := ts.NewProgram(programOptions)
	diagnostics := program.GetSyntacticDiagnostics(nil)
	if len(diagnostics) == 0 {
		if parseAndBindOnly {
			diagnostics = program.GetBindDiagnostics(nil)
		} else {
			if printTypes {
				program.PrintTypeAliases()
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
			currentDirectory, err := os.Getwd()
			if err != nil {
				panic("no current directory")
			}

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

func isFileSystemCaseSensitive() bool {
	// win32/win64 are case insensitive platforms
	if runtime.GOOS == "windows" {
		return false
	}

	// If the current executable exists under a different case, we must be case-insensitve.
	if _, err := os.Stat(swapCase(os.Args[0])); os.IsNotExist(err) {
		return false
	}
	return true
}

// Convert all lowercase chars to uppercase, and vice-versa
func swapCase(str string) string {
	return strings.Map(func(r rune) rune {
		upper := unicode.ToUpper(r)
		if upper == r {
			return unicode.ToLower(r)
		} else {
			return upper
		}
	}, str)
}
