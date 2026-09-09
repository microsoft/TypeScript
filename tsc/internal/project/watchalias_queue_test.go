package project

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWatchNotificationsUsePublishedGeneration(t *testing.T) {
	t.Parallel()
	const initial = `import {value} from "one"; export {value};`
	fs := vfstest.FromMap(map[string]any{
		"/project/tsconfig.json":    `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true},"files":["main.ts"]}`,
		"/project/main.ts":          initial,
		"/project/node_modules/one": vfstest.Symlink("/packages/pkg"),
		"/project/node_modules/two": vfstest.Symlink("/packages/pkg"),
		"/packages/pkg/index.d.ts":  `export const value: "initial";`,
	}, true)
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(), FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	ctx := context.Background()
	session.DidOpenFile(ctx, "file:///project/main.ts", 1, initial, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()

	// A notification can arrive after a clone's input was flushed but before
	// that clone is published. It must not capture the receipt-time aliases.
	session.snapshotUpdateMu.Lock()
	defer session.snapshotUpdateMu.Unlock()
	old := session.Snapshot()
	old.ref()
	defer old.Deref()
	assert.NilError(t, fs.WriteFile("/packages/pkg/index.d.ts", `export const value: "updated";`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri: "file:///packages/pkg/index.d.ts", Type: lsproto.FileChangeTypeChanged,
	}})
	session.pendingFileChangesMu.Lock()
	pending := append([]FileChange(nil), session.pendingFileChanges...)
	session.pendingFileChangesMu.Unlock()
	assert.Equal(t, len(pending), 1, "only the raw notification belongs in the pending queue")
	assert.Equal(t, pending[0].URI, lsproto.DocumentUri("file:///packages/pkg/index.d.ts"))

	edits, overlays := session.fs.processChanges([]FileChange{{
		Kind: FileChangeKindChange, URI: "file:///project/main.ts", Version: 2,
		Changes: []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
			WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: `import {value} from "two"; export {value};`},
		}},
	}})
	session.UpdateSnapshot(ctx, overlays, SnapshotChange{
		fileChanges: edits, ResourceRequest: ResourceRequest{Documents: []lsproto.DocumentUri{"file:///project/main.ts"}},
	})
	assert.Assert(t, session.Snapshot() != old)

	session.pendingFileChangesMu.Lock()
	changes, overlays := session.flushChangesLocked(ctx)
	session.pendingFileChangesMu.Unlock()
	assert.Assert(t, changes.Changed.Has("file:///project/node_modules/two/index.d.ts"), "preparation must use the newly published registration")
	session.UpdateSnapshot(ctx, overlays, SnapshotChange{
		fileChanges: changes, ResourceRequest: ResourceRequest{Documents: []lsproto.DocumentUri{"file:///project/main.ts"}},
	})
	source := session.Snapshot().GetDefaultProject("file:///project/main.ts").Program.GetSourceFile("/project/node_modules/two/index.d.ts")
	assert.Assert(t, source != nil)
	assert.Equal(t, source.Text(), `export const value: "updated";`)
	assert.Equal(t, old.GetDefaultProject("file:///project/main.ts").Program.GetSourceFile("/project/node_modules/one/index.d.ts").Text(), `export const value: "initial";`)
}
