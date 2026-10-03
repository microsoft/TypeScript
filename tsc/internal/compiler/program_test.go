package compiler

import (
	"fmt"
	"maps"
	"path/filepath"
	"reflect"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/tracing"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestProgramSharedData(t *testing.T) {
	t.Parallel()
	// These types use tagged or JSON payloads.
	leaves := []reflect.Type{
		reflect.TypeFor[ast.Node](),
		reflect.TypeFor[ast.SourceFile](),
		reflect.TypeFor[ast.Diagnostic](),
		reflect.TypeFor[tsoptions.ParsedCommandLine](),
		reflect.TypeFor[packagejson.PackageJson](),
	}
	for _, typ := range []reflect.Type{
		reflect.TypeFor[ProgramConfig](),
		reflect.TypeFor[module.ResolutionData](),
		reflect.TypeFor[processedFiles](),
		reflect.TypeFor[lazyValue[collections.Set[string]]](),
		reflect.TypeFor[lazyValue[symlinks.KnownSymlinks]](),
		reflect.TypeFor[lazyValue[packageNamesInfo]](),
	} {
		assert.NilError(t, testutil.CheckDataOnly(typ, leaves))
	}
	for _, typ := range []reflect.Type{
		reflect.TypeFor[ProgramOptions](),
		reflect.TypeFor[ProgramHosts](),
		reflect.TypeFor[ProgramFactories](),
		reflect.TypeFor[module.DefaultResolver](),
		reflect.TypeFor[fileLoader](),
		reflect.TypeFor[projectReferenceFileMapperBuilder](),
		reflect.TypeFor[func()](),
		reflect.TypeFor[any](),
		reflect.TypeFor[chan int](),
		reflect.TypeFor[collections.SyncMap[string, func()]](),
		reflect.TypeFor[map[string][]struct{ owner any }](),
	} {
		assert.ErrorContains(t, testutil.CheckDataOnly(typ, leaves), "shared data must not retain hosts")
	}
	// Retained state may contain these runtime dependencies, but not factories.
	retainedLeaves := append(leaves,
		reflect.TypeFor[CompilerHost](),
		reflect.TypeFor[tracing.Tracing](),
		reflect.TypeFor[CheckerPool](),
		reflect.TypeFor[checkerPool](),
		reflect.TypeFor[error](),
	)
	assert.NilError(t, testutil.CheckDataOnly(reflect.TypeFor[Program](), retainedLeaves))
	assert.ErrorContains(t, testutil.CheckDataOnly(reflect.TypeFor[ProgramOptions](), retainedLeaves), "shared data must not retain hosts")
	assert.ErrorContains(t, testutil.CheckDataOnly(reflect.TypeFor[ProgramFactories](), retainedLeaves), "shared data must not retain hosts")
	for field := range reflect.TypeFor[ProgramFactories]().Fields() {
		assert.Equal(t, field.Type.Kind(), reflect.Func, "factory field %s must not hold retained hosts", field.Name)
	}
}

func TestIncludeReasonDiagnosticsAreProgramLocal(t *testing.T) {
	t.Parallel()
	opts := ProgramConfig{Config: &tsoptions.ParsedCommandLine{}}
	oldProgram := &Program{opts: opts}
	newProgram := &Program{opts: opts}
	reason := &FileIncludeReason{kind: fileIncludeKindRootFile}
	for _, relative := range []bool{false, true} {
		oldDiagnostic := reason.toDiagnostic(oldProgram, relative, "")
		newDiagnostic := reason.toDiagnostic(newProgram, relative, "")
		assert.Equal(t, reason.toDiagnostic(oldProgram, relative, ""), oldDiagnostic)
		assert.Equal(t, reason.toDiagnostic(newProgram, relative, ""), newDiagnostic)
		assert.Assert(t, oldDiagnostic != newDiagnostic)
	}
}

