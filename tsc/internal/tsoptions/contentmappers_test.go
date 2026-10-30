package tsoptions

import (
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestGetContentMapperForFileNameUsesLongestExtension(t *testing.T) {
	t.Parallel()
	zMapper := &contentmapper.Mapper{Package: "z", Extensions: []string{".z"}}
	yzMapper := &contentmapper.Mapper{Package: "yz", Extensions: []string{".y.z"}}
	commandLine := &ParsedCommandLine{ParsedConfig: &ParsedOptions{ContentMappers: []*contentmapper.Mapper{zMapper, yzMapper}}}

	assert.Equal(t, commandLine.GetContentMapperForFileName("/src/Component.y.z"), yzMapper)
	assert.Equal(t, commandLine.GetContentMapperForFileName("/src/Component.z"), zMapper)
}

func TestGetContentMapperForFileNameUsesHostCaseSensitivity(t *testing.T) {
	t.Parallel()
	mapper := &contentmapper.Mapper{Extensions: []string{".vue"}}
	insensitive := &ParsedCommandLine{
		ParsedConfig:    &ParsedOptions{ContentMappers: []*contentmapper.Mapper{mapper}},
		caseSensitivity: tspath.CaseInsensitive,
	}
	sensitive := &ParsedCommandLine{
		ParsedConfig:    &ParsedOptions{ContentMappers: []*contentmapper.Mapper{mapper}},
		caseSensitivity: tspath.CaseSensitive,
	}
	assert.Equal(t, insensitive.GetContentMapperForFileName("/src/Component.VUE"), mapper)
	assert.Assert(t, sensitive.GetContentMapperForFileName("/src/Component.VUE") == nil)
}

func TestContentMapperIncludeInheritance(t *testing.T) {
	t.Parallel()
	// Inherited src is rebased; ${configDir} still refers to the extending config.
	fs := vfstest.FromMap(map[string]string{
		"/shared/base.json": `{
			"contentMappers": [{"package": "mapper", "include": ["src", "${configDir}/local"]}]
		}`,
		"/project/tsconfig.json": `{
			"extends": "../shared/base.json",
			"compilerOptions": {"noLib": true},
			"include": ["../shared/src", "local", "other"]
		}`,
		"/project/node_modules/mapper/package.json": `{
			"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".toml"]}}
		}`,
		"/shared/src/a.toml":    "",
		"/project/local/b.toml": "",
		"/project/other/c.toml": "",
	}, tspath.CaseSensitive)
	config, errors := GetParsedCommandLineOfConfigFile(
		"/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue}, nil, NewDefaultParseConfigHost(fs), nil,
	)
	assert.Equal(t, len(errors), 0)
	assert.Equal(t, len(config.Errors), 0)
	assert.DeepEqual(t, config.FileNames(), []tspath.RootedFilePath{"/shared/src/a.toml", "/project/local/b.toml"})
}

func TestContentMapperManifestExtensionValidation(t *testing.T) {
	t.Parallel()
	for _, extensions := range []string{`null`, `"toml"`, `[1]`, `["toml"]`, `[".ts"]`, `[".foo.ts"]`, `[".a/b"]`} {
		t.Run(extensions, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/project/tsconfig.json": `{"contentMappers": [{"package": "mapper"}]}`,
				"/project/index.ts":      "",
				"/project/node_modules/mapper/package.json": `{
					"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": ` + extensions + `}}
				}`,
			}, tspath.CaseSensitive)
			config, errors := GetParsedCommandLineOfConfigFile(
				"/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue}, nil, NewDefaultParseConfigHost(fs), nil,
			)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, len(config.Errors), 1)
			assert.Assert(t, config.Errors[0].File() != nil)
			assert.Equal(t, len(config.ContentMapperExtensions()), 0)
		})
	}
}

func TestContentMapperFilteredDuplicateExtensions(t *testing.T) {
	t.Parallel()
	for _, definition := range []string{
		`{"package": "mapper", "include": ["src"]}`,
		`{"package": "mapper", "include": ["src"], "extensions": [".toml", ".toml"]}`,
	} {
		t.Run(definition, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/project/tsconfig.json": `{"contentMappers": [` + definition + `]}`,
				"/project/index.ts":      "",
				"/project/node_modules/mapper/package.json": `{
					"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".toml", ".toml"]}}
				}`,
			}, tspath.CaseSensitive)
			config, errors := GetParsedCommandLineOfConfigFile(
				"/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue}, nil, NewDefaultParseConfigHost(fs), nil,
			)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, len(config.Errors), 1)
			assert.Equal(t, len(config.ContentMapperExtensions()), 1)
		})
	}
}

