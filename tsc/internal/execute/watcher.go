package execute

import (
	"fmt"
	"reflect"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/incremental"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type Watcher struct {
	sys              System
	configFileName   string
	options          *tsoptions.ParsedCommandLine
	reportDiagnostic diagnosticReporter
	testing          bool

	host           compiler.CompilerHost
	program        *incremental.Program
	prevModified   map[string]time.Time
	configModified bool
}

func createWatcher(sys System, configParseResult *tsoptions.ParsedCommandLine, reportDiagnostic diagnosticReporter, testing bool) *Watcher {
	w := &Watcher{
		sys:              sys,
		options:          configParseResult,
		reportDiagnostic: reportDiagnostic,
		testing:          testing,
		// reportWatchStatus: createWatchStatusReporter(sys, configParseResult.CompilerOptions().Pretty),
	}
	if configParseResult.ConfigFile != nil {
		w.configFileName = configParseResult.ConfigFile.SourceFile.FileName()
	}
	return w
}

func (w *Watcher) start() {
	w.host = compiler.NewCompilerHost(w.sys.GetCurrentDirectory(), w.sys.FS(), w.sys.DefaultLibraryPath(), nil)
	w.program = incremental.ReadBuildInfoProgram(w.options, incremental.NewBuildInfoReader(w.host))

	if !w.testing {
		watchInterval := 1000 * time.Millisecond
		if w.options.ParsedConfig.WatchOptions != nil {
			watchInterval = time.Duration(*w.options.ParsedConfig.WatchOptions.Interval) * time.Millisecond
		}
		for {
			w.DoCycle()
			time.Sleep(watchInterval)
		}
	} else {
		// Initial compilation in test mode
		w.DoCycle()
	}
}

func (w *Watcher) DoCycle() {
	// if this function is updated, make sure to update `RunWatchCycle` in export_test.go as needed

	if w.hasErrorsInTsConfig() {
		// these are unrecoverable errors--report them and do not build
		return
	}
	// updateProgram()
	w.program = incremental.NewProgram(compiler.NewProgram(compiler.ProgramOptions{
		Config:           w.options,
		Host:             w.host,
		JSDocParsingMode: ast.JSDocParsingModeParseForTypeErrors,
	}), w.program, w.testing)

	if w.hasBeenModified(w.program.GetProgram()) {
		fmt.Fprintln(w.sys.Writer(), "build starting at ", w.sys.Now())
		timeStart := w.sys.Now()
		w.compileAndEmit()
		fmt.Fprintln(w.sys.Writer(), "build finished in ", w.sys.Now().Sub(timeStart))
	} else {
		// print something???
		// fmt.Fprintln(w.sys.Writer(), "no changes detected at ", w.sys.Now())
	}
}

func (w *Watcher) compileAndEmit() {
	// !!! output/error reporting is currently the same as non-watch mode
	// diagnostics, emitResult, exitStatus :=
	emitFilesAndReportErrors(w.sys, w.program, w.reportDiagnostic)
}

func (w *Watcher) hasErrorsInTsConfig() bool {
	// only need to check and reparse tsconfig options/update host if we are watching a config file
	if w.configFileName != "" {
		extendedConfigCache := collections.SyncMap[tspath.Path, *tsoptions.ExtendedConfigCacheEntry]{}
		// !!! need to check that this merges compileroptions correctly. This differs from non-watch, since we allow overriding of previous options
		configParseResult, errors := tsoptions.GetParsedCommandLineOfConfigFile(w.configFileName, &core.CompilerOptions{}, w.sys, &extendedConfigCache)
		if len(errors) > 0 {
			for _, e := range errors {
				w.reportDiagnostic(e)
			}
			return true
		}
		// CompilerOptions contain fields which should not be compared; clone to get a copy without those set.
		if !reflect.DeepEqual(w.options.CompilerOptions().Clone(), configParseResult.CompilerOptions().Clone()) {
			// fmt.Fprintln(w.sys.Writer(), "build triggered due to config change")
			w.configModified = true
		}
		w.options = configParseResult
		w.host = compiler.NewCompilerHost(w.sys.GetCurrentDirectory(), w.sys.FS(), w.sys.DefaultLibraryPath(), &extendedConfigCache)
	}
	return false
}

func (w *Watcher) hasBeenModified(program *compiler.Program) bool {
	// checks watcher's snapshot against program file modified times
	currState := map[string]time.Time{}
	filesModified := w.configModified
	for _, sourceFile := range program.SourceFiles() {
		fileName := sourceFile.FileName()
		s := w.sys.FS().Stat(fileName)
		if s == nil {
			// do nothing; if file is in program.SourceFiles() but is not found when calling Stat, file has been very recently deleted.
			// deleted files are handled outside of this loop
			continue
		}
		currState[fileName] = s.ModTime()
		if !filesModified {
			if currState[fileName] != w.prevModified[fileName] {
				// fmt.Fprint(w.sys.Writer(), "build triggered from ", fileName, ": ", w.prevModified[fileName], " -> ", currState[fileName], "\n")
				filesModified = true
			}
			// catch cases where no files are modified, but some were deleted
			delete(w.prevModified, fileName)
		}
	}
	if !filesModified && len(w.prevModified) > 0 {
		// fmt.Fprintln(w.sys.Writer(), "build triggered due to deleted file")
		filesModified = true
	}
	w.prevModified = currState

	// reset state for next cycle
	w.configModified = false
	return filesModified
}

func (w *Watcher) GetProgram() *incremental.Program {
	return w.program
}
