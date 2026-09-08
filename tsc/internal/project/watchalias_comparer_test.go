package project

import (
	"context"
	"errors"
	"slices"
	"strings"
	"syscall"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func newComparerErrorConfigSession(t *testing.T, files map[string]any, main string) (*Session, *failingWatchComparerFS) {
	t.Helper()
	fs := &failingWatchComparerFS{FS: vfstest.FromMap(files, true), err: syscall.EIO}
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		Options: &SessionOptions{
			CurrentDirectory: "/src",
			PositionEncoding: lsproto.PositionEncodingKindUTF8,
			WatchEnabled:     true,
			RunExternalCode:  true,
		},
		FS: fs, Client: &noopClient{}, Spawner: contentmappertest.NewSpawner(),
	})
	t.Cleanup(session.Close)
	session.DidOpenFile(context.Background(), lsconv.FileNameToDocumentURI(main), 1, files[main].(string), lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	assert.Assert(t, errors.Is(session.Snapshot().watchAliasesError, syscall.EIO))
	return session, fs
}

func recoverComparerWithConfigEvent(t *testing.T, session *Session, fs *failingWatchComparerFS, name string, kind lsproto.FileChangeType) {
	t.Helper()
	assert.DeepEqual(t, session.Snapshot().watchNames(name), []string{name})
	fs.err = nil
	session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{
		Uri: lsconv.FileNameToDocumentURI(name), Type: kind,
	}})
	session.WaitForBackgroundTasks()
	assert.NilError(t, session.Snapshot().watchAliasesError)
}

func TestWatchAliasComparerErrorExtendedConfig(t *testing.T) {
	t.Parallel()
	const main = "/src/main.ts"
	const base = "/src/e\u0301/base.json"
	session, fs := newComparerErrorConfigSession(t, map[string]any{
		main:                       "export const value = 1;",
		"/src/tsconfig.json":       `{"extends":"./middle.json","files":["main.ts"]}`,
		"/src/middle.json":         `{"extends":"./e\u0301/base.json"}`,
		base:                       `{"compilerOptions":{"noLib":true,"types":[],"strict":false}}`,
		"/src/other/main.ts":       "export const value = 2;",
		"/src/other/tsconfig.json": `{"extends":"../middle.json","files":["main.ts"]}`,
	}, main)
	otherURI := lsconv.FileNameToDocumentURI("/src/other/main.ts")
	session.DidOpenFile(context.Background(), otherURI, 1, "export const value = 2;", lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	old := session.Snapshot()
	for _, name := range []string{main, otherURI.FileName()} {
		assert.Equal(t, old.GetDefaultProject(lsconv.FileNameToDocumentURI(name)).Program.Options().Strict, core.TSFalse)
	}
	assert.NilError(t, fs.WriteFile(base, `{"compilerOptions":{"noLib":true,"types":[],"strict":true}}`))
	recoverComparerWithConfigEvent(t, session, fs, "/src/\u00e9/base.json", lsproto.FileChangeTypeChanged)
	for _, name := range []string{main, otherURI.FileName()} {
		service, err := session.GetLanguageService(context.Background(), lsconv.FileNameToDocumentURI(name))
		assert.NilError(t, err)
		assert.Equal(t, service.GetProgram().Options().Strict, core.TSTrue)
		assert.Equal(t, old.GetDefaultProject(lsconv.FileNameToDocumentURI(name)).Program.Options().Strict, core.TSFalse)
	}
}

func TestWatchAliasComparerErrorConfigDiscovery(t *testing.T) {
	t.Parallel()
	for _, deletion := range []bool{false, true} {
		name := "creation"
		if deletion {
			name = "deletion"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			const main = "/src/e\u0301/main.ts"
			const config = "/src/e\u0301/tsconfig.json"
			files := map[string]any{main: "export const value = 1;"}
			configText := `{"compilerOptions":{"noLib":true,"types":[],"strict":true},"files":["main.ts"]}`
			before, after := KindInferred, KindConfigured
			kind := lsproto.FileChangeTypeCreated
			if deletion {
				files[config] = configText
				before, after = after, before
				kind = lsproto.FileChangeTypeDeleted
			}
			session, fs := newComparerErrorConfigSession(t, files, main)
			uri := lsconv.FileNameToDocumentURI(main)
			assert.Equal(t, session.Snapshot().GetDefaultProject(uri).Kind, before)
			if deletion {
				assert.NilError(t, fs.Remove(config))
			} else {
				assert.NilError(t, fs.WriteFile(config, configText))
			}
			// A directory event need not identify the config added or removed beneath it.
			recoverComparerWithConfigEvent(t, session, fs, "/src/\u00e9", kind)
			_, err := session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)
			assert.Equal(t, session.Snapshot().GetDefaultProject(uri).Kind, after)
			if !deletion {
				assert.Equal(t, session.Snapshot().GetDefaultProject(uri).Program.Options().Strict, core.TSTrue)
			}
		})
	}
}

