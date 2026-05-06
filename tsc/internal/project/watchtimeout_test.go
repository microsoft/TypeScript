package project_test

import (
	"context"
	"sync"
	"sync/atomic"
	"testing"
	"testing/synctest"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

func TestUpdateWatchTimeoutAndRollback(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]any{
		"/home/projects/TS/p1/tsconfig.json": `{
			"compilerOptions": { "noLib": true, "strict": true }
		}`,
		"/home/projects/TS/p1/src/index.ts": `export const x = 1;`,
	}

	t.Run("watch retries on next snapshot update after timeout with same watcher identity", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			init, utils := projecttestutil.GetSessionInitOptions(files, nil, &projecttestutil.TypingsInstallerOptions{})

			// Track WatchFiles calls: record which watcher IDs were attempted
			// and which succeeded.
			var mu sync.Mutex
			var attemptedIDs []project.WatcherID
			var successfulIDs []project.WatcherID
			var firstBatchDone atomic.Bool
			utils.Client().WatchFilesFunc = func(ctx context.Context, id project.WatcherID, watchers []*lsproto.FileSystemWatcher) error {
				mu.Lock()
				attemptedIDs = append(attemptedIDs, id)
				mu.Unlock()
				if !firstBatchDone.Load() {
					// Block until the context times out to simulate a slow client.
					<-ctx.Done()
					return ctx.Err()
				}
				// After the first batch, succeed immediately.
				mu.Lock()
				successfulIDs = append(successfulIDs, id)
				mu.Unlock()
				return nil
			}

			session := project.NewSession(init)
			defer session.Close()

			uri := lsproto.DocumentUri("file:///home/projects/TS/p1/src/index.ts")

			// Step 1: Open the file. This creates the project and triggers
			// updateWatches. All WatchFiles calls block and time out because
			// the client is slow, so the registry is rolled back and the
			// watchers are marked as pending.
			session.DidOpenFile(context.Background(), uri, 1, files["/home/projects/TS/p1/src/index.ts"].(string), lsproto.LanguageKindTypeScript)

			// Let the background goroutine block on WatchFiles, then advance
			// fake time past the 1s watchRequestTimeout.
			synctest.Wait()
			time.Sleep(2 * time.Second)
			synctest.Wait()

			mu.Lock()
			firstAttemptIDs := append([]project.WatcherID(nil), attemptedIDs...)
			mu.Unlock()
			assert.Assert(t, len(firstAttemptIDs) >= 1, "expected at least one WatchFiles call during initial open, got %d", len(firstAttemptIDs))

			// No watcher IDs should have succeeded.
			mu.Lock()
			assert.Equal(t, len(successfulIDs), 0, "expected no successful watches after timeout")
			mu.Unlock()

			// Step 2: Allow subsequent WatchFiles calls to succeed.
			firstBatchDone.Store(true)

			// Step 3: Make a single character change to the open file. This
			// doesn't change any watcher identities — the program files remain
			// the same, so the programFilesWatch ID is unchanged. The pending
			// tracking ensures updateWatches retries the failed registrations.
			session.DidChangeFile(context.Background(), uri, 2, []lsproto.TextDocumentContentChangePartialOrWholeDocument{
				{
					Partial: &lsproto.TextDocumentContentChangePartial{
						Range: lsproto.Range{
							Start: lsproto.Position{Line: 0, Character: 18},
							End:   lsproto.Position{Line: 0, Character: 19},
						},
						Text: "2",
					},
				},
			})

			// Step 4: Flush the pending change by requesting the language service.
			// This triggers getSnapshot → updateSnapshot → updateWatches.
			_, err := session.GetLanguageService(context.Background(), uri)
			assert.NilError(t, err)

			// Let the background task run updateWatches.
			synctest.Wait()
			time.Sleep(2 * time.Second)
			synctest.Wait()

			// Verify: WatchFiles was called again with the same watcher IDs,
			// and this time the calls succeeded.
			mu.Lock()
			retryIDs := attemptedIDs[len(firstAttemptIDs):]
			assert.Assert(t, len(retryIDs) >= 1,
				"expected WatchFiles to be retried after character change, got %d new calls (total %d, first batch %d)",
				len(retryIDs), len(attemptedIDs), len(firstAttemptIDs))

			// Verify that the retry used the same watcher IDs as the first attempt.
			firstAttemptSet := make(map[project.WatcherID]struct{}, len(firstAttemptIDs))
			for _, id := range firstAttemptIDs {
				firstAttemptSet[id] = struct{}{}
			}
			retrySet := make(map[project.WatcherID]struct{}, len(retryIDs))
			for _, id := range retryIDs {
				retrySet[id] = struct{}{}
			}
			for id := range retrySet {
				_, ok := firstAttemptSet[id]
				assert.Assert(t, ok,
					"retry watcher ID %v was not in the first attempt; first attempt IDs=%v retry IDs=%v",
					id, firstAttemptIDs, retryIDs)
			}

			// Verify at least one retried watcher succeeded.
			successfulRetriedCount := 0
			for _, id := range successfulIDs {
				if _, ok := retrySet[id]; ok {
					successfulRetriedCount++
				}
			}
			assert.Assert(t, successfulRetriedCount >= 1,
				"expected at least one retried watcher to succeed, got %d (successful IDs=%v, retry IDs=%v)",
				successfulRetriedCount, successfulIDs, retryIDs)
			mu.Unlock()
		})
	})
}
