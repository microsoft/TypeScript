package project

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

const (
	watchLifecycleLogical  = "/project/node_modules/pkg/lib"
	watchLifecyclePhysical = "/packages/e\u0301"
	watchLifecycleMain     = `import { value } from "pkg/lib"; export { value };`
	watchLifecycleInitial  = `export const value: "initial";`
)

func watchLifecycleFS(useCaseSensitiveFileNames bool) vfs.FS {
	return vfstest.FromMap(map[string]any{
		"/project/tsconfig.json":               `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true,"module":"node16","moduleResolution":"node16"},"files":["main.ts"]}`,
		"/project/main.ts":                     watchLifecycleMain,
		watchLifecycleLogical:                  vfstest.Symlink(watchLifecyclePhysical),
		watchLifecyclePhysical + "/index.d.ts": watchLifecycleInitial,
	}, useCaseSensitiveFileNames)
}

func checkWatchDirectoryRecreation(t *testing.T, fs vfs.FS, deleted, created string, editor []FileChangeKind, api bool) {
	t.Helper()
	ctx := context.Background()
	session := NewSession(&SessionInit{
		BackgroundCtx: ctx, FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	const uri = "file:///project/main.ts"
	session.DidOpenFile(ctx, uri, 1, watchLifecycleMain, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	old := session.Snapshot()
	old.ref()
	defer old.Deref()
	assert.Assert(t, old.GetDefaultProject(uri).Program.GetSourceFile(watchLifecycleLogical+"/index.d.ts") != nil)

	func() {
		session.snapshotUpdateMu.Lock()
		defer session.snapshotUpdateMu.Unlock()
		events := []*lsproto.FileEvent{
			{Uri: lsconv.FileNameToDocumentURI(deleted), Type: lsproto.FileChangeTypeDeleted},
			{Uri: lsconv.FileNameToDocumentURI(created), Type: lsproto.FileChangeTypeCreated},
		}
		if len(editor) == 0 {
			session.DidChangeWatchedFiles(ctx, events)
			return
		}
		session.DidChangeWatchedFiles(ctx, events[:1])
		for _, kind := range editor {
			if kind == FileChangeKindSave {
				saveURI := lsproto.DocumentUri(uri)
				if !fs.UseCaseSensitiveFileNames() {
					saveURI = lsconv.FileNameToDocumentURI(strings.ToUpper("/project/main.ts"))
				}
				session.DidSaveFile(ctx, saveURI)
			} else {
				session.DidChangeFile(ctx, uri, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{{
					WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{Text: watchLifecycleMain + "\n"},
				}})
			}
		}
		session.DidChangeWatchedFiles(ctx, events[1:])
	}()

	if api {
		var changes FileChangeSummary
		changes.Changed.Add(lsconv.FileNameToDocumentURI(watchLifecyclePhysical + "/index.d.ts"))
		next, err := session.APIUpdate(ctx, changes, nil)
		assert.NilError(t, err)
		defer next.Deref()
	}
	service, err := session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	source := service.GetProgram().GetSourceFile(watchLifecycleLogical + "/index.d.ts")
	assert.Assert(t, source != nil, "directory recreation must not tombstone an unchanged declaration")
	assert.Equal(t, source.Text(), watchLifecycleInitial)
	assert.Equal(t, old.GetDefaultProject(uri).Program.GetSourceFile(watchLifecycleLogical+"/index.d.ts").Text(), watchLifecycleInitial)
	if len(editor) != 0 {
		overlay := session.Snapshot().fs.overlays[session.toPath("/project/main.ts")]
		assert.Equal(t, overlay.Content(), watchLifecycleMain+"\n")
		assert.Equal(t, overlay.Version(), int32(2))
		assert.Equal(t, overlay.MatchesDiskText(), editor[len(editor)-1] == FileChangeKindSave)
	}

	assert.NilError(t, fs.WriteFile(watchLifecyclePhysical+"/index.d.ts", `export const value: "updated";`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri: lsconv.FileNameToDocumentURI(watchLifecyclePhysical + "/index.d.ts"), Type: lsproto.FileChangeTypeChanged,
	}})
	service, err = session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	assert.Equal(t, service.GetProgram().GetSourceFile(watchLifecycleLogical+"/index.d.ts").Text(), `export const value: "updated";`)
}

func TestWatchDirectoryRecreationCoalescesBeforeDeletion(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name, deleted, created string
		editor                 []FileChangeKind
		caseInsensitive        bool
		api                    bool
	}{
		{name: "physical", deleted: watchLifecyclePhysical, created: watchLifecyclePhysical},
		{name: "logical", deleted: watchLifecycleLogical, created: watchLifecycleLogical},
		{name: "physical-to-logical", deleted: watchLifecyclePhysical, created: watchLifecycleLogical},
		{name: "logical-to-physical", deleted: watchLifecycleLogical, created: watchLifecyclePhysical},
		{name: "edit-save", deleted: watchLifecyclePhysical, created: watchLifecycleLogical, editor: []FileChangeKind{FileChangeKindChange, FileChangeKindSave}},
		{name: "save-edit", deleted: watchLifecycleLogical, created: watchLifecyclePhysical, editor: []FileChangeKind{FileChangeKindSave, FileChangeKindChange}},
		{name: "case-insensitive-spellings", deleted: strings.ToUpper(watchLifecyclePhysical), created: watchLifecyclePhysical, caseInsensitive: true},
		{name: "case-insensitive-edit-save", deleted: strings.ToUpper(watchLifecyclePhysical), created: watchLifecyclePhysical, caseInsensitive: true, editor: []FileChangeKind{FileChangeKindChange, FileChangeKindSave}},
		{name: "case-insensitive-save-edit", deleted: strings.ToUpper(watchLifecyclePhysical), created: watchLifecyclePhysical, caseInsensitive: true, editor: []FileChangeKind{FileChangeKindSave, FileChangeKindChange}},
		{name: "api-merge", deleted: watchLifecyclePhysical, created: watchLifecycleLogical, api: true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			checkWatchDirectoryRecreation(t, watchLifecycleFS(!test.caseInsensitive), test.deleted, test.created, test.editor, test.api)
		})
	}
}

