package ata_test

import (
	"maps"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/project/ata"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/semver"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDiscoveryInputsEqual(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name            string
		files           []tspath.RootedFilePath
		otherFiles      []tspath.RootedFilePath
		types           []string
		disableNames    bool
		caseSensitivity tspath.CaseSensitivity
		equal           bool
	}{
		{name: "same directory", files: []tspath.RootedFilePath{"/project/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/b.js"}, equal: true},
		{name: "different directories", files: []tspath.RootedFilePath{"/project/a/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/b/b.js"}},
		{name: "filename typing", files: []tspath.RootedFilePath{"/project/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/jquery.js"}},
		{name: "filename typing suffix", files: []tspath.RootedFilePath{"/project/jquery.js"}, otherFiles: []tspath.RootedFilePath{"/project/jquery.min.1.2.js"}, equal: true},
		{name: "JSX typing", files: []tspath.RootedFilePath{"/project/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/a.jsx"}},
		{name: "disabled filename typing", files: []tspath.RootedFilePath{"/project/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/jquery.jsx"}, disableNames: true, equal: true},
		{name: "disabled manifest discovery", files: []tspath.RootedFilePath{"/project/a/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/b/b.js"}, types: []string{}, equal: true},
		{name: "case insensitive directories", files: []tspath.RootedFilePath{"/project/A/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/a/b.js"}, equal: true},
		{name: "case sensitive directories", files: []tspath.RootedFilePath{"/project/A/a.js"}, otherFiles: []tspath.RootedFilePath{"/project/a/b.js"}, caseSensitivity: tspath.CaseSensitive},
		{name: "duplicate directory", files: []tspath.RootedFilePath{"/project/a.js", "/project/b.js"}, otherFiles: []tspath.RootedFilePath{"/project/c.js"}, equal: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			info := &ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{Types: test.types},
				TypeAcquisition: &core.TypeAcquisition{DisableFilenameBasedTypeAcquisition: core.BoolToTristate(test.disableNames)},
			}
			assert.Equal(t, ata.DiscoveryInputsEqual(info, test.files, test.otherFiles, "/project", test.caseSensitivity), test.equal)
		})
	}
}

