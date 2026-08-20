package tsc

import (
	"context"
	"fmt"
	"io"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/pnp"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type System interface {
	Writer() io.Writer
	ErrorWriter() io.Writer
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	WriteOutputIsTTY() bool
	GetWidthOfTerminal() int
	GetEnvironmentVariable(name string) string
	Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error)

	PnpApi() *pnp.PnpApi

	Now() time.Time
	SinceStart() time.Duration
}

func newContentMapperLogger(sys System) contentmapper.Logger {
	if sys.GetEnvironmentVariable("TS_CONTENT_MAPPER_DEBUG") == "" {
		return nil
	}
	writer := sys.ErrorWriter()
	var mu sync.Mutex
	return func(message string) {
		mu.Lock()
		defer mu.Unlock()
		fmt.Fprintln(writer, message)
	}
}

type ExitStatus int

const (
	ExitStatusSuccess                              ExitStatus = 0
	ExitStatusDiagnosticsPresent_OutputsSkipped    ExitStatus = 1
	ExitStatusDiagnosticsPresent_OutputsGenerated  ExitStatus = 2
	ExitStatusInvalidProject_OutputsSkipped        ExitStatus = 3
	ExitStatusProjectReferenceCycle_OutputsSkipped ExitStatus = 4
	ExitStatusNotImplemented                       ExitStatus = 5
)

type Watcher interface {
	DoCycle()
}

type CommandLineResult struct {
	Status  ExitStatus
	Watcher Watcher
}

type CommandLineTesting interface {
	// Ensure that all emitted files are timestamped in order to ensure they are deterministic for test baseline
	OnEmittedFiles(result *compiler.EmitResult, mTimesCache *collections.SyncMap[tspath.Path, time.Time])
	OnListFilesStart(w io.Writer)
	OnListFilesEnd(w io.Writer)
	OnStatisticsStart(w io.Writer)
	OnStatisticsEnd(w io.Writer)
	OnBuildStatusReportStart(w io.Writer)
	OnBuildStatusReportEnd(w io.Writer)
	OnWatchStatusReportStart()
	OnWatchStatusReportEnd()
	GetTrace(w io.Writer, locale locale.Locale) func(msg *diagnostics.Message, args ...any)
	OnProgram(program *incremental.Program)
}

// NewContentMapperHost creates a content mapper host when content mappers are enabled via the
// --runExternalCode flag, spawning mapper processes through the system's Spawn. It returns
// nil otherwise, in which case no content-mapped files can be loaded. The caller owns the host and must
// Close it when the compilation session ends.
func NewContentMapperHost(ctx context.Context, sys System, options *core.CompilerOptions) contentmapper.Host {
	if !options.RunExternalCode.IsTrue() {
		return nil
	}
	diagnosticLocale, _ := locale.Parse(options.Locale)
	return contentmapper.NewHostWithOptions(ctx, sys, diagnosticLocale, contentmapper.HostOptions{
		Logger: newContentMapperLogger(sys),
	})
}

type CompileTimes struct {
	ConfigTime         time.Duration
	ParseTime          time.Duration
	ContentMapperTimes contentmapper.Timings
	bindTime           time.Duration
	checkTime          time.Duration
	totalTime          time.Duration
	emitTime           time.Duration
	BuildInfoReadTime  time.Duration
	ChangesComputeTime time.Duration
}
type CompileAndEmitResult struct {
	Diagnostics []*ast.Diagnostic
	EmitResult  *compiler.EmitResult
	Status      ExitStatus
	times       *CompileTimes
}