func TestProgramHostsAndFactories(t *testing.T) {
	t.Parallel()
	files := map[string]any{
		"/src/tsconfig.json": `{"compilerOptions":{"noLib":true,"module":"nodenext"},"files":["index.ts"]}`,
		"/src/index.ts": `/// <reference types="dep" />
import { value } from "./dep.js"; export const result = value;`,
		"/src/dep.ts": "export const value = 1;",
		"/src/node_modules/@types/dep/index.d.ts": "export {};",
	}
	fs := vfstest.FromMap(files, tspath.CaseSensitive)
	host := NewCompilerHost(fs, "/", nil, nil, nil)
	config, diagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/src/tsconfig.json", nil, nil, fs, nil)
	assert.Equal(t, len(diagnostics), 0)
	var pools, resolvers int
	tr := new(tracing.Tracing)
	p := NewProgram(ProgramOptions{
		Config:  config,
		Host:    host,
		Tracing: tr,
		CreateCheckerPool: func(p *Program) CheckerPool {
			pools++
			assert.Equal(t, p.Tracing(), tr)
			return newCheckerPoolWithTracing(p, p.Tracing())
		},
		CreateModuleResolver: func(options module.ResolverOptions) module.Resolver {
			resolvers++
			resolverFiles := maps.Clone(files)
			resolverFiles["/factory-only/package.json"] = `{"name":"factory-host"}`
			options.Host = &compilerResolutionHost{
				host:          NewCompilerHost(vfstest.FromMap(resolverFiles, tspath.CaseSensitive), "/", nil, nil, nil),
				baseDirectory: "/",
			}
			return module.NewResolver(options)
		},
	})
	assert.Equal(t, pools, 1)
	assert.Equal(t, resolvers, 1)
	assert.Equal(t, p.Tracing(), tr)
	assert.Assert(t, p.GetPackageJsonInfo("/factory-only/package.json") == nil, "lazy lookups must not retain the factory's host")
	oldFile := p.GetSourceFile("/src/index.ts")
	resolved := p.GetResolvedModuleFromModuleSpecifier(oldFile, oldFile.Imports()[0])
	assert.Assert(t, resolved.IsResolved())
	resolvedTypeRef := p.GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(oldFile.TypeReferenceDirectives[0], oldFile)
	assert.Assert(t, resolvedTypeRef.IsResolved())

	newFiles := maps.Clone(files)
	newFiles["/src/index.ts"] = "\n" + files["/src/index.ts"].(string)
	newFiles["/probe/package.json"] = `{"name":"new-host"}`
	newHost := NewCompilerHost(vfstest.FromMap(newFiles, tspath.CaseSensitive), "/", nil, nil, nil)
	cloned, changed, reused := p.ReuseProgram("/src/index.ts", newHost,
		func(p *Program) CheckerPool {
			pools++
			assert.Equal(t, p.Host(), newHost)
			assert.Assert(t, p.Tracing() == nil)
			assert.Equal(t, p.GetSourceFile("/src/index.ts").Text(), newFiles["/src/index.ts"].(string))
			return newCheckerPoolWithTracing(p, p.Tracing())
		},
		func(module.ResolverOptions) module.Resolver {
			t.Fatal("cloning must reuse resolution data without invoking construction callbacks")
			return nil
		},
	)
	assert.Assert(t, reused)
	assert.Assert(t, cloned.Tracing() == nil)
	assert.Equal(t, p.Tracing(), tr)
	assert.Equal(t, changed, cloned.GetSourceFile("/src/index.ts"))
	assert.Equal(t, cloned.GetResolvedModuleFromModuleSpecifier(changed, changed.Imports()[0]), resolved)
	assert.Equal(t, cloned.GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(changed.TypeReferenceDirectives[0], changed), resolvedTypeRef)
	assert.Assert(t, cloned.resolutionData != p.resolutionData)
	assert.Assert(t, cloned.GetCheckerPool() != p.GetCheckerPool())
	assert.Assert(t, cloned.GetPackageJsonInfo("/probe/package.json") != nil)
	assert.Assert(t, p.GetPackageJsonInfo("/probe/package.json") == nil, "new lazy lookups must not populate the old generation's cache")
	assert.Equal(t, pools, 2)
	assert.Equal(t, resolvers, 1)

	defaults, _, reused := cloned.ReuseProgram("/src/index.ts", newHost, nil, nil)
	assert.Assert(t, reused)
	assert.Assert(t, defaults.compilerCheckerPool != nil)
	assert.Assert(t, defaults.Tracing() == nil)
	assert.Assert(t, defaults.compilerCheckerPool.tracing == nil)
	assert.Equal(t, pools, 2)

	traced := NewProgram(ProgramOptions{Config: config, Host: newHost, Tracing: tr})
	assert.Equal(t, traced.Tracing(), tr)
	assert.Equal(t, traced.compilerCheckerPool.tracing, tr)

	newFiles["/src/index.ts"] = `import "./other.js";`
	newFiles["/src/other.ts"] = "export {};"
	rebuildHost := NewCompilerHost(vfstest.FromMap(newFiles, tspath.CaseSensitive), "/", nil, nil, nil)
	rebuilt, _, reused := p.UpdateProgram("/src/index.ts", rebuildHost, nil, nil)
	assert.Assert(t, !reused)
	assert.Assert(t, rebuilt.compilerCheckerPool != nil)
	assert.Equal(t, rebuilt.Host(), rebuildHost)
	assert.Assert(t, rebuilt.Tracing() == nil)
	assert.Assert(t, rebuilt.compilerCheckerPool.tracing == nil)
	assert.Assert(t, rebuilt.GetSourceFile("/src/other.ts") != nil)
	assert.Equal(t, pools, 2)
	assert.Equal(t, resolvers, 1)
}

