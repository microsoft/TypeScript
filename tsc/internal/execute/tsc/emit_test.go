package tsc

import (
	"io"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute/incremental"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

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

func (s *timingTestSystem) Writer() io.Writer                         { return io.Discard }
func (s *timingTestSystem) FS() vfs.FS                                { return s.fs }
func (s *timingTestSystem) DefaultLibraryPath() string                { return "/lib" }
func (s *timingTestSystem) GetCurrentDirectory() string               { return "/project" }
func (s *timingTestSystem) WriteOutputIsTTY() bool                    { return false }
func (s *timingTestSystem) GetWidthOfTerminal() int                   { return 0 }
func (s *timingTestSystem) GetEnvironmentVariable(name string) string { return "" }
func (s *timingTestSystem) Now() time.Time                            { return s.clock.Now() }
func (s *timingTestSystem) SinceStart() time.Duration                 { return s.clock.SinceStart() }

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
		fs:    vfstest.FromMapWithClock(files, true, &fileClock{}),
		clock: clock,
	}
	options := &core.CompilerOptions{
		Declaration:     core.TSTrue,
		Incremental:     core.TSTrue,
		Module:          core.ModuleKindESNext,
		NoEmit:          core.TSTrue,
		TsBuildInfoFile: "/project/tsconfig.tsbuildinfo",
	}
	config := tsoptions.NewParsedCommandLine(options, []string{"/lib/lib.d.ts", "/project/hub.ts", "/project/spoke.ts"}, tspath.ComparePathsOptions{
		UseCaseSensitiveFileNames: true,
		CurrentDirectory:          "/project",
	})

	compile := func(oldProgram *incremental.Program) (*incremental.Program, *CompileTimes) {
		host := compiler.NewCachedFSCompilerHost(sys.GetCurrentDirectory(), sys.FS(), sys.DefaultLibraryPath(), nil, nil)
		program := compiler.NewProgram(compiler.ProgramOptions{
			Config: config,
			Host:   host,
		})
		if program.GetSourceFile("/lib/lib.d.ts") == nil {
			t.Fatal("default library was not loaded")
		}
		incrementalProgram := incremental.NewProgram(program, oldProgram, incremental.CreateHost(host), clock.NestedEmitNow, false)
		times := &CompileTimes{}
		EmitFilesAndReportErrors(EmitInput{
			Sys:                sys,
			ProgramLike:        incrementalProgram,
			Program:            program,
			Config:             config,
			ReportDiagnostic:   QuietDiagnosticReporter,
			ReportErrorSummary: QuietDiagnosticsReporter,
			Writer:             io.Discard,
			WriteFile: func(fileName string, text string, data *compiler.WriteFileData) error {
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