func TestDiscoverTypings(t *testing.T) {
	t.Parallel()
	t.Run("should reuse cached scoped typings", func(t *testing.T) {
		t.Parallel()
		const typingFile = "/cache/node_modules/@types/a__b/index.d.ts"
		fs := vfstest.FromMap(map[string]string{typingFile: ""}, tspath.CaseSensitive)
		cache := &collections.SyncMap[string, *ata.CachedTyping]{}
		version := semver.MustParse("1.3.0")
		cache.Store("a__b", &ata.CachedTyping{TypingsLocation: typingFile, Version: &version})
		var logger *logging.LogTree
		paths, names, _ := ata.DiscoverTypings(
			fs, logger, &ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{Types: []string{}},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue, Include: []string{"@a/b"}},
				UnresolvedImports: &collections.Set[string]{},
			}, nil, "/project", cache, map[string]map[string]string{"a__b": {"latest": "1.3.0"}},
		)
		assert.DeepEqual(t, paths, []tspath.RootedFilePath{typingFile})
		assert.Equal(t, len(names), 0)
	})

	t.Run("should use mappings from safe list", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":        "",
			"/home/src/projects/project/jquery.js":     "",
			"/home/src/projects/project/chroma.min.js": "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{},
				TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue},
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js", "/home/src/projects/project/jquery.js", "/home/src/projects/project/chroma.min.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"jquery",
			"chroma-js",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should return node for core modules", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		unresolvedImports := collections.NewSetFromItems("assert", "somename")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"node",
			"somename",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should use cached locations", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":      "",
			"/home/src/projects/project/jquery.d.ts": "",
			"/home/src/projects/project/node.d.ts":   "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := collections.SyncMap[string, *ata.CachedTyping]{}
		version := semver.MustParse("1.3.0")
		cache.Store("node", &ata.CachedTyping{
			TypingsLocation: "/home/src/projects/project/node.d.ts",
			Version:         &version,
		})
		cache.Store("jquery", &ata.CachedTyping{
			TypingsLocation: "/home/src/projects/project/jquery.d.ts",
			Version:         &version,
		})
		unresolvedImports := collections.NewSetFromItems("fs", "bar")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"jquery": projecttestutil.TypesRegistryConfig(),
				"node":   projecttestutil.TypesRegistryConfig(),
			},
		)
		assert.DeepEqual(t, cachedTypingPaths, []tspath.RootedFilePath{
			"/home/src/projects/project/node.d.ts",
		})
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"bar",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should gracefully handle packages that have been removed from the types-registry", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":    "",
			"/home/src/projects/project/node.d.ts": "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := collections.SyncMap[string, *ata.CachedTyping]{}
		version := semver.MustParse("1.3.0")
		cache.Store("node", &ata.CachedTyping{
			TypingsLocation: "/home/src/projects/project/node.d.ts",
			Version:         &version,
		})
		unresolvedImports := collections.NewSetFromItems("fs", "bar")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"node",
			"bar",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should search only 2 levels deep", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":                        "",
			"/home/src/projects/project/node_modules/a/package.json":   `{ "name": "a" }`,
			"/home/src/projects/project/node_modules/a/b/package.json": `{ "name": "b" }`,
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{},
				TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue},
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"a",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should support scoped packages", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":                         "",
			"/home/src/projects/project/node_modules/@a/b/package.json": `{ "name": "@a/b" }`,
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{},
				TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue},
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"@a/b",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should install expired typings", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := collections.SyncMap[string, *ata.CachedTyping]{}
		nodeVersion := semver.MustParse("1.3.0")
		commanderVersion := semver.MustParse("1.0.0")
		cache.Store("node", &ata.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts",
			Version:         &nodeVersion,
		})
		cache.Store("commander", &ata.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/commander/index.d.ts",
			Version:         &commanderVersion,
		})
		unresolvedImports := collections.NewSetFromItems("http", "commander")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node":      projecttestutil.TypesRegistryConfig(),
				"commander": projecttestutil.TypesRegistryConfig(),
			},
		)
		assert.DeepEqual(t, cachedTypingPaths, []tspath.RootedFilePath{
			"/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts",
		})
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"commander",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should install expired typings with prerelease version of tsserver", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := collections.SyncMap[string, *ata.CachedTyping]{}
		nodeVersion := semver.MustParse("1.0.0")
		cache.Store("node", &ata.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts",
			Version:         &nodeVersion,
		})
		config := maps.Clone(projecttestutil.TypesRegistryConfig())
		delete(config, "ts"+core.VersionMajorMinor())

		unresolvedImports := collections.NewSetFromItems("http")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node": config,
			},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"node",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("prerelease typings are properly handled", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, tspath.CaseInsensitive /*caseSensitivity*/)
		cache := collections.SyncMap[string, *ata.CachedTyping]{}
		nodeVersion := semver.MustParse("1.3.0-next.0")
		commanderVersion := semver.MustParse("1.3.0-next.0")
		cache.Store("node", &ata.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts",
			Version:         &nodeVersion,
		})
		cache.Store("commander", &ata.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/commander/index.d.ts",
			Version:         &commanderVersion,
		})
		config := maps.Clone(projecttestutil.TypesRegistryConfig())
		config["ts"+core.VersionMajorMinor()] = "1.3.0-next.1"
		unresolvedImports := collections.NewSetFromItems("http", "commander")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]tspath.RootedFilePath{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node":      config,
				"commander": projecttestutil.TypesRegistryConfig(),
			},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"node",
			"commander",
		))
		assert.DeepEqual(t, filesToWatch, []tspath.RootedPath{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})
}