func TestContentMapperOutputExtensionConsistency(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name                 string
		definitions          string
		conflict             bool
		conflictingExtension string
	}{
		{
			name: "same extension agrees",
			definitions: `[
				{"package": "mapper", "include": ["src"], "outputExtensions": {".vue": ".js"}},
				{"package": "mapper", "outputExtensions": {".vue": ".js"}}
			]`,
		},
		{
			name: "same extension conflicts",
			definitions: `[
				{"package": "mapper", "include": ["src"], "outputExtensions": {".vue": ".js"}},
				{"package": "mapper", "outputExtensions": {".vue": ".mjs"}}
			]`,
			conflict: true,
		},
		{
			name: "implicit identity conflicts",
			definitions: `[
				{"package": "mapper"},
				{"package": "mapper", "include": ["src"], "outputExtensions": {".vue": ".js"}}
			]`,
			conflict: true,
		},
		{
			name: "suffix overlap produces the same name",
			definitions: `[
				{"package": "mapper", "extensions": [".part.vue"], "include": ["src"], "outputExtensions": {".part.vue": ".part.js"}},
				{"package": "mapper", "outputExtensions": {".vue": ".js"}}
			]`,
		},
		{
			name: "suffix overlap produces different names",
			definitions: `[
				{"package": "mapper", "extensions": [".part.vue"], "include": ["src"], "outputExtensions": {".part.vue": ".js"}},
				{"package": "mapper", "outputExtensions": {".vue": ".js"}}
			]`,
			conflict:             true,
			conflictingExtension: ".part.vue",
		},
		{
			name: "unfiltered overlap preserves legacy behavior",
			definitions: `[
				{"package": "mapper", "extensions": [".part.vue"], "outputExtensions": {".part.vue": ".js"}},
				{"package": "mapper", "outputExtensions": {".vue": ".js"}}
			]`,
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/project/tsconfig.json": `{"contentMappers": ` + test.definitions + `}`,
				"/project/index.ts":      "",
				"/project/node_modules/mapper/package.json": `{
					"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".vue"]}}
				}`,
			}, tspath.CaseSensitive)
			config, errors := GetParsedCommandLineOfConfigFile(
				"/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue, RewriteRelativeImportExtensions: core.TSTrue},
				nil, NewDefaultParseConfigHost(fs), nil,
			)
			assert.Equal(t, len(errors), 0)
			if test.conflict {
				assert.Equal(t, len(config.Errors), 1)
				assert.Assert(t, strings.Contains(config.Errors[0].Localize(locale.Default), "'outputExtensions'"))
				assert.DeepEqual(t, config.Errors[0].MessageArgs(), []string{"mapper", core.OrElse(test.conflictingExtension, ".vue")})
				assert.Equal(t, len(config.Errors[0].RelatedInformation()), 1)
			} else {
				assert.Equal(t, len(config.Errors), 0)
			}
		})
	}
}

