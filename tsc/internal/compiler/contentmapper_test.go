package compiler_test

import (
	"context"
	"errors"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/outputpaths"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type fakeContentMapperHost struct {
	transform func(fileName string, content string) (contentmapper.Result, error)
}

func (r fakeContentMapperHost) Refresh() error                                 { return nil }
func (r fakeContentMapperHost) Identities() ([]string, error)                  { return nil, nil }
func (r fakeContentMapperHost) Identity(*contentmapper.Mapper) (string, error) { return "test", nil }
func (r fakeContentMapperHost) WatchedFiles() ([]tspath.RootedFilePath, error) { return nil, nil }
func (r fakeContentMapperHost) Diagnostics() []contentmapper.OptionDiagnostic {
	return nil
}
func (r fakeContentMapperHost) Close() error { return nil }

func (r fakeContentMapperHost) Transform(mapper *contentmapper.Mapper, request contentmapper.Request) (contentmapper.Result, error) {
	return r.transform(request.FileName.AsString(), request.Content)
}

func newContentMapperProgram(t *testing.T, contentMapperProject contentmapper.Project, files map[string]string, rootFiles []string) *compiler.Program {
	return newContentMapperProgramWithOptions(t, contentMapperProject, files, rootFiles, &core.CompilerOptions{
		SkipLibCheck:     core.TSTrue,
		Module:           core.ModuleKindESNext,
		ModuleResolution: core.ModuleResolutionKindBundler,
	})
}

func newContentMapperProgramWithOptions(t *testing.T, contentMapperProject contentmapper.Project, files map[string]string, rootFiles []string, options *core.CompilerOptions) *compiler.Program {
	t.Helper()
	return newContentMapperProgramWithOutputExtensions(t, contentMapperProject, files, rootFiles, options, nil)
}

func newContentMapperProgramWithOutputExtensions(t *testing.T, contentMapperProject contentmapper.Project, files map[string]string, rootFiles []string, options *core.CompilerOptions, outputExtensions map[string]string) *compiler.Program {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}
	fs := vfstest.FromMap[any](nil, tspath.CaseInsensitive /*caseSensitivity*/)
	fs = bundled.WrapFS(fs)
	for name, content := range files {
		_ = fs.WriteFile(tspath.RootedFilePathFromNormalized(name), content)
	}

	config := tsoptions.NewParsedCommandLine(options, testFileNames(rootFiles...), nil, "/", fs.CaseSensitivity())
	config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{{Package: "vue", Extensions: []string{".vue"}, OutputExtensions: outputExtensions, Name: "vue-mapper", Version: "1.0.0"}}
	return compiler.NewProgram(compiler.ProgramOptions{
		Config: config,
		Host:   compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, contentMapperProject),
		// Load files on the calling goroutine for deterministic diagnostics ordering.
		SingleThreaded: core.TSTrue,
	})
}

func TestContentMapperSymlinkedPackage(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name             string
		include          []string
		wantFiltered     bool
		preserveSymlinks bool
	}{
		{name: "logical include", include: []string{"node_modules/@scope/lib"}},
		{name: "unchanged association"},
		{name: "realpath mapper", include: []string{"packages/lib"}, wantFiltered: true},
		{name: "logical then real include", include: []string{"node_modules/@scope/lib", "packages/lib"}, wantFiltered: true},
		{name: "real then logical include", include: []string{"packages/lib", "node_modules/@scope/lib"}, wantFiltered: true},
		{name: "preserved logical include", include: []string{"node_modules/@scope/lib"}, wantFiltered: true, preserveSymlinks: true},
		{name: "preserved real include", include: []string{"packages/lib"}, preserveSymlinks: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			// A root and both package and relative imports must share the same loaded path.
			dataPath := tspath.RootedFilePath("/project/packages/lib/data.vue")
			directImport := "./packages/lib/data.vue"
			if test.preserveSymlinks {
				dataPath = "/project/node_modules/@scope/lib/data.vue"
				directImport = "./node_modules/@scope/lib/data.vue"
			}
			fs := vfstest.FromMap(map[string]any{
				"/project/main.ts":                   `import { value } from "@scope/lib/data.vue"; import { value as direct } from "` + directImport + `"; export { value, direct };`,
				"/project/node_modules/@scope/lib":   vfstest.Symlink("/project/packages/lib"),
				"/project/packages/lib/package.json": `{"name": "@scope/lib", "version": "1.0.0"}`,
				"/project/packages/lib/data.vue":     "<template />",
			}, tspath.CaseSensitive)
			config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
				NoLib: core.TSTrue, Module: core.ModuleKindPreserve, ModuleResolution: core.ModuleResolutionKindBundler,
				PreserveSymlinks: core.BoolToTristate(test.preserveSymlinks),
			}, []tspath.RootedFilePath{"/project/main.ts", dataPath}, nil, "/project", fs.CaseSensitivity())
			fallback := &contentmapper.Mapper{Package: "fallback", Extensions: []string{".vue"}, Name: "fallback"}
			config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{fallback}
			expectedMapper := fallback
			if test.include != nil {
				filtered := &contentmapper.Mapper{Package: "filtered", Extensions: []string{".vue"}, Include: test.include, Name: "filtered"}
				config.ParsedConfig.ContentMappers = append(config.ParsedConfig.ContentMappers, filtered)
				if test.wantFiltered {
					expectedMapper = filtered
				}
			}
			program := compiler.NewProgram(compiler.ProgramOptions{
				Config: config,
				Host: compiler.NewCompilerHost(fs, "/", nil, nil, fakeContentMapperHost{
					transform: func(fileName, content string) (contentmapper.Result, error) {
						return contentmapper.Result{Text: "export const value = 1;", VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
					},
				}),
				SingleThreaded: core.TSTrue,
			})
			assert.Equal(t, len(program.SourceFiles()), 2)
			assert.Equal(t, len(program.DuplicateSourceFiles()), 0)
			file := program.GetSourceFile(dataPath)
			assert.Assert(t, file != nil)
			assert.Equal(t, file.Text(), "export const value = 1;")
			assert.Equal(t, program.GetContentMapper(file), expectedMapper)
			assert.Equal(t, program.ContentMapperExtensionForFileName(file.FileName()), ".vue")
			assert.Equal(t, len(program.GetSemanticDiagnostics(context.Background(), program.GetSourceFile("/project/main.ts"))), 0)
		})
	}
}

