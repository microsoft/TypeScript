package parser

import (
	"io/fs"
	"iter"
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/fixtures"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func BenchmarkParse(b *testing.B) {
	jsdocModes := []struct {
		name string
		mode ast.JSDocParsingMode
	}{
		{"tsc", ast.JSDocParsingModeParseForTypeErrors},
		{"server", ast.JSDocParsingModeParseAll},
	}

	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := tspath.GetNormalizedAbsolutePath(f.Path(), "/")
			path := tspath.ToPath(fileName, "/", osvfs.FS().UseCaseSensitiveFileNames())
			sourceText := f.ReadFile(b)
			scriptKind := core.GetScriptKindFromFileName(fileName)

			for _, jsdoc := range jsdocModes {
				b.Run(jsdoc.name, func(b *testing.B) {
					jsdocMode := jsdoc.mode

					opts := ast.SourceFileParseOptions{
						FileName:         fileName,
						Path:             path,
						JSDocParsingMode: jsdocMode,
					}

					for b.Loop() {
						ParseSourceFile(opts, sourceText, scriptKind)
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

	var extensions collections.Set[string]
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
			f.Add(extension, string(sourceText), int32(core.ScriptTargetESNext), uint8(ast.JSDocParsingModeParseAll))
		}
	}

	f.Fuzz(func(t *testing.T, extension string, sourceText string, scriptTarget_ int32, jsdocParsingMode_ uint8) {
		scriptTarget := core.ScriptTarget(scriptTarget_)
		jsdocParsingMode := ast.JSDocParsingMode(jsdocParsingMode_)

		if !extensions.Has(extension) {
			t.Skip()
		}

		if scriptTarget < core.ScriptTargetNone || scriptTarget > core.ScriptTargetLatest {
			t.Skip()
		}

		if jsdocParsingMode < ast.JSDocParsingModeParseAll || jsdocParsingMode > ast.JSDocParsingModeParseNone {
			t.Skip()
		}

		fileName := "/index" + extension
		path := tspath.Path(fileName)

		opts := ast.SourceFileParseOptions{
			FileName:         fileName,
			Path:             path,
			JSDocParsingMode: jsdocParsingMode,
		}

		ParseSourceFile(opts, sourceText, core.GetScriptKindFromFileName(fileName))
	})
}
