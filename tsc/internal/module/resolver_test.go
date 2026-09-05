package module_test

import (
	"strings"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

type resolutionHostStub struct {
	fs  vfs.FS
	cwd tspath.RootedDirectoryPath
}

func (h *resolutionHostStub) FS() vfs.FS                                      { return h.fs }
func (h *resolutionHostStub) GetCurrentDirectory() tspath.RootedDirectoryPath { return h.cwd }

type caseInsensitiveViewFS struct {
	vfs.FS
}

func (caseInsensitiveViewFS) CaseSensitivity() tspath.CaseSensitivity {
	return tspath.CaseInsensitive
}

// Regression test for https://github.com/microsoft/TypeScript/tsc/issues/3526.
//
// Resolving a node_modules import with a trailing slash (e.g. `pkg/`) must
// produce the same result as without one.
func TestResolveModuleNameTrailingSlash(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/pkg/package.json": `{"name":"pkg","main":"main.js","types":"main.d.ts"}`,
		"/repo/node_modules/pkg/main.d.ts":    "export const x: number;",
		"/repo/node_modules/pkg/main.js":      "exports.x = 1;",
		"/repo/src/file.ts":                   "",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	for _, name := range []string{"pkg", "pkg/"} {
		r, _ := resolver.ResolveModuleName(name, tspath.RootedFilePathFromNormalized("/repo/src/file.ts"), core.ModuleKindESNext, nil)
		if !r.IsResolved() {
			t.Errorf("%q failed to resolve", name)
		}
		if r.ResolvedPath != tspath.CaseSensitive.PathKey(tspath.RootedPath(r.ResolvedFileName)) {
			t.Errorf("%q resolved path = %q, expected key for %q", name, r.ResolvedPath, r.ResolvedFileName)
		}
	}
}

func TestResolveDynamicModuleNameUsingRootDirs(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name       string
		targetRoot tspath.RootedDirectoryPath
		targetFile tspath.RootedFilePath
	}{
		{
			name:       "dynamic roots",
			targetRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/generated",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~7e74732d7572697e76327e66696c65~.ts",
		},
		{
			name:       "dynamic to disk",
			targetRoot: "c:/generated",
			targetFile: "c:/generated/~ts-uri~v2~file.ts",
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			const sourceFile = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
			fs := vfstest.FromMap(map[string]string{
				sourceFile:                 "",
				test.targetFile.AsString(): "export const value = 1;",
			}, tspath.CaseSensitive)
			host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
			opts := &core.CompilerOptions{
				ModuleResolution: core.ModuleResolutionKindBundler,
				Module:           core.ModuleKindESNext,
				Target:           core.ScriptTargetESNext,
				RootDirs: []tspath.RootedDirectoryPath{
					"^/~ts-uri-v2~/custom/ts-nul-authority/src",
					test.targetRoot,
				},
			}

			resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
			resolved, _ := resolver.ResolveModuleName(
				"./~ts-uri~v2~file",
				tspath.RootedFilePathFromNormalized(sourceFile),
				core.ModuleKindESNext,
				nil,
			)
			if !resolved.IsResolved() {
				t.Fatal("expected dynamic module to resolve through rootDirs")
			}
			if resolved.ResolvedFileName != test.targetFile {
				t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, test.targetFile)
			}
		})
	}
}

func TestRootDirsPreservesExceptionalDynamicSegments(t *testing.T) {
	t.Parallel()

	const (
		sourceFile = "^/~ts-uri-v2~/custom/ts-nul-authority/src/~ts-uri~v2~2e2e~/main.ts"
		targetFile = "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~2e2e~/dep.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile: "",
		targetFile: "export const value = 1;",
		"^/~ts-uri-v2~/custom/ts-nul-authority/dep.ts": "export const wrong = 1;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
		RootDirs: []tspath.RootedDirectoryPath{
			"^/~ts-uri-v2~/custom/ts-nul-authority/src",
			"^/~ts-uri-v2~/custom/ts-nul-authority/generated",
		},
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
	resolved, _ := resolver.ResolveModuleName(
		"./dep",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() || resolved.ResolvedFileName != targetFile {
		t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, targetFile)
	}
}

func TestRootDirsRejectsUnrepresentableDiskSegments(t *testing.T) {
	t.Parallel()

	for _, sourceFile := range []tspath.RootedFilePath{
		"^/~ts-uri-v2~/custom/ts-nul-authority/src/~ts-uri~v2~2e2e~/main.ts",
		"^/~ts-uri-v2~/custom/ts-nul-authority/src/c:/main.ts",
		"^/~ts-uri-v2~/custom/ts-nul-authority/src/^/main.ts",
	} {
		t.Run(sourceFile.AsString(), func(t *testing.T) {
			t.Parallel()

			fs := vfstest.FromMap(map[string]string{
				sourceFile.AsString(): "",
				"c:/dep.ts":           "export const wrong = 1;",
			}, tspath.CaseSensitive)
			host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
			opts := &core.CompilerOptions{
				ModuleResolution: core.ModuleResolutionKindBundler,
				Module:           core.ModuleKindESNext,
				Target:           core.ScriptTargetESNext,
				RootDirs: []tspath.RootedDirectoryPath{
					"^/~ts-uri-v2~/custom/ts-nul-authority/src",
					"c:/generated",
				},
			}

			resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
			resolved, _ := resolver.ResolveModuleName(
				"./dep",
				sourceFile,
				core.ModuleKindESNext,
				nil,
			)
			if resolved.IsResolved() {
				t.Errorf("unexpectedly resolved unrepresentable disk path to %q", resolved.ResolvedFileName)
			}
		})
	}
}

func TestRootDirsEscapesRootLikeDynamicSegments(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		sourceFile tspath.RootedFilePath
		targetFile tspath.RootedFilePath
	}{
		{
			sourceFile: "^/~ts-uri-v2~/custom/ts-nul-authority/src/c:/main.ts",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~633a~/dep.ts",
		},
		{
			sourceFile: "^/~ts-uri-v2~/custom/ts-nul-authority/src/^/main.ts",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~5e~/dep.ts",
		},
	} {
		t.Run(test.sourceFile.AsString(), func(t *testing.T) {
			t.Parallel()

			fs := vfstest.FromMap(map[string]string{
				test.sourceFile.AsString(): "",
				test.targetFile.AsString(): "export const value = 1;",
				"c:/dep.ts":                "export const wrong = 1;",
				"^/dep.ts":                 "export const wrong = 1;",
			}, tspath.CaseSensitive)
			host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
			opts := &core.CompilerOptions{
				ModuleResolution: core.ModuleResolutionKindBundler,
				Module:           core.ModuleKindESNext,
				Target:           core.ScriptTargetESNext,
				RootDirs: []tspath.RootedDirectoryPath{
					"^/~ts-uri-v2~/custom/ts-nul-authority/src",
					"^/~ts-uri-v2~/custom/ts-nul-authority/generated",
				},
			}

			resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
			resolved, _ := resolver.ResolveModuleName("./dep", test.sourceFile, core.ModuleKindESNext, nil)
			if !resolved.IsResolved() || resolved.ResolvedFileName != test.targetFile {
				t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, test.targetFile)
			}
		})
	}
}