func TestContentMapperRelativeSymlinkedDirectory(t *testing.T) {
	t.Parallel()
	// Root discovery and the relative import must both retain src/linked rather than its realpath.
	for _, filtered := range []bool{false, true} {
		t.Run(core.IfElse(filtered, "filtered", "extension only"), func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]any{
				"/project/tsconfig.json": `{
					"compilerOptions": {"noLib": true, "module": "preserve", "moduleResolution": "bundler"},
					"include": ["src"],
					"contentMappers": [{"package": "mapper", "extensions": [".vue"]` + core.IfElse(filtered, `, "include": ["src"]`, "") + `}]
				}`,
				"/project/node_modules/mapper/package.json": `{
					"name": "mapper", "typescript": {"contentMapper": {"exec": ["run"]}}
				}`,
				"/project/src/main.ts":     `import { value } from "./linked/data.vue"; export { value };`,
				"/project/src/linked":      vfstest.Symlink("/project/shared"),
				"/project/shared/data.vue": "<template />",
			}, tspath.CaseSensitive)
			config, errors := tsoptions.GetParsedCommandLineOfConfigFile(
				"/project/tsconfig.json", &core.CompilerOptions{RunExternalCode: core.TSTrue}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil,
			)
			assert.Equal(t, len(errors), 0)
			assert.Equal(t, len(config.Errors), 0)
			assert.Assert(t, slices.Contains(config.FileNames(), "/project/src/linked/data.vue"))
			program := compiler.NewProgram(compiler.ProgramOptions{
				Config: config,
				Host: compiler.NewCompilerHost(fs, "/", nil, nil, fakeContentMapperHost{
					transform: func(fileName, content string) (contentmapper.Result, error) {
						return contentmapper.Result{Text: "export const value = 1;", VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
					},
				}),
				SingleThreaded: core.TSTrue,
			})
			assert.Equal(t, len(program.SourceFiles()), 2)
			assert.Equal(t, len(program.DuplicateSourceFiles()), 0)
			assert.Assert(t, program.GetSourceFile("/project/shared/data.vue") == nil)
			file := program.GetSourceFile("/project/src/linked/data.vue")
			assert.Assert(t, file != nil)
			assert.Equal(t, file.Text(), "export const value = 1;")
			assert.Equal(t, program.GetContentMapper(file), config.ContentMappers()[0])
			assert.Equal(t, len(program.GetSemanticDiagnostics(t.Context(), program.GetSourceFile("/project/src/main.ts"))), 0)
		})
	}
}

func TestContentMapperDynamicRewriteValidation(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		include    []string
		output     string
		disabled   bool
		rewrite    bool
		wantErrors int
	}{
		{"filtered", []string{"**/*.toml"}, ".js", false, true, 2},
		{"empty include", []string{}, ".js", false, true, 2},
		{"disabled", []string{"**/*.toml"}, ".js", true, true, 0},
		{"identity", []string{"**/*.toml"}, ".toml", false, true, 0},
		{"unmapped", []string{"**/*.toml"}, "", false, true, 0},
		{"unfiltered", nil, ".js", false, true, 0},
		{"rewriting off", []string{"**/*.toml"}, ".js", false, false, 0},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			fs := vfstest.FromMap(map[string]string{
				"/project/main.ts":      `declare const path: string; export const load = import(path);`,
				"/project/require.js":   `/** @param {string} path */ export function load(path) { return require(path); }`,
				"/project/globals.d.ts": `interface Promise<T> {} declare const Promise: any; declare function require(path: string): unknown;`,
			}, tspath.CaseSensitive)
			config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
				NoLib: core.TSTrue, AllowJs: core.TSTrue, CheckJs: core.TSTrue,
				Module: core.ModuleKindPreserve, Target: core.ScriptTargetESNext, OutDir: "/dist",
				RewriteRelativeImportExtensions:        core.BoolToTristate(test.rewrite),
				DisableDynamicImportExtensionRewriting: core.BoolToTristate(test.disabled),
			}, []tspath.RootedFilePath{"/project/main.ts", "/project/require.js", "/project/globals.d.ts"}, nil, "/project", fs.CaseSensitivity())
			mapper := &contentmapper.Mapper{
				Package: "mapper", Name: "mapper", Extensions: []string{".toml"}, Include: test.include,
			}
			if test.output != "" {
				mapper.OutputExtensions = map[string]string{".toml": test.output}
			}
			config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{mapper}
			program := compiler.NewProgram(compiler.ProgramOptions{
				Config:         config,
				Host:           compiler.NewCompilerHost(fs, "/", nil, nil, nil),
				SingleThreaded: core.TSTrue,
			})
			var diags []*ast.Diagnostic
			for _, name := range []tspath.RootedFilePath{"/project/main.ts", "/project/require.js"} {
				diags = append(diags, program.GetSemanticDiagnostics(t.Context(), program.GetSourceFile(name))...)
			}
			assert.Equal(t, len(diags), test.wantErrors)
			for _, diag := range diags {
				assert.Equal(t, diag.Code(), diagnostics.Non_literal_import_paths_cannot_be_rewritten_when_a_content_mapper_uses_both_include_and_an_outputExtensions_mapping_Set_disableDynamicImportExtensionRewriting_to_disable_rewriting_of_non_literal_import_paths.Code())
			}
		})
	}
}