func TestContentMapperOutputConflictLocations(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name, first, second, manifest string
		secondPackage, secondManifest string
		extended, unresolved          bool
		noMapping, inheritedOutput    bool
	}{
		{
			name:  "same package with disjoint includes",
			first: `"outputExtensions": {".vue": ".js"},`, second: `"outputExtensions": {".vue": ".mjs"},`,
		},
		{
			name:     "manifest default overridden in tsconfig",
			manifest: `, "outputExtensions": {".vue": ".js"}`, second: `"outputExtensions": {".vue": ".mjs"},`,
			inheritedOutput: true,
		},
		{
			name:     "tsconfig overridden by manifest default",
			manifest: `, "outputExtensions": {".vue": ".mjs"}`, first: `"outputExtensions": {".vue": ".js"},`,
		},
		{
			name: "implicit identity", second: `"outputExtensions": {".vue": ".mjs"},`,
			noMapping: true,
		},
		{
			name:  "implicit identity on second registration",
			first: `"outputExtensions": {".vue": ".js"},`,
		},
		{
			name:  "inherited registrations",
			first: `"outputExtensions": {".vue": ".js"},`, second: `"outputExtensions": {".vue": ".mjs"},`,
			extended: true,
		},
		{
			name:          "different package manifests",
			manifest:      `, "outputExtensions": {".vue": ".js"}`,
			secondPackage: "other-mapper", secondManifest: `, "outputExtensions": {".vue": ".mjs"}`,
			inheritedOutput: true,
		},
		{
			name:  "unresolved registration before conflict",
			first: `"outputExtensions": {".vue": ".js"},`, second: `"outputExtensions": {".vue": ".mjs"},`,
			unresolved: true,
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			secondPackage := core.OrElse(test.secondPackage, "mapper")
			firstRegistration := `{"package": "mapper", ` + test.first + ` "include": ["src"]}`
			secondRegistration := `{"package": "` + secondPackage + `", ` + test.second + ` "include": ["other"]}`
			configText := `{"contentMappers": [` + firstRegistration + `,` + secondRegistration + `]}`
			if test.unresolved {
				configText = strings.Replace(configText, `"contentMappers": [`, `"contentMappers": [{"package": "missing", "extensions": [".test"]},`, 1)
			}
			files := map[string]string{
				"/project/tsconfig.json": configText,
				"/project/index.ts":      "",
				"/project/node_modules/mapper/package.json": `{
					"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".vue"]` + test.manifest + `}}
				}`,
			}
			if test.secondPackage != "" {
				files["/project/node_modules/"+secondPackage+"/package.json"] = `{
					"name": "` + secondPackage + `", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".vue"]` + test.secondManifest + `}}
				}`
			}
			configPath := tspath.RootedFilePath("/project/tsconfig.json")
			if test.extended {
				files["/shared/base.json"] = configText
				files[configPath.AsString()] = `{"extends": "../shared/base.json"}`
				configPath = "/shared/base.json"
			}
			fs := vfstest.FromMap(files, tspath.CaseSensitive)
			config, errors := GetParsedCommandLineOfConfigFile(
				"/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue, RewriteRelativeImportExtensions: core.TSTrue},
				nil, NewDefaultParseConfigHost(fs), nil,
			)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, len(config.Errors), core.IfElse(test.unresolved, 2, 1))
			diagnostic := config.Errors[len(config.Errors)-1]
			assert.DeepEqual(t, diagnostic.MessageArgs(), []string{"mapper", ".vue"})
			mappingDescription := "a conflicting 'outputExtensions' mapping"
			if test.noMapping {
				mappingDescription = "no 'outputExtensions' mapping"
			}
			assert.Equal(t, diagnostic.Localize(locale.Default), "Content mapper 'mapper' is also registered for the extension '.vue', but has "+mappingDescription+". Each registration for this extension must produce the same output file name.")
			assert.Equal(t, len(diagnostic.RelatedInformation()), 1)
			related := diagnostic.RelatedInformation()[0]
			assert.Equal(t, len(related.MessageArgs()), 0)
			relatedText := "The conflicting mapper registration is declared here."
			if test.inheritedOutput {
				relatedText += " Its 'outputExtensions' setting is inherited from the mapper's package.json."
			}
			assert.Equal(t, related.Localize(locale.Default), relatedText)
			for _, location := range []struct {
				diagnostic *ast.Diagnostic
				text       string
			}{
				{diagnostic, secondRegistration},
				{related, firstRegistration},
			} {
				assert.Assert(t, location.diagnostic.File() != nil)
				assert.Equal(t, location.diagnostic.File().FileName(), configPath)
				assert.Equal(t, location.diagnostic.File().Text()[location.diagnostic.Pos():location.diagnostic.End()], location.text)
			}
		})
	}
}