func TestRootDirsPreservesRelativeDiskSuffixes(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		sourceFile tspath.RootedFilePath
		targetRoot tspath.RootedDirectoryPath
		targetFile tspath.RootedFilePath
	}{
		{
			sourceFile: "c:/src/^/main.ts",
			targetRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/generated",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~5e~/dep.ts",
		},
		{
			sourceFile: "c:/src/c:/main.ts",
			targetRoot: "d:/generated",
			targetFile: "d:/generated/c:/dep.ts",
		},
	} {
		t.Run(test.sourceFile.AsString(), func(t *testing.T) {
			t.Parallel()

			fs := vfstest.FromMap(map[string]string{
				test.sourceFile.AsString(): "",
				test.targetFile.AsString(): "export const value = 1;",
				"^/dep.ts":                 "export const wrong = 1;",
				"c:/dep.ts":                "export const wrong = 1;",
			}, tspath.CaseSensitive)
			host := &resolutionHostStub{fs: fs, cwd: "c:/"}
			opts := &core.CompilerOptions{
				ModuleResolution: core.ModuleResolutionKindBundler,
				Module:           core.ModuleKindESNext,
				Target:           core.ScriptTargetESNext,
				RootDirs: []tspath.RootedDirectoryPath{
					"c:/src",
					test.targetRoot,
				},
			}

			resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
			resolved, _ := resolver.ResolveModuleName("./dep", test.sourceFile, core.ModuleKindESNext, nil)
			if !resolved.IsResolved() || resolved.ResolvedFileName != test.targetFile {
				t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, test.targetFile)
			}
		})
	}
}

func TestRootDirsPreservesRelativeDirectoryIntent(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name       string
		sourceRoot tspath.RootedDirectoryPath
		sourceFile tspath.RootedFilePath
		targetRoot tspath.RootedDirectoryPath
		targetFile tspath.RootedFilePath
	}{
		{
			name:       "disk to disk",
			sourceRoot: "c:/src",
			sourceFile: "c:/src/^/main.ts",
			targetRoot: "d:/generated",
			targetFile: "d:/generated/^/pkg/index.ts",
		},
		{
			name:       "disk to dynamic",
			sourceRoot: "c:/src",
			sourceFile: "c:/src/^/main.ts",
			targetRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/generated",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~5e~/pkg/index.ts",
		},
		{
			name:       "empty suffix to dynamic",
			sourceRoot: "c:/src",
			sourceFile: "c:/src/main.ts",
			targetRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/generated",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/index.ts",
		},
		{
			name:       "empty suffix to disk",
			sourceRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/src",
			sourceFile: "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts",
			targetRoot: "d:/generated",
			targetFile: "d:/generated/index.ts",
		},
		{
			name:       "literal empty segment to dynamic",
			sourceRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/src",
			sourceFile: "^/~ts-uri-v2~/custom/ts-nul-authority/src/~ts-uri~v2~~/main.ts",
			targetRoot: "^/~ts-uri-v2~/custom/ts-nul-authority/generated",
			targetFile: "^/~ts-uri-v2~/custom/ts-nul-authority/generated/~ts-uri~v2~~/index.ts",
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			fs := vfstest.FromMap(map[string]string{
				test.sourceFile.AsString(): "",
				test.targetFile.AsString(): "export const value = 1;",
				"^/pkg/index.ts":           "export const wrong = 1;",
				"d:/generated.ts":          "export const wrong = 1;",
			}, tspath.CaseSensitive)
			host := &resolutionHostStub{fs: fs, cwd: "c:/"}
			opts := &core.CompilerOptions{
				ModuleResolution: core.ModuleResolutionKindBundler,
				Module:           core.ModuleKindCommonJS,
				Target:           core.ScriptTargetESNext,
				RootDirs:         []tspath.RootedDirectoryPath{test.sourceRoot, test.targetRoot},
			}

			moduleName := "./pkg/"
			if strings.Contains(test.name, "empty suffix") || test.name == "literal empty segment to dynamic" {
				moduleName = "./"
			}
			resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
			resolved, _ := resolver.ResolveModuleName(moduleName, test.sourceFile, core.ModuleKindCommonJS, nil)
			if !resolved.IsResolved() || resolved.ResolvedFileName != test.targetFile {
				t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, test.targetFile)
			}
		})
	}
}