func TestContentMapperRuntimeRewrites(t *testing.T) {
	t.Parallel()
	for _, moduleKind := range []core.ModuleKind{core.ModuleKindPreserve, core.ModuleKindESNext, core.ModuleKindCommonJS} {
		for _, fallback := range []bool{false, true} {
			t.Run(moduleKind.String()+core.IfElse(fallback, "/fallback", "/filtered"), func(t *testing.T) {
				t.Parallel()
				fs := vfstest.FromMap(map[string]string{
					"/project/main.ts": `
							export { value } from "./claimed.toml";
							export { other } from "./unclaimed.toml";
							export const load = (path: string) => import(path);
							export const loadClaimed = () => import("./claimed.toml");
						`,
					"/project/claimed.toml":        "export const value = 1;",
					"/project/unclaimed.toml":      "export const other = 2;",
					"/project/unclaimed.d.toml.ts": "export declare const other: 2;",
				}, tspath.CaseSensitive)
				config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
					NoLib: core.TSTrue, Declaration: core.TSTrue, RewriteRelativeImportExtensions: core.TSTrue,
					Module: moduleKind, ModuleResolution: core.ModuleResolutionKindBundler, OutDir: "/dist",
					AllowArbitraryExtensions: core.TSTrue,
				}, []tspath.RootedFilePath{"/project/main.ts"}, nil, "/project", fs.CaseSensitivity())
				config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{{
					Package: "filtered", Name: "filtered", Extensions: []string{".toml"},
					Include: []string{"claimed.toml"}, OutputExtensions: map[string]string{".toml": ".js"},
				}}
				if fallback {
					config.ParsedConfig.ContentMappers = append(config.ParsedConfig.ContentMappers, &contentmapper.Mapper{
						Package: "fallback", Name: "fallback", Extensions: []string{".toml"},
						OutputExtensions: map[string]string{".toml": ".js"},
					})
				}
				program := compiler.NewProgram(compiler.ProgramOptions{
					Config: config,
					Host: compiler.NewCompilerHost(fs, "/", nil, nil, fakeContentMapperHost{
						transform: func(fileName, content string) (contentmapper.Result, error) {
							return contentmapper.Result{Text: content, VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
						},
					}),
					SingleThreaded: core.TSTrue,
				})
				program.Emit(context.Background(), compiler.EmitOptions{})
				js, ok := fs.ReadFile("/dist/main.js")
				assert.Assert(t, ok)
				assert.Assert(t, strings.Contains(js, `"./claimed.js"`))
				assert.Assert(t, strings.Contains(js, core.IfElse(fallback, `"./unclaimed.js"`, `"./unclaimed.toml"`)))
				assert.Assert(t, strings.Contains(js, "__rewriteRelativeImportExtension(path"))
				assert.Equal(t, strings.Contains(js, `".toml"`), fallback)
				dts, ok := fs.ReadFile("/dist/main.d.ts")
				assert.Assert(t, ok)
				assert.Assert(t, strings.Contains(dts, `"./claimed.js"`))
				assert.Assert(t, fs.FileExists("/dist/claimed.d.ts"))
			})
		}
	}
}

func TestContentMapperOverlappingExtensionDeclarationRoundTrip(t *testing.T) {
	t.Parallel()
	fs := vfstest.FromMap(map[string]string{
		"/project/special/widget.part.toml": "export const special = 1;",
		"/project/other/widget.part.toml":   "export const other = 2;",
	}, tspath.CaseSensitive)
	mappers := []*contentmapper.Mapper{
		{Package: "compound", Name: "compound", Extensions: []string{".part.toml"}, Include: []string{"special"}},
		{Package: "fallback", Name: "fallback", Extensions: []string{".toml"}},
	}
	config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
		NoLib: core.TSTrue, Declaration: core.TSTrue, EmitDeclarationOnly: core.TSTrue,
		Module: core.ModuleKindPreserve, ModuleResolution: core.ModuleResolutionKindBundler,
		RootDir: "/project", OutDir: "/dist",
	}, []tspath.RootedFilePath{"/project/special/widget.part.toml", "/project/other/widget.part.toml"}, nil, "/project", fs.CaseSensitivity())
	config.ParsedConfig.ContentMappers = mappers
	host := compiler.NewCompilerHost(fs, "/", nil, nil, fakeContentMapperHost{
		transform: func(fileName, content string) (contentmapper.Result, error) {
			return contentmapper.Result{Text: content, VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
		},
	})
	program := compiler.NewProgram(compiler.ProgramOptions{Config: config, Host: host, SingleThreaded: core.TSTrue})
	program.Emit(t.Context(), compiler.EmitOptions{})
	assert.Assert(t, fs.FileExists("/dist/special/widget.d.part.toml.ts"))
	assert.Assert(t, fs.FileExists("/dist/other/widget.part.d.toml.ts"))

	assert.NilError(t, fs.WriteFile("/dist/main.ts", `
		import { special } from "./special/widget.part.toml";
		import { other } from "./other/widget.part.toml";
		export const values = { special, other };
	`))
	consumerConfig := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
		NoLib: core.TSTrue, AllowArbitraryExtensions: core.TSTrue,
		Module: core.ModuleKindPreserve, ModuleResolution: core.ModuleResolutionKindBundler,
	}, []tspath.RootedFilePath{"/dist/main.ts"}, nil, "/dist", fs.CaseSensitivity())
	consumerConfig.ParsedConfig.ContentMappers = mappers
	consumer := compiler.NewProgram(compiler.ProgramOptions{Config: consumerConfig, Host: host, SingleThreaded: core.TSTrue})
	main := consumer.GetSourceFile("/dist/main.ts")
	for i, path := range []tspath.RootedFilePath{"/dist/special/widget.d.part.toml.ts", "/dist/other/widget.part.d.toml.ts"} {
		resolved := consumer.GetResolvedModuleFromModuleSpecifier(main, main.Imports()[i])
		assert.Assert(t, resolved != nil)
		assert.Equal(t, resolved.ResolvedFileName, path)
	}
	assert.Equal(t, len(consumer.GetSemanticDiagnostics(t.Context(), main)), 0)
}

func TestContentMapperExcludedResolution(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name, target string
		include      []string
		rootDirs     []tspath.RootedDirectoryPath
		suffixes     []string
	}{
		{"excluded file blocks declaration fallback", "/project/src/blob.vue", []string{"elsewhere"}, nil, nil},
		{"empty include", "/project/src/blob.vue", []string{}, nil, nil},
		{"excluded suffix blocks included file", "/project/src/blob.native.vue", []string{"**/blob.vue"}, nil, []string{".native", ""}},
		{"excluded root blocks included root", "/project/src/blob.vue", []string{"generated"}, []tspath.RootedDirectoryPath{"/project/src", "/project/generated"}, nil},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			files := map[string]string{
				"/project/src/main.ts":        `import "./blob.vue";`,
				"/project/src/blob.vue":       "<template />",
				"/project/src/blob.d.vue.ts":  "export {};",
				"/project/generated/blob.vue": "<template />",
				test.target:                   "<template />",
			}
			if test.rootDirs != nil {
				delete(files, "/project/src/blob.d.vue.ts")
			}
			fs := vfstest.FromMap(files, tspath.CaseSensitive)
			config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
				NoLib: core.TSTrue, Module: core.ModuleKindPreserve, ModuleResolution: core.ModuleResolutionKindBundler,
				RootDirs: test.rootDirs, ModuleSuffixes: test.suffixes, OutDir: "/dist",
			}, []tspath.RootedFilePath{"/project/src/main.ts"}, nil, "/project", fs.CaseSensitivity())
			config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{{
				Package: "mapper", Extensions: []string{".vue"}, Include: test.include,
			}}
			program := compiler.NewProgram(compiler.ProgramOptions{
				Config: config,
				Host: compiler.NewCompilerHost(fs, "/", nil, nil, fakeContentMapperHost{
					transform: func(fileName, content string) (contentmapper.Result, error) {
						t.Errorf("unexpected transform of %s", fileName)
						return contentmapper.Result{}, errors.New("unexpected transform")
					},
				}),
				SingleThreaded: core.TSTrue,
			})
			main := program.GetSourceFile("/project/src/main.ts")
			resolved := program.GetResolvedModuleFromModuleSpecifier(main, main.Imports()[0])
			assert.Assert(t, resolved != nil)
			assert.Equal(t, resolved.ResolvedFileName, tspath.RootedFilePathFromAbsolute(test.target))
			assert.Assert(t, resolved.ResolvedUsingExtraExtensions)
			diags := program.GetIncludeProcessorDiagnostics(main)
			assert.Equal(t, len(diags), 1)
			assert.Equal(t, diags[0].Code(), diagnostics.File_0_has_a_registered_content_mapper_extension_but_does_not_match_any_content_mapper_s_include.Code())
			assert.Assert(t, program.GetSourceFile(resolved.ResolvedFileName) == nil)
			assert.Equal(t, len(program.GetSyntacticDiagnostics(t.Context(), nil)), 0)
			program.Emit(t.Context(), compiler.EmitOptions{})
			assert.Assert(t, !fs.FileExists("/dist/blob.js"))
		})
	}
}

