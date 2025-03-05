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
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/testutil/fixtures"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func BenchmarkParse(b *testing.B) {
	jsdocModes := []struct {
		name string
		mode scanner.JSDocParsingMode
	}{
		{"tsc", scanner.JSDocParsingModeParseForTypeErrors},
		{"server", scanner.JSDocParsingModeParseAll},
	}

	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := tspath.GetNormalizedAbsolutePath(f.Path(), "/")
			path := tspath.ToPath(fileName, "/", osvfs.FS().UseCaseSensitiveFileNames())
			sourceText := f.ReadFile(b)

			for _, jsdoc := range jsdocModes {
				b.Run(jsdoc.name, func(b *testing.B) {
					jsdocMode := jsdoc.mode
					for b.Loop() {
						ParseSourceFile(fileName, path, sourceText, core.ScriptTargetESNext, jsdocMode)
					}
				})
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

					sourceText, err := os.ReadFile(f.path)
					assert.NilError(t, err)

					fileName := tspath.GetNormalizedAbsolutePath(f.path, repo.TypeScriptSubmodulePath)
					path := tspath.ToPath(f.path, repo.TypeScriptSubmodulePath, osvfs.FS().UseCaseSensitiveFileNames())

					var sourceFile *ast.SourceFile

					if strings.HasSuffix(f.name, ".json") {
						sourceFile = ParseJSONText(fileName, path, string(sourceText))
					} else {
						sourceFile = ParseSourceFile(fileName, path, string(sourceText), core.ScriptTargetESNext, scanner.JSDocParsingModeParseAll)
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

func FuzzParser(f *testing.F) {
	repo.SkipIfNoTypeScriptSubmodule(f)

	tests := []string{
		"src",
		"scripts",
		"Herebyfile.mjs",
		// "tests/cases",
	}

	var extensions core.Set[string]
	for _, es := range tspath.AllSupportedExtensionsWithJson {
		for _, e := range es {
			extensions.Add(e)
		}
	}

	for _, test := range tests {
		root := filepath.Join(repo.TypeScriptSubmodulePath, test)

		for file := range allParsableFiles(f, root) {
			sourceText, err := os.ReadFile(file.path)
			assert.NilError(f, err)
			extension := tspath.TryGetExtensionFromPath(file.path)
			f.Add(extension, string(sourceText), int(core.ScriptTargetESNext), int(scanner.JSDocParsingModeParseAll))
		}
	}

	f.Fuzz(func(t *testing.T, extension string, sourceText string, scriptTarget_ int, jsdocParsingMode_ int) {
		scriptTarget := core.ScriptTarget(scriptTarget_)
		jsdocParsingMode := scanner.JSDocParsingMode(jsdocParsingMode_)

		if !extensions.Has(extension) {
			t.Skip()
		}

		if scriptTarget < core.ScriptTargetNone || scriptTarget > core.ScriptTargetLatest {
			t.Skip()
		}

		if jsdocParsingMode < scanner.JSDocParsingModeParseAll || jsdocParsingMode > scanner.JSDocParsingModeParseNone {
			t.Skip()
		}

		fileName := "/index" + extension
		path := tspath.Path(fileName)

		if extension == ".json" {
			ParseJSONText(fileName, path, sourceText)
			return
		}

		ParseSourceFile(fileName, path, sourceText, scriptTarget, jsdocParsingMode)
	})
}