func TestClonedProgramProjectReferenceResolution(t *testing.T) {
	t.Parallel()
	for _, preserveSymlinks := range []bool{false, true} {
		t.Run(map[bool]string{false: "realpaths", true: "preserveSymlinks"}[preserveSymlinks], func(t *testing.T) {
			t.Parallel()
			files := map[string]any{
				"/src/tsconfig.json":          `{"compilerOptions":{"noLib":true,"module":"nodenext"},"files":["index.ts"],"references":[{"path":"../reference"}]}`,
				"/src/index.ts":               `import { value } from "reference"; export const result = value;`,
				"/src/node_modules/reference": vfstest.Symlink("/reference"),
				"/reference/tsconfig.json":    `{"compilerOptions":{"composite":true,"outDir":"dist"},"files":["index.ts"]}`,
				"/reference/package.json":     `{"name":"reference","version":"1.0.0","types":"dist/index.d.ts"}`,
				"/reference/index.ts":         "export const value = 1;",
			}
			fs := vfstest.FromMap(files, tspath.CaseSensitive)
			host := NewCompilerHost(fs, "/", nil, nil, nil)
			config, diagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/src/tsconfig.json", &core.CompilerOptions{
				PreserveSymlinks: core.BoolToTristate(preserveSymlinks),
			}, nil, fs, nil)
			assert.Equal(t, len(diagnostics), 0)
			p := NewProgram(ProgramOptions{Config: config, Host: host, UseSourceOfProjectReference: true})
			assert.Assert(t, p.GetSourceFile("/reference/index.ts") != nil)
			assert.Assert(t, !host.FS().FileExists("/reference/dist/index.d.ts"))
			newFiles := maps.Clone(files)
			newFiles["/src/index.ts"] = "\n" + files["/src/index.ts"].(string)
			newFiles["/probe/package.json"] = `{"name":"new-host"}`
			newHost := NewCompilerHost(vfstest.FromMap(newFiles, tspath.CaseSensitive), "/", nil, nil, nil)
			cloned, _, reused := p.ReuseProgram("/src/index.ts", newHost, nil, nil)
			assert.Assert(t, reused)
			assert.Equal(t, cloned.projectReferenceFileMapper, p.projectReferenceFileMapper)
			assert.Assert(t, cloned.GetSourceFile("/reference/index.ts") != nil)
			assert.Assert(t, cloned.GetPackageJsonInfo("/probe/package.json") != nil)
			// Resolve again to exercise the new .d.ts-faking host.
			resolved, _, err := cloned.newResolver().ResolveModuleName("reference", "/src/nested/probe.ts", core.ModuleKindCommonJS, nil)
			assert.NilError(t, err)
			assert.Assert(t, resolved.IsResolved())
			assert.Assert(t, strings.HasSuffix(resolved.ResolvedFileName.AsString(), "/dist/index.d.ts"))
		})
	}
}

type testFile struct {
	fileName string
	contents string
}

type programTest struct {
	testName      string
	files         []testFile
	expectedFiles []string
	target        core.ScriptTarget
}