func TestContentMapperLiteralRewriteValidation(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name, target, output string
		include              []string
		rootDirs             []tspath.RootedDirectoryPath
		moduleSuffixes       []string
		conflict, rewrite    bool
	}{
		{"rootDirs/conflict", "/project/generated/blob.toml", ".js", []string{"generated"}, []tspath.RootedDirectoryPath{"/project/src", "/project/generated"}, nil, true, false},
		{"both/conflict", "/project/generated/blob.native.toml", ".js", []string{"generated"}, []tspath.RootedDirectoryPath{"/project/src", "/project/generated"}, []string{".native", ""}, true, false},
		{"rootDirs/matching", "/project/generated/blob.toml", ".js", []string{"src", "generated"}, []tspath.RootedDirectoryPath{"/project/src", "/project/generated"}, nil, false, true},
		{"rootDirs/identity", "/project/generated/blob.toml", ".toml", []string{"generated"}, []tspath.RootedDirectoryPath{"/project/src", "/project/generated"}, nil, false, false},
		{"moduleSuffixes/conflict", "/project/src/blob.native.toml", ".js", []string{"**/*.native.toml"}, nil, []string{".native", ""}, true, false},
		{"moduleSuffixes/matching", "/project/src/blob.native.toml", ".js", []string{"**/*.toml"}, nil, []string{".native", ""}, false, true},
		{"moduleSuffixes/identity", "/project/src/blob.native.toml", ".toml", []string{"**/*.native.toml"}, nil, []string{".native", ""}, false, false},
	} {
		for _, moduleKind := range []core.ModuleKind{core.ModuleKindPreserve, core.ModuleKindESNext, core.ModuleKindCommonJS} {
			for _, declaration := range []core.Tristate{core.TSFalse, core.TSTrue} {
				name := test.name + "/" + moduleKind.String()
				if declaration.IsTrue() {
					name += "/declaration"
				}
				t.Run(name, func(t *testing.T) {
					t.Parallel()
					fs := vfstest.FromMap(map[string]string{
						"/project/src/main.ts": `
						import { make } from "./blob.toml";
						import type { TypeOnly } from "./blob.toml";
						export { value } from "./blob.toml";
						export type { TypeOnly as ExportedType } from "./blob.toml";
						export const box = make();
						export type BoxType = import("./blob.toml").Box;
						export type DirectType = TypeOnly;
					`,
						test.target: "export const value = 1; export class Box {} export interface TypeOnly {} export function make() { return new Box(); }",
					}, tspath.CaseSensitive)
					config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{
						NoLib: core.TSTrue, Declaration: declaration, RewriteRelativeImportExtensions: core.TSTrue,
						Module: moduleKind, ModuleResolution: core.ModuleResolutionKindBundler, OutDir: "/dist", RootDir: "/project",
						RootDirs: test.rootDirs, ModuleSuffixes: test.moduleSuffixes,
					}, []tspath.RootedFilePath{"/project/src/main.ts"}, nil, "/project", fs.CaseSensitivity())
					config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{{
						Package: "mapper", Name: "mapper", Extensions: []string{".toml"}, Include: test.include,
						OutputExtensions: map[string]string{".toml": test.output},
					}}
					program := compiler.NewProgram(compiler.ProgramOptions{
						Config: config,
						Host: compiler.NewCompilerHost(fs, "/", nil, nil, fakeContentMapperHost{
							transform: func(fileName, content string) (contentmapper.Result, error) {
								return contentmapper.Result{Text: content, VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
							},
						}),
						SingleThreaded: core.TSTrue,
					})
					diags := program.GetSemanticDiagnostics(t.Context(), program.GetSourceFile("/project/src/main.ts"))
					if test.conflict {
						expected := 4
						if declaration.IsTrue() {
							expected++
						}
						assert.Equal(t, len(diags), expected)
						message := diagnostics.This_relative_import_path_is_unsafe_to_rewrite_because_it_appears_not_to_match_the_content_mapper_s_include_but_does_after_resolution_with_moduleSuffixes
						if len(test.rootDirs) > 0 {
							message = diagnostics.This_relative_import_path_is_unsafe_to_rewrite_because_it_appears_not_to_match_the_content_mapper_s_include_but_does_after_resolution_with_rootDirs
							if len(test.moduleSuffixes) > 0 {
								message = diagnostics.This_relative_import_path_is_unsafe_to_rewrite_because_it_appears_not_to_match_the_content_mapper_s_include_but_does_after_resolution_with_rootDirs_and_moduleSuffixes
							}
						}
						for _, diag := range diags {
							assert.Equal(t, diag.Code(), message.Code())
							assert.Equal(t, len(diag.MessageArgs()), 0)
						}
					} else {
						assert.Equal(t, len(diags), 0)
					}
					program.Emit(t.Context(), compiler.EmitOptions{})
					specifier := `"./blob.toml"`
					if test.rewrite {
						specifier = `"./blob.js"`
					}
					outputs := []tspath.RootedFilePath{"/dist/src/main.js"}
					if declaration.IsTrue() {
						outputs = append(outputs, "/dist/src/main.d.ts")
					}
					for _, output := range outputs {
						text, ok := fs.ReadFile(output)
						assert.Assert(t, ok)
						assert.Assert(t, strings.Contains(text, specifier), text)
					}
				})
			}
		}
	}
}

