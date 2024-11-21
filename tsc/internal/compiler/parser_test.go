package compiler

import (
	"io/fs"
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func BenchmarkParse(b *testing.B) {
	for _, f := range benchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := f.Path()
			sourceText := f.ReadFile(b)

			for i := 0; i < b.N; i++ {
				ParseSourceFile(fileName, sourceText, core.ScriptTargetESNext)
			}
		})
	}
}

func TestParseTypeScriptSrc(t *testing.T) {
	t.Parallel()

	srcDir := filepath.Join(repo.TypeScriptSubmodulePath, "src")

	if _, err := os.Stat(srcDir); os.IsNotExist(err) {
		t.Skipf("TypeScript submodule not found at %s", srcDir)
	}

	err := filepath.WalkDir(srcDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() || tspath.TryExtractTSExtension(path) == "" {
			return nil
		}

		testName, err := filepath.Rel(srcDir, path)
		assert.NilError(t, err)
		testName = filepath.ToSlash(testName)

		t.Run(testName, func(t *testing.T) {
			t.Parallel()

			sourceText, err := os.ReadFile(path)
			assert.NilError(t, err)

			sourceFile := ParseSourceFile(path, string(sourceText), core.ScriptTargetESNext)
			assert.Equal(t, len(sourceFile.Diagnostics()), 0)
		})

		return nil
	})
	assert.NilError(t, err)
}