func TestContentMapperIncludeAndManifestExtensions(t *testing.T) {
	t.Parallel()
	fs := vfstest.FromMap(map[string]string{
		"/project/tsconfig.json": `{
				"compilerOptions": { "noLib": true },
				"contentMappers": [
					{ "package": "mapper", "include": ["src", "**/blob.toml"] }
				]
			}`,
		"/project/node_modules/mapper/package.json": `{
				"name": "mapper",
				"typescript": { "contentMapper": { "exec": ["run"], "extensions": [".toml"] } }
			}`,
		"/project/src/config.toml":             "",
		"/project/src/.hidden/config.toml":     "",
		"/project/blob.toml":                   "",
		"/project/other.toml":                  "",
		"/project/index.ts":                    "",
		"/project/node_modules/pkg/blob.toml":  "",
		"/project/node_modules/pkg/other.toml": "",
	}, tspath.CaseSensitive)
	commandLine, errors := GetParsedCommandLineOfConfigFile(
		"/project/tsconfig.json",
		&core.CompilerOptions{RunExternalCode: core.TSTrue}, nil,
		NewDefaultParseConfigHost(fs), nil,
	)
	assert.Equal(t, len(errors), 0)
	assert.Equal(t, len(commandLine.GetConfigFileParsingDiagnostics()), 0)
	assert.DeepEqual(t, commandLine.ContentMapperExtensions(), []string{".toml"})
	assert.DeepEqual(t, commandLine.FileNames(), []tspath.RootedFilePath{
		"/project/blob.toml", "/project/index.ts", "/project/src/config.toml",
	})
	for _, file := range []tspath.RootedFilePath{
		"/project/src/config.toml", "/project/src/.hidden/config.toml",
		"/project/blob.toml", "/project/node_modules/pkg/blob.toml",
	} {
		assert.Assert(t, commandLine.GetContentMapperForFileName(file) != nil, file)
	}
	for _, file := range []tspath.RootedFilePath{
		"/project/other.toml", "/project/node_modules/pkg/other.toml", "/project/src/file.ts",
	} {
		assert.Assert(t, commandLine.GetContentMapperForFileName(file) == nil, file)
	}
}

func TestContentMapperIncludePrecedence(t *testing.T) {
	t.Parallel()
	fallback := &contentmapper.Mapper{Extensions: []string{".toml"}}
	first := &contentmapper.Mapper{Extensions: []string{".config.toml"}, Include: []string{"src"}}
	second := &contentmapper.Mapper{Extensions: []string{".toml"}, Include: []string{"**/blob.config.toml"}}
	commandLine := NewParsedCommandLine(&core.CompilerOptions{}, nil, nil, "/project", tspath.CaseSensitive)
	commandLine.ParsedConfig.ContentMappers = []*contentmapper.Mapper{fallback, first, second}
	assert.Equal(t, commandLine.GetContentMapperForFileName("/project/src/blob.config.toml"), first)
	assert.Equal(t, commandLine.GetContentMapperForFileName("/project/blob.config.toml"), second)
	assert.Equal(t, commandLine.GetContentMapperForFileName("/project/other.toml"), fallback)
}