func TestContentMapperVirtualExtensionSetsImpliedNodeFormat(t *testing.T) {
	t.Parallel()
	program := newContentMapperProgramWithOutputExtensions(
		t,
		fakeContentMapperHost{transform: func(fileName string, content string) (contentmapper.Result, error) {
			return contentmapper.Result{Text: "export {};", VirtualExtension: ".mts", Mappings: spanmap.New(nil)}, nil
		}},
		map[string]string{"/src/Component.vue": "<template />"},
		[]string{"/src/Component.vue"},
		&core.CompilerOptions{
			SkipLibCheck:     core.TSTrue,
			Module:           core.ModuleKindNodeNext,
			ModuleResolution: core.ModuleResolutionKindNodeNext,
		},
		map[string]string{".vue": ".mjs"},
	)

	file := program.GetSourceFile("/src/Component.vue")
	assert.Assert(t, file != nil)
	assert.Equal(t, program.GetSourceFileMetaData(file.PathKey()).ImpliedNodeFormat, core.ResolutionModeESM)
}

func TestContentMapperVirtualExtensionDeterminesModuleFormat(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name               string
		virtualExtension   string
		text               string
		module             core.ModuleKind
		moduleResolution   core.ModuleResolutionKind
		expectedFormat     core.ModuleKind
		expectedDiagnostic int32
	}{
		{
			name:               "cts",
			virtualExtension:   ".cts",
			text:               `import type { Foo } from "./dep"; declare const styles: { foo: string }; export = styles;`,
			module:             core.ModuleKindESNext,
			moduleResolution:   core.ModuleResolutionKindNode10,
			expectedFormat:     core.ModuleKindCommonJS,
			expectedDiagnostic: diagnostics.Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or_another_module_format_instead.Code(),
		},
		{
			name:               "mts",
			virtualExtension:   ".mts",
			text:               `import type { Foo } from "./dep"; export const value = 1;`,
			module:             core.ModuleKindCommonJS,
			moduleResolution:   core.ModuleResolutionKindNode10,
			expectedFormat:     core.ModuleKindESNext,
			expectedDiagnostic: diagnostics.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled.Code(),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			physicalFileName := "/src/physical" + tt.virtualExtension
			program := newContentMapperProgramWithOutputExtensions(
				t,
				fakeContentMapperHost{transform: func(fileName string, content string) (contentmapper.Result, error) {
					return contentmapper.Result{Text: content, VirtualExtension: tt.virtualExtension, Mappings: spanmap.New(nil)}, nil
				}},
				map[string]string{
					"/src/Component.vue": tt.text,
					physicalFileName:     tt.text,
					"/src/dep.ts":        "export type Foo = {};",
				},
				[]string{"/src/Component.vue", physicalFileName},
				&core.CompilerOptions{
					SkipLibCheck:              core.TSTrue,
					Module:                    tt.module,
					ModuleResolution:          tt.moduleResolution,
					ResolvePackageJsonExports: core.TSTrue,
					VerbatimModuleSyntax:      core.TSTrue,
				},
				map[string]string{".vue": tt.virtualExtension},
			)

			mappedFile := program.GetSourceFile("/src/Component.vue")
			assert.Assert(t, mappedFile != nil)
			assert.Equal(t, mappedFile.VirtualFileName(), tspath.RootedFilePathFromNormalized("/src/Component.vue"+tt.virtualExtension))
			assert.Equal(t, program.GetImpliedNodeFormatForEmit(mappedFile), tt.expectedFormat)
			assert.Equal(t, program.GetEmitModuleFormatOfFile(mappedFile), tt.expectedFormat)
			assert.Equal(t, program.GetDefaultResolutionModeForFile(mappedFile), tt.expectedFormat)

			imports := mappedFile.Imports()
			assert.Equal(t, len(imports), 1)
			assert.Equal(t, program.GetModeForUsageLocation(mappedFile, imports[0]), tt.expectedFormat)
			assert.Equal(t, program.GetEmitSyntaxForUsageLocation(mappedFile, imports[0]), tt.expectedFormat)

			mappedDiagnosticCodes := core.Map(program.GetSemanticDiagnostics(t.Context(), mappedFile), func(diagnostic *ast.Diagnostic) int32 {
				return diagnostic.Code()
			})
			assert.Assert(t, !slices.Contains(mappedDiagnosticCodes, tt.expectedDiagnostic), "mapped file has the format diagnostic: %v", mappedDiagnosticCodes)

			physicalFile := program.GetSourceFile(tspath.RootedFilePathFromNormalized(physicalFileName))
			assert.Assert(t, physicalFile != nil)
			physicalDiagnosticCodes := core.Map(program.GetSemanticDiagnostics(t.Context(), physicalFile), func(diagnostic *ast.Diagnostic) int32 {
				return diagnostic.Code()
			})
			assert.Assert(t, !slices.Contains(physicalDiagnosticCodes, tt.expectedDiagnostic), "physical file has the format diagnostic: %v", physicalDiagnosticCodes)
		})
	}
}