func TestWatchAliasComparerErrorContentMapperManifest(t *testing.T) {
	t.Parallel()
	const main = "/src/main.ts"
	const manifest = "/src/e\u0301/package.json"
	session, fs := newComparerErrorConfigSession(t, map[string]any{
		main: "import { version } from './app.box';",
		"/src/tsconfig.json": `{
			"compilerOptions":{"noLib":true,"types":[],"target":"es2020","module":"preserve"},
			"contentMappers":[{"package":"mapper","extensions":[".box"]}],
			"files":["main.ts"]
		}`,
		"/src/node_modules/mapper": vfstest.Symlink("/src/e\u0301"),
		manifest:                   `{"name":"mapper","typescript":{"contentMapper":{"exec":["compiler-test-mapper"]}}}`,
		"/src/app.box":             "export const version = #{target};",
	}, main)
	oldMappers := session.Snapshot().ConfigFileRegistry.contentMappers()
	assert.Assert(t, slices.Contains(oldMappers.extensions, ".box"))
	oldCommandLine := session.Snapshot().GetDefaultProject(lsconv.FileNameToDocumentURI(main)).CommandLine
	assert.Equal(t, oldCommandLine.ContentMappers()[0].Version, "")
	assert.NilError(t, fs.WriteFile(manifest, contentmappertest.PackageJSON(contentmappertest.TransformingMapper)))
	recoverComparerWithConfigEvent(t, session, fs, "/src/\u00e9/package.json", lsproto.FileChangeTypeChanged)
	service, err := session.GetLanguageService(context.Background(), lsconv.FileNameToDocumentURI(main))
	assert.NilError(t, err)
	mappers := session.Snapshot().GetDefaultProject(lsconv.FileNameToDocumentURI(main)).CommandLine.ContentMappers()
	assert.Equal(t, mappers[0].Version, "1.0.0")
	assert.DeepEqual(t, mappers[0].CompilerOptions, []string{"target", "jsx"})
	source := service.GetProgram().GetSourceFile("/src/app.box")
	assert.Assert(t, source != nil)
	assert.Assert(t, strings.Contains(source.Text(), "export const version = 7;"), "mapper manifest was not reloaded: %q", source.Text())
	assert.Assert(t, session.Snapshot().ConfigFileRegistry.contentMappers() != oldMappers)
}

func TestConfigInvalidateAllPreservesClosedFiles(t *testing.T) {
	t.Parallel()
	const main = "/src/main.ts"
	const config tspath.Path = "/src/tsconfig.json"
	session, _ := newComparerErrorConfigSession(t, map[string]any{
		main:           "export const value = 1;",
		string(config): `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`,
	}, main)
	old := session.Snapshot()
	newBuilder := func() *configFileRegistryBuilder {
		return &configFileRegistryBuilder{
			fs:                          newSourceFS(false, old.fs, old.host.toPath),
			configs:                     dirty.NewSyncMap(old.ConfigFileRegistry.configs),
			configFileNames:             dirty.NewMap(old.ConfigFileRegistry.configFileNames),
			allConfiguredContentMappers: old.ConfigFileRegistry.contentMappers(),
		}
	}
	builder := newBuilder()
	change := FileChangeSummary{InvalidateAll: true}
	change.Closed.Add(lsconv.FileNameToDocumentURI(main))
	result := builder.DidChangeFiles(change, nil)
	entry, ok := builder.configs.Load(config)
	assert.Assert(t, ok)
	assert.Equal(t, entry.Value().pendingReload, PendingReloadFull)
	assert.Equal(t, len(entry.Value().retainingOpenFiles), 0)
	assert.Assert(t, builder.allConfiguredContentMappers == nil)
	_, retained := builder.configFileNames.Get(old.host.toPath(main))
	assert.Assert(t, !retained)
	_, affected := result.affectedFiles[old.host.toPath(main)]
	assert.Assert(t, !affected, "a closed file must not be rediscovered during invalidation")
	assert.Equal(t, len(old.ConfigFileRegistry.configs[config].retainingOpenFiles), 1)
	assert.Equal(t, old.ConfigFileRegistry.configs[config].pendingReload, PendingReloadNone)

	// The ordinary high-volume path still avoids reparsing unchanged config text.
	builder = newBuilder()
	builder.invalidateCache(nil, false /*forceFullReload*/)
	entry, ok = builder.configs.Load(config)
	assert.Assert(t, ok)
	assert.Equal(t, entry.Value().pendingReload, PendingReloadFileNames)
	assert.Assert(t, builder.allConfiguredContentMappers != nil)
}