var esnextLibs = []string{
	"lib.es5.d.ts",
	"lib.es2015.d.ts",
	"lib.es2016.d.ts",
	"lib.es2017.d.ts",
	"lib.es2018.d.ts",
	"lib.es2019.d.ts",
	"lib.es2020.d.ts",
	"lib.es2021.d.ts",
	"lib.es2022.d.ts",
	"lib.es2023.d.ts",
	"lib.es2024.d.ts",
	"lib.es2025.d.ts",
	"lib.es2026.d.ts",
	"lib.esnext.d.ts",
	"lib.dom.d.ts",
	"lib.dom.iterable.d.ts",
	"lib.dom.asynciterable.d.ts",
	"lib.webworker.importscripts.d.ts",
	"lib.scripthost.d.ts",
	"lib.es2015.core.d.ts",
	"lib.es2015.collection.d.ts",
	"lib.es2015.generator.d.ts",
	"lib.es2015.iterable.d.ts",
	"lib.es2015.promise.d.ts",
	"lib.es2015.proxy.d.ts",
	"lib.es2015.reflect.d.ts",
	"lib.es2015.symbol.d.ts",
	"lib.es2015.symbol.wellknown.d.ts",
	"lib.es2016.array.include.d.ts",
	"lib.es2016.intl.d.ts",
	"lib.es2017.arraybuffer.d.ts",
	"lib.es2017.date.d.ts",
	"lib.es2017.object.d.ts",
	"lib.es2017.sharedmemory.d.ts",
	"lib.es2017.string.d.ts",
	"lib.es2017.intl.d.ts",
	"lib.es2017.typedarrays.d.ts",
	"lib.es2018.asyncgenerator.d.ts",
	"lib.es2018.asynciterable.d.ts",
	"lib.es2018.intl.d.ts",
	"lib.es2018.promise.d.ts",
	"lib.es2018.regexp.d.ts",
	"lib.es2019.array.d.ts",
	"lib.es2019.object.d.ts",
	"lib.es2019.string.d.ts",
	"lib.es2019.symbol.d.ts",
	"lib.es2019.intl.d.ts",
	"lib.es2020.bigint.d.ts",
	"lib.es2020.date.d.ts",
	"lib.es2020.promise.d.ts",
	"lib.es2020.sharedmemory.d.ts",
	"lib.es2020.string.d.ts",
	"lib.es2020.symbol.wellknown.d.ts",
	"lib.es2020.intl.d.ts",
	"lib.es2020.number.d.ts",
	"lib.es2021.promise.d.ts",
	"lib.es2021.string.d.ts",
	"lib.es2021.weakref.d.ts",
	"lib.es2021.intl.d.ts",
	"lib.es2022.array.d.ts",
	"lib.es2022.error.d.ts",
	"lib.es2022.intl.d.ts",
	"lib.es2022.object.d.ts",
	"lib.es2022.string.d.ts",
	"lib.es2022.regexp.d.ts",
	"lib.es2023.array.d.ts",
	"lib.es2023.collection.d.ts",
	"lib.es2023.intl.d.ts",
	"lib.es2024.arraybuffer.d.ts",
	"lib.es2024.collection.d.ts",
	"lib.es2024.object.d.ts",
	"lib.es2024.promise.d.ts",
	"lib.es2024.regexp.d.ts",
	"lib.es2024.sharedmemory.d.ts",
	"lib.es2024.string.d.ts",
	"lib.es2025.collection.d.ts",
	"lib.es2025.float16.d.ts",
	"lib.es2025.intl.d.ts",
	"lib.es2025.iterator.d.ts",
	"lib.es2025.promise.d.ts",
	"lib.es2025.regexp.d.ts",
	"lib.es2026.array.d.ts",
	"lib.es2026.collection.d.ts",
	"lib.es2026.error.d.ts",
	"lib.es2026.iterator.d.ts",
	"lib.es2026.json.d.ts",
	"lib.es2026.math.d.ts",
	"lib.es2026.typedarrays.d.ts",
	"lib.esnext.promise.d.ts",
	"lib.esnext.date.d.ts",
	"lib.esnext.decorators.d.ts",
	"lib.esnext.disposable.d.ts",
	"lib.esnext.intl.d.ts",
	"lib.esnext.modulesource.d.ts",
	"lib.esnext.sharedmemory.d.ts",
	"lib.esnext.temporal.d.ts",
	"lib.decorators.d.ts",
	"lib.decorators.legacy.d.ts",
	"lib.esnext.full.d.ts",
}