func TestContentMapperDeclarationModuleFormat(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		outputExtension       string
		declarationName       string
		differentPackageScope bool
	}{
		{".cjs", "Component.d.cts", false},
		{".cts", "Component.d.cts", false},
		{".mjs", "Component.d.mts", false},
		{".mts", "Component.d.mts", false},
		{".custom.mjs", "Component.custom.d.mts", false},
		{".custom.cts", "Component.custom.d.cts", false},
		{".js", "Component.d.ts", false},
		{"", "Component.d.vue.ts", false},
		{".js", "Component.d.ts", true},
		{"", "Component.d.vue.ts", true},
	} {
		for _, packageType := range []string{"module", "commonjs"} {
			for _, virtualExtension := range []string{".cts", ".cjs", ".mts", ".mjs", ".ts", ".tsx", ".js", ".jsx"} {
				name := test.outputExtension + "/" + packageType + "/" + virtualExtension
				if test.differentPackageScope {
					name += "/different-output-package"
				}
				t.Run(name, func(t *testing.T) {
					t.Parallel()
					outputPackageType := packageType
					if test.differentPackageScope {
						outputPackageType = core.IfElse(packageType == "module", "commonjs", "module")
					}
					outputExtensions := map[string]string{}
					if test.outputExtension != "" {
						outputExtensions[".vue"] = test.outputExtension
					}
					program := newContentMapperProgramWithOutputExtensions(t, fakeContentMapperHost{
						transform: func(fileName string, content string) (contentmapper.Result, error) {
							return contentmapper.Result{Text: "export const value = 1;", VirtualExtension: virtualExtension, Mappings: spanmap.New(nil)}, nil
						},
					}, map[string]string{
						"/src/package.json":  `{"type":"` + packageType + `"}`,
						"/dist/package.json": `{"type":"` + outputPackageType + `"}`,
						"/src/Component.vue": "<template />",
					}, []string{"/src/Component.vue"}, &core.CompilerOptions{
						SkipLibCheck:                    core.TSTrue,
						Module:                          core.ModuleKindNodeNext,
						ModuleResolution:                core.ModuleResolutionKindNodeNext,
						Declaration:                     core.TSTrue,
						OutDir:                          "/dist",
						RewriteRelativeImportExtensions: core.TSTrue,
					}, outputExtensions)
					file := program.GetSourceFile("/src/Component.vue")
					assert.Assert(t, file != nil)
					declarationPath := tspath.RootedFilePathFromNormalized("/dist/" + test.declarationName)
					expectedMode := ast.GetImpliedNodeFormatForFile(declarationPath, outputPackageType)
					virtualMode := ast.GetImpliedNodeFormatForFile(tspath.RootedFilePathFromNormalized("/src/Component.vue"+virtualExtension), packageType)
					fileDiagnostics := program.GetSyntacticDiagnostics(t.Context(), file)
					if virtualMode != expectedMode {
						assert.Equal(t, len(fileDiagnostics), 1)
						assert.Equal(t, fileDiagnostics[0].Code(), diagnostics.The_content_mapper_0_returned_virtual_extension_1_whose_module_format_does_not_match_declaration_output_2.Code())
						assert.Equal(t, file.Text(), "export const value = 1;")
					} else {
						assert.Equal(t, len(fileDiagnostics), 0)
						assert.Equal(t, program.GetSourceFileMetaData(file.PathKey()).ImpliedNodeFormat, expectedMode)
						paths := outputpaths.GetOutputPathsFor(file, program.Options(), program, outputpaths.ForceEmitPaths{Dts: true})
						assert.Equal(t, paths.DeclarationFilePath(), declarationPath)
						assert.Equal(t, outputpaths.GetOutputDeclarationFileNameWorker(file.FileName(), program.Options(), program), declarationPath)
					}
				})
			}
		}
	}
}

func TestContentMapperDeclarationModuleFormatSkipsJSON(t *testing.T) {
	t.Parallel()
	for _, packageType := range []string{"module", "commonjs"} {
		t.Run(packageType, func(t *testing.T) {
			t.Parallel()
			program := newContentMapperProgramWithOptions(t, fakeContentMapperHost{
				transform: func(fileName string, content string) (contentmapper.Result, error) {
					return contentmapper.Result{Text: `{"value":1}`, VirtualExtension: ".json", Mappings: spanmap.New(nil)}, nil
				},
			}, map[string]string{
				"/src/package.json":  `{"type":"` + packageType + `"}`,
				"/src/Component.vue": "<template />",
			}, []string{"/src/Component.vue"}, &core.CompilerOptions{
				Module:            core.ModuleKindNodeNext,
				ModuleResolution:  core.ModuleResolutionKindNodeNext,
				ResolveJsonModule: core.TSTrue,
				Declaration:       core.TSTrue,
				OutDir:            "/dist",
			})
			file := program.GetSourceFile("/src/Component.vue")
			assert.Assert(t, file != nil)
			assert.Assert(t, ast.IsJsonSourceFile(file))
			assert.Equal(t, len(program.GetSyntacticDiagnostics(t.Context(), file)), 0)
			paths := outputpaths.GetOutputPathsFor(file, program.Options(), program, outputpaths.ForceEmitPaths{})
			assert.Equal(t, paths.DeclarationFilePath(), tspath.RootedFilePath(""))
		})
	}
}

func TestContentMapperDeclarationModuleFormatWithoutNodeResolution(t *testing.T) {
	t.Parallel()
	for _, moduleResolution := range []core.ModuleResolutionKind{core.ModuleResolutionKindBundler, core.ModuleResolutionKindNode10} {
		for _, virtualExtension := range []string{".ts", ".mts", ".cts"} {
			t.Run(moduleResolution.String()+"/"+virtualExtension, func(t *testing.T) {
				t.Parallel()
				program := newContentMapperProgramWithOptions(t, fakeContentMapperHost{
					transform: func(fileName string, content string) (contentmapper.Result, error) {
						return contentmapper.Result{Text: "export const value = 1;", VirtualExtension: virtualExtension, Mappings: spanmap.New(nil)}, nil
					},
				}, map[string]string{
					"/src/package.json":  `{"type":"module"}`,
					"/dist/package.json": `{"type":"module"}`,
					"/src/Component.vue": "<template />",
				}, []string{"/src/Component.vue"}, &core.CompilerOptions{
					Module:           core.ModuleKindESNext,
					ModuleResolution: moduleResolution,
					OutDir:           "/dist",
				})
				file := program.GetSourceFile("/src/Component.vue")
				assert.Assert(t, file != nil)
				fileDiagnostics := program.GetSyntacticDiagnostics(t.Context(), file)
				if virtualExtension == ".cts" {
					assert.Equal(t, len(fileDiagnostics), 1)
					assert.Equal(t, fileDiagnostics[0].Code(), diagnostics.The_content_mapper_0_returned_virtual_extension_1_whose_module_format_does_not_match_declaration_output_2.Code())
				} else {
					assert.Equal(t, len(fileDiagnostics), 0)
					assert.Equal(t, file.Text(), "export const value = 1;")
				}
			})
		}
	}
}

type missingContentMappedCompilerHost struct {
	compiler.CompilerHost
}

func (missingContentMappedCompilerHost) GetContentMappedSourceFiles(ast.SourceFileParseOptions, *contentmapper.Mapper) (contentmapper.SourceFiles, error) {
	return contentmapper.SourceFiles{}, nil
}

func TestContentMapperMissingSourceFile(t *testing.T) {
	t.Parallel()
	fs := vfstest.FromMap(map[string]any{"/src/Component.vue": "export {};"}, tspath.CaseSensitive)
	config := tsoptions.NewParsedCommandLine(&core.CompilerOptions{NoLib: core.TSTrue}, testFileNames("/src/Component.vue"), nil, "/", fs.CaseSensitivity())
	config.ParsedConfig.ContentMappers = []*contentmapper.Mapper{{Package: "vue", Extensions: []string{".vue"}, Name: "vue-mapper", Version: "1.0.0"}}
	program := compiler.NewProgram(compiler.ProgramOptions{
		Config: config,
		Host:   missingContentMappedCompilerHost{CompilerHost: compiler.NewCompilerHost(fs, "/", nil, nil, nil)},
	})
	assert.Assert(t, program.GetSourceFile("/src/Component.vue") == nil)
}

