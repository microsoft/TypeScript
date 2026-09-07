//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
)

func TestFSEventsDifferentCasing(t *testing.T) {
	t.Parallel()

	for _, recursive := range []bool{false, true} {
		name := "nonrecursive"
		if recursive {
			name = "recursive"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			parent := newTmpDir(t)
			diskDir := filepath.Join(parent, "MixedCase")
			watchDir := filepath.Join(parent, "mixedcase")
			if err := os.Mkdir(diskDir, 0o755); err != nil {
				t.Fatal(err)
			}
			if _, err := os.Stat(watchDir); errors.Is(err, os.ErrNotExist) {
				t.Skip("requires a case-insensitive filesystem")
			} else if err != nil {
				t.Fatal(err)
			}

			var opts []WatchOption
			if recursive {
				opts = append(opts, WithRecursive())
			}
			r, _ := subscribeForOpts(t, watchDir, FSEvents(), opts...)
			file := filepath.Join(diskDir, "File.ts")
			want := filepath.Join(watchDir, "File.ts")
			if err := os.WriteFile(file, []byte("export {}"), 0o644); err != nil {
				t.Fatal(err)
			}
			expectContains(t, r, EventUpdate, want)
			if err := os.Remove(file); err != nil {
				t.Fatal(err)
			}
			expectContains(t, r, EventDelete, want)
		})
	}
}

func TestFSEventsWatchFileDifferentCasing(t *testing.T) {
	t.Parallel()
	dir := newTmpDir(t)
	diskFile := filepath.Join(dir, "File.ts")
	watchFile := filepath.Join(dir, "file.ts")
	if err := os.WriteFile(diskFile, []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(watchFile); errors.Is(err, os.ErrNotExist) {
		t.Skip("requires a case-insensitive filesystem")
	} else if err != nil {
		t.Fatal(err)
	}
	r, _ := subscribeFileFor(t, watchFile, FSEvents())
	if err := os.WriteFile(diskFile, []byte("export const x = 1;"), 0o644); err != nil {
		t.Fatal(err)
	}
	expectContains(t, r, EventUpdate, watchFile)
	if err := os.Remove(diskFile); err != nil {
		t.Fatal(err)
	}
	expectContains(t, r, EventDelete, watchFile)

	missingFile := filepath.Join(dir, "missing.ts")
	missing, _ := subscribeFileFor(t, missingFile, FSEvents())
	if err := os.WriteFile(filepath.Join(dir, "Missing.ts"), []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}
	expectContains(t, missing, EventUpdate, missingFile)
}

func TestFSEventsCaseSensitiveRouting(t *testing.T) {
	t.Parallel()
	for _, ignoreCase := range []bool{false, true} {
		w := &dirWatch{
			dir:         "/logical/root",
			physicalDir: "/physical/root",
			comparer:    pathComparer{ignoreCase: ignoreCase},
		}
		for _, root := range []string{"/PHYSICAL/ROOT", "/LOGICAL/ROOT"} {
			for _, suffix := range []string{"", "/File.ts", "/Nested/File.ts"} {
				path, ok := fseventsDisplayPath(w, root+suffix)
				if ok != ignoreCase || ok && path != w.dir+suffix {
					t.Errorf("display path for %q, ignoreCase=%v: got (%q, %v)", root+suffix, ignoreCase, path, ok)
				}
			}
			if fseventsOverflowMatches(w, root+"/Nested") != ignoreCase {
				t.Errorf("overflow descendant %q, ignoreCase=%v", root, ignoreCase)
			}
			if fseventsOverflowMatches(w, filepath.Dir(root)) != ignoreCase {
				t.Errorf("overflow ancestor %q, ignoreCase=%v", root, ignoreCase)
			}
			if _, ok := fseventsDisplayPath(w, root+"2/File.ts"); ok {
				t.Errorf("matched sibling of %q, ignoreCase=%v", root, ignoreCase)
			}
			if fseventsOverflowMatches(w, root+"2") {
				t.Errorf("overflow matched sibling of %q, ignoreCase=%v", root, ignoreCase)
			}
		}
	}
}

func TestFSEventsConsolidatedDifferentCasing(t *testing.T) {
	t.Parallel()
	for _, recursive := range []bool{false, true} {
		dw := newDirectWatcher(t, "/parent")
		dw.comparer = pathComparer{ignoreCase: true}
		child := "/parent/child"
		var got []Event
		var gotErr error
		dw.watch(child, child, recursive, func(events []Event, err error) {
			got = append(got, events...)
			gotErr = err
		}, func(path string) bool {
			return path == child+"/Ignored.ts"
		})
		dw.events.update("/parent/CHILD/File.ts")
		dw.events.update("/parent/CHILD/Ignored.ts")
		dw.events.update("/parent/CHILD2/File.ts")
		dw.events.update("/parent/CHILD/Nested/File.ts")
		dw.triggerCallbacks()
		wantCount := 1
		if recursive {
			wantCount++
		}
		if len(got) != wantCount || gotErr != nil {
			t.Fatalf("recursive=%v: got events=%v, err=%v", recursive, got, gotErr)
		}
		for _, e := range got {
			if e.Path != child+"/File.ts" && e.Path != child+"/Nested/File.ts" {
				t.Fatalf("unexpected path %q", e.Path)
			}
		}
		got = nil
		if !dw.terminateCallbacksForDeletedRoot("/parent/CHILD", 1, ErrWatchTerminated) {
			t.Fatal("expected differently cased child root to terminate")
		}
		dw.events.removeWatchRootAt("/parent/CHILD", 1)
		dw.triggerCallbacks()
		if !errors.Is(gotErr, ErrWatchTerminated) || len(got) != 1 || got[0].Kind != EventDelete || got[0].Path != child {
			t.Fatalf("expected child deletion and termination: got events=%v, err=%v", got, gotErr)
		}
	}
}
