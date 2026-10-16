package tsc_test

import (
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/wrapvfs"
)

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

		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := &tsc.ExtendedConfigCache{}

		cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, fs, cache)
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

		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := &tsc.ExtendedConfigCache{}

		cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, fs, cache)
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

		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := &tsc.ExtendedConfigCache{}

		cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, fs, cache)
		if cmd == nil {
			t.Fatal("expected non-nil ParsedCommandLine")
		}
		assertHasCircularityDiagnostic(t, cmd)
	})
}

func TestExtendedConfigCacheConcurrentExtendsCircularity(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]any{
		"/cycle/tsconfig.json": `{"extends": "./a.json"}`,
		"/cycle/a.json":        `{"extends": "./b.json"}`,
		"/cycle/b.json":        `{"extends": "./tsconfig.json"}`,
		"/p1/tsconfig.json":    `{"extends": "../cycle/a.json"}`,
		"/p1/main.ts":          `export const x = 1;`,
		"/p2/tsconfig.json":    `{"extends": "../cycle/b.json"}`,
		"/p2/main.ts":          `export const x = 2;`,
	}, tspath.CaseInsensitive)
	var firstA, firstB sync.Once
	var reads sync.WaitGroup
	reads.Add(2)
	configFS := wrapvfs.Wrap(fs, wrapvfs.Replacements{
		ReadFile: func(path tspath.RootedFilePath) (string, bool) {
			// Ensure both cache misses begin parsing before either follows its extends.
			var first *sync.Once
			switch path {
			case "/cycle/a.json":
				first = &firstA
			case "/cycle/b.json":
				first = &firstB
			}
			if first != nil {
				first.Do(func() {
					reads.Done()
					reads.Wait()
				})
			}
			return fs.ReadFile(path)
		},
	})
	cache := &tsc.ExtendedConfigCache{}
	results := make(chan *tsoptions.ParsedCommandLine, 2)
	for _, path := range []tspath.RootedFilePath{"/p1/tsconfig.json", "/p2/tsconfig.json"} {
		go func() {
			cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile(path, nil, nil, configFS, cache)
			results <- cmd
		}()
	}
	for range 2 {
		cmd := <-results
		if cmd == nil {
			t.Fatal("expected non-nil ParsedCommandLine")
		}
		assertHasCircularityDiagnostic(t, cmd)
	}
}

func TestExtendedConfigCacheNullExtendsDoesNotPanic(t *testing.T) {
	t.Parallel()

	files := map[string]any{
		"/project/tsconfig.json": `{"extends": null}`,
		"/project/main.ts":       `// Hello World!`,
	}

	fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
	cache := &tsc.ExtendedConfigCache{}

	cmd, _ := tsoptions.GetParsedCommandLineOfConfigFile("/project/tsconfig.json", nil, nil, fs, cache)
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
