package project_test

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestConfigFileChanges(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]any{
		"/tsconfig.base.json":   `{"compilerOptions": {"strict": true}}`,
		"/src/tsconfig.json":    `{"extends": "../tsconfig.base.json", "compilerOptions": {"target": "es6"}, "references": [{"path": "../utils"}]}`,
		"/src/index.ts":         `console.log("Hello, world!");`,
		"/src/subfolder/foo.ts": `export const foo = "bar";`,

		"/utils/tsconfig.json": `{"compilerOptions": {"composite": true}}`,
		"/utils/index.ts":      `console.log("Hello, test!");`,
	}

	t.Run("should update program options on config file change", func(t *testing.T) {
		t.Parallel()
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		err := utils.FS().WriteFile("/src/tsconfig.json", `{"extends": "../tsconfig.base.json", "compilerOptions": {"target": "esnext"}, "references": [{"path": "../utils"}]}`, false /*writeByteOrderMark*/)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///src/tsconfig.json"),
				Type: lsproto.FileChangeTypeChanged,
			},
		})

		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		assert.Equal(t, ls.GetProgram().Options().Target, core.ScriptTargetESNext)
	})

	t.Run("should update project on extended config file change", func(t *testing.T) {
		t.Parallel()
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		err := utils.FS().WriteFile("/tsconfig.base.json", `{"compilerOptions": {"strict": false}}`, false /*writeByteOrderMark*/)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///tsconfig.base.json"),
				Type: lsproto.FileChangeTypeChanged,
			},
		})

		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		assert.Equal(t, ls.GetProgram().Options().Strict, core.TSFalse)
	})

	t.Run("should update project on referenced config file change", func(t *testing.T) {
		t.Parallel()
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		snapshotBefore, release := session.Snapshot()
		defer release()

		err := utils.FS().WriteFile("/utils/tsconfig.json", `{"compilerOptions": {"composite": true, "target": "esnext"}}`, false /*writeByteOrderMark*/)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///utils/tsconfig.json"),
				Type: lsproto.FileChangeTypeChanged,
			},
		})

		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshotAfter, release := session.Snapshot()
		defer release()
		assert.Assert(t, snapshotAfter != snapshotBefore, "Snapshot should be updated after config file change")
	})

	t.Run("should close project on config file deletion", func(t *testing.T) {
		t.Parallel()
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		err := utils.FS().Remove("/src/tsconfig.json")
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///src/tsconfig.json"),
				Type: lsproto.FileChangeTypeDeleted,
			},
		})

		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Assert(t, len(snapshot.ProjectCollection.Projects()) == 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)
	})

	t.Run("config file creation then deletion", func(t *testing.T) {
		t.Parallel()
		session, utils := projecttestutil.Setup(files)
		session.DidOpenFile(context.Background(), "file:///src/subfolder/foo.ts", 1, files["/src/subfolder/foo.ts"].(string), lsproto.LanguageKindTypeScript)

		err := utils.FS().WriteFile("/src/subfolder/tsconfig.json", `{}`, false /*writeByteOrderMark*/)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///src/subfolder/tsconfig.json"),
				Type: lsproto.FileChangeTypeCreated,
			},
		})

		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/subfolder/foo.ts"))
		assert.NilError(t, err)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)
		assert.Equal(t, snapshot.GetDefaultProject(lsproto.DocumentUri("file:///src/subfolder/foo.ts")).Name(), "/src/subfolder/tsconfig.json")

		err = utils.FS().Remove("/src/subfolder/tsconfig.json")
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///src/subfolder/tsconfig.json"),
				Type: lsproto.FileChangeTypeDeleted,
			},
		})

		_, err = session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/subfolder/foo.ts"))
		assert.NilError(t, err)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, snapshot.GetDefaultProject(lsproto.DocumentUri("file:///src/subfolder/foo.ts")).Name(), "/src/tsconfig.json")
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2) // Old project will be cleaned up on next file open

		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, files["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
	})

	t.Run("should update project when missing extended config is created", func(t *testing.T) {
		t.Parallel()
		// Start with a project whose tsconfig extends a base config that doesn't exist yet
		missingBaseFiles := map[string]any{}
		for k, v := range files {
			if k == "/tsconfig.base.json" {
				continue
			}
			missingBaseFiles[k] = v
		}

		session, utils := projecttestutil.Setup(missingBaseFiles)
		session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, missingBaseFiles["/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Create the previously-missing base config file that is extended by /src/tsconfig.json
		err := utils.FS().WriteFile("/tsconfig.base.json", `{"compilerOptions": {"strict": true}}`, false /*writeByteOrderMark*/)
		assert.NilError(t, err)
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  lsproto.DocumentUri("file:///tsconfig.base.json"),
				Type: lsproto.FileChangeTypeCreated,
			},
		})

		// Accessing the language service should trigger project update
		ls, err := session.GetLanguageService(context.Background(), lsproto.DocumentUri("file:///src/index.ts"))
		assert.NilError(t, err)
		assert.Equal(t, ls.GetProgram().Options().Strict, core.TSTrue)
	})
}
