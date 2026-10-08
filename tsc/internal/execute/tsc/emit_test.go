package tsc

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type cancellingProgram struct {
	compiler.ProgramLike
	cancel context.CancelFunc
	phase  string
	checks int
	emits  int
}

func (p *cancellingProgram) GetGlobalDiagnostics(context.Context) []*ast.Diagnostic {
	return nil
}

func (p *cancellingProgram) GetSemanticDiagnostics(ctx context.Context, _ *ast.SourceFile) []*ast.Diagnostic {
	p.checks++
	if p.phase == "check" {
		p.cancel()
		assertContextCancelled(ctx)
	}
	return nil
}

func assertContextCancelled(ctx context.Context) {
	if ctx.Err() == nil {
		panic("compilation did not pass the cancellation context")
	}
}

func (p *cancellingProgram) Emit(ctx context.Context, _ compiler.EmitOptions) *compiler.EmitResult {
	p.emits++
	if p.phase == "emit" {
		p.cancel()
		assertContextCancelled(ctx)
		return nil
	}
	return &compiler.EmitResult{}
}

func TestEmitStopsOnCancellation(t *testing.T) {
	t.Parallel()
	for _, phase := range []string{"before", "check", "emit"} {
		t.Run(phase, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]any{"/project/a.ts": "export const a = 1;"}, tspath.CaseSensitive)
			config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{NoLib: core.TSTrue, ExtendedDiagnostics: core.TSTrue}, []tspath.RootedFilePath{"/project/a.ts"}, nil, "/project", tspath.CaseSensitive)
			program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
				Config: config,
				Host:   compiler.NewCompilerHost(fs, "/lib", nil, nil, nil),
			})
			assert.NilError(t, err)
			ctx, cancel := context.WithCancel(t.Context())
			defer cancel()
			if phase == "before" {
				cancel()
			}
			cancelling := &cancellingProgram{ProgramLike: program, cancel: cancel, phase: phase}
			var output bytes.Buffer
			reported := false
			result, statistics := EmitAndReportStatistics(ctx, EmitInput{
				Sys:         &timingTestSystem{fs: fs, clock: &controlledClock{now: time.Unix(0, 0)}},
				ProgramLike: cancelling,
				Program:     program,
				Config:      config,
				ReportDiagnostic: func(*ast.Diagnostic) {
					reported = true
				},
				ReportErrorSummary: func([]*ast.Diagnostic) {
					reported = true
				},
				Writer:       &output,
				CompileTimes: &CompileTimes{},
			})
			assert.Equal(t, result.Status, ExitStatusCancelled)
			assert.Assert(t, result.EmitResult.EmitSkipped)
			assert.Assert(t, statistics == nil)
			assert.Assert(t, !reported)
			assert.Equal(t, output.Len(), 0)
			if phase == "emit" {
				assert.Equal(t, cancelling.emits, 1)
			} else {
				assert.Equal(t, cancelling.emits, 0)
			}
		})
	}
}

type cancellingListingWriter struct {
	bytes.Buffer
	cancel      context.CancelFunc
	cancelAfter int
	writes      int
}

func (w *cancellingListingWriter) Write(text []byte) (int, error) {
	n, err := w.Buffer.Write(text)
	w.writes++
	if w.writes == w.cancelAfter {
		w.cancel()
	}
	return n, err
}

