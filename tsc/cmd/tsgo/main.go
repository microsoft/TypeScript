// tsgo is a test bed for the Go port of TypeScript.
package main

import (
	"flag"
	"fmt"
	"runtime"
	"strings"
	"time"

	ts "github.com/microsoft/typescript-go/internal/compiler"
)

var quiet = false
var singleThreaded = false
var parseAndBindOnly = false

func printDiagnostic(d *ts.Diagnostic, level int) {
	file := d.File()
	if file != nil {
		line, character := ts.GetLineAndCharacterOfPosition(file, d.Loc().Pos())
		fmt.Printf("%v%v(%v,%v): error TS%v: %v\n", strings.Repeat(" ", level*2), file.FileName(), line+1, character+1, d.Code(), d.Message())
	} else {
		fmt.Printf("%verror TS%v: %v\n", strings.Repeat(" ", level*2), d.Code(), d.Message())
	}
	for _, r := range d.RelatedInformation() {
		printDiagnostic(r, level+1)
	}
}

func main() {
	flag.BoolVar(&quiet, "q", false, "Quiet output")
	flag.BoolVar(&singleThreaded, "s", false, "Single threaded")
	flag.BoolVar(&parseAndBindOnly, "p", false, "Parse and bind only")
	flag.Parse()
	compilerOptions := &ts.CompilerOptions{Target: ts.ScriptTargetESNext, ModuleKind: ts.ModuleKindNodeNext}
	programOptions := ts.ProgramOptions{RootPath: flag.Arg(0), Options: compilerOptions, SingleThreaded: singleThreaded}
	startTime := time.Now()
	program := ts.NewProgram(programOptions)
	diagnostics := program.GetSyntacticDiagnostics(nil)
	if len(diagnostics) == 0 {
		if parseAndBindOnly {
			diagnostics = program.GetBindDiagnostics(nil)
		} else {
			diagnostics = program.GetSemanticDiagnostics(nil)
		}
	}
	compileTime := time.Since(startTime)
	var memStats runtime.MemStats
	runtime.GC()
	runtime.GC()
	runtime.ReadMemStats(&memStats)
	if !quiet {
		for _, diagnostic := range diagnostics {
			printDiagnostic(diagnostic, 0)
		}
	}
	fmt.Printf("Files:         %v\n", len(program.SourceFiles()))
	fmt.Printf("Compile time:  %v\n", compileTime)
	fmt.Printf("Memory used:   %vK\n", memStats.Alloc/1024)
}
