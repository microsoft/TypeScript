package project_test

import (
	"maps"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDiscoverTypings(t *testing.T) {
	t.Parallel()
	t.Run("should use mappings from safe list", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js":        "",
			"/home/src/projects/project/jquery.js":     "",
			"/home/src/projects/project/chroma.min.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{},
			},
			[]string{"/home/src/projects/project/app.js", "/home/src/projects/project/jquery.js", "/home/src/projects/project/chroma.min.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *project.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"jquery",
			"chroma-js",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should return node for core modules", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{"assert", "somename"},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *project.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"node",
			"somename",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should use cached locations", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js":    "",
			"/home/src/projects/project/node.d.ts": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cache := collections.SyncMap[string, *project.CachedTyping]{}
		cache.Store("node", &project.CachedTyping{
			TypingsLocation: "/home/src/projects/project/node.d.ts",
			Version:         semver.MustParse("1.3.0"),
		})
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{"fs", "bar"},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node": projecttestutil.TypesRegistryConfig(),
			},
		)
		assert.DeepEqual(t, cachedTypingPaths, []string{
			"/home/src/projects/project/node.d.ts",
		})
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"bar",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should gracefully handle packages that have been removed from the types-registry", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js":    "",
			"/home/src/projects/project/node.d.ts": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cache := collections.SyncMap[string, *project.CachedTyping]{}
		cache.Store("node", &project.CachedTyping{
			TypingsLocation: "/home/src/projects/project/node.d.ts",
			Version:         semver.MustParse("1.3.0"),
		})
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{"fs", "bar"},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"node",
			"bar",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should search only 2 levels deep", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js":                        "",
			"/home/src/projects/project/node_modules/a/package.json":   `{ "name": "a" }`,
			"/home/src/projects/project/node_modules/a/b/package.json": `{ "name": "b" }`,
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *project.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"a",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should support scoped packages", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js":                         "",
			"/home/src/projects/project/node_modules/@a/b/package.json": `{ "name": "@a/b" }`,
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *project.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"@a/b",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should install expired typings", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cache := collections.SyncMap[string, *project.CachedTyping]{}
		cache.Store("node", &project.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts",
			Version:         semver.MustParse("1.3.0"),
		})
		cache.Store("commander", &project.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/commander/index.d.ts",
			Version:         semver.MustParse("1.0.0"),
		})
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{"http", "commander"},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node":      projecttestutil.TypesRegistryConfig(),
				"commander": projecttestutil.TypesRegistryConfig(),
			},
		)
		assert.DeepEqual(t, cachedTypingPaths, []string{
			"/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts",
		})
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"commander",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("should install expired typings with prerelease version of tsserver", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cache := collections.SyncMap[string, *project.CachedTyping]{}
		cache.Store("node", &project.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts",
			Version:         semver.MustParse("1.0.0"),
		})
		config := maps.Clone(projecttestutil.TypesRegistryConfig())
		delete(config, "ts"+core.VersionMajorMinor())

		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{"http"},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node": config,
			},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"node",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})

	t.Run("prerelease typings are properly handled", func(t *testing.T) {
		t.Parallel()
		var output []string
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cache := collections.SyncMap[string, *project.CachedTyping]{}
		cache.Store("node", &project.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/node/index.d.ts",
			Version:         semver.MustParse("1.3.0-next.0"),
		})
		cache.Store("commander", &project.CachedTyping{
			TypingsLocation: projecttestutil.TestTypingsLocation + "/node_modules/@types/commander/index.d.ts",
			Version:         semver.MustParse("1.3.0-next.0"),
		})
		config := maps.Clone(projecttestutil.TypesRegistryConfig())
		config["ts"+core.VersionMajorMinor()] = "1.3.0-next.1"
		cachedTypingPaths, newTypingNames, filesToWatch := project.DiscoverTypings(
			fs,
			func(s string) {
				output = append(output, s)
			},
			&project.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: []string{"http", "commander"},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{
				"node":      config,
				"commander": projecttestutil.TypesRegistryConfig(),
			},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, core.NewSetFromItems(newTypingNames...), core.NewSetFromItems(
			"node",
			"commander",
		))
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})
}
