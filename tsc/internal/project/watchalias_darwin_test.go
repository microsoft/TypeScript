package project_test

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lspwatcher"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
)

type watchAliasTestSession struct {
	*project.Session
	mu sync.Mutex
}

func (s *watchAliasTestSession) WaitForBackgroundTasks() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.Session.WaitForBackgroundTasks()
}

func (s *watchAliasTestSession) DidChangeWatchedFiles(ctx context.Context, changes []*lsproto.FileEvent) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.Session.DidChangeWatchedFiles(ctx, changes)
}

// These tests exercise registrations produced by Session, not a hand-written
// broad watch, and assert source contents rather than just Program replacement.
func TestWatchAliasesRealBackend(t *testing.T) { //nolint:paralleltest // Keep native subscriptions sequential to bound kqueue descriptors and event delays.
	comparer, comparerErr := fswatch.PathComparerForPath(".")
	if comparerErr != nil {
		t.Fatal(comparerErr)
	}
	if comparer.Key("é") != comparer.Key("e\u0301") {
		t.Skip("requires a case-insensitive Darwin volume")
	}
	for _, backend := range []struct { //nolint:paralleltest // Native subscriptions are intentionally sequential.
		name    string
		watcher fswatch.Watcher
	}{{"fsevents", fswatch.Default()}, {"kqueue", fswatch.Kqueue()}} {
		for _, tc := range []struct {
			name, physical, requested string
			root, symlink             bool
		}{
			{"ascii", "ASCII", "ascii", false, false},
			{"long-s", "s", "ſ", false, false},
			{"sigma", "σ", "ς", false, false},
			{"sharp-s", "SS", "ß", false, false},
			{"dotted-i", "i\u0307", "İ", false, false},
			{"ligature", "ffi", "ﬃ", false, false},
			{"normalization", "é", "e\u0301", false, false},
			{"normalization-root", "é", "e\u0301", true, false},
			{"raw-nfd", "e\u0301", "e\u0301", false, false},
			{"realpath-nfd", "e\u0301", "node_modules/pkg", false, true},
		} {
			t.Run(backend.name+"/"+tc.name, func(t *testing.T) {
				dir := watchAliasDirectory(t)
				physical, requested := filepath.Join(dir, tc.physical), filepath.Join(dir, tc.requested)
				if err := os.MkdirAll(physical, 0o755); err != nil {
					t.Fatal(err)
				}
				if tc.symlink {
					if err := os.MkdirAll(filepath.Dir(requested), 0o755); err != nil {
						t.Fatal(err)
					}
					if err := os.Symlink(physical, requested); err != nil {
						t.Fatal(err)
					}
				}
				watchAliasWrite(t, filepath.Join(physical, "value.ts"), "export const value = 1;")
				if _, err := os.Stat(filepath.Join(requested, "value.ts")); err != nil {
					t.Skipf("volume does not support this filename alias: %v", err)
				}
				root, importName := dir, "./"+tc.requested+"/value"
				if tc.root {
					root, importName = requested, "./value"
				}
				watchAliasWrite(t, filepath.Join(root, "tsconfig.json"), `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`)
				mainText := fmt.Sprintf("import { value } from %q; const n: number = value;", importName)
				watchAliasWrite(t, filepath.Join(root, "main.ts"), mainText)
				session, wait := watchAliasSession(t, root, backend.watcher)
				uri := lsconv.FileNameToDocumentURI(filepath.Join(root, "main.ts"))
				session.DidOpenFile(context.Background(), uri, 1, mainText, lsproto.LanguageKindTypeScript)
				service, err := session.GetLanguageService(context.Background(), uri)
				if err != nil {
					t.Fatal(err)
				}
				expected := filepath.Join(requested, "value.ts")
				if source := service.GetProgram().GetSourceFile(expected); source == nil || source.Text() != "export const value = 1;" {
					t.Fatal("missing initial source")
				}
				session.WaitForBackgroundTasks()
				const changed = `export const value = "changed";`
				wait("/value.ts", func() { watchAliasWrite(t, filepath.Join(physical, "value.ts"), changed) })
				service, err = session.GetLanguageService(context.Background(), uri)
				if err != nil {
					t.Fatal(err)
				}
				source := service.GetProgram().GetSourceFile(expected)
				if source == nil || source.Text() != changed {
					t.Fatalf("cached alias %q did not acquire changed disk contents", expected)
				}
				if tc.name == "normalization" {
					const bulkText = "export const value = 3;"
					watchAliasWrite(t, filepath.Join(physical, "value.ts"), bulkText)
					session.DidChangeWatchedFiles(context.Background(), watchAliasBulkChanges(root, filepath.Join(physical, "value.ts")))
					service, err = session.GetLanguageService(context.Background(), uri)
					if err != nil {
						t.Fatal(err)
					}
					source = service.GetProgram().GetSourceFile(expected)
					if source == nil || source.Text() != bulkText {
						t.Fatal("bulk overlap filtering discarded alias source change")
					}
				}
			})
		}
		t.Run(backend.name+"/config-nfd", func(t *testing.T) {
			dir := watchAliasDirectory(t)
			physical, requested := filepath.Join(dir, "é"), filepath.Join(dir, "e\u0301")
			if err := os.MkdirAll(physical, 0o755); err != nil {
				t.Fatal(err)
			}
			watchAliasWrite(t, filepath.Join(physical, "main.ts"), "export const x = 1;")
			if _, err := os.Stat(filepath.Join(requested, "main.ts")); err != nil {
				t.Skipf("volume does not support normalization aliases: %v", err)
			}
			session, wait := watchAliasSession(t, dir, backend.watcher)
			uri := lsconv.FileNameToDocumentURI(filepath.Join(requested, "main.ts"))
			session.DidOpenFile(context.Background(), uri, 1, "export const x = 1;", lsproto.LanguageKindTypeScript)
			check := func(kind project.Kind) {
				t.Helper()
				if _, err := session.GetLanguageService(context.Background(), uri); err != nil {
					t.Fatal(err)
				}
				if got := session.Snapshot().GetDefaultProject(uri).Kind; got != kind {
					t.Fatalf("project kind = %v, want %v", got, kind)
				}
				session.WaitForBackgroundTasks()
			}
			check(project.KindInferred)
			config := filepath.Join(physical, "tsconfig.json")
			wait("/tsconfig.json", func() { watchAliasWrite(t, config, `{"compilerOptions":{"noLib":true},"files":["main.ts"]}`) })
			check(project.KindConfigured)
			wait("/tsconfig.json", func() {
				watchAliasWrite(t, config, `{"compilerOptions":{"noLib":true,"strict":true},"files":["main.ts"]}`)
			})
			check(project.KindConfigured)
			if !session.Snapshot().GetDefaultProject(uri).Program.Options().Strict.IsTrue() {
				t.Fatal("config alias was not refreshed")
			}
			wait("/tsconfig.json", func() {
				if err := os.Remove(config); err != nil {
					t.Fatal(err)
				}
			})
			check(project.KindInferred)
			watchAliasWrite(t, config, `{"compilerOptions":{"noLib":true},"files":["main.ts"]}`)
			session.DidChangeWatchedFiles(context.Background(), watchAliasBulkChanges(dir, config))
			check(project.KindConfigured)
		})
		t.Run(backend.name+"/one-to-many-and-bulk", func(t *testing.T) {
			root := watchAliasDirectory(t)
			watchAliasWrite(t, filepath.Join(root, "s.ts"), "export const value = 1;")
			if _, err := os.Stat(filepath.Join(root, "ſ.ts")); err != nil {
				t.Skipf("volume does not support long-s alias: %v", err)
			}
			mainText := `import { value as a } from "./s"; import { value as b } from "./ſ"; a; b;`
			watchAliasWrite(t, filepath.Join(root, "main.ts"), mainText)
			watchAliasWrite(t, filepath.Join(root, "tsconfig.json"), `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`)
			session, wait := watchAliasSession(t, root, backend.watcher)
			uri := lsconv.FileNameToDocumentURI(filepath.Join(root, "main.ts"))
			session.DidOpenFile(context.Background(), uri, 1, mainText, lsproto.LanguageKindTypeScript)
			check := func(text string) {
				t.Helper()
				service, err := session.GetLanguageService(context.Background(), uri)
				if err != nil {
					t.Fatal(err)
				}
				a := service.GetProgram().GetSourceFile(filepath.Join(root, "s.ts"))
				b := service.GetProgram().GetSourceFile(filepath.Join(root, "ſ.ts"))
				if a == nil || b == nil || a == b || a.Path() == b.Path() {
					t.Fatal("compiler identities were merged")
				}
				if a.Text() != text || b.Text() != text {
					t.Fatalf("one-to-many invalidation failed: %q, %q", a.Text(), b.Text())
				}
				session.WaitForBackgroundTasks()
			}
			check("export const value = 1;")
			wait("/s.ts", func() { watchAliasWrite(t, filepath.Join(root, "s.ts"), "export const value = 2;") })
			check("export const value = 2;")
			watchAliasWrite(t, filepath.Join(root, "s.ts"), "export const value = 3;")
			session.DidChangeWatchedFiles(context.Background(), watchAliasBulkChanges(root, filepath.Join(root, "s.ts")))
			check("export const value = 3;")
		})
		t.Run(backend.name+"/unknown-newfile", func(t *testing.T) {
			root := watchAliasDirectory(t)
			if err := os.MkdirAll(filepath.Join(root, "s"), 0o755); err != nil {
				t.Fatal(err)
			}
			const mainText = `import { added } from "./ſ/new"; added;`
			watchAliasWrite(t, filepath.Join(root, "main.ts"), mainText)
			watchAliasWrite(t, filepath.Join(root, "tsconfig.json"), `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`)
			session, wait := watchAliasSession(t, root, backend.watcher)
			uri := lsconv.FileNameToDocumentURI(filepath.Join(root, "main.ts"))
			session.DidOpenFile(context.Background(), uri, 1, mainText, lsproto.LanguageKindTypeScript)
			if _, err := session.GetLanguageService(context.Background(), uri); err != nil {
				t.Fatal(err)
			}
			session.WaitForBackgroundTasks()
			wait("/new.ts", func() { watchAliasWrite(t, filepath.Join(root, "s/new.ts"), "export const added = 1;") })
			service, err := session.GetLanguageService(context.Background(), uri)
			if err != nil {
				t.Fatal(err)
			}
			source := service.GetProgram().GetSourceFile(filepath.Join(root, "ſ/new.ts"))
			if source == nil || source.Text() != "export const added = 1;" {
				t.Fatal("new source was not discovered through alias directory")
			}
		})
		for _, symlink := range []bool{false, true} {
			t.Run(fmt.Sprintf("%s/directory-delete/symlink=%v", backend.name, symlink), func(t *testing.T) {
				root := watchAliasDirectory(t)
				physical, requested := filepath.Join(root, "e\u0301"), filepath.Join(root, "e\u0301")
				if err := os.MkdirAll(physical, 0o755); err != nil {
					t.Fatal(err)
				}
				if symlink {
					requested = filepath.Join(root, "node_modules/pkg")
					if err := os.MkdirAll(filepath.Dir(requested), 0o755); err != nil {
						t.Fatal(err)
					}
					if err := os.Symlink(physical, requested); err != nil {
						t.Fatal(err)
					}
				}
				watchAliasWrite(t, filepath.Join(physical, "value.ts"), "export const value = 1;")
				if _, err := os.Stat(filepath.Join(requested, "value.ts")); err != nil {
					t.Skipf("volume does not support normalization alias: %v", err)
				}
				importName := "./e\u0301/value"
				if symlink {
					importName = "./node_modules/pkg/value"
				}
				mainText := fmt.Sprintf("import { value } from %q; value;", importName)
				watchAliasWrite(t, filepath.Join(root, "main.ts"), mainText)
				watchAliasWrite(t, filepath.Join(root, "tsconfig.json"), `{"compilerOptions":{"noLib":true,"types":[]},"files":["main.ts"]}`)
				session, _ := watchAliasSession(t, root, backend.watcher)
				uri := lsconv.FileNameToDocumentURI(filepath.Join(root, "main.ts"))
				session.DidOpenFile(context.Background(), uri, 1, mainText, lsproto.LanguageKindTypeScript)
				service, err := session.GetLanguageService(context.Background(), uri)
				if err != nil {
					t.Fatal(err)
				}
				if service.GetProgram().GetSourceFile(filepath.Join(requested, "value.ts")) == nil {
					t.Fatal("missing initial alias source")
				}
				session.WaitForBackgroundTasks()
				if err = os.RemoveAll(physical); err != nil {
					t.Fatal(err)
				}
				// Isolate directory-only delivery; the backend may additionally emit
				// child events, but correctness must not depend on receiving them.
				session.DidChangeWatchedFiles(context.Background(), []*lsproto.FileEvent{{Uri: lsconv.FileNameToDocumentURI(filepath.Join(root, "é")), Type: lsproto.FileChangeTypeDeleted}})
				service, err = session.GetLanguageService(context.Background(), uri)
				if err != nil {
					t.Fatal(err)
				}
				if service.GetProgram().GetSourceFile(filepath.Join(requested, "value.ts")) != nil {
					t.Fatal("deleted alias source survived")
				}
			})
		}
	}
}