func TestExplainFilesStopsOnCancellation(t *testing.T) {
	t.Parallel()
	for _, cancelAfter := range []int{1, 2} {
		t.Run(fmt.Sprintf("writes=%d", cancelAfter), func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]any{
				"/project/a.ts": "export const a = 1;",
				"/project/b.ts": "export const b = 2;",
			}, tspath.CaseSensitive)
			config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
				NoLib:         core.TSTrue,
				ListFilesOnly: core.TSTrue,
				ExplainFiles:  core.TSTrue,
			}, []tspath.RootedFilePath{"/project/a.ts", "/project/b.ts"}, nil, "/project", tspath.CaseSensitive)
			program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
				Config: config,
				Host:   compiler.NewCompilerHost(fs, "/lib", nil, nil, nil),
			})
			assert.NilError(t, err)
			ctx, cancel := context.WithCancel(t.Context())
			defer cancel()
			output := &cancellingListingWriter{cancel: cancel, cancelAfter: cancelAfter}
			reported := false

			result, statistics := EmitAndReportStatistics(ctx, EmitInput{
				Sys:         &timingTestSystem{fs: fs, clock: &controlledClock{now: time.Unix(0, 0)}},
				ProgramLike: program,
				Program:     program,
				Config:      config,
				ReportDiagnostic: func(*ast.Diagnostic) {
					reported = true
				},
				ReportErrorSummary: func([]*ast.Diagnostic) {
					reported = true
				},
				Writer:       output,
				CompileTimes: &CompileTimes{},
			})

			assert.Equal(t, result.Status, ExitStatusCancelled)
			assert.Assert(t, statistics == nil)
			assert.Assert(t, !reported)
			assert.Equal(t, output.writes, cancelAfter)
			assert.Assert(t, strings.HasPrefix(output.String(), "a.ts\n"))
			assert.Assert(t, !strings.Contains(output.String(), "b.ts"))
		})
	}
}

type contentMapperLoggingTestSystem struct {
	*timingTestSystem
	enabled bool
	stderr  bytes.Buffer
}

func (s *contentMapperLoggingTestSystem) GetEnvironmentVariable(name string) (string, bool) {
	if name == "TS_CONTENT_MAPPER_DEBUG" && s.enabled {
		return "1", true
	}
	return "", false
}

func (s *contentMapperLoggingTestSystem) ErrorWriter() io.Writer {
	return &s.stderr
}

func TestContentMapperLoggerEnvironmentVariable(t *testing.T) {
	t.Parallel()
	sys := &contentMapperLoggingTestSystem{timingTestSystem: &timingTestSystem{}}
	assert.Assert(t, newContentMapperLogger(sys) == nil)
	sys.enabled = true
	logger := newContentMapperLogger(sys)
	assert.Assert(t, logger != nil)
	var wg sync.WaitGroup
	for range 10 {
		wg.Go(func() { logger("mapper log") })
	}
	wg.Wait()
	assert.Equal(t, sys.stderr.String(), strings.Repeat("mapper log\n", 10))
}

type controlledClock struct {
	mu                   sync.Mutex
	now                  time.Time
	nestedEmitInProgress bool
	nestedEmitCalls      int
}

type fileClock struct {
	mu  sync.Mutex
	now time.Time
}

func (c *fileClock) Now() time.Time {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.now = c.now.Add(time.Second)
	return c.now
}

func (c *fileClock) SinceStart() time.Duration {
	return 0
}

func (c *controlledClock) Now() time.Time {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.now
}

func (c *controlledClock) NestedEmitNow() time.Time {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.nestedEmitCalls++
	if c.nestedEmitInProgress {
		c.now = c.now.Add(time.Second)
	}
	c.nestedEmitInProgress = !c.nestedEmitInProgress
	return c.now
}

func (c *controlledClock) NestedEmitCalls() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.nestedEmitCalls
}

func (c *controlledClock) SinceStart() time.Duration {
	return 0
}

type timingTestSystem struct {
	fs    vfs.FS
	clock *controlledClock
}

func (s *timingTestSystem) Writer() io.Writer                               { return io.Discard }
func (s *timingTestSystem) ErrorWriter() io.Writer                          { return io.Discard }
func (s *timingTestSystem) FS() vfs.FS                                      { return s.fs }
func (s *timingTestSystem) DefaultLibraryPath() tspath.RootedDirectoryPath  { return "/lib" }
func (s *timingTestSystem) GetCurrentDirectory() tspath.RootedDirectoryPath { return "/project" }
func (s *timingTestSystem) WriteOutputIsTTY() bool                          { return false }
func (s *timingTestSystem) GetWidthOfTerminal() int                         { return 0 }
func (s *timingTestSystem) GetEnvironmentVariable(name string) (string, bool) {
	return "", false
}
func (s *timingTestSystem) Now() time.Time            { return s.clock.Now() }
func (s *timingTestSystem) SinceStart() time.Duration { return s.clock.SinceStart() }

