//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

var fseventsFoldPairs = []struct {
	name  string
	a, b  string
	alias bool
}{
	{"sharp-s", "\u00df", "SS", true},
	{"capital-sharp-s", "\u1e9e", "SS", true},
	{"dotted-i", "\u0130", "i\u0307", true},
	{"ligature-ff", "\ufb00", "ff", true},
	{"ligature-ffi", "\ufb03", "ffi", true},
	{"long-s", "\u017f", "S", true},
	{"sigma", "\u03c2", "\u03a3", true},
	{"accent", "\u00e9", "E\u0301", true},
	{"dotless-i", "I", "\u0131", false},
	{"ascii-dotted-i", "i", "\u0130", false},
	{"ascii-i-dot", "I", "i\u0307", false},
	{"circled-a", "\u24d0", "a", false},
	{"fullwidth-a", "\uff21", "A", false},
}

func TestNativePathFold(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		a, b := foldNativePath(pair.a), foldNativePath(pair.b)
		if (a == b) != pair.alias {
			t.Errorf("%s: folds %q / %q, alias=%v", pair.name, a, b, pair.alias)
		}
		if a != foldNativePath(canonicalizePath(pair.a)) || b != foldNativePath(canonicalizePath(pair.b)) {
			t.Errorf("%s: normalization changed folding", pair.name)
		}
	}
	for _, input := range []string{"\u0130", "I\u0307", "i\u0307"} {
		if got := foldNativePath(input); got != "i\u0307" {
			t.Errorf("fold(%q) = %q", input, got)
		}
	}
	for _, input := range []string{"/\xff", "/\xfe", "/\u00df\x00suffix"} {
		if got := foldNativePath(input); got != "" {
			t.Errorf("invalid native path %q produced %q", input, got)
		}
	}
	c := pathComparer{ignoreCase: true}
	for _, pair := range [][2]string{{"/SS/", "/\u00df/File.ts"}, {"/\u00df/", "/SS/File.ts"}} {
		if suffix, ok := c.suffix(pair[0], pair[1]); !ok || suffix != "File.ts" {
			t.Errorf("trailing separator: got (%q, %v)", suffix, ok)
		}
	}
}

func TestFSEventsConsolidatedExpansion(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		for _, reverse := range []bool{false, true} {
			a, b := pair.a, pair.b
			if reverse {
				a, b = b, a
			}
			for _, recursive := range []bool{false, true} {
				dw := newDirectWatcher(t, "/parent")
				dw.setComparer(pathComparer{ignoreCase: true})
				child, raw := "/parent/"+canonicalizePath(a), "/parent/"+canonicalizePath(b)
				var got []Event
				var gotErr error
				dw.watch(child, child, recursive, func(events []Event, err error) {
					got = append(got, events...)
					gotErr = err
				}, func(path string) bool { return path == child+"/Ignored.ts" })
				dw.events.update(raw + "/File.ts")
				dw.events.update(raw + "/Nested/File.ts")
				dw.events.update(raw + "/Ignored.ts")
				dw.events.update(raw + "2/File.ts")
				dw.triggerCallbacks()
				want := 0
				if pair.alias {
					want = 1
					if recursive {
						want++
					}
				}
				if len(got) != want || gotErr != nil {
					t.Fatalf("%s reverse=%v recursive=%v: got %v, %v", pair.name, reverse, recursive, got, gotErr)
				}
				for _, e := range got {
					if e.Path != child+"/File.ts" && e.Path != child+"/Nested/File.ts" {
						t.Fatalf("incorrect rebasing: %v", e)
					}
				}
				got = nil
				if dw.terminateCallbacksForDeletedRoot(raw, 1, ErrWatchTerminated) != pair.alias {
					t.Fatalf("%s: incorrect termination", pair.name)
				}
				dw.events.removeWatchRootAt(raw, 1)
				dw.triggerCallbacks()
				if pair.alias && (len(got) != 1 || got[0].Path != child || got[0].Kind != EventDelete || !errors.Is(gotErr, ErrWatchTerminated)) {
					t.Fatalf("%s: missing deletion/termination: %v, %v", pair.name, got, gotErr)
				}
				if !pair.alias && (len(got) != 0 || gotErr != nil) {
					t.Fatalf("%s: cross-routed deletion/termination: %v, %v", pair.name, got, gotErr)
				}
			}
		}
	}
}