var programTestCases = []programTest{
	{
		testName: "BasicFileOrdering",
		files: []testFile{
			{fileName: "c:/dev/src/index.ts", contents: "/// <reference path='c:/dev/src2/a/5.ts' />\n/// <reference path='c:/dev/src2/a/10.ts' />"},
			{fileName: "c:/dev/src2/a/5.ts", contents: "/// <reference path='4.ts' />"},
			{fileName: "c:/dev/src2/a/4.ts", contents: "/// <reference path='b/3.ts' />"},
			{fileName: "c:/dev/src2/a/b/3.ts", contents: "/// <reference path='2.ts' />"},
			{fileName: "c:/dev/src2/a/b/2.ts", contents: "/// <reference path='c/1.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');"},
			{fileName: "c:/dev/src2/a/10.ts", contents: "/// <reference path='b/c/d/9.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "/// <reference path='e/8.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "/// <reference path='7.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "/// <reference path='f/6.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');"},
		},
		expectedFiles: slices.Concat(esnextLibs,
			[]string{
				"c:/dev/src2/a/b/c/1.ts",
				"c:/dev/src2/a/b/2.ts",
				"c:/dev/src2/a/b/3.ts",
				"c:/dev/src2/a/4.ts",
				"c:/dev/src2/a/5.ts",
				"c:/dev/src2/a/b/c/d/e/f/6.ts",
				"c:/dev/src2/a/b/c/d/e/7.ts",
				"c:/dev/src2/a/b/c/d/e/8.ts",
				"c:/dev/src2/a/b/c/d/9.ts",
				"c:/dev/src2/a/10.ts",
				"c:/dev/src/index.ts",
			}),
		target: core.ScriptTargetESNext,
	},
	{
		testName: "FileOrderingImports",
		files: []testFile{
			{fileName: "c:/dev/src/index.ts", contents: "import * as five from '../src2/a/5.ts';\nimport * as ten from '../src2/a/10.ts';"},
			{fileName: "c:/dev/src2/a/5.ts", contents: "import * as four from './4.ts';"},
			{fileName: "c:/dev/src2/a/4.ts", contents: "import * as three from './b/3.ts';"},
			{fileName: "c:/dev/src2/a/b/3.ts", contents: "import * as two from './2.ts';"},
			{fileName: "c:/dev/src2/a/b/2.ts", contents: "import * as one from './c/1.ts';"},
			{fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');"},
			{fileName: "c:/dev/src2/a/10.ts", contents: "import * as nine from './b/c/d/9.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "import * as eight from './e/8.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "import * as seven from './7.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "import * as six from './f/6.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');"},
		},
		expectedFiles: slices.Concat(esnextLibs,
			[]string{
				"c:/dev/src2/a/b/c/1.ts",
				"c:/dev/src2/a/b/2.ts",
				"c:/dev/src2/a/b/3.ts",
				"c:/dev/src2/a/4.ts",
				"c:/dev/src2/a/5.ts",
				"c:/dev/src2/a/b/c/d/e/f/6.ts",
				"c:/dev/src2/a/b/c/d/e/7.ts",
				"c:/dev/src2/a/b/c/d/e/8.ts",
				"c:/dev/src2/a/b/c/d/9.ts",
				"c:/dev/src2/a/10.ts",
				"c:/dev/src/index.ts",
			}),
		target: core.ScriptTargetESNext,
	},
	{
		testName: "FileOrderingCycles",
		files: []testFile{
			{fileName: "c:/dev/src/index.ts", contents: "import * as five from '../src2/a/5.ts';\nimport * as ten from '../src2/a/10.ts';"},
			{fileName: "c:/dev/src2/a/5.ts", contents: "import * as four from './4.ts';"},
			{fileName: "c:/dev/src2/a/4.ts", contents: "import * as three from './b/3.ts';"},
			{fileName: "c:/dev/src2/a/b/3.ts", contents: "import * as two from './2.ts';\nimport * as cycle from 'c:/dev/src/index.ts'; "},
			{fileName: "c:/dev/src2/a/b/2.ts", contents: "import * as one from './c/1.ts';"},
			{fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');"},
			{fileName: "c:/dev/src2/a/10.ts", contents: "import * as nine from './b/c/d/9.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "import * as eight from './e/8.ts';\nimport * as cycle from 'c:/dev/src/index.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "import * as seven from './7.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "import * as six from './f/6.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');"},
		},
		expectedFiles: slices.Concat(esnextLibs,
			[]string{
				"c:/dev/src2/a/b/c/1.ts",
				"c:/dev/src2/a/b/2.ts",
				"c:/dev/src2/a/b/3.ts",
				"c:/dev/src2/a/4.ts",
				"c:/dev/src2/a/5.ts",
				"c:/dev/src2/a/b/c/d/e/f/6.ts",
				"c:/dev/src2/a/b/c/d/e/7.ts",
				"c:/dev/src2/a/b/c/d/e/8.ts",
				"c:/dev/src2/a/b/c/d/9.ts",
				"c:/dev/src2/a/10.ts",
				"c:/dev/src/index.ts",
			}),
		target: core.ScriptTargetESNext,
	},
}

func TestProgram(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	for _, testCase := range programTestCases {
		t.Run(testCase.testName, func(t *testing.T) {
			t.Parallel()
			libPrefix := bundled.LibPath().AsString() + "/"
			fs := vfstest.FromMap[any](nil, tspath.CaseInsensitive)
			fs = bundled.WrapFS(fs)

			for _, testFile := range testCase.files {
				_ = fs.WriteFile(tspath.RootedFilePathFromNormalized(testFile.fileName), testFile.contents)
			}

			opts := core.CompilerOptions{Target: testCase.target}

			program := NewProgram(ProgramOptions{
				Config: tsoptions.NewParsedCommandLine(&opts, []tspath.RootedFilePath{"c:/dev/src/index.ts"}, nil, "c:/dev/src", fs.CaseSensitivity()),
				Host:   NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
			})

			actualFiles := []string{}
			for _, file := range program.GetSourceFiles() {
				actualFiles = append(actualFiles, strings.TrimPrefix(file.FileName().AsString(), libPrefix))
			}

			assert.DeepEqual(t, testCase.expectedFiles, actualFiles)
		})
	}
}

func TestImportSourceProgram(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		source     string
		evaluation string
	}{
		{"static", `import source a from "./a.js";`, `import { a as value } from "./a.js";`},
		{"dynamic", `import.source("./a.js");`, `import("./a.js");`},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			content := test.source + `import source b from "missing"; import.source("other");`
			files := map[string]any{
				"/src/tsconfig.json": `{"compilerOptions":{"module":"esnext","noLib":true},"files":["index.ts"]}`,
				"/src/index.ts":      content,
				"/src/a.ts":          "export const a = 1;",
			}
			fs := vfstest.FromMap(files, tspath.CaseSensitive)
			host := NewCompilerHost(fs, "/", nil, nil, nil)
			config, diagnostics := tsoptions.GetParsedCommandLineOfConfigFile("/src/tsconfig.json", nil, nil, fs, nil)
			assert.Equal(t, len(diagnostics), 0)
			program := NewProgram(ProgramOptions{Config: config, Host: host})
			file := program.GetSourceFile("/src/index.ts")
			assert.Assert(t, program.GetSourceFile("/src/a.ts") == nil)
			assert.Equal(t, len(program.GetResolvedModules()[fs.CaseSensitivity().PathKey(file.FileName().AsPath())]), 0)
			assert.Equal(t, program.GetUnresolvedImports().Len(), 0)
			assert.Equal(t, program.collectPackageNames().unresolved.Len(), 0)

			files["/src/index.ts"] = test.evaluation + strings.TrimPrefix(content, test.source)
			host = NewCompilerHost(vfstest.FromMap(files, tspath.CaseSensitive), "/", nil, nil, nil)
			program, file, reused := program.UpdateProgram("/src/index.ts", host, nil, nil)
			assert.Assert(t, !reused)
			assert.Assert(t, program.GetSourceFile("/src/a.ts") != nil)
			for _, specifier := range file.Imports() {
				resolved := program.GetResolvedModuleFromModuleSpecifier(file, specifier)
				assert.Equal(t, resolved.IsResolved(), !ast.IsSourcePhaseImport(specifier.Parent))
			}

			files["/src/index.ts"] = content
			host = NewCompilerHost(vfstest.FromMap(files, tspath.CaseSensitive), "/", nil, nil, nil)
			program, _, reused = program.UpdateProgram("/src/index.ts", host, nil, nil)
			assert.Assert(t, !reused)
			assert.Assert(t, program.GetSourceFile("/src/a.ts") == nil)

			files["/src/index.ts"] = test.evaluation + content
			host = NewCompilerHost(vfstest.FromMap(files, tspath.CaseSensitive), "/", nil, nil, nil)
			program = NewProgram(ProgramOptions{Config: config, Host: host})
			file = program.GetSourceFile("/src/index.ts")
			for _, specifier := range file.Imports() {
				resolved := program.GetResolvedModuleFromModuleSpecifier(file, specifier)
				assert.Equal(t, resolved.IsResolved(), !ast.IsSourcePhaseImport(specifier.Parent))
			}
		})
	}
}