func TestResolveDynamicPackageJSONPath(t *testing.T) {
	t.Parallel()

	const (
		fallbackFile = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/pkg/~ts-uri~v2~7e74732d7572697e76327e7479706573~.d.ts"
		targetFile   = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/pkg/ts3.1/~ts-uri~v2~7e74732d7572697e76327e7479706573~.d.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		"^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts":                   "",
		"^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/pkg/package.json": `{"name":"pkg","types":"~ts-uri~v2~types.d.ts","typesVersions":{"*":{"*":["ts3.1/*"]}}}`,
		fallbackFile: "export const fallback: number;",
		targetFile:   "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
	resolved, _ := resolver.ResolveModuleName(
		"pkg",
		tspath.RootedFilePathFromNormalized("^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected dynamic package path to resolve")
	}
	if resolved.ResolvedFileName != targetFile {
		t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, targetFile)
	}
	if resolved.Extension != tspath.ExtensionDts || !resolved.ResolvedFileName.IsDeclarationFile() {
		t.Errorf("resolved declaration was classified as extension %q", resolved.Extension)
	}
}

func TestResolveDynamicPackageSubpathFile(t *testing.T) {
	t.Parallel()

	const (
		sourceFile = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		targetFile = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/pkg/~ts-uri~v2~7e74732d7572697e76327e3636366636667e~.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile: "",
		"^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/pkg/package.json": `{"name":"pkg"}`,
		targetFile: "export const value = 1;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
	resolved, _ := resolver.ResolveModuleName(
		"pkg/~ts-uri~v2~666f6f~.ts",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() || resolved.ResolvedFileName != targetFile {
		t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, targetFile)
	}
}

func TestResolveDynamicESMPackageIndexFromReservedDirectory(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageName      = "~ts-uri~v2~pkg.js"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/~ts-uri~v2~7e74732d7572697e76327e706b672e6a73~"
		targetFile       = packageDirectory + "/index.js"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"` + packageName + `"}`,
		targetFile:                         "exports.value = 1;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
	resolved, _ := resolver.ResolveModuleName(
		packageName,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() || resolved.ResolvedFileName != targetFile {
		t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, targetFile)
	}
}

func TestResolveDynamicDottedDirectory(t *testing.T) {
	t.Parallel()

	const (
		sourceFile = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		targetFile = "^/~ts-uri-v2~/custom/ts-nul-authority/src/~ts-uri~v2~7e74732d7572697e76327e6469722e6a73~/index.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile: "",
		targetFile: "export const value = 1;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindCommonJS,
		Target:           core.ScriptTargetESNext,
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)
	resolved, _ := resolver.ResolveModuleName(
		"./~ts-uri~v2~dir.js",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindCommonJS,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected dotted dynamic directory to resolve")
	}
	if resolved.ResolvedFileName != targetFile {
		t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, targetFile)
	}
}

func TestResolvedModuleCarriesCaseInsensitivePath(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/Repo/node_modules/Pkg/package.json": `{"name":"pkg","types":"Index.d.ts"}`,
		"/Repo/node_modules/Pkg/Index.d.ts":   "export const x: number;",
		"/Repo/src/file.ts":                   "",
	}, tspath.CaseInsensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/Repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName("Pkg", tspath.RootedFilePathFromNormalized("/Repo/src/file.ts"), core.ModuleKindESNext, nil)
	if !resolved.IsResolved() {
		t.Fatal("expected module to resolve")
	}
	assertPath := tspath.CaseInsensitive.PathKey(tspath.RootedPath(resolved.ResolvedFileName))
	if resolved.ResolvedPath != assertPath {
		t.Errorf("resolved path = %q, expected %q", resolved.ResolvedPath, assertPath)
	}
}

func TestResolvedTypeReferenceDirectiveCarriesPath(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/@types/pkg/package.json": `{"name":"@types/pkg","types":"index.d.ts"}`,
		"/repo/node_modules/@types/pkg/index.d.ts":   "export const x: number;",
		"/repo/src/file.ts":                          "",
	}, tspath.CaseInsensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveTypeReferenceDirective(
		"pkg",
		tspath.RootedFilePathFromNormalized("/repo/src/file.ts"),
		core.ResolutionModeNone,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected type reference directive to resolve")
	}
	expected := tspath.CaseInsensitive.PathKey(tspath.RootedPath(resolved.ResolvedFileName))
	if resolved.ResolvedPath != expected {
		t.Errorf("resolved path = %q, expected %q", resolved.ResolvedPath, expected)
	}
}

func TestResolvedEntrypointCarriesPath(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/Repo/node_modules/Pkg/package.json": `{"name":"pkg","types":"Index.d.ts"}`,
		"/Repo/node_modules/Pkg/Index.d.ts":   "export const x: number;",
		"/Repo/src/file.ts":                   "",
	}, tspath.CaseInsensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/Repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName("Pkg", tspath.RootedFilePathFromNormalized("/Repo/src/file.ts"), core.ModuleKindESNext, nil)
	if !resolved.IsResolved() {
		t.Fatal("expected module to resolve")
	}
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
	if len(entrypoints) != 1 {
		t.Fatalf("entrypoint count = %d, expected 1", len(entrypoints))
	}
	entrypoint := entrypoints[0]
	expected := tspath.CaseInsensitive.PathKey(tspath.RootedPath(entrypoint.ResolvedFileName))
	if entrypoint.ResolvedPath != expected {
		t.Errorf("resolved path = %q, expected %q", entrypoint.ResolvedPath, expected)
	}
}

func TestDynamicExportPatternEntrypointUsesLogicalName(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name            string
		packageJSON     string
		importName      string
		moduleSpecifier string
	}{
		{
			name:            "logical wildcard match",
			packageJSON:     `{"name":"Pkg","exports":{"./*":"./*.d.ts"}}`,
			importName:      "Pkg/~ts-uri~v2~value",
			moduleSpecifier: "Pkg/~ts-uri-spec~v2~7e74732d7572697e76327e76616c7565~",
		},
		{
			name:            "reserved target pattern",
			packageJSON:     `{"name":"Pkg","exports":{"./*":"./~ts-uri~v2~*.d.ts"}}`,
			importName:      "Pkg/value",
			moduleSpecifier: "Pkg/value",
		},
		{
			name:            "reserved wildcard with trailer",
			packageJSON:     `{"name":"Pkg","exports":{"./*":"./*-impl.d.ts"}}`,
			importName:      "Pkg/~ts-uri~v2~value",
			moduleSpecifier: "Pkg/~ts-uri-spec~v2~7e74732d7572697e76327e76616c7565~",
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			const sourceFile = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
			targetFile := "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg/~ts-uri~v2~7e74732d7572697e76327e76616c7565~.d.ts"
			if test.name == "reserved wildcard with trailer" {
				targetFile = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg/~ts-uri~v2~7e74732d7572697e76327e76616c75652d696d706c~.d.ts"
			}
			fs := vfstest.FromMap(map[string]string{
				sourceFile: "",
				"^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg/package.json": test.packageJSON,
				targetFile: "export const value: number;",
			}, tspath.CaseSensitive)
			host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
			opts := &core.CompilerOptions{
				ModuleResolution: core.ModuleResolutionKindBundler,
				Module:           core.ModuleKindESNext,
				Target:           core.ScriptTargetESNext,
			}
			resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

			resolved, _ := resolver.ResolveModuleName(
				test.importName,
				tspath.RootedFilePathFromNormalized(sourceFile),
				core.ModuleKindESNext,
				nil,
			)
			if !resolved.IsResolved() {
				t.Fatal("expected dynamic package export to resolve")
			}
			var packageJson *packagejson.InfoCacheEntry
			resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
				if entry.Exists() {
					packageJson = entry
					return false
				}
				return true
			})
			if packageJson == nil {
				t.Fatal("expected package JSON cache entry")
			}

			entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
			if len(entrypoints) != 1 {
				t.Fatalf("entrypoint count = %d, expected 1", len(entrypoints))
			}
			if entrypoints[0].ModuleSpecifier.AsString() != test.moduleSpecifier {
				t.Errorf("module specifier = %q, expected %q", entrypoints[0].ModuleSpecifier, test.moduleSpecifier)
			}
		})
	}
}

func TestGeneratedDynamicEntrypointSpecifierResolvesEncodedFile(t *testing.T) {
	t.Parallel()

	const (
		sourceFile      = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageFile     = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg/~ts-uri~v2~7e74732d7572697e76327e76616c7565~.d.ts"
		moduleSpecifier = "Pkg/~ts-uri-spec~v2~7e74732d7572697e76327e76616c7565~.d.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile: "",
		"^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg/package.json": `{"name":"Pkg"}`,
		packageFile: "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolver.ResolveModuleName(
		"Pkg",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", true)
	if len(entrypoints) != 1 || entrypoints[0].ModuleSpecifier.AsString() != moduleSpecifier {
		t.Fatalf("entrypoints = %v, expected %q", entrypoints, moduleSpecifier)
	}

	resolved, _ := resolver.ResolveModuleName(
		moduleSpecifier,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() || resolved.ResolvedFileName != packageFile {
		t.Errorf("resolved file = %q, expected %q", resolved.ResolvedFileName, packageFile)
	}
}

func TestDynamicEntrypointsEncodePhysicalPackageNameAndRootLikePath(t *testing.T) {
	t.Parallel()

	const (
		sourceFile          = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		physicalPackageName = "~ts-uri~v2~7e74732d7572697e76327e706b672e6a73~"
		sourcePackageName   = "~ts-uri-spec~v2~7e74732d7572697e76327e706b672e6a73~"
		packageDirectory    = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/" + physicalPackageName
		targetFile          = packageDirectory + "/~ts-uri~v2~633a~/value.d.ts"
		moduleSpecifier     = sourcePackageName + "/~ts-uri-spec~v2~633a~/value.d.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"~ts-uri~v2~pkg.js"}`,
		targetFile:                         "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolver.ResolveModuleName(
		sourcePackageName,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, physicalPackageName, true)
	if len(entrypoints) != 1 || entrypoints[0].ModuleSpecifier.AsString() != moduleSpecifier {
		t.Fatalf("entrypoints = %v, expected %q", entrypoints, moduleSpecifier)
	}
	resolved, _ := resolver.ResolveModuleName(
		moduleSpecifier,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() || resolved.ResolvedFileName != targetFile {
		t.Errorf("generated module specifier resolved to %q, expected %q", resolved.ResolvedFileName, targetFile)
	}
}

