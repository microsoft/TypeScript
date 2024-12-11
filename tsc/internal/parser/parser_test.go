package parser

import (
	"io/fs"
	"iter"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/fixtures"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func BenchmarkParse(b *testing.B) {
	for _, f := range fixtures.BenchFixtures {
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

func TestParseTypeScriptRepo(t *testing.T) {
	t.Parallel()
	repo.SkipIfNoTypeScriptSubmodule(t)

	tests := []struct {
		name         string
		ignoreErrors bool
	}{
		{"src", false},
		{"scripts", false},
		{"Herebyfile.mjs", false},
		{"tests/cases", true},
	}

	for _, test := range tests {
		root := filepath.Join(repo.TypeScriptSubmodulePath, test.name)

		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			for f := range allParsableFiles(t, root) {
				t.Run(f.name, func(t *testing.T) {
					t.Parallel()

					// !!! TODO: Fix this bug
					if f.name == "compiler/unicodeEscapesInNames01.ts" {
						t.Skip("times out")
					}

					sourceText, err := os.ReadFile(f.path)
					assert.NilError(t, err)

					var sourceFile *ast.SourceFile

					if strings.HasSuffix(f.name, ".json") {
						sourceFile = ParseJSONText(f.path, string(sourceText))
					} else {
						sourceFile = ParseSourceFile(f.path, string(sourceText), core.ScriptTargetESNext)
					}

					if !test.ignoreErrors {
						assert.Equal(t, len(sourceFile.Diagnostics()), 0)
					}
				})
			}
		})
	}
}

type parsableFile struct {
	path string
	name string
}

func allParsableFiles(tb testing.TB, root string) iter.Seq[parsableFile] {
	tb.Helper()
	return func(yield func(parsableFile) bool) {
		tb.Helper()
		err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}

			if d.IsDir() || tspath.TryGetExtensionFromPath(path) == "" {
				return nil
			}

			testName, err := filepath.Rel(root, path)
			if err != nil {
				return err
			}
			testName = filepath.ToSlash(testName)

			if !yield(parsableFile{path, testName}) {
				return filepath.SkipAll
			}
			return nil
		})
		assert.NilError(tb, err)
	}
}
