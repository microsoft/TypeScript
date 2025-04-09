package execute

import (
	"fmt"
	"time"

	"github.com/microsoft/typescript-go/internal/compiler"
)

func start(w *watcher) ExitStatus {
	if w.configFileName == "" {
		w.host = compiler.NewCompilerHost(w.options.CompilerOptions(), w.sys.GetCurrentDirectory(), w.sys.FS(), w.sys.DefaultLibraryPath())
	}
	watchInterval := 1000 * time.Millisecond
	if w.options.ParsedConfig.WatchOptions != nil {
		watchInterval = time.Duration(*w.options.ParsedConfig.WatchOptions.Interval) * time.Millisecond
	}
	for {
		w.doCycle()
		time.Sleep(watchInterval)
	}
}

func (w *watcher) doCycle() {
	if w.hasErrorsInTsConfig() {
		// these are unrecoverable errors--report them and do not build
		return
	}
	// updateProgram()
	w.program = compiler.NewProgramFromParsedCommandLine(w.options, w.host)
	if w.hasBeenModified(w.program) {
		fmt.Fprint(w.sys.Writer(), "build starting at ", w.sys.Now(), w.sys.NewLine())
		timeStart := w.sys.Now()
		w.compileAndEmit()
		fmt.Fprint(w.sys.Writer(), "build finished in ", w.sys.Now().Sub(timeStart), w.sys.NewLine())
	} else {
		// print something???
		// fmt.Fprint(w.sys.Writer(), "no changes detected at ", w.sys.Now(), w.sys.NewLine())
	}
}
