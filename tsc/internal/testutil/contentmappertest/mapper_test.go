package contentmappertest_test

import (
	"context"
	"io"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"gotest.tools/v3/assert"
)

// helperEnv, when set, makes the test binary act as the mapper subprocess instead of running tests. This
// lets the out-of-process test spawn a real subprocess (itself) that speaks the mapper protocol over
// stdio, exercising the same handler code that the in-process spawner runs over a pipe.
const helperEnv = "TSGO_CONTENT_MAPPER_HELPER"

func TestMain(m *testing.M) {
	if os.Getenv(helperEnv) == "1" {
		_ = contentmappertest.Serve(context.Background(), stdio{})
		os.Exit(0)
	}
	os.Exit(m.Run())
}

// stdio adapts the process's stdin/stdout to an io.ReadWriteCloser for the mapper server.
type stdio struct{}

func (stdio) Read(p []byte) (int, error)  { return os.Stdin.Read(p) }
func (stdio) Write(p []byte) (int, error) { return os.Stdout.Write(p) }
func (stdio) Close() error                { return nil }

func testMapper() *contentmapper.Mapper {
	return &contentmapper.Mapper{
		Definition: contentmapper.Definition{
			Package:    contentmappertest.PackageName,
			Extensions: []string{".box"},
		},
		Manifest: contentmapper.Manifest{
			Name:            contentmappertest.PackageName,
			Version:         "1.0.0",
			Exec:            []string{contentmappertest.TransformingMapper},
			CompilerOptions: contentmappertest.DeclaredOptions,
		},
		PackageDirectory: "/node_modules/" + contentmappertest.PackageName,
	}
}

func transformRequest() contentmapper.Request {
	return contentmapper.Request{
		FileName: "/app.box",
		Content:  "export const version = #{target};\n",
	}
}

// TestOutOfProcess exercises the real out-of-process IPC path: it spawns the test binary as a mapper
// subprocess and drives it over stdio through the production content mapper host.
func TestOutOfProcess(t *testing.T) {
	t.Parallel()
	host := contentmapper.NewHost(t.Context(), execSpawner{}, locale.Default)
	defer host.Close()
	mapper := testMapper()
	request := transformRequest()
	compilerOptions := &core.CompilerOptions{Target: core.ScriptTargetES2020}
	project := host.Project(contentmapper.ProjectSpec{
		ConfigFileName:  "/tsconfig.json",
		Mappers:         []*contentmapper.Mapper{mapper},
		CompilerOptions: compilerOptions,
	})
	defer project.Close()

	result, err := project.Transform(mapper, request)
	assert.NilError(t, err)
	assert.Assert(t, strings.Contains(result.Text, "export const version = 7;"), "got %q", result.Text)
	assert.Assert(t, result.Mappings != nil)
}

// execSpawner spawns the test binary itself as the mapper subprocess (guarded by helperEnv), so the test
// talks to a genuinely separate process over real pipes.
type execSpawner struct{}

func (execSpawner) Spawn(command []string, dir string, stderr io.Writer) (io.ReadWriteCloser, error) {
	cmd := exec.Command(os.Args[0])
	cmd.Env = append(os.Environ(), helperEnv+"=1")
	cmd.Stderr = stderr
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return nil, err
	}
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, err
	}
	if err := cmd.Start(); err != nil {
		return nil, err
	}
	return &process{cmd: cmd, stdin: stdin, stdout: stdout}, nil
}

// process adapts a spawned subprocess's stdio to an io.ReadWriteCloser: reads come from its stdout, writes
// go to its stdin, and Close tears the process down.
type process struct {
	cmd    *exec.Cmd
	stdin  io.WriteCloser
	stdout io.ReadCloser
}

func (p *process) Read(b []byte) (int, error)  { return p.stdout.Read(b) }
func (p *process) Write(b []byte) (int, error) { return p.stdin.Write(b) }

func (p *process) Close() error {
	_ = p.stdin.Close()
	_ = p.cmd.Process.Kill()
	_ = p.cmd.Wait()
	return nil
}
