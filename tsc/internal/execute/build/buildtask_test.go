package build

import (
	"context"
	"slices"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"gotest.tools/v3/assert"
)

type timestampTestSystem struct{ tsc.System }

func (*timestampTestSystem) Now() time.Time { return time.Unix(1, 0) }

type cancellingTimestampFS struct {
	vfs.FS
	cancel context.CancelFunc
	files  []tspath.RootedPath
}

func (fs *cancellingTimestampFS) Chtimes(path tspath.RootedPath, _, _ time.Time) error {
	fs.files = append(fs.files, path)
	fs.cancel()
	return nil
}

func TestTimestampUpdatesStopOnCancellation(t *testing.T) {
	t.Parallel()
	for _, before := range []bool{false, true} {
		t.Run(core.IfElse(before, "before", "during"), func(t *testing.T) {
			t.Parallel()
			ctx, cancel := context.WithCancel(t.Context())
			defer cancel()
			fs := &cancellingTimestampFS{cancel: cancel}
			options := &core.CompilerOptions{Build: core.TSTrue, Declaration: core.TSTrue, ConfigFilePath: "/src/tsconfig.json"}
			task := &BuildTask{
				resolved: tsoptions.NewParsedCommandLine(options, []tspath.RootedFilePath{"/src/a.ts", "/src/b.ts"}, nil, "/src", tspath.CaseSensitive),
				result:   &taskResult{},
			}
			orchestrator := &Orchestrator{
				opts: Options{
					Sys:     &timestampTestSystem{},
					Command: &tsoptions.ParsedBuildCommandLine{CompilerOptions: options, BuildOptions: &core.BuildOptions{}},
				},
				host: &host{host: compiler.NewCompilerHost(fs, "/lib", nil, nil, nil)},
			}
			if before {
				cancel()
			}

			task.updateTimeStamps(ctx, orchestrator, nil, diagnostics.Updating_output_timestamps_of_project_0)

			assert.Equal(t, ctx.Err(), context.Canceled)
			assert.Equal(t, len(fs.files), core.IfElse(before, 0, 1))
			assert.Assert(t, !slices.Contains(fs.files, "/src/tsconfig.tsbuildinfo"))
		})
	}
}