func TestWatchDirectoryFinalDeletion(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	fs := watchLifecycleFS(true)
	session := NewSession(&SessionInit{
		BackgroundCtx: ctx, FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	const uri = "file:///project/main.ts"
	session.DidOpenFile(ctx, uri, 1, watchLifecycleMain, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	assert.NilError(t, fs.Remove(watchLifecyclePhysical+"/index.d.ts"))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{
		{Uri: lsconv.FileNameToDocumentURI(watchLifecyclePhysical), Type: lsproto.FileChangeTypeDeleted},
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeCreated},
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeDeleted},
	})
	service, err := session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	assert.Assert(t, service.GetProgram().GetSourceFile(watchLifecycleLogical+"/index.d.ts") == nil)
}

func TestWatchDirectoryCanceledEventsRefreshRealpath(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	fs := &countedWatchAliasFS{FS: watchLifecycleFS(true)}
	session := NewSession(&SessionInit{
		BackgroundCtx: ctx, FS: fs, Client: &noopClient{},
		Options: &SessionOptions{CurrentDirectory: "/project", WatchEnabled: true},
	})
	defer session.Close()
	const uri = "file:///project/main.ts"
	session.DidOpenFile(ctx, uri, 1, watchLifecycleMain, lsproto.LanguageKindTypeScript)
	session.WaitForBackgroundTasks()
	const target = "/packages/other/index.d.ts"
	fs.FS = vfstest.FromMap(map[string]any{
		"/project/tsconfig.json": `{"compilerOptions":{"noLib":true,"types":[],"preserveSymlinks":true,"module":"node16","moduleResolution":"node16"},"files":["main.ts"]}`,
		"/project/main.ts":       watchLifecycleMain,
		watchLifecycleLogical:    vfstest.Symlink("/packages/other"),
		target:                   watchLifecycleInitial,
	}, true)
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeCreated},
		{Uri: lsconv.FileNameToDocumentURI(watchLifecycleLogical), Type: lsproto.FileChangeTypeDeleted},
	})
	next, err := session.APIUpdate(ctx, FileChangeSummary{}, nil)
	assert.NilError(t, err)
	defer next.Deref()
	file := next.fs.diskFiles[session.toPath(watchLifecycleLogical+"/index.d.ts")]
	assert.Assert(t, file != nil)
	assert.Equal(t, file.realpathName, target, "canceled notifications must still refresh physical observations")
	assert.NilError(t, fs.WriteFile(target, `export const value: "retargeted";`))
	session.DidChangeWatchedFiles(ctx, []*lsproto.FileEvent{{
		Uri: lsconv.FileNameToDocumentURI(target), Type: lsproto.FileChangeTypeChanged,
	}})
	service, err := session.GetLanguageService(ctx, uri)
	assert.NilError(t, err)
	assert.Equal(t, service.GetProgram().GetSourceFile(watchLifecycleLogical+"/index.d.ts").Text(), `export const value: "retargeted";`)
}