func TestContentMapperDeclarationModuleFormatUsesEmitRoot(t *testing.T) {
	t.Parallel()
	for _, virtualExtension := range []string{".ts", ".mts"} {
		for _, outputPackageType := range []string{"module", "commonjs"} {
			t.Run(virtualExtension+"/"+outputPackageType, func(t *testing.T) {
				t.Parallel()
				program := newContentMapperProgramWithOptions(t, fakeContentMapperHost{
					transform: func(fileName string, content string) (contentmapper.Result, error) {
						return contentmapper.Result{Text: "export const value = 1;", VirtualExtension: virtualExtension, Mappings: spanmap.New(nil)}, nil
					},
				}, map[string]string{
					"/src/main.ts":              `import "../shared/Component.vue";`,
					"/shared/Component.vue":     "<template />",
					"/shared/package.json":      `{"type":"commonjs"}`,
					"/dist/shared/package.json": `{"type":"` + outputPackageType + `"}`,
				}, []string{"/src/main.ts"}, &core.CompilerOptions{
					SkipLibCheck:     core.TSTrue,
					Module:           core.ModuleKindNodeNext,
					ModuleResolution: core.ModuleResolutionKindNodeNext,
					Declaration:      core.TSTrue,
					OutDir:           "/dist",
				})
				file := program.GetSourceFile("/shared/Component.vue")
				assert.Assert(t, file != nil)
				paths := outputpaths.GetOutputPathsFor(file, program.Options(), program, outputpaths.ForceEmitPaths{Dts: true})
				assert.Equal(t, paths.DeclarationFilePath(), tspath.RootedFilePath("/dist/shared/Component.d.vue.ts"))
				fileDiagnostics := program.GetSyntacticDiagnostics(t.Context(), file)
				expectMismatch := (virtualExtension == ".mts") != (outputPackageType == "module")
				assert.Equal(t, len(fileDiagnostics), core.IfElse(expectMismatch, 1, 0))
				if expectMismatch {
					assert.Equal(t, fileDiagnostics[0].Code(), diagnostics.The_content_mapper_0_returned_virtual_extension_1_whose_module_format_does_not_match_declaration_output_2.Code())
				}
			})
		}
	}
}

func TestContentMapperDirectivesPreserveIncrementalGlobals(t *testing.T) {
	t.Parallel()
	for _, policy := range []ast.MappedDiagnosticDirectivePolicy{
		ast.MappedDiagnosticDirectivePolicyIgnore,
		ast.MappedDiagnosticDirectivePolicyExpect,
	} {
		t.Run(core.IfElse(policy == ast.MappedDiagnosticDirectivePolicyExpect, "expect", "ignore"), func(t *testing.T) {
			t.Parallel()
			const text = "export function values() { function* generator() { yield 1; } }"
			program := newContentMapperProgramWithOptions(t, fakeContentMapperHost{
				transform: func(fileName string, content string) (contentmapper.Result, error) {
					// The virtual source is unchanged; the directive covers the entire file, including offset zero.
					return contentmapper.Result{
						Text:             content,
						VirtualExtension: ".ts",
						Mappings: spanmap.New([]spanmap.Segment{{
							OriginalEnd: core.TextPos(len(content)),
							VirtualEnd:  core.TextPos(len(content)),
							Kind:        spanmap.KindVerbatim,
							Features:    spanmap.FeatureAll,
						}}),
						DiagnosticDirectives: []ast.MappedDiagnosticDirective{{
							VirtualRange:      core.NewTextRange(0, len(content)),
							OriginalRange:     core.NewTextRange(0, len(content)),
							Policy:            policy,
							Source:            "vue",
							UnusedCode:        2578,
							UnusedMessageText: "Unused mapped expect directive.",
						}},
					}, nil
				},
			}, map[string]string{"/src/Component.vue": text}, []string{"/src/Component.vue"}, &core.CompilerOptions{
				Lib:              []string{"lib.es5.d.ts"},
				SkipLibCheck:     core.TSTrue,
				Module:           core.ModuleKindESNext,
				ModuleResolution: core.ModuleResolutionKindBundler,
			})
			assert.Equal(t, len(program.GetGlobalDiagnostics(t.Context())), 0)
			file := program.GetSourceFile("/src/Component.vue")
			diags := program.GetSemanticDiagnosticsForIncremental(t.Context(), []*ast.SourceFile{file})[file]
			var globals, unused int
			for _, diag := range diags {
				if diag.File() == nil {
					assert.Equal(t, diag.Code(), diagnostics.Cannot_find_global_type_0.Code())
					assert.Equal(t, diag.MessageArgs()[0], "IterableIterator")
					globals++
				} else {
					assert.Equal(t, diag.File(), file)
					assert.Equal(t, diag.Source(), "vue")
					assert.Equal(t, diag.Code(), int32(2578))
					unused++
				}
			}
			assert.Equal(t, globals, 1)
			assert.Equal(t, unused, core.IfElse(policy == ast.MappedDiagnosticDirectivePolicyExpect, 1, 0))
		})
	}
}

func TestCompositeProjectContentMapperSupplementalRoots(t *testing.T) {
	t.Parallel()
	contentMapperHost := fakeContentMapperHost{transform: func(fileName string, content string) (contentmapper.Result, error) {
		return contentmapper.Result{
			Text:             "export {};",
			VirtualExtension: ".ts",
			Mappings:         spanmap.New(nil),
			Supplemental: []contentmapper.MappedResult{{
				Text:             "export {};",
				VirtualExtension: ".mts",
				Mappings:         spanmap.New(nil),
			}},
		}, nil
	}}
	options := func() *core.CompilerOptions {
		return &core.CompilerOptions{
			Composite:        core.TSTrue,
			SkipLibCheck:     core.TSTrue,
			Module:           core.ModuleKindESNext,
			ModuleResolution: core.ModuleResolutionKindBundler,
		}
	}

	t.Run("listed canonical root", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgramWithOptions(
			t,
			contentMapperHost,
			map[string]string{"/src/Component.vue": "<template />"},
			[]string{"/src/Component.vue"},
			options(),
		)

		programDiagnostics := collectContentMapperDiagnostics(program)
		hasUnlistedFileDiagnostic := slices.ContainsFunc(programDiagnostics, func(diagnostic *ast.Diagnostic) bool {
			return diagnostic.Code() == diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern.Code()
		})
		assert.Assert(t, !hasUnlistedFileDiagnostic, "supplemental output should be covered by its listed canonical root: %v", programDiagnostics)
	})

	t.Run("imported canonical file", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgramWithOptions(
			t,
			contentMapperHost,
			map[string]string{
				"/src/index.ts":      `import "./Component.vue";`,
				"/src/Component.vue": "<template />",
			},
			[]string{"/src/index.ts"},
			options(),
		)

		unlistedFileDiagnosticCount := 0
		for _, diagnostic := range collectContentMapperDiagnostics(program) {
			if diagnostic.Code() == diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern.Code() {
				unlistedFileDiagnosticCount++
			}
		}
		assert.Equal(t, unlistedFileDiagnosticCount, 2)
	})
}

