package ata_test

import (
	"maps"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/project/ata"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/semver"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestDiscoverTypings(t *testing.T) {
	t.Parallel()
	t.Run("should use mappings from safe list", func(t *testing.T) {
		t.Parallel()
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":        "",
			"/home/src/projects/project/jquery.js":     "",
			"/home/src/projects/project/chroma.min.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{},
				TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue},
			},
			[]string{"/home/src/projects/project/app.js", "/home/src/projects/project/jquery.js", "/home/src/projects/project/chroma.min.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
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
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		unresolvedImports := collections.NewSetFromItems("assert", "somename")
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions:   &core.CompilerOptions{},
				TypeAcquisition:   &core.TypeAcquisition{Enable: core.TSTrue},
				UnresolvedImports: unresolvedImports,
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
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
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":    "",
			"/home/src/projects/project/node.d.ts": "",
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
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
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"bar",
		))
		assert.DeepEqual(t, filesToWatch, []string{
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
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
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
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&cache,
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
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
		logger := logging.NewLogTree("DiscoverTypings")
		files := map[string]string{
			"/home/src/projects/project/app.js":                        "",
			"/home/src/projects/project/node_modules/a/package.json":   `{ "name": "a" }`,
			"/home/src/projects/project/node_modules/a/b/package.json": `{ "name": "b" }`,
		}
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{},
				TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"a",
		))
		assert.DeepEqual(t, filesToWatch, []string{
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
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
		cachedTypingPaths, newTypingNames, filesToWatch := ata.DiscoverTypings(
			fs,
			logger,
			&ata.TypingsInfo{
				CompilerOptions: &core.CompilerOptions{},
				TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue},
			},
			[]string{"/home/src/projects/project/app.js"},
			"/home/src/projects/project",
			&collections.SyncMap[string, *ata.CachedTyping]{},
			map[string]map[string]string{},
		)
		assert.Assert(t, cachedTypingPaths == nil)
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"@a/b",
		))
		assert.DeepEqual(t, filesToWatch, []string{
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
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
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
		assert.DeepEqual(t, collections.NewSetFromItems(newTypingNames...), collections.NewSetFromItems(
			"commander",
		))
		assert.DeepEqual(t, filesToWatch, []string{
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
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
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
			[]string{"/home/src/projects/project/app.js"},
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
		assert.DeepEqual(t, filesToWatch, []string{
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
		fs := vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/)
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
			[]string{"/home/src/projects/project/app.js"},
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
		assert.DeepEqual(t, filesToWatch, []string{
			"/home/src/projects/project/bower_components",
			"/home/src/projects/project/node_modules",
		})
	})
}
