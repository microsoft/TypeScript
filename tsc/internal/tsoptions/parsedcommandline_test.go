package tsoptions_test

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions/tsoptionstest"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestParsedCommandLine(t *testing.T) {
	t.Parallel()
	t.Run("PossiblyMatchesFileName", func(t *testing.T) {
		t.Parallel()

		noFiles := map[string]string{}
		noFilesFS := vfstest.FromMap(noFiles, tspath.CaseSensitive)

		files := map[string]string{
			"/dev/a.ts":         "",
			"/dev/a.d.ts":       "",
			"/dev/a.js":         "",
			"/dev/b.ts":         "",
			"/dev/b.js":         "",
			"/dev/c.d.ts":       "",
			"/dev/z/a.ts":       "",
			"/dev/z/abz.ts":     "",
			"/dev/z/aba.ts":     "",
			"/dev/z/b.ts":       "",
			"/dev/z/bbz.ts":     "",
			"/dev/z/bba.ts":     "",
			"/dev/x/a.ts":       "",
			"/dev/x/aa.ts":      "",
			"/dev/x/b.ts":       "",
			"/dev/x/y/a.ts":     "",
			"/dev/x/y/b.ts":     "",
			"/dev/js/a.js":      "",
			"/dev/js/b.js":      "",
			"/dev/js/d.min.js":  "",
			"/dev/js/ab.min.js": "",
			"/ext/ext.ts":       "",
			"/ext/b/a..b.ts":    "",
		}

		assertMatches := func(t *testing.T, parsedCommandLine *tsoptions.ParsedCommandLine, files map[string]string, matches []string) {
			t.Helper()
			for fileName := range files {
				actual := parsedCommandLine.PossiblyMatchesFileName(tspath.ToRootedFilePath(fileName, parsedCommandLine.BaseDirectory()))
				expected := slices.Contains(matches, fileName)
				assert.Equal(t, actual, expected, "fileName: %s", fileName)
			}
			for _, fileName := range matches {
				if _, ok := files[fileName]; !ok {
					actual := parsedCommandLine.PossiblyMatchesFileName(tspath.ToRootedFilePath(fileName, parsedCommandLine.BaseDirectory()))
					assert.Equal(t, actual, true, "fileName: %s", fileName)
				}
			}
		}

		t.Run("with literal file list", func(t *testing.T) {
			t.Parallel()
			t.Run("without exclude", func(t *testing.T) {
				t.Parallel()
				parsedCommandLine := tsoptionstest.GetParsedCommandLine(
					t,
					`{
						"files": [
							"a.ts",
							"b.ts"
						]
					}`,
					files,
					"/dev",
					/*caseSensitivity*/ tspath.CaseSensitive,
				)

				assertMatches(t, parsedCommandLine, files, []string{
					"/dev/a.ts",
					"/dev/b.ts",
				})
			})

			t.Run("are not removed due to excludes", func(t *testing.T) {
				t.Parallel()
				parsedCommandLine := tsoptionstest.GetParsedCommandLine(
					t,
					`{
						"files": [
							"a.ts",
							"b.ts"
						],
						"exclude": [
							"b.ts"
						]
					}`,
					files,
					"/dev",
					/*caseSensitivity*/ tspath.CaseSensitive,
				)

				assertMatches(t, parsedCommandLine, files, []string{
					"/dev/a.ts",
					"/dev/b.ts",
				})

				emptyParsedCommandLine := parsedCommandLine.ReloadFileNamesOfParsedCommandLine(noFilesFS)
				assertMatches(t, emptyParsedCommandLine, noFiles, []string{
					"/dev/a.ts",
					"/dev/b.ts",
				})
			})

			t.Run("duplicates", func(t *testing.T) {
				t.Parallel()
				parsedCommandLine := tsoptionstest.GetParsedCommandLine(
					t,
					`{
						"files": [
							"a.ts",
							"a.ts",
							"b.ts",
						]
					}`,
					files,
					"/dev",
					/*caseSensitivity*/ tspath.CaseSensitive,
				)

				assert.DeepEqual(t, parsedCommandLine.LiteralFileNames(), []tspath.RootedFilePath{
					tspath.RootedFilePathFromNormalized("/dev/a.ts"),
					tspath.RootedFilePathFromNormalized("/dev/b.ts"),
				})
			})
		})

		t.Run("with literal include list", func(t *testing.T) {
			t.Parallel()
			t.Run("without exclude", func(t *testing.T) {
				t.Parallel()
				parsedCommandLine := tsoptionstest.GetParsedCommandLine(
					t,
					`{
						"include": [
							"a.ts",
							"b.ts"
						]
					}`,
					files,
					"/dev",
					/*caseSensitivity*/ tspath.CaseSensitive,
				)

				assertMatches(t, parsedCommandLine, files, []string{
					"/dev/a.ts",
					"/dev/b.ts",
				})

				emptyParsedCommandLine := parsedCommandLine.ReloadFileNamesOfParsedCommandLine(noFilesFS)
				assertMatches(t, emptyParsedCommandLine, noFiles, []string{
					"/dev/a.ts",
					"/dev/b.ts",
				})
			})
		})

		t.Run("PossiblyMatchesFileName with content mapper extensions", func(t *testing.T) {
			t.Parallel()

			host := tsoptionstest.NewVFSParseConfigHost(map[string]string{
				"/dev/node_modules/mapper/package.json": `{ "name": "mapper", "version": "1.0.0", "typescript": { "contentMapper": { "exec": ["mapper"] } } }`,
			}, "/dev", tspath.CaseSensitive)
			configFileName := "/dev/tsconfig.json"
			jsonText := `{
			"include": ["src"],
			"contentMappers": [ { "package": "mapper", "extensions": [".box"] } ]
		}`
			tsconfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(tspath.RootedFilePath(configFileName), "/dev/tsconfig.json", jsonText)
			parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
				tsconfigSourceFile,
				host,
				"/dev",
				&core.CompilerOptions{RunExternalCode: core.TSTrue},
				nil,
				nil,
				nil,
			)

			// A created content-mapped file under an included directory must be recognized as a
			// possible root file, or the config's root files are never reloaded for it.
			assert.Assert(t, parsedCommandLine.PossiblyMatchesFileName("/dev/src/new.box"))
			assert.Assert(t, parsedCommandLine.PossiblyMatchesFileName("/dev/src/new.ts"))
			assert.Assert(t, !parsedCommandLine.PossiblyMatchesFileName("/dev/src/new.vue"))
			assert.Assert(t, !parsedCommandLine.PossiblyMatchesFileName("/dev/other/new.box"))

			insensitiveHost := tsoptionstest.NewVFSParseConfigHost(map[string]string{
				"/dev/node_modules/mapper/package.json": `{ "name": "mapper", "version": "1.0.0", "typescript": { "contentMapper": { "exec": ["mapper"] } } }`,
			}, "/dev", tspath.CaseInsensitive)
			insensitiveCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
				tsconfigSourceFile,
				insensitiveHost,
				"/dev",
				&core.CompilerOptions{RunExternalCode: core.TSTrue},
				nil,
				nil,
				nil,
			)
			assert.Assert(t, insensitiveCommandLine.PossiblyMatchesFileName("/dev/src/new.BOX"))
		})

		t.Run("Config file specs are owned by the parsed command line", func(t *testing.T) {
			t.Parallel()

			configFileName := tspath.RootedFilePathFromNormalized("/dev/tsconfig.json")
			tsconfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(
				configFileName,
				tspath.CaseSensitive.PathKey(tspath.RootedPath(configFileName)),
				`{ "files": ["SRC/a.ts"] }`,
			)
			sensitiveCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
				tsconfigSourceFile,
				tsoptionstest.NewVFSParseConfigHost(nil, "/dev", tspath.CaseSensitive),
				"/dev",
				nil,
				nil,
				nil,
				nil,
			)
			_ = tsoptions.ParseJsonSourceFileConfigFileContent(
				tsconfigSourceFile,
				tsoptionstest.NewVFSParseConfigHost(nil, "/dev", tspath.CaseInsensitive),
				"/dev",
				nil,
				nil,
				nil,
				nil,
			)

			assert.Equal(t, sensitiveCommandLine.GetMatchedFileSpec(tspath.RootedFilePathFromNormalized("/dev/SRC/a.ts")), "SRC/a.ts")
		})

		t.Run("Literal files and include matches share canonical keys", func(t *testing.T) {
			t.Parallel()

			host := tsoptionstest.NewVFSParseConfigHost(map[string]string{"/dev/src/a.ts": ""}, "/dev", tspath.CaseSensitive)
			commandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
				tsoptions.NewTsconfigSourceFileFromFilePath(
					tspath.RootedFilePathFromNormalized("/dev/tsconfig.json"),
					tspath.CaseSensitive.PathKey(tspath.RootedPathFromNormalized("/dev/tsconfig.json")),
					`{ "files": ["src/a.ts"], "include": ["src/*.ts"] }`,
				),
				host,
				"/dev",
				nil,
				nil,
				nil,
				nil,
			)

			assert.DeepEqual(t, commandLine.FileNames(), []tspath.RootedFilePath{tspath.RootedFilePathFromNormalized("/dev/src/a.ts")})
		})

		t.Run("WithFileNames preserves config identity", func(t *testing.T) {
			t.Parallel()

			configFileName := "/dev/tsconfig.json"
			tsconfigSourceFile := tsoptions.NewTsconfigSourceFileFromFilePath(tspath.RootedFilePath(configFileName), tspath.PathKeyFromCanonical(configFileName), `{}`)
			parsedCommandLine := tsoptions.ParseJsonSourceFileConfigFileContent(
				tsconfigSourceFile,
				tsoptionstest.NewVFSParseConfigHost(map[string]string{}, "/dev", tspath.CaseSensitive),
				"/dev",
				nil,
				nil,
				nil,
				nil,
			)

			withTypings := parsedCommandLine.WithFileNames([]tspath.RootedFilePath{
				tspath.ToRootedFilePath("/dev/index.ts", parsedCommandLine.BaseDirectory()),
				tspath.ToRootedFilePath("/cache/@types/pkg/index.d.ts", parsedCommandLine.BaseDirectory()),
			})
			assert.Equal(t, withTypings.ConfigName().AsString(), configFileName)
			assert.DeepEqual(t, withTypings.FileNames(), []tspath.RootedFilePath{"/dev/index.ts", "/cache/@types/pkg/index.d.ts"})
		})
	})
}
