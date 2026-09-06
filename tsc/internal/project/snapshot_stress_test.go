package project

import (
	"context"
	"fmt"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// TestSnapshotConcurrentAutoImportCloneDoesNotPanic reproduces
// https://github.com/microsoft/TypeScript/issues/63844: a "cache entry not
// found" panic in RefCountCache.Ref hit by real monorepo users of the
// language server.
//
// Two entry points can build a new Snapshot from a shared base: the normal,
// serialized edit path (getSnapshot/updateSnapshot, under snapshotUpdateMu)
// and the speculative auto-import clone used by completions needing
// auto-imports (CloneSnapshotWithAutoImports, used by
// GetLanguageServiceWithAutoImports and warmAutoImportCache), which does NOT
// go through snapshotUpdateMu. Both read and mutate the same host-level,
// ref-counted parseCache/contentMappedParseCache. When a project's Program is
// unchanged across several edits, it (and its files) stay shared across many
// snapshot generations; a concurrent auto-import clone that reuses one of
// those files via Project.CreateProgram's clone path can lose a benign race
// against a concurrent edit's disposal of an older generation, such that the
// file's cache entry is gone by the time the clone tries to Ref it.
//
// Neither concurrent edits alone nor concurrent auto-import clones alone
// (against an otherwise idle session) are sufficient to reproduce this; it
// takes both running at once, which is what this test drives.
func TestSnapshotConcurrentAutoImportCloneDoesNotPanic(t *testing.T) {
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	const numProjects = 6

	files := map[string]any{}
	for i := range numProjects {
		files[fmt.Sprintf("/home/projects/TS/p%d/tsconfig.json", i)] = "{}"
		files[fmt.Sprintf("/home/projects/TS/p%d/index.ts", i)] = "import { foo } from './foo'; export const value = foo;"
		files[fmt.Sprintf("/home/projects/TS/p%d/foo.ts", i)] = "export const foo = 1;"
	}

	fs := bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		Options: &SessionOptions{
			CurrentDirectory:   "/",
			DefaultLibraryPath: bundled.LibPath(),
			TypingsLocation:    "/home/src/Library/Caches/typescript",
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			WatchEnabled:       false,
			LoggingEnabled:     false,
		},
		FS: fs,
	})
	defer session.Close()

	ctx := context.Background()
	uris := make([]lsproto.DocumentUri, numProjects)
	for i := range numProjects {
		uri := lsproto.DocumentUri(fmt.Sprintf("file:///home/projects/TS/p%d/index.ts", i))
		uris[i] = uri
		session.DidOpenFile(ctx, uri, 1, files[fmt.Sprintf("/home/projects/TS/p%d/index.ts", i)].(string), lsproto.LanguageKindTypeScript)
		_, err := session.GetLanguageService(ctx, uri)
		assert.NilError(t, err)
	}

	var version int32 = 1
	var wg sync.WaitGroup
	stop := make(chan struct{})

	// Goroutines that keep editing files, forcing a steady stream of new
	// snapshot generations (and disposal of old ones) via the normal,
	// snapshotUpdateMu-serialized path.
	for i := range numProjects {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			uri := uris[i]
			for {
				select {
				case <-stop:
					return
				default:
				}
				v := atomic.AddInt32(&version, 1)
				session.DidChangeFile(ctx, uri, v, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
					{
						WholeDocument: &lsproto.TextDocumentContentChangeWholeDocument{
							Text: fmt.Sprintf("import { foo } from './foo'; export const value = foo; export const v = %d;", v),
						},
					},
				})
				_, _ = session.GetLanguageService(ctx, uri)
			}
		}(i)
	}

	// Goroutines that repeatedly take a speculative auto-import clone off of
	// whatever the current snapshot happens to be, mimicking the
	// ErrNeedsAutoImports path used by completions (ctrl+space), which does
	// NOT go through snapshotUpdateMu.
	for i := range numProjects {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			uri := uris[i]
			for {
				select {
				case <-stop:
					return
				default:
				}
				baseSnapshot := session.Snapshot()
				preparedSnapshot := session.SnapshotHost.CloneSnapshotWithAutoImports(ctx, baseSnapshot, uri, nil)
				session.TryAdoptSnapshotInBackground(baseSnapshot, preparedSnapshot)
				preparedSnapshot.Deref()
			}
		}(i)
	}

	// Let the race run for a bounded number of edit cycles rather than wall time.
	for n := 0; n < 400; n++ {
		_, _ = session.GetLanguageService(ctx, uris[n%numProjects])
	}
	close(stop)
	wg.Wait()
	session.WaitForBackgroundTasks()
}