func TestDynamicExportPatternPreservesStaticSourcePrefix(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg"
		targetFile       = packageDirectory + "/foo.d.ts"
		moduleSpecifier  = "Pkg/~ts-uri~v2~prefix/foo"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"Pkg","exports":{"./~ts-uri~v2~prefix/*":"./*.d.ts"}}`,
		targetFile:                         "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName(
		moduleSpecifier,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected static reserved-prefix export to resolve")
	}
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
	if len(entrypoints) != 1 || entrypoints[0].ModuleSpecifier.AsString() != moduleSpecifier {
		t.Fatalf("entrypoints = %v, expected %q", entrypoints, moduleSpecifier)
	}
}

func TestDynamicExportPatternKeepsPackageForRootLikeMatch(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg"
		targetFile       = packageDirectory + "/~ts-uri~v2~633a~/value.d.ts"
		moduleSpecifier  = "Pkg/~ts-uri-spec~v2~633a~/value"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"Pkg","exports":{"./*":"./*.d.ts"}}`,
		targetFile:                         "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName(
		moduleSpecifier,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected root-like dynamic export to resolve")
	}
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
	if len(entrypoints) != 1 || entrypoints[0].ModuleSpecifier.AsString() != moduleSpecifier {
		t.Fatalf("entrypoints = %v, expected %q", entrypoints, moduleSpecifier)
	}
}

