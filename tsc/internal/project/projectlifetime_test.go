package project_test

import (
	"context"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestProjectLifetime(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	t.Run("configured project", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p1/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p1/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p2/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p2/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p2/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p2/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p3/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p3/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p3/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p3/config.ts":    `let x = 1, y = 2;`,
		}
		session, utils := projecttestutil.Setup(files)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 0)

		// Open files in two projects
		uri1 := lsproto.DocumentUri("file:///home/projects/TS/p1/src/index.ts")
		uri2 := lsproto.DocumentUri("file:///home/projects/TS/p2/src/index.ts")
		session.DidOpenFile(context.Background(), uri1, 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), uri2, 1, files["/home/projects/TS/p2/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.WaitForBackgroundTasks()
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p2/tsconfig.json")) != nil)
		assert.Equal(t, len(utils.Client().WatchFilesCalls()), 1)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p2/tsconfig.json")) != nil)

		// Close p1 file and open p3 file
		session.DidCloseFile(context.Background(), uri1)
		uri3 := lsproto.DocumentUri("file:///home/projects/TS/p3/src/index.ts")
		session.DidOpenFile(context.Background(), uri3, 1, files["/home/projects/TS/p3/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.WaitForBackgroundTasks()
		// Should still have two projects, but p1 replaced by p3
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 2)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) == nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p2/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p3/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p1/tsconfig.json")) == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p2/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p3/tsconfig.json")) != nil)
		assert.Equal(t, len(utils.Client().WatchFilesCalls()), 1)
		assert.Equal(t, len(utils.Client().UnwatchFilesCalls()), 0)

		// Close p2 and p3 files, open p1 file again
		session.DidCloseFile(context.Background(), uri2)
		session.DidCloseFile(context.Background(), uri3)
		session.DidOpenFile(context.Background(), uri1, 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.WaitForBackgroundTasks()
		// Should have one project (p1)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p2/tsconfig.json")) == nil)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p3/tsconfig.json")) == nil)
		assert.Equal(t, len(utils.Client().WatchFilesCalls()), 1)
		assert.Equal(t, len(utils.Client().UnwatchFilesCalls()), 0)
	})

	t.Run("unrooted inferred projects", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/TS/p1/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p1/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p1/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p2/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p2/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p2/config.ts":    `let x = 1, y = 2;`,
			"/home/projects/TS/p3/src/index.ts": `import { x } from "./x";`,
			"/home/projects/TS/p3/src/x.ts":     `export const x = 1;`,
			"/home/projects/TS/p3/config.ts":    `let x = 1, y = 2;`,
		}
		session, _ := projecttestutil.Setup(files)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 0)

		// Open files without workspace roots (empty string) - should create single inferred project
		uri1 := lsproto.DocumentUri("file:///home/projects/TS/p1/src/index.ts")
		uri2 := lsproto.DocumentUri("file:///home/projects/TS/p2/src/index.ts")
		session.DidOpenFile(context.Background(), uri1, 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)
		session.DidOpenFile(context.Background(), uri2, 1, files["/home/projects/TS/p2/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should have one inferred project
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Close p1 file and open p3 file
		session.DidCloseFile(context.Background(), uri1)
		uri3 := lsproto.DocumentUri("file:///home/projects/TS/p3/src/index.ts")
		session.DidOpenFile(context.Background(), uri3, 1, files["/home/projects/TS/p3/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should still have one inferred project
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)

		// Close p2 and p3 files, open p1 file again
		session.DidCloseFile(context.Background(), uri2)
		session.DidCloseFile(context.Background(), uri3)
		session.DidOpenFile(context.Background(), uri1, 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should still have one inferred project
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)
	})

	t.Run("file moves from inferred to configured project", func(t *testing.T) {
		t.Parallel()
		files := map[string]any{
			"/home/projects/ts/foo.ts": `export const foo = 1;`,
			"/home/projects/ts/p1/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true,
					"module": "nodenext",
					"strict": true
				},
				"include": ["main.ts"]
			}`,
			"/home/projects/ts/p1/main.ts": `import { foo } from "../foo"; console.log(foo);`,
		}
		session, _ := projecttestutil.Setup(files)

		// Open foo.ts first - should create inferred project since no tsconfig found initially
		fooUri := lsproto.DocumentUri("file:///home/projects/ts/foo.ts")
		session.DidOpenFile(context.Background(), fooUri, 1, files["/home/projects/ts/foo.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should have one inferred project
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) == nil)

		// Now open main.ts - should trigger discovery of tsconfig.json and move foo.ts to configured project
		mainUri := lsproto.DocumentUri("file:///home/projects/ts/p1/main.ts")
		session.DidOpenFile(context.Background(), mainUri, 1, files["/home/projects/ts/p1/main.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should now have one configured project and no inferred project
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() == nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)

		// Config file should be present
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)

		// Close main.ts - configured project should remain because foo.ts is still open
		session.DidCloseFile(context.Background(), mainUri)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)

		// Close foo.ts - configured project should be retained until next file open
		session.DidCloseFile(context.Background(), fooUri)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ConfigFileRegistry.GetConfig(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
	})

	t.Run("file move from inferred to configured via didOpen/didClose sequence", func(t *testing.T) {
		t.Parallel()
		// Start with tsconfig.json that includes "src" but file is at root level
		files := map[string]any{
			"/home/projects/TS/p1/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p1/index.ts": `export const x = 1;`,
		}
		session, utils := projecttestutil.Setup(files)

		// Open index.ts at root level - should create inferred project since it's not under src/
		// Creates config file registry entry, but has no files
		indexUri := lsproto.DocumentUri("file:///home/projects/TS/p1/index.ts")
		session.DidOpenFile(context.Background(), indexUri, 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should have one inferred project only (file is not included by tsconfig)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) == nil)

		// Simulate file move: create src/index.ts on disk
		err := utils.FS().WriteFile("/home/projects/TS/p1/src/index.ts", files["/home/projects/TS/p1/index.ts"].(string), false)
		assert.NilError(t, err)
		err = utils.FS().Remove("/home/projects/TS/p1/index.ts")
		assert.NilError(t, err)

		// Simulate file move sequence as it would happen in an editor:
		// 1. didOpen src/index.ts (new location)
		// Open comes in before file create event, so the config file is not marked as needing a file name reload,
		// so it's not turned into a configured project yet. This is probably not ideal, but it should sort itself
		// out momentarily after the file watcher events are processed. When we try the config file, we mark it
		// as "retained by src/index.ts" so the config entry doesn't get deleted before src/index.ts is closed.
		// Even though we currently think src/index.ts doesn't belong to the config, the config is in its directory
		// path, so we'll always see it as a candidate for containing src/index.ts.
		srcIndexUri := lsproto.DocumentUri("file:///home/projects/TS/p1/src/index.ts")
		session.DidOpenFile(context.Background(), srcIndexUri, 1, files["/home/projects/TS/p1/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// 2. didClose index.ts (old location)
		session.DidCloseFile(context.Background(), indexUri)

		// 3. didChangeWatchedFiles: create src/index.ts and delete index.ts
		// The creation event for src/index.ts now hits the config file registry, and we should notice we
		// got a creation event for a file that retained the config, triggering a filename reload.
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  srcIndexUri,
				Type: lsproto.FileChangeTypeCreated,
			},
			{
				Uri:  indexUri,
				Type: lsproto.FileChangeTypeDeleted,
			},
		})

		// Should now have one configured project only (file is now under src/)
		_, err = session.GetLanguageService(context.Background(), srcIndexUri)
		assert.NilError(t, err)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() == nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
	})

	t.Run("tsconfig move from subdirectory to parent via didChangeWatchedFiles", func(t *testing.T) {
		t.Parallel()
		// Start with tsconfig.json in src/ that includes "src" - file won't be included initially
		files := map[string]any{
			"/home/projects/TS/p1/src/tsconfig.json": `{
				"compilerOptions": {
					"noLib": true
				},
				"include": ["src"]
			}`,
			"/home/projects/TS/p1/src/index.ts": `export const x = 1;`,
		}
		session, utils := projecttestutil.Setup(files)

		// Open src/index.ts - should create inferred project since tsconfig.json includes "src"
		// relative to its location (src/src/ which doesn't exist)
		indexUri := lsproto.DocumentUri("file:///home/projects/TS/p1/src/index.ts")
		session.DidOpenFile(context.Background(), indexUri, 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

		// Should have one inferred project only (file is not included by tsconfig at src/tsconfig.json)
		snapshot, release := session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() != nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/src/tsconfig.json")) == nil)

		// Simulate tsconfig.json move: create tsconfig.json at parent level, delete from src/
		tsconfigContent := files["/home/projects/TS/p1/src/tsconfig.json"].(string)
		err := utils.FS().WriteFile("/home/projects/TS/p1/tsconfig.json", tsconfigContent, false)
		assert.NilError(t, err)
		err = utils.FS().Remove("/home/projects/TS/p1/src/tsconfig.json")
		assert.NilError(t, err)

		// Simulate file move via didChangeWatchedFiles
		newTsconfigUri := lsproto.DocumentUri("file:///home/projects/TS/p1/tsconfig.json")
		oldTsconfigUri := lsproto.DocumentUri("file:///home/projects/TS/p1/src/tsconfig.json")
		session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{
			{
				Uri:  newTsconfigUri,
				Type: lsproto.FileChangeTypeCreated,
			},
			{
				Uri:  oldTsconfigUri,
				Type: lsproto.FileChangeTypeDeleted,
			},
		})

		// Should now have one configured project only (tsconfig.json now includes src/index.ts)
		_, err = session.GetLanguageService(context.Background(), indexUri)
		assert.NilError(t, err)
		snapshot, release = session.Snapshot()
		defer release()
		assert.Equal(t, len(snapshot.ProjectCollection.Projects()), 1)
		assert.Assert(t, snapshot.ProjectCollection.InferredProject() == nil)
		assert.Assert(t, snapshot.ProjectCollection.ConfiguredProject(tspath.Path("/home/projects/ts/p1/tsconfig.json")) != nil)
	})
}