func TestFSEventsExpansionRouting(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		for _, reverse := range []bool{false, true} {
			a, b := pair.a, pair.b
			if reverse {
				a, b = b, a
			}
			for padding := range 16 {
				root := "/physical/" + strings.Repeat("x", padding) + canonicalizePath(a)
				raw := "/PHYSICAL/" + strings.Repeat("x", padding) + canonicalizePath(b)
				for _, ignoreCase := range []bool{false, true} {
					w := &dirWatch{dir: "/logical/Caller", physicalDir: root, comparer: pathComparer{ignoreCase: ignoreCase}}
					w.setComparer(w.comparer)
					want := ignoreCase && pair.alias
					for _, suffix := range []string{"", "/File\u00df.ts", "/Nested/File.ts"} {
						got, ok := fseventsDisplayPath(w, raw+suffix)
						if ok != want || ok && got != w.dir+suffix {
							t.Fatalf("%s reverse=%v padding=%d ignoreCase=%v: got (%q, %v)", pair.name, reverse, padding, ignoreCase, got, ok)
						}
					}
					if fseventsOverflowMatches(w, raw+"/Nested") != want || fseventsOverflowMatches(w, raw) != want {
						t.Fatalf("%s: incorrect overflow routing", pair.name)
					}
					if _, ok := fseventsDisplayPath(w, raw+"2/File.ts"); ok {
						t.Fatalf("%s: matched sibling", pair.name)
					}
					w.physicalDir += "/Nested"
					w.setComparer(w.comparer)
					if fseventsOverflowMatches(w, raw) != want {
						t.Fatalf("%s: incorrect ancestor overflow routing", pair.name)
					}
				}
			}
		}
	}
}

func TestFSEventsLazyPathFolding(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct {
		root, event string
		match, fold bool
	}{
		{"/root", "/root/File\u00df.ts", true, false},
		{"/root", "/other/\u00df/File.ts", false, false},
		{"/ROOT", "/root/File.ts", true, false},
		{"/SS", "/\u00df/File.ts", true, true},
		{"/\u00df", "/SS/File.ts", true, true},
	} {
		w := &dirWatch{dir: tt.root, physicalDir: tt.root}
		w.setComparer(pathComparer{ignoreCase: true})
		event := comparisonPath{path: tt.event}
		for range 10 {
			if _, ok := fseventsDisplayPathPrepared(w, &event); ok != tt.match || event.ready != tt.fold {
				t.Fatalf("root=%q event=%q: match=%v, folded=%v", tt.root, tt.event, ok, event.ready)
			}
		}
	}
	var cache comparisonCache
	for _, root := range []string{"/SS", "/ss"} {
		cb := callback{
			dir: root, physicalDir: root, comparer: pathComparer{ignoreCase: true},
			physicalComparison: pathComparer{ignoreCase: true}.prepare(root),
		}
		e := cb.mapEventCached(Event{Path: "/\u00df/File.ts", Kind: EventUpdate}, &cache)
		if e.Path != root+"/File.ts" {
			t.Fatalf("cached callback: %v", e)
		}
	}
	if len(cache) != 1 || cache["/\u00df/File.ts"] != "/ss/file.ts" {
		t.Fatalf("expected one shared event comparison, got %v", cache)
	}
}

