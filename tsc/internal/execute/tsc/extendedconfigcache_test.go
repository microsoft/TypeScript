package tsc_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/execute/tsc"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type testParseConfigHost struct {
	fs  vfs.FS
	cwd string
}

func (h *testParseConfigHost) FS() vfs.FS                  { return h.fs }
func (h *testParseConfigHost) GetCurrentDirectory() string { return h.cwd }

func TestExtendedConfigCacheExtendsCircularity(t *testing.T) {
	t.Parallel()

	t.Run("self-referencing extends", func(t *testing.T) {
		t.Parallel()

		// Regression test: a tsconfig extends cycle should produce an error,
		// not a deadlock when using the tsc ExtendedConfigCache.
		files := map[string]any{
			"/project/tsconfig.json": `{"extends": "./base.json"}`,
			"/project/base.json":     `{"extends": "./base.json"}`,
			"/project/main.ts":       `// Hello World!`,
		}

		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		host := &testParseConfigHost{fs: fs, cwd: "/project"}
		cache := &tsc.ExtendedConfigCache{}

		cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, host, cache)
		if cmd == nil {
			t.Fatal("expected non-nil ParsedCommandLine")
		}
		assertHasCircularityDiagnostic(t, cmd)
	})

	t.Run("mutual extends cycle", func(t *testing.T) {
		t.Parallel()

		// Two config files that extend each other.
		files := map[string]any{
			"/project/tsconfig.json": `{"extends": "./other.json"}`,
			"/project/other.json":    `{"extends": "./tsconfig.json"}`,
			"/project/main.ts":       `// Hello World!`,
		}

		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		host := &testParseConfigHost{fs: fs, cwd: "/project"}
		cache := &tsc.ExtendedConfigCache{}

		cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, host, cache)
		if cmd == nil {
			t.Fatal("expected non-nil ParsedCommandLine")
		}
		assertHasCircularityDiagnostic(t, cmd)
	})

	t.Run("case-insensitive self-referencing extends", func(t *testing.T) {
		t.Parallel()

		// On a case-insensitive FS, ./Base.json and ./base.json resolve to the same
		// cache entry. The cycle check must use canonical paths to avoid deadlock.
		files := map[string]any{
			"/project/tsconfig.json": `{"extends": "./Base.json"}`,
			"/project/base.json":     `{"extends": "./base.json"}`,
			"/project/main.ts":       `// Hello World!`,
		}

		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		host := &testParseConfigHost{fs: fs, cwd: "/project"}
		cache := &tsc.ExtendedConfigCache{}

		cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, host, cache)
		if cmd == nil {
			t.Fatal("expected non-nil ParsedCommandLine")
		}
		assertHasCircularityDiagnostic(t, cmd)
	})
}

func TestExtendedConfigCacheNullExtendsDoesNotPanic(t *testing.T) {
	t.Parallel()

	files := map[string]any{
		"/project/tsconfig.json": `{"extends": null}`,
		"/project/main.ts":       `// Hello World!`,
	}

	fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
	host := &testParseConfigHost{fs: fs, cwd: "/project"}
	cache := &tsc.ExtendedConfigCache{}

	cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, host, cache)
	if cmd == nil {
		t.Fatal("expected non-nil ParsedCommandLine")
	}
	if len(cmd.Errors) == 0 {
		t.Fatal("expected diagnostics for invalid null extends")
	}
}

func assertHasCircularityDiagnostic(t *testing.T, cmd *tsoptions.ParsedCommandLine) {
	t.Helper()
	for _, d := range cmd.Errors {
		if d != nil && d.Code() == 18000 {
			return
		}
	}
	t.Error("expected circularity diagnostic (code 18000), but none was found")
}