func TestContentMapperIncludeReloadAndEmptyFilter(t *testing.T) {
	t.Parallel()
	for _, include := range []string{`["src"]`, `[]`} {
		t.Run(include, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/project/tsconfig.json": `{
						"compilerOptions": {"noLib": true},
						"contentMappers": [{"package": "mapper", "extensions": [".toml"], "include": ` + include + `}]
					}`,
				"/project/index.ts":   "",
				"/project/src/a.toml": "",
				"/project/other.toml": "",
				"/project/node_modules/mapper/package.json": `{
						"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"], "extensions": [".vue"]}}
					}`,
			}, tspath.CaseSensitive)
			config, errors := GetParsedCommandLineOfConfigFile("/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue}, nil, NewDefaultParseConfigHost(fs), nil)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, len(config.Errors), 0)
			assert.DeepEqual(t, config.ContentMapperExtensions(), []string{".toml"})
			assert.DeepEqual(t, config.ReloadFileNamesOfParsedCommandLine(fs).FileNames(), config.FileNames())
			assert.Assert(t, !slices.Contains(config.FileNames(), "/project/other.toml"))
			assert.Equal(t, slices.Contains(config.FileNames(), "/project/src/a.toml"), include != `[]`)
		})
	}
}

func TestGetOutputFileNamesExcludesMapperOwnedOutputs(t *testing.T) {
	t.Parallel()
	mapper := &contentmapper.Mapper{Extensions: []string{".vue"}}
	currentDirectory := tspath.RootedDirectoryPath("/")
	commandLine := NewParsedCommandLine(
		&core.CompilerOptions{
			OutDir:         "/dist",
			Declaration:    core.TSTrue,
			DeclarationMap: core.TSTrue,
			SourceMap:      core.TSTrue,
		},
		[]tspath.RootedFilePath{tspath.ToRootedFilePath("/src/Component.vue", currentDirectory)},
		nil,
		currentDirectory,
		tspath.CaseSensitive,
	)
	commandLine.ParsedConfig.ContentMappers = []*contentmapper.Mapper{mapper}

	assert.DeepEqual(t, slices.Collect(commandLine.GetOutputFileNames()), []tspath.RootedFilePath{"/dist/Component.d.vue.ts"})
}

func TestContentMapperOutputPathsUseWinningMapper(t *testing.T) {
	t.Parallel()
	config := NewParsedCommandLine(
		&core.CompilerOptions{Declaration: core.TSTrue, OutDir: "/dist"},
		[]tspath.RootedFilePath{"/project/src/a.config.toml", "/project/other/b.config.toml"},
		nil, "/project", tspath.CaseSensitive,
	)
	config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{
		{Extensions: []string{".toml"}, OutputExtensions: map[string]string{".toml": ".js"}},
		{Extensions: []string{".config.toml"}, Include: []string{"src"}},
	}
	assert.Equal(t, config.ContentMapperExtensionForFileName("/project/src/a.config.toml"), ".config.toml")
	assert.Equal(t, config.ContentMapperExtensionForFileName("/project/other/b.config.toml"), ".toml")
	assert.DeepEqual(t, slices.Collect(config.GetOutputFileNames()), []tspath.RootedFilePath{
		"/dist/src/a.d.config.toml.ts", "/dist/other/b.config.d.ts",
	})
}

func TestContentMapperExtensionRewritesPreserveLongestExtension(t *testing.T) {
	t.Parallel()
	mapper := &contentmapper.Mapper{
		Extensions: []string{".z", ".y.z", ".identity.y.z", ".unmapped.y.z"},
		OutputExtensions: map[string]string{
			".z": ".js", ".y.z": ".mjs", ".identity.y.z": ".identity.y.z",
		},
	}
	commandLine := NewParsedCommandLine(
		&core.CompilerOptions{Declaration: core.TSTrue, OutDir: "/dist"},
		[]tspath.RootedFilePath{"/src/Widget.y.z", "/src/Widget.identity.y.z", "/src/Widget.unmapped.y.z"},
		nil,
		"/",
		tspath.CaseSensitive,
	)
	commandLine.ParsedConfig.ContentMappers = []*contentmapper.Mapper{mapper}
	rewrites := commandLine.ContentMapperExtensionRewrites()
	assert.Assert(t, slices.IsSortedFunc(rewrites, func(a, b tspath.ExtensionRewrite) int {
		return len(b.Source) - len(a.Source)
	}))
	for _, file := range []string{"./Widget.identity.y.z", "./Widget.unmapped.y.z"} {
		rewritten, ok := tspath.ToModuleSpecifier(file).RewriteExtension(rewrites, tspath.CaseSensitive)
		assert.Assert(t, !ok)
		assert.Equal(t, rewritten.AsString(), file)
	}
	assert.DeepEqual(t, slices.Collect(commandLine.GetOutputFileNames()), []tspath.RootedFilePath{
		"/dist/Widget.d.mts",
		"/dist/Widget.d.identity.y.z.ts",
		"/dist/Widget.d.unmapped.y.z.ts",
	})
}

func TestContentMapperExtensionRewritesAreCached(t *testing.T) { //nolint:paralleltest,tparallel // AllocsPerRun cannot run in parallel tests.
	mapper := &contentmapper.Mapper{
		Extensions:       []string{".astro", ".y.z"},
		OutputExtensions: map[string]string{".astro": ".js", ".y.z": ".mjs"},
	}
	commandLine := NewParsedCommandLine(
		&core.CompilerOptions{}, nil, nil,
		"/", tspath.CaseSensitive,
	)
	commandLine.ParsedConfig.ContentMappers = []*contentmapper.Mapper{mapper}
	rewrites := commandLine.ContentMapperExtensionRewrites()
	for range 10 {
		assert.Assert(t, &commandLine.ContentMapperExtensionRewrites()[0] == &rewrites[0])
	}
	assert.Equal(t, testing.AllocsPerRun(100, func() {
		commandLine.ContentMapperExtensionRewrites()
	}), float64(0))
	withFileNames := commandLine.WithFileNames([]tspath.RootedFilePath{"/src/Card.astro"})
	for range 10 {
		t.Run("concurrent", func(t *testing.T) {
			t.Parallel()
			assert.Assert(t, &commandLine.ContentMapperExtensionRewrites()[0] == &rewrites[0])
			assert.DeepEqual(t, withFileNames.ContentMapperExtensionRewrites(), rewrites)
		})
	}
}

type contentMapperTestParseConfigHost struct {
	ParseConfigHost
	allowed          bool
	packageDirectory tspath.RootedDirectoryPath
}

func (h *contentMapperTestParseConfigHost) IsContentMapperPackageAllowed(packageDirectory tspath.RootedDirectoryPath) bool {
	h.packageDirectory = packageDirectory
	return h.allowed
}

func TestParseConfigHostContentMapperAuthorization(t *testing.T) {
	t.Parallel()

	for _, allowed := range []bool{false, true} {
		name := "denied"
		if allowed {
			name = "allowed"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/project/tsconfig.json": `{
					"compilerOptions": { "noLib": true },
					"contentMappers": [{ "package": "mapper", "extensions": [".vue"] }]
				}`,
				"/project/index.ts": "",
				"/project/node_modules/mapper/package.json": `{
					"name": "mapper",
					"typescript": { "contentMapper": { "exec": ["run"] } }
				}`,
			}, tspath.CaseSensitive)
			host := &contentMapperTestParseConfigHost{
				ParseConfigHost: NewDefaultParseConfigHost(fs),
				allowed:         allowed,
			}
			commandLine, errors := GetParsedCommandLineOfConfigFile(
				"/project/tsconfig.json",
				&core.CompilerOptions{RunExternalCode: core.TSTrue},
				nil,
				host,
				nil,
			)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, host.packageDirectory, tspath.RootedDirectoryPath("/project/node_modules/mapper"))
			if allowed {
				assert.Equal(t, len(commandLine.ContentMappers()), 1)
				assert.DeepEqual(t, commandLine.ContentMapperExtensions(), []string{".vue"})
				assert.Equal(t, len(commandLine.GetConfigFileParsingDiagnostics()), 0)
			} else {
				assert.Equal(t, len(commandLine.ContentMappers()), 0)
				assert.Equal(t, len(commandLine.ContentMapperExtensions()), 0)
				diagnosticsFound := commandLine.GetConfigFileParsingDiagnostics()
				assert.Equal(t, len(diagnosticsFound), 1)
				assert.Equal(t, diagnosticsFound[0].Code(), diagnostics.The_content_mapper_package_0_is_outside_the_open_workspace_and_will_not_be_loaded.Code())
			}
		})
	}
}

func TestResolveContentMapperManifestRejectsMalformedOutputExtensions(t *testing.T) {
	t.Parallel()
	for _, value := range []string{`"invalid"`, `null`, `[]`, `{".vue": 1}`, `{".vue": null}`, `{".vue/foo": ".js"}`, `{".vue\\foo": ".js"}`, `{".vue": ".js/foo"}`, `{".vue": ".js\\foo"}`} {
		t.Run(value, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/home/project/node_modules/mapper/package.json": `{
					"name": "mapper",
					"typescript": { "contentMapper": { "exec": ["run"], "outputExtensions": ` + value + ` } }
				}`,
			}, tspath.CaseSensitive)
			_, _, diagnostic := resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", "mapper")
			assert.Assert(t, diagnostic != nil, "expected malformed outputExtensions to be rejected")
		})
	}
}

func TestResolveContentMapperManifest(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/home/project/node_modules/vue-ts-mapper/package.json": `{
			"name": "vue-ts-mapper",
			"version": "1.2.3",
			"typescript": { "contentMapper": { "exec": ["node", "./dist/mapper.js"], "compilerOptions": ["target", "jsx"], "outputExtensions": { ".vue": ".js" } } }
		}`,
		"/home/node_modules/@scope/noversion/package.json": `{
			"name": "@scope/noversion",
			"typescript": { "contentMapper": { "exec": ["run"] } }
		}`,
		"/home/project/node_modules/no-name/package.json": `{
			"version": "1.0.0"
		}`,
		"/home/project/node_modules/no-manifest/package.json": `{
			"name": "no-manifest"
		}`,
		"/home/project/node_modules/no-exec/package.json": `{
			"name": "no-exec",
			"typescript": { "contentMapper": {} }
		}`,
		"/home/project/node_modules/bad-exec/package.json": `{
			"name": "bad-exec",
			"typescript": { "contentMapper": { "exec": "node ./mapper.js" } }
		}`,
		"/home/project/node_modules/bad-output-extension/package.json": `{
			"name": "bad-output-extension",
			"typescript": { "contentMapper": { "exec": ["run"], "outputExtensions": { ".vue": "js" } } }
		}`,
	}, tspath.CaseSensitive /*caseSensitivity*/)

	// Name, version, and the verbatim exec argv are preserved.
	manifest, packageDirectory, diagnostic := resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", "vue-ts-mapper")
	assert.Assert(t, diagnostic == nil)
	assert.Equal(t, manifest.Name, "vue-ts-mapper")
	assert.Equal(t, manifest.Version, "1.2.3")
	assert.Equal(t, packageDirectory, tspath.RootedDirectoryPath("/home/project/node_modules/vue-ts-mapper"))
	assert.DeepEqual(t, manifest.Exec, []string{"node", "./dist/mapper.js"})
	assert.DeepEqual(t, manifest.CompilerOptions, []string{"target", "jsx"})
	assert.DeepEqual(t, manifest.DefaultOutputExtensions, map[string]string{".vue": ".js"})

	// Resolution walks up node_modules; a package with no version resolves to a name and empty version.
	manifest, _, diagnostic = resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/src/tsconfig.json", "@scope/noversion")
	assert.Assert(t, diagnostic == nil)
	assert.Equal(t, manifest.Name, "@scope/noversion")
	assert.Equal(t, manifest.Version, "")

	// A package that is not installed reports a resolution diagnostic.
	_, _, diagnostic = resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", "missing-mapper")
	assert.Assert(t, diagnostic != nil)
	assert.Equal(t, diagnostic.Code(), diagnostics.The_content_mapper_package_0_could_not_be_resolved.Code())

	// A package whose package.json has no name reports a diagnostic.
	_, packageDirectory, diagnostic = resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", "no-name")
	assert.Assert(t, diagnostic != nil)
	assert.Equal(t, packageDirectory, tspath.RootedDirectoryPath("/home/project/node_modules/no-name"))
	assert.Equal(t, diagnostic.Code(), diagnostics.The_package_json_of_the_content_mapper_package_0_does_not_specify_a_name.Code())

	// A package that does not declare a "typescript.contentMapper" object reports a diagnostic.
	_, _, diagnostic = resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", "no-manifest")
	assert.Assert(t, diagnostic != nil)
	assert.Equal(t, diagnostic.Code(), diagnostics.The_package_json_of_the_content_mapper_package_0_does_not_declare_a_typescript_contentMapper_object.Code())

	// A "typescript.contentMapper" with no "exec", or an "exec" of the wrong type, reports a diagnostic.
	for _, pkg := range []string{"no-exec", "bad-exec"} {
		_, _, diagnostic = resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", pkg)
		assert.Assert(t, diagnostic != nil, "expected a diagnostic for %s", pkg)
		assert.Equal(t, diagnostic.Code(), diagnostics.The_typescript_contentMapper_exec_of_the_content_mapper_package_0_must_be_a_non_empty_array_of_strings.Code())
	}

	_, _, diagnostic = resolveContentMapperManifest(NewDefaultParseConfigHost(fs), "/home/project/tsconfig.json", "bad-output-extension")
	assert.Equal(t, diagnostic.Code(), diagnostics.The_typescript_contentMapper_outputExtensions_of_the_content_mapper_package_0_contains_an_invalid_mapping_from_1_to_2_Extensions_must_be_non_empty_and_begin_with_a.Code())
}