func TestFSEventsExpansionAliases(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		if !pair.alias {
			continue
		}
		t.Run(pair.name, func(t *testing.T) {
			t.Parallel()
			for _, reverse := range []bool{false, true} {
				a, b := pair.a, pair.b
				if reverse {
					a, b = b, a
				}
				parent := newTmpDir(t)
				disk, root := filepath.Join(parent, a), filepath.Join(parent, b)
				if err := os.Mkdir(disk, 0o755); err != nil {
					t.Fatal(err)
				}
				requireDarwinAlias(t, disk, root)
				nested := filepath.Join(disk, "Nested")
				if err := os.Mkdir(nested, 0o755); err != nil {
					t.Fatal(err)
				}
				direct, _ := subscribeForOpts(t, root, FSEvents())
				recursive, _ := subscribeFor(t, root, FSEvents())
				link := filepath.Join(parent, "Link")
				makeDirSymlink(t, root, link)
				linked, _ := subscribeFor(t, link, FSEvents())
				file, _ := subscribeFileFor(t, filepath.Join(root, b+".ts"), FSEvents())
				control, _ := subscribeFileFor(t, filepath.Join(disk, a+".ts"), FSEvents())
				diskFile := filepath.Join(disk, a+".ts")
				for round := range 3 {
					kind := EventUpdate
					if round == 2 {
						kind = EventDelete
						if err := os.Remove(diskFile); err != nil {
							t.Fatal(err)
						}
					} else if err := os.WriteFile(diskFile, []byte(strings.Repeat("x", round+1)), 0o644); err != nil {
						t.Fatal(err)
					}
					expectContains(t, control, kind, canonicalizePath(diskFile))
					expectContains(t, file, kind, canonicalizePath(filepath.Join(root, b+".ts")))
					expectContains(t, direct, kind, canonicalizePath(filepath.Join(root, a+".ts")))
					expectContains(t, recursive, kind, canonicalizePath(filepath.Join(root, a+".ts")))
					expectContains(t, linked, kind, canonicalizePath(filepath.Join(link, a+".ts")))
				}
				child := filepath.Join(nested, "File.ts")
				if err := os.WriteFile(child, nil, 0o644); err != nil {
					t.Fatal(err)
				}
				expectContains(t, recursive, EventUpdate, canonicalizePath(filepath.Join(root, "Nested", "File.ts")))
				expectContains(t, linked, EventUpdate, filepath.Join(link, "Nested", "File.ts"))
				if events := direct.next(400 * time.Millisecond); len(events) != 0 {
					t.Fatalf("nonrecursive watch received nested events: %v", events)
				}
				if err := os.Remove(child); err != nil {
					t.Fatal(err)
				}
				expectContains(t, recursive, EventDelete, canonicalizePath(filepath.Join(root, "Nested", "File.ts")))
				if err := os.Remove(nested); err != nil {
					t.Fatal(err)
				}
				expectContains(t, direct, EventDelete, canonicalizePath(filepath.Join(root, "Nested")))
				if err := os.Remove(disk); err != nil {
					t.Fatal(err)
				}
				expectContains(t, recursive, EventDelete, canonicalizePath(root))
				terminated := false
				deadline := time.Now().Add(direct.deadline())
				for !terminated && time.Now().Before(deadline) {
					direct.mu.Lock()
					for _, err := range direct.errs {
						terminated = terminated || errors.Is(err, ErrWatchTerminated)
					}
					direct.mu.Unlock()
					if !terminated {
						time.Sleep(20 * time.Millisecond)
					}
				}
				if !terminated {
					t.Fatal("missing root termination")
				}
			}
		})
	}
}

func TestFSEventsFoldDistinctNames(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		if pair.alias {
			continue
		}
		t.Run(pair.name, func(t *testing.T) {
			t.Parallel()
			for _, reverse := range []bool{false, true} {
				parent := newTmpDir(t)
				roots := []string{filepath.Join(parent, pair.a), filepath.Join(parent, pair.b)}
				if reverse {
					roots[0], roots[1] = roots[1], roots[0]
				}
				recorders := make([]*recordingWatcher, 2)
				files := make([]*recordingWatcher, 2)
				for i, root := range roots {
					if err := os.Mkdir(root, 0o755); err != nil {
						t.Fatal(err)
					}
					recorders[i], _ = subscribeFor(t, root, FSEvents())
					files[i], _ = subscribeFileFor(t, root+".ts", FSEvents())
				}
				a, err := os.Stat(roots[0])
				if err != nil {
					t.Fatal(err)
				}
				b, err := os.Stat(roots[1])
				if err != nil || os.SameFile(a, b) {
					t.Fatalf("expected distinct inodes: %v", err)
				}
				child := filepath.Join(roots[0], "File.ts")
				file := roots[0] + ".ts"
				for round := range 3 {
					kind := EventUpdate
					for _, path := range []string{child, file} {
						if round == 2 {
							kind = EventDelete
							if err := os.Remove(path); err != nil {
								t.Fatal(err)
							}
						} else if err := os.WriteFile(path, []byte(strings.Repeat("x", round+1)), 0o644); err != nil {
							t.Fatal(err)
						}
					}
					expectContains(t, recorders[0], kind, canonicalizePath(child))
					expectContains(t, files[0], kind, canonicalizePath(file))
					for _, r := range []*recordingWatcher{recorders[1], files[1]} {
						if events := r.next(400 * time.Millisecond); len(events) != 0 {
							t.Fatalf("cross-routed distinct name: %v", events)
						}
					}
				}
			}
		})
	}
}