func TestIncludeProcessorDiagnosticsWithMissingFileCasing(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	// Use case-sensitive file names so that /src/MyFile.ts and /src/myFile.ts
	// have different canonical paths but the same lower-case path, triggering
	// file casing diagnostics in the include processor.
	fs := vfstest.FromMap[any](nil, tspath.CaseSensitive)
	fs = bundled.WrapFS(fs)

	// Only create the lowercase version; /src/MyFile.ts does not exist.
	_ = fs.WriteFile("/src/myFile.ts", `export const y = 2;`)

	opts := core.CompilerOptions{SkipDefaultLibCheck: core.TSTrue}

	// List both casings as root files. The first one (/src/MyFile.ts) will fail
	// to load because it does not exist on the case-sensitive filesystem.
	program := NewProgram(ProgramOptions{
		Config: tsoptions.NewParsedCommandLine(&opts, []tspath.RootedFilePath{"/src/MyFile.ts", "/src/myFile.ts"}, nil, "/", fs.CaseSensitivity()),
		Host:   NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
	})

	// GetProgramDiagnostics triggers getDiagnostics which processes all
	// include processor diagnostics including the casing diagnostic whose
	// file path points to the missing /src/MyFile.ts. Before the fix this
	// panicked with a nil pointer dereference.
	assert.NilError(t, func() (err error) {
		defer func() {
			if r := recover(); r != nil {
				err = fmt.Errorf("panic: %v", r)
			}
		}()
		program.GetProgramDiagnostics()
		return nil
	}())
}