func collectContentMapperDiagnostics(program *compiler.Program) []*ast.Diagnostic {
	ctx := context.Background()
	return slices.Concat(
		program.GetSyntacticDiagnostics(ctx, nil),
		program.GetSemanticDiagnostics(ctx, nil),
		program.GetProgramDiagnostics(),
	)
}

func TestContentMapperInvalidMappings(t *testing.T) {
	t.Parallel()

	const transformed = "export const x = 1;\n"
	const original = "<template>x</template>\n"
	mappings := spanmap.New([]spanmap.Segment{
		{VirtualStart: 0, VirtualEnd: 10, OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom},
		{VirtualStart: 5, VirtualEnd: core.TextPos(len(transformed)), OriginalStart: 0, OriginalEnd: 0, Kind: spanmap.KindAtom},
	})
	files := map[string]string{
		"/src/app.ts":        `import "./Component.vue";`,
		"/src/Component.vue": original,
	}
	contentMapperHost := fakeContentMapperHost{
		transform: func(fileName string, content string) (contentmapper.Result, error) {
			return contentmapper.Result{Text: transformed, VirtualExtension: ".ts", Mappings: mappings}, nil
		},
	}
	program := newContentMapperProgram(t, contentMapperHost, files, []string{"/src/app.ts"})
	programDiagnostics := collectContentMapperDiagnostics(program)
	found := slices.ContainsFunc(programDiagnostics, func(diagnostic *ast.Diagnostic) bool {
		return diagnostic.Code() == diagnostics.The_content_mapper_0_produced_overlapping_or_out_of_order_position_mappings_near_virtual_offset_1.Code()
	})
	assert.Assert(t, found, "expected an invalid mapping diagnostic, got: %v", programDiagnostics)
}

func TestContentMapperSourceFileState(t *testing.T) {
	t.Parallel()

	t.Run("successful synthesized empty file", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgram(t, fakeContentMapperHost{
			transform: func(fileName string, content string) (contentmapper.Result, error) {
				return contentmapper.Result{Text: "export {};", VirtualExtension: ".ts", Mappings: spanmap.New(nil)}, nil
			},
		}, map[string]string{"/src/empty.vue": ""}, []string{"/src/empty.vue"})
		file := program.GetSourceFile("/src/empty.vue")
		assert.Assert(t, file != nil)
		assert.Equal(t, file.OriginalText(), "")
		assert.Equal(t, file.ContentMapper(), "vue-mapper@1.0.0")
		assert.Assert(t, !file.IsContentMapperFailureStub())
	})

	t.Run("failed transform", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgram(t, fakeContentMapperHost{
			transform: func(fileName string, content string) (contentmapper.Result, error) {
				return contentmapper.Result{}, errors.New("failed")
			},
		}, map[string]string{"/src/fail.vue": "original"}, []string{"/src/fail.vue"})
		file := program.GetSourceFile("/src/fail.vue")
		assert.Assert(t, file != nil)
		assert.Equal(t, file.OriginalText(), "original")
		assert.Equal(t, file.ContentMapper(), "vue-mapper@1.0.0")
		assert.Assert(t, file.IsContentMapperFailureStub())
	})

	t.Run("project error is localized", func(t *testing.T) {
		t.Parallel()
		program := newContentMapperProgram(t, fakeContentMapperHost{
			transform: func(fileName string, content string) (contentmapper.Result, error) {
				return contentmapper.Result{}, contentmapper.NewTransformError(
					contentmapper.TransformErrorKindProject,
					&contentmapper.ProjectError{Kind: contentmapper.ProjectErrorKindMalformedResponse},
				)
			},
		}, map[string]string{"/src/fail.vue": "original"}, []string{"/src/fail.vue"})
		programDiagnostics := collectContentMapperDiagnostics(program)
		found := slices.ContainsFunc(programDiagnostics, func(diagnostic *ast.Diagnostic) bool {
			return slices.ContainsFunc(diagnostic.MessageChain(), func(message *ast.Diagnostic) bool {
				return message.Code() == diagnostics.The_content_mapper_returned_a_project_response_that_could_not_be_decoded.Code()
			})
		})
		assert.Assert(t, found, "expected a localized project response diagnostic, got: %v", programDiagnostics)
	})
}

func TestContentMapperProjectErrorDiagnostics(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		kind    contentmapper.ProjectErrorKind
		code    int32
		message string
	}{
		{
			kind:    contentmapper.ProjectErrorKindMissingConfigIdentity,
			code:    diagnostics.The_content_mapper_did_not_return_configIdentity_which_is_required_when_the_content_mapper_has_dynamicConfig_Colon_true_in_its_package_json.Code(),
			message: `The content mapper did not return 'configIdentity', which is required when the content mapper has '"dynamicConfig": true' in its package.json.`,
		},
		{
			kind:    contentmapper.ProjectErrorKindUnexpectedConfigIdentity,
			code:    diagnostics.The_content_mapper_returned_configIdentity_which_is_only_allowed_when_it_declares_dynamicConfig_Colon_true_in_its_package_json.Code(),
			message: `The content mapper returned 'configIdentity', which is only allowed when it declares '"dynamicConfig": true' in its package.json.`,
		},
		{
			kind:    contentmapper.ProjectErrorKindUnexpectedWatchedFiles,
			code:    diagnostics.The_content_mapper_returned_watchedFiles_which_is_only_allowed_when_it_declares_dynamicConfig_Colon_true_in_its_package_json.Code(),
			message: `The content mapper returned 'watchedFiles', which is only allowed when it declares '"dynamicConfig": true' in its package.json.`,
		},
	} {
		t.Run(test.message, func(t *testing.T) {
			t.Parallel()
			message := compiler.ContentMapperProjectErrorDiagnostic(&contentmapper.ProjectError{Kind: test.kind})
			assert.Equal(t, message.Code(), test.code)
			assert.Equal(t, diagnostics.Localize(locale.Default, message, message.Key()), test.message)
		})
	}
}