func TestDynamicEntrypointsPreserveCaseDistinctFiles(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg"
	)
	fs := caseInsensitiveViewFS{vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"Pkg","types":"Foo.d.ts"}`,
		packageDirectory + "/Foo.d.ts":     "export const upper: number;",
		packageDirectory + "/foo.d.ts":     "export const lower: number;",
	}, tspath.CaseSensitive)}
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolver.ResolveModuleName(
		"Pkg",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", true)
	if len(entrypoints) != 2 {
		t.Fatalf("entrypoint count = %d, expected 2", len(entrypoints))
	}
}

func TestDiskExportPatternKeepsReservedPrefixLiteral(t *testing.T) {
	t.Parallel()

	const targetFile = "/repo/node_modules/pkg/~ts-uri~v2~666f6f~.d.ts"
	fs := vfstest.FromMap(map[string]string{
		"/repo/src/main.ts":                   "",
		"/repo/node_modules/pkg/package.json": `{"name":"pkg","exports":{"./*":"./*.d.ts"}}`,
		targetFile:                            "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName(
		"pkg/~ts-uri~v2~666f6f~",
		tspath.RootedFilePathFromNormalized("/repo/src/main.ts"),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected disk package export to resolve")
	}
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "pkg", false)
	if len(entrypoints) != 1 || entrypoints[0].ModuleSpecifier.AsString() != "pkg/~ts-uri~v2~666f6f~" {
		t.Errorf("entrypoints = %v, expected literal reserved-prefix entrypoint", entrypoints)
	}
}

func TestDynamicExportPatternUnderExceptionalParent(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/work/~ts-uri~v2~2e2e~/src/main.ts"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/work/~ts-uri~v2~2e2e~/node_modules/Pkg"
		targetFile       = packageDirectory + "/foo.d.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"Pkg","exports":{"./*":"./*.d.ts"}}`,
		targetFile:                         "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}

	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName(
		"Pkg/foo",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected dynamic package export to resolve")
	}
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}

	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
	if len(entrypoints) != 1 || entrypoints[0].ModuleSpecifier.AsString() != "Pkg/foo" {
		t.Errorf("entrypoints = %v, expected logical Pkg/foo entrypoint", entrypoints)
	}
}