func BenchmarkNewProgram(b *testing.B) {
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		b.Skip("bundled files are not embedded")
	}

	for _, testCase := range programTestCases {
		b.Run(testCase.testName, func(b *testing.B) {
			fs := vfstest.FromMap[any](nil, tspath.CaseInsensitive)
			fs = bundled.WrapFS(fs)

			for _, testFile := range testCase.files {
				_ = fs.WriteFile(tspath.RootedFilePathFromNormalized(testFile.fileName), testFile.contents)
			}

			opts := core.CompilerOptions{Target: testCase.target}
			programOpts := ProgramOptions{
				Config: tsoptions.NewParsedCommandLine(&opts, []tspath.RootedFilePath{"c:/dev/src/index.ts"}, nil, "c:/dev/src", fs.CaseSensitivity()),
				Host:   NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil),
			}

			for b.Loop() {
				NewProgram(programOpts)
			}
		})
	}

	b.Run("compiler", func(b *testing.B) {
		rootPath := tspath.RootedDirectoryPathFromAbsolute(filepath.Join(repo.TestDataPath(), "fixtures/compiler"))
		fs := bundled.WrapFS(osvfs.FS())
		host := NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
		parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile(rootPath.ResolveFile("tsconfig.json"), nil, nil, fs, nil)
		assert.Equal(b, len(errors), 0, "Expected no errors in parsed command line")
		opts := ProgramOptions{
			Config: parsed,
			Host:   host,
		}

		for b.Loop() {
			NewProgram(opts)
		}
	})
}