func (s *timingTestSystem) Spawn([]string, string, io.Writer) (io.ReadWriteCloser, error) {
	return nil, errors.New("spawn not implemented in timingTestSystem")
}

func TestIncrementalDeclarationEmitTimeIsExcludedFromCheckTime(t *testing.T) {
	t.Parallel()

	files := map[string]string{
		"/lib/lib.d.ts": `
interface Array<T> {}
interface Boolean {}
interface CallableFunction {}
interface Function {}
interface IArguments {}
interface NewableFunction {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}
`,
		"/project/hub.ts": `
export interface Box {
    value: string;
}
export const make = (): Box => ({ value: "ok" });
`,
		"/project/spoke.ts": `import { make, type Box } from "./hub"; export const value: Box = make();`,
	}
	clock := &controlledClock{now: time.Unix(0, 0)}
	sys := &timingTestSystem{
		fs:    vfstest.FromMapWithClock(files, tspath.CaseSensitive, &fileClock{}),
		clock: clock,
	}
	options := &core.CompilerOptions{
		Declaration:     core.TSTrue,
		Incremental:     core.TSTrue,
		Module:          core.ModuleKindESNext,
		NoEmit:          core.TSTrue,
		TsBuildInfoFile: "/project/tsconfig.tsbuildinfo",
	}
	currentDirectory := tspath.RootedDirectoryPath("/project")
	config := tsoptions.NewParsedCommandLine(options, core.Map([]string{"/lib/lib.d.ts", "/project/hub.ts", "/project/spoke.ts"}, func(fileName string) tspath.RootedFilePath {
		return tspath.ToRootedFilePath(fileName, currentDirectory)
	}), nil, currentDirectory, tspath.CaseSensitive)

	compile := func(oldProgram *incremental.Program) (*incremental.Program, *CompileTimes) {
		host := compiler.NewCachedFSCompilerHost(sys.FS(), sys.DefaultLibraryPath(), nil, nil, nil)
		program, err := compiler.NewProgram(t.Context(), compiler.ProgramOptions{
			Config: config,
			Host:   host,
		})
		assert.NilError(t, err)
		if program.GetSourceFile("/lib/lib.d.ts") == nil {
			t.Fatal("default library was not loaded")
		}
		incrementalProgram := incremental.NewProgram(program, oldProgram, incremental.CreateHost(host), clock.NestedEmitNow, false)
		times := &CompileTimes{}
		EmitFilesAndReportErrors(t.Context(), EmitInput{
			Sys:                sys,
			ProgramLike:        incrementalProgram,
			Program:            program,
			Config:             config,
			ReportDiagnostic:   QuietDiagnosticReporter,
			ReportErrorSummary: QuietDiagnosticsReporter,
			Writer:             io.Discard,
			WriteFile: func(fileName tspath.RootedFilePath, text string, data *compiler.WriteFileData) error {
				return sys.fs.WriteFile(fileName, text)
			},
			CompileTimes: times,
		})
		return incrementalProgram, times
	}
	oldProgram, _ := compile(nil)
	if err := sys.fs.WriteFile("/project/hub.ts", files["/project/hub.ts"]+"\n// comment only change\n"); err != nil {
		t.Fatal(err)
	}
	_, times := compile(oldProgram)

	if times.checkTime != 0 {
		t.Fatalf("check time = %v, want 0", times.checkTime)
	}
	if times.emitTime != 2*time.Second {
		t.Fatalf("emit time = %v, want %v", times.emitTime, 2*time.Second)
	}
	if calls := clock.NestedEmitCalls(); calls != 4 {
		t.Fatalf("nested clock calls = %d, want 4", calls)
	}
}