func TestDynamicExportPatternWithEmptyMatch(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg"
		targetFile       = packageDirectory + "/index.d.ts"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"Pkg","exports":{"./foo/*":"./index*.d.ts"}}`,
		targetFile:                         "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName(
		"Pkg/foo/",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() {
		t.Fatal("expected empty wildcard package export to resolve")
	}
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
	if len(entrypoints) != 1 {
		t.Fatalf("entrypoint count = %d, expected 1", len(entrypoints))
	}
	generated := entrypoints[0].ModuleSpecifier.AsString()
	resolved, _ = resolver.ResolveModuleName(
		generated,
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	if !resolved.IsResolved() || resolved.ResolvedFileName != targetFile {
		t.Errorf("generated module specifier %q resolved to %q, expected %q", generated, resolved.ResolvedFileName, targetFile)
	}
}

func TestUnaddressableEmptyExportPatternIsNotAnEntrypoint(t *testing.T) {
	t.Parallel()

	const (
		sourceFile       = "^/~ts-uri-v2~/custom/ts-nul-authority/src/main.ts"
		packageDirectory = "^/~ts-uri-v2~/custom/ts-nul-authority/node_modules/Pkg"
	)
	fs := vfstest.FromMap(map[string]string{
		sourceFile:                         "",
		packageDirectory + "/package.json": `{"name":"Pkg","exports":{"./*":"./index*.d.ts"}}`,
		packageDirectory + "/index.d.ts":   "export const value: number;",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "^/~ts-uri-v2~/custom/ts-nul-authority/"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolver.ResolveModuleName(
		"Pkg",
		tspath.RootedFilePathFromNormalized(sourceFile),
		core.ModuleKindESNext,
		nil,
	)
	var packageJson *packagejson.InfoCacheEntry
	resolver.PackageJsonCacheEntries(func(_ tspath.PathKey, entry *packagejson.InfoCacheEntry) bool {
		if entry.Exists() {
			packageJson = entry
			return false
		}
		return true
	})
	if packageJson == nil {
		t.Fatal("expected package JSON cache entry")
	}
	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, "Pkg", false)
	if len(entrypoints) != 0 {
		t.Errorf("entrypoints = %v, expected unaddressable empty wildcard match to be omitted", entrypoints)
	}
}

func TestResolverRejectsMismatchedPackageJsonCacheCaseSensitivity(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	defer func() {
		if recover() == nil {
			t.Fatal("expected mismatched package JSON cache case sensitivity to panic")
		}
	}()
	module.NewResolverWithOptions(
		host,
		host.cwd,
		&core.CompilerOptions{},
		"",
		"",
		module.ResolverOptions{PackageJsonCache: packagejson.NewInfoCache(tspath.CaseInsensitive)},
	)
}

func TestResolveModuleNameBlockedByNullExport(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/pkg/package.json": `{"name":"pkg","exports":{".":null}}`,
		"/repo/src/file.ts":                   "",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName("pkg", tspath.RootedFilePathFromNormalized("/repo/src/file.ts"), core.ModuleKindESNext, nil)
	if resolved.IsResolved() {
		t.Fatalf("expected null export to remain unresolved, got %q", resolved.ResolvedFileName)
	}
	if resolved.ResolvedPath != "" {
		t.Fatalf("unresolved module has path %q", resolved.ResolvedPath)
	}
}

func TestResolveModuleNameExportTargetWithTrailingSlashDoesNotResolveAsFile(t *testing.T) {
	t.Parallel()

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/pkg/package.json": `{"name":"pkg","exports":{".":"./index.d.ts/"}}`,
		"/repo/node_modules/pkg/index.d.ts":   "export const x: number;",
		"/repo/src/file.ts":                   "",
	}, tspath.CaseSensitive)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	resolved, _ := resolver.ResolveModuleName("pkg", tspath.RootedFilePathFromNormalized("/repo/src/file.ts"), core.ModuleKindESNext, nil)
	if resolved.IsResolved() {
		t.Fatalf("expected directory-only export target to remain unresolved, got %q", resolved.ResolvedFileName)
	}
}

// blockingFS wraps a vfs.FS and forces FileExists calls for `targetPath` to
// block on `gate` until released. Each caller sends on `arrived` when it
// reaches the gate. This is used to deterministically reproduce the
// `package.json` info-cache insert race described in
// https://github.com/microsoft/TypeScript/tsc/issues/3526.
type blockingFS struct {
	vfs.FS
	targetPath tspath.RootedFilePath
	gate       chan struct{}
	arrived    chan struct{} // each blocked goroutine sends one value
}

// waitForSignal waits for a synchronization point in these race regression
// tests and converts deadlocks into deterministic test failures.
func waitForSignal(t *testing.T, ch <-chan struct{}, description string) {
	t.Helper()
	select {
	case <-ch:
		return
	case <-t.Context().Done():
		t.Fatalf("timed out waiting for %s", description)
	}
}

func (f *blockingFS) FileExists(path tspath.RootedFilePath) bool {
	if path == f.targetPath {
		f.arrived <- struct{}{}
		<-f.gate
	}
	return f.FS.FileExists(path)
}

// flipFileExistsFS wraps a vfs.FS and returns false for the first
// FileExists call to `targetPath`, then true for the second. Both calls
// signal arrival via channel then block until released via their respective
// gate channels. ReadFile for the target path also signals arrival then
// blocks, so the "file doesn't exist" Set completes before the "file exists"
// Set (reproducing the LoadOrStore race).
type flipFileExistsFS struct {
	vfs.FS
	targetPath    tspath.RootedFilePath
	callCount     atomic.Int32
	firstArrived  chan struct{} // closed when the first FileExists caller arrives
	secondArrived chan struct{} // closed when the second FileExists caller arrives
	firstGate     chan struct{}
	secondGate    chan struct{}
	readArrived   chan struct{} // closed when ReadFile caller arrives
	readGate      chan struct{}
}

func (f *flipFileExistsFS) FileExists(path tspath.RootedFilePath) bool {
	if path == f.targetPath {
		n := f.callCount.Add(1)
		if n == 1 {
			close(f.firstArrived)
			<-f.firstGate
			return false // first caller: simulate "file not yet visible"
		}
		if n == 2 {
			close(f.secondArrived)
			<-f.secondGate
			return f.FS.FileExists(path) // second caller: file is visible
		}
	}
	return f.FS.FileExists(path)
}

func (f *flipFileExistsFS) ReadFile(path tspath.RootedFilePath) (string, bool) {
	if path == f.targetPath {
		close(f.readArrived)
		<-f.readGate
	}
	return f.FS.ReadFile(path)
}

// Regression test for https://github.com/microsoft/TypeScript/tsc/issues/3526.
//
// Two goroutines resolve the same package via specifiers that differ only by
// a trailing slash (`pkg` and `pkg/`). A blocking FS holds both at the
// `FileExists` check for `package.json` — *after* each has confirmed a
// `package.json` info-cache miss but *before* either has called `Set`. When
// released, both proceed to `LoadOrStore` and one of them loses. Without the
// fix, the loser receives the winner's `InfoCacheEntry` whose
// `PackageDirectory` doesn't match its own `candidate` (because one spelling
// has a trailing slash and the other doesn't), and
// `loadNodeModuleFromDirectoryWorker`'s `ComparePaths` check skips loading
// the package's `main`/`types`. With no `index.*` present, resolution falls
// through to "unresolved" — the phantom TS2307 the issue describes. This
// test deterministically fails when the fix is reverted.
func TestResolveModuleNameTrailingSlashRace(t *testing.T) {
	t.Parallel()

	const pkgJSONPath = "/repo/node_modules/pkg/package.json"
	files := map[string]string{
		// `types` points at a file that is not discoverable through any
		// fallback path: there is no `index.*` and no `main`. The only way
		// to resolve `pkg` (or `pkg/`) is via the package.json `types` field
		// inside `loadNodeModuleFromDirectoryWorker`, which is exactly the
		// step that the bug skips when `candidate` and
		// `packageInfo.PackageDirectory` mismatch.
		pkgJSONPath: `{"name":"pkg","types":"./typings/index.d.ts"}`,
		"/repo/node_modules/pkg/typings/index.d.ts": "export const x: number;",
		// Distinct containing files so each `ResolveModuleName` call has a
		// unique module-resolution-cache key.
		"/repo/src/a/file.ts": "",
		"/repo/src/b/file.ts": "",
	}
	fs := &blockingFS{
		FS:         vfstest.FromMap(files, tspath.CaseSensitive),
		targetPath: pkgJSONPath,
		gate:       make(chan struct{}),
		arrived:    make(chan struct{}, 2),
	}
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	type resolutionResult struct {
		name     string
		resolved bool
	}
	results := make(chan resolutionResult, 2)
	var wg sync.WaitGroup
	for _, name := range []string{"pkg", "pkg/"} {
		containingFile := "/repo/src/a/file.ts"
		if strings.HasSuffix(name, "/") {
			containingFile = "/repo/src/b/file.ts"
		}
		wg.Go(func() {
			r, _ := resolver.ResolveModuleName(name, tspath.RootedFilePathFromNormalized(containingFile), core.ModuleKindESNext, nil)
			results <- resolutionResult{name, r.IsResolved()}
		})
	}

	// Wait for both goroutines to reach the FileExists gate, guaranteeing
	// both have observed a package.json info-cache miss.
	waitForSignal(t, fs.arrived, "first FileExists gate arrival")
	waitForSignal(t, fs.arrived, "second FileExists gate arrival")
	close(fs.gate)

	wg.Wait()
	close(results)
	for r := range results {
		if !r.resolved {
			t.Errorf("%q failed to resolve", r.name)
		}
	}
}

// Regression test for https://github.com/microsoft/TypeScript/tsc/issues/1290.
//
// Two goroutines resolve `pkg/sub` concurrently. Both miss the package.json
// info-cache for the root package directory. A `flipFileExistsFS` forces the
// first goroutine's `FileExists` to return false (simulating the file not yet
// being visible), so it stores a nil-Contents cache entry. The second
// goroutine's `FileExists` returns true, but its `Set` call (`LoadOrStore`)
// returns the first goroutine's nil-Contents entry. Without the `Exists()`
// guard on the `typesVersions` lookup, `packageInfo.Contents.GetVersionPaths`
// dereferences nil and panics. With the guard the nil-Contents entry is safely
// skipped.
func TestResolveSubpathNilContentsRace(t *testing.T) {
	t.Parallel()

	const rootPkgJSON = "/repo/node_modules/pkg/package.json"
	files := map[string]string{
		rootPkgJSON:                             `{"name":"pkg","version":"1.0.0"}`,
		"/repo/node_modules/pkg/sub/index.d.ts": "export declare const sub: number;",
		"/repo/node_modules/pkg/sub/index.js":   "exports.sub = 1;",
		"/repo/src/a/file.ts":                   "",
		"/repo/src/b/file.ts":                   "",
	}
	fs := &flipFileExistsFS{
		FS:            vfstest.FromMap(files, tspath.CaseSensitive),
		targetPath:    rootPkgJSON,
		firstArrived:  make(chan struct{}),
		secondArrived: make(chan struct{}),
		firstGate:     make(chan struct{}),
		secondGate:    make(chan struct{}),
		readArrived:   make(chan struct{}),
		readGate:      make(chan struct{}),
	}
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	var panicked atomic.Bool
	type resolutionResult struct {
		containingFile string
		resolved       bool
	}
	results := make(chan resolutionResult, 2)
	var wg sync.WaitGroup
	// Two goroutines both resolve "pkg/sub". Each calls getPackageJsonInfo
	// for the root package directory, reaching FileExists for rootPkgJSON.
	for _, containingFile := range []string{"/repo/src/a/file.ts", "/repo/src/b/file.ts"} {
		wg.Go(func() {
			resolved := false
			defer func() {
				if r := recover(); r != nil {
					panicked.Store(true)
				}
				results <- resolutionResult{containingFile: containingFile, resolved: resolved}
			}()
			r, _ := resolver.ResolveModuleName("pkg/sub", tspath.RootedFilePathFromNormalized(containingFile), core.ModuleKindESNext, nil)
			resolved = r.IsResolved()
		})
	}

	// Phase 1: Wait for both goroutines to reach FileExists for the root
	// package.json, guaranteeing both have observed a cache miss.
	waitForSignal(t, fs.firstArrived, "first root package.json FileExists arrival")
	waitForSignal(t, fs.secondArrived, "second root package.json FileExists arrival")

	// Phase 2: Release the first FileExists caller (returns false).
	// It enters the "file not found" branch and stores a nil-Contents entry
	// via Set — this is nearly instant (no ReadFile).
	close(fs.firstGate)

	// Phase 3: Release the second FileExists caller (returns true).
	// It proceeds to ReadFile, which we gate separately to ensure the first
	// goroutine's nil-Contents Set has completed.
	close(fs.secondGate)

	// Phase 4: Wait for the second goroutine to reach ReadFile, then release.
	// By this point the first goroutine has stored its nil-Contents entry.
	// The second goroutine's Set (LoadOrStore) will return that stale entry.
	waitForSignal(t, fs.readArrived, "root package.json ReadFile arrival")
	close(fs.readGate)

	wg.Wait()
	close(results)
	if panicked.Load() {
		t.Fatal("resolver panicked due to nil Contents dereference in loadModuleFromSpecificNodeModulesDirectory")
	}
	for r := range results {
		if !r.resolved {
			t.Fatalf("%q failed to resolve pkg/sub", r.containingFile)
		}
	}
}

func TestNodeModulePackageRoot(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		path     string
		isFolder bool
		want     tspath.RootedDirectoryPath
	}{
		{"file in package", "/a/node_modules/b/lib/index.d.ts", false, "/a/node_modules/b"},
		{"file in scoped package", "/a/node_modules/@scope/b/lib/index.d.ts", false, "/a/node_modules/@scope/b"},
		{"folder subpath", "/a/node_modules/b/lib/File", true, "/a/node_modules/b"},
		{"folder subpath scoped", "/a/node_modules/@scope/b/lib/File", true, "/a/node_modules/@scope/b"},
		{"package root folder", "/a/node_modules/b", true, "/a/node_modules/b"},
		{"scoped package root folder", "/a/node_modules/@scope/b", true, "/a/node_modules/@scope/b"},
		{"package root interpreted as file", "/a/node_modules/b", false, "/a/node_modules"},
		{"scoped package root interpreted as file", "/a/node_modules/@scope/b", false, "/a/node_modules/@scope"},
		// A bare scope directory has no package name; must not panic (https://github.com/microsoft/TypeScript/tsc/issues/4373).
		{"scope-only folder", "/a/node_modules/@scope", true, "/a/node_modules/@scope"},
		{"types scope-only folder", "/a/node_modules/@types", true, "/a/node_modules/@types"},
		{"not in node_modules", "/a/src/index.ts", false, ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			var got tspath.RootedDirectoryPath
			if tt.isFolder {
				got = module.NodeModulePackageRootForDirectory(tspath.RootedDirectoryPathFromNormalized(tt.path))
			} else {
				got = module.NodeModulePackageRootForFile(tspath.RootedFilePathFromNormalized(tt.path))
			}
			if got != tt.want {
				t.Errorf("nodeModulesPackageRoot(%q, %v) = %q, want %q", tt.path, tt.isFolder, got, tt.want)
			}
		})
	}
}

// Regression test for https://github.com/microsoft/TypeScript/tsc/issues/4478.
//
// While resolving a package with peerDependencies, two goroutines look up the
// peer package's package.json concurrently. A `flipFileExistsFS` forces the
// first lookup to cache a nil-Contents entry and the second lookup to receive
// that stale entry from `Set`. The resolver must not dereference the peer
// package.json contents unless the entry actually exists.
func TestResolvePeerDependencyNilContentsRace(t *testing.T) {
	t.Parallel()

	const peerPkgJSON = "/repo/node_modules/peer/package.json"
	files := map[string]string{
		"/repo/node_modules/pkg/package.json": `{"name":"pkg","version":"1.0.0","types":"index.d.ts","peerDependencies":{"peer":"*"}}`,
		"/repo/node_modules/pkg/index.d.ts":   "export declare const x: number;",
		peerPkgJSON:                           `{"name":"peer","version":"2.0.0"}`,
		"/repo/src/a/file.ts":                 "",
		"/repo/src/b/file.ts":                 "",
	}
	fs := &flipFileExistsFS{
		FS:            vfstest.FromMap(files, tspath.CaseSensitive),
		targetPath:    peerPkgJSON,
		firstArrived:  make(chan struct{}),
		secondArrived: make(chan struct{}),
		firstGate:     make(chan struct{}),
		secondGate:    make(chan struct{}),
		readArrived:   make(chan struct{}),
		readGate:      make(chan struct{}),
	}
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	opts := &core.CompilerOptions{
		ModuleResolution: core.ModuleResolutionKindBundler,
		Module:           core.ModuleKindESNext,
		Target:           core.ScriptTargetESNext,
	}
	resolver := module.NewResolver(host, host.cwd, opts, "", "", nil)

	var panicked atomic.Bool
	type resolutionResult struct {
		containingFile string
		resolved       bool
	}
	results := make(chan resolutionResult, 2)
	var wg sync.WaitGroup
	for _, containingFile := range []string{"/repo/src/a/file.ts", "/repo/src/b/file.ts"} {
		wg.Go(func() {
			resolved := false
			defer func() {
				if r := recover(); r != nil {
					panicked.Store(true)
				}
				results <- resolutionResult{containingFile: containingFile, resolved: resolved}
			}()
			r, _ := resolver.ResolveModuleName("pkg", tspath.RootedFilePathFromNormalized(containingFile), core.ModuleKindESNext, nil)
			resolved = r.IsResolved()
		})
	}

	waitForSignal(t, fs.firstArrived, "first peer package.json FileExists arrival")
	waitForSignal(t, fs.secondArrived, "second peer package.json FileExists arrival")
	close(fs.firstGate)
	var firstResult resolutionResult
	select {
	case result := <-results:
		firstResult = result
	case <-t.Context().Done():
		t.Fatal("timed out waiting for first peer package.json lookup to finish")
	}
	close(fs.secondGate)
	waitForSignal(t, fs.readArrived, "peer package.json ReadFile arrival")
	close(fs.readGate)

	wg.Wait()
	close(results)
	if panicked.Load() {
		t.Fatal("resolver panicked due to nil Contents dereference in readPackageJsonPeerDependencies")
	}
	if !firstResult.resolved {
		t.Fatalf("%q failed to resolve pkg", firstResult.containingFile)
	}
	for r := range results {
		if !r.resolved {
			t.Fatalf("%q failed to resolve pkg", r.containingFile)
		}
	}
}