func watchAliasDirectory(t *testing.T) string {
	t.Helper()
	return filepath.ToSlash(t.TempDir())
}

func watchAliasWrite(t *testing.T, name, text string) {
	t.Helper()
	if err := os.WriteFile(name, []byte(text), 0o644); err != nil {
		t.Fatal(err)
	}
}

func watchAliasBulkChanges(root, name string) []*lsproto.FileEvent {
	var changes []*lsproto.FileEvent
	for i := range 1001 {
		changes = append(changes, &lsproto.FileEvent{Uri: lsconv.FileNameToDocumentURI(filepath.Join(root, fmt.Sprintf("unknown%d.ts", i))), Type: lsproto.FileChangeTypeChanged})
	}
	return append(changes, &lsproto.FileEvent{Uri: lsconv.FileNameToDocumentURI(name), Type: lsproto.FileChangeTypeChanged})
}

func watchAliasSession(t *testing.T, root string, backend fswatch.Watcher) (*watchAliasTestSession, func(string, func())) {
	t.Helper()
	watchAliasWrite(t, filepath.Join(root, "package.json"), `{"private":true}`)
	client := &projecttestutil.ClientMock{}
	session := &watchAliasTestSession{Session: project.NewSession(&project.SessionInit{
		BackgroundCtx: context.Background(), FS: bundled.WrapFS(osvfs.FS()), Client: client,
		Options: &project.SessionOptions{
			CurrentDirectory: root, DefaultLibraryPath: bundled.LibPath(),
			PositionEncoding: lsproto.PositionEncodingKindUTF8, WatchEnabled: true,
		},
	})}
	delivered := make(chan []*lsproto.FileEvent, 100)
	watcher := lspwatcher.NewWithFSWatcher(session.FS(), backend, func(events []*lsproto.FileEvent) {
		session.DidChangeWatchedFiles(context.Background(), events)
		delivered <- events
	}, logging.NewNopLogger())
	t.Cleanup(func() { watcher.Close(); session.Close() })
	client.WatchFilesFunc = func(ctx context.Context, id project.WatcherID, watchers []*lsproto.FileSystemWatcher) error {
		var fixtureWatchers []*lsproto.FileSystemWatcher
		for _, watcher := range watchers {
			// Ancestor node_modules belongs to the test runner, not the fixture.
			// Avoid recursively opening the repository's dependencies with kqueue.
			if watcher.GlobPattern.Pattern != nil && strings.HasPrefix(strings.ToLower(*watcher.GlobPattern.Pattern), strings.ToLower(root)+"/") {
				fixtureWatchers = append(fixtureWatchers, watcher)
			}
		}
		return watcher.WatchFiles(string(id), fixtureWatchers)
	}
	client.UnwatchFilesFunc = func(ctx context.Context, id project.WatcherID) error {
		return watcher.UnwatchFiles(string(id))
	}
	return session, func(suffix string, action func()) {
		t.Helper()
		time.Sleep(150 * time.Millisecond)
		for len(delivered) > 0 {
			<-delivered
		}
		action()
		timer := time.NewTimer(5 * time.Second)
		defer timer.Stop()
		for {
			select {
			case events := <-delivered:
				for _, event := range events {
					if strings.HasSuffix(event.Uri.FileName(), suffix) {
						return
					}
				}
			case <-timer.C:
				t.Fatalf("no real backend notification for %s", suffix)
			}
		}
	}
}
