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

// These tests document a real cross-normalization failure mode on macOS:
// the directory or file exists on disk under one Unicode normalization
// form (e.g. NFD, because it was created by an older Mac tool, copied
// from an HFS+ volume, or synced from another machine) but the caller
// subscribes using the canonical/precomposed (NFC) form, or vice versa.
// APFS is normalization-insensitive for *lookups* (open/stat both forms
// resolve to the same inode), but FSEvents reports paths with whatever
// bytes are stored on disk, so direct string comparisons inside the
// library and in WatchFile silently misfire.

// "é"
const (
	nfcE = "\u00e9"  // U+00E9
	nfdE = "e\u0301" // U+0065 U+0301
)

// TestNormalizeNFC exercises the CoreFoundation-backed normalizer directly
// (without going through FSEvents) so a regression in the FFI plumbing is
// caught even if the end-to-end FSEvents tests are skipped.
func TestNormalizeNFC(t *testing.T) {
	t.Parallel()

	const (
		// Latin combining marks (BMP, one combining mark per base).
		nfcCafe = "caf" + nfcE
		nfdCafe = "caf" + nfdE
		// Hangul: composition is algorithmic, not table-driven.
		// "한" (U+D55C) decomposes to ᄒ ᅡ ᆫ (U+1112 U+1161 U+11AB).
		nfcHan = "\uD55C"
		nfdHan = "\u1112\u1161\u11AB"
		// Multi-codepoint compose: "ệ" (U+1EC7) ⇄ "e\u0323\u0302" (also valid as
		// e\u0302\u0323 due to canonical ordering; CFStringNormalize handles both).
		nfcEHook = "\u1EC7"
		nfdEHook = "e\u0323\u0302"
	)

	tests := []struct {
		name string
		in   string
		want string
	}{
		{"empty", "", ""},
		{"ascii", "/var/folders/abc/hello.txt", "/var/folders/abc/hello.txt"},
		{"ascii-only-high-bit-edge", "/\x7f/path", "/\x7f/path"},
		{"already-NFC-latin", nfcCafe, nfcCafe},
		{"NFD-to-NFC-latin", nfdCafe, nfcCafe},
		{"already-NFC-hangul", nfcHan, nfcHan},
		{"NFD-to-NFC-hangul", nfdHan, nfcHan},
		{"already-NFC-multi-mark", nfcEHook, nfcEHook},
		{"NFD-to-NFC-multi-mark", nfdEHook, nfcEHook},
		{"mixed-ascii-and-NFD", "/tmp/" + nfdCafe + "/file.txt", "/tmp/" + nfcCafe + "/file.txt"},
		{"non-bmp-passthrough", "/tmp/\U0001F600.txt", "/tmp/\U0001F600.txt"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got := normalizeNFC(tt.in)
			if got != tt.want {
				t.Errorf("normalizeNFC(%q):\n  want: %q (% x)\n  got:  %q (% x)",
					tt.in, tt.want, tt.want, got, got)
			}
		})
	}
}

// TestNormalizeNFCASCIIFastPath verifies the ASCII fast path returns the
// input unchanged with no Unicode round-trip.
func TestNormalizeNFCASCIIFastPath(t *testing.T) {
	t.Parallel()

	in := "/var/folders/abc/def/hello.txt"
	out := normalizeNFC(in)
	if out != in {
		t.Fatalf("ascii input mutated: want %q, got %q", in, out)
	}
}

func TestIsASCII(t *testing.T) {
	t.Parallel()

	tests := []struct {
		in   string
		want bool
	}{
		{"", true},
		{"hello", true},
		{"/tmp/file.txt", true},
		{"\x7f", true},        // DEL is the last ASCII byte
		{"\x80", false},       // first non-ASCII byte
		{"caf\u00e9", false},  // NFC é
		{"cafe\u0301", false}, // NFD é (combining mark is also non-ASCII)
		{"a" + string([]byte{0xC2, 0xA9}), false}, // © (U+00A9)
	}
	for _, tt := range tests {
		if got := isASCII(tt.in); got != tt.want {
			t.Errorf("isASCII(%q) = %v, want %v", tt.in, got, tt.want)
		}
	}
}

// TestFSEventsNFDOnDiskNFCSubscribe creates the directory using its NFD
// byte sequence, subscribes via the NFC form (APFS resolves both to the
// same inode), and asserts that emitted event paths match what the
// caller subscribed with. Today the path comes back as NFD, so callers
// can't compare it against their own NFC paths.
func TestFSEventsNFDOnDiskNFCSubscribe(t *testing.T) {
	t.Parallel()

	parent := newTmpDir(t)

	nfdDir := filepath.Join(parent, "caf"+nfdE+"-dir")
	nfcDir := filepath.Join(parent, "caf"+nfcE+"-dir")

	if err := os.Mkdir(nfdDir, 0o755); err != nil {
		t.Fatal(err)
	}

	r, _ := subscribeFor(t, nfcDir, FSEvents())

	nfcChild := filepath.Join(nfcDir, "hello.txt")
	if err := os.WriteFile(nfcChild, []byte("hi"), 0o644); err != nil {
		t.Fatal(err)
	}

	got := r.next(r.deadline())
	if len(got) == 0 {
		t.Fatal("no events received")
	}
	for _, e := range got {
		if e.Path != nfcChild {
			t.Errorf("event path not in subscriber's (NFC) form:\n  want: %q (% x)\n  got:  %q (% x)",
				nfcChild, nfcChild, e.Path, e.Path)
		}
	}
}

// TestFSEventsNFDOnDiskNFCWatchFile shows WatchFile is silently broken
// across normalization forms: the file is created on disk as NFD, the
// caller watches the NFC path, and the e.Path == path filter in
// WatchFile drops every event.
func TestFSEventsNFDOnDiskNFCWatchFile(t *testing.T) {
	t.Parallel()

	dir := newTmpDir(t)

	nfdTarget := filepath.Join(dir, "r"+nfdE+"sum"+nfdE+".txt")
	nfcTarget := filepath.Join(dir, "r"+nfcE+"sum"+nfcE+".txt")

	r, _ := subscribeFileFor(t, nfcTarget, FSEvents())

	if err := os.WriteFile(nfdTarget, []byte("hi"), 0o644); err != nil {
		t.Fatal(err)
	}

	got := r.next(r.deadline())
	if len(got) == 0 {
		t.Fatal("WatchFile delivered no events: FSEvents reported the path in its on-disk (NFD) form and the e.Path == path filter in WatchFile dropped it")
	}
	for _, e := range got {
		if e.Path != nfcTarget {
			t.Errorf("event path mismatch:\n  want: %q (% x)\n  got:  %q (% x)",
				nfcTarget, nfcTarget, e.Path, e.Path)
		}
	}
}

// Check identity independently of the comparer, including exclusive creation.
// Filesystems that do not support a particular alias cannot exercise its watch.
func requireDarwinAlias(t *testing.T, a, b string) {
	t.Helper()
	first, err := os.Stat(a)
	if err != nil {
		t.Fatal(err)
	}
	second, err := os.Stat(b)
	if errors.Is(err, os.ErrNotExist) {
		t.Skip("filesystem does not alias these spellings")
	}
	if err != nil {
		t.Fatal(err)
	}
	if !os.SameFile(first, second) {
		t.Fatal("alternate spelling resolved to a different inode")
	}
	if err := os.Mkdir(b, 0o755); !errors.Is(err, os.ErrExist) {
		t.Fatalf("exclusive alternate creation: %v", err)
	}
}

func TestDarwinWatchFileComparison(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name                string
		diskRoot, watchRoot string
		diskFile, watchFile string
		alias               bool
	}{
		{"root-case", "Mixed", "mixed", "file.ts", "file.ts", true},
		{"leaf-case", "root", "root", "File.ts", "file.ts", true},
		{"sharp-s", "root", "root", "\u00df.ts", "SS.ts", true},
		{"dotted-i", "root", "root", "\u0130.ts", "i\u0307.ts", true},
		{"ligature", "root", "root", "\ufb03.ts", "ffi.ts", true},
		{"normalization", "root", "root", "cafe\u0301.ts", "caf\u00e9.ts", true},
		{"dotless-i", "root", "root", "I.ts", "\u0131.ts", false},
		{"ascii-dotted-i", "root", "root", "i.ts", "\u0130.ts", false},
		{"fullwidth", "root", "root", "\uff21.ts", "A.ts", false},
		{"sibling", "root", "root", "file.ts2", "file.ts", false},
		{"case-sensitive", "root", "root", "File.ts", "file.ts", false},
	}
	for _, impl := range []Watcher{Kqueue(), FSEvents()} {
		for _, c := range cases {
			t.Run(impl.Name()+"/"+c.name, func(t *testing.T) {
				t.Parallel()
				for _, reverse := range []bool{false, true} {
					diskRoot, watchRoot := c.diskRoot, c.watchRoot
					diskName, watchName := c.diskFile, c.watchFile
					if reverse {
						diskRoot, watchRoot = watchRoot, diskRoot
						diskName, watchName = watchName, diskName
					}
					parent := newTmpDir(t)
					diskRoot, watchRoot = filepath.Join(parent, diskRoot), filepath.Join(parent, watchRoot)
					if err := os.Mkdir(diskRoot, 0o755); err != nil {
						t.Fatal(err)
					}
					requireDarwinAlias(t, diskRoot, watchRoot)
					diskFile, watchFile := filepath.Join(diskRoot, diskName), filepath.Join(watchRoot, watchName)
					if err := os.WriteFile(diskFile, nil, 0o644); err != nil {
						t.Fatal(err)
					}
					if c.alias {
						requireDarwinAlias(t, diskFile, watchFile)
					} else {
						f, err := os.OpenFile(watchFile, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
						if errors.Is(err, os.ErrExist) {
							t.Skip("filesystem aliases these spellings")
						}
						if err != nil {
							t.Fatal(err)
						}
						if err = f.Close(); err != nil {
							t.Fatal(err)
						}
						a, err := os.Stat(diskFile)
						if err != nil {
							t.Fatal(err)
						}
						b, err := os.Stat(watchFile)
						if err != nil || os.SameFile(a, b) {
							t.Fatalf("expected distinct inodes: %v", err)
						}
					}
					// Subscribe while the target is absent to exercise discovery
					// as well as subsequent fd-based updates and deletion.
					if err := os.Remove(diskFile); err != nil {
						t.Fatal(err)
					}
					dir, _ := subscribeForOpts(t, watchRoot, impl)
					file, _ := subscribeFileFor(t, watchFile, impl)
					wantDir := filepath.Join(watchRoot, diskName)
					if impl == FSEvents() {
						wantDir = canonicalizePath(wantDir)
					}
					for round := range 3 {
						kind := EventUpdate
						if round == 2 {
							kind = EventDelete
							if err := os.Remove(diskFile); err != nil {
								t.Fatal(err)
							}
						} else if err := os.WriteFile(diskFile, make([]byte, round+1), 0o644); err != nil {
							t.Fatal(err)
						}
						expectContains(t, dir, kind, wantDir)
						if c.alias {
							events := expectContains(t, file, kind, canonicalizePath(watchFile))
							for _, e := range events {
								if e.Path != canonicalizePath(watchFile) {
									t.Fatalf("unexpected file event spelling: %q", e.Path)
								}
							}
						} else if events := file.next(400 * time.Millisecond); len(events) != 0 {
							t.Fatalf("cross-routed distinct filename: %v", events)
						}
					}
				}
			})
		}
	}
}

func TestNativePathComparerKeys(t *testing.T) {
	t.Parallel()
	c := PathComparer{comparer: pathComparer{ignoreCase: true}}
	for _, pair := range [][2]string{
		{"/A/file.ts", "/a/FILE.TS"},
		{"/straße/İ.ts", "/STRASSE/i\u0307.ts"},
		{"/\ufb03/ſ.ts", "/ffi/S.ts"},
		{"/Σ/ς.ts", "/σ/σ.ts"},
		{"/cafe\u0301.ts", "/caf\u00e9.ts"},
	} {
		if c.Key(pair[0]) != c.Key(pair[1]) {
			t.Errorf("unequal keys for aliases %q", pair)
		}
	}
	for _, pair := range [][2]string{
		{"/I.ts", "/\u0131.ts"},
		{"/i.ts", "/İ.ts"},
		{"/Ａ.ts", "/A.ts"},
		{"/file.ts2", "/file.ts"},
	} {
		if c.Key(pair[0]) == c.Key(pair[1]) {
			t.Errorf("equal keys for distinct paths %q", pair)
		}
	}
	for _, name := range []string{"/A\xff.ts", "/A\x00.ts"} {
		if got := c.Key(name); got != name {
			t.Errorf("malformed path was folded: %q => %q", name, got)
		}
	}
	if got, ok := c.Rebase("/STRASSE/new.ts", "/straße", "/original"); !ok || got != "/original/new.ts" {
		t.Fatalf("expanding fold rebased at wrong boundary: %q, %v", got, ok)
	}
}

func TestPathComparerVolumeQueryError(t *testing.T) {
	t.Parallel()
	name := "./watcher_test.go/missing"
	_, err := PathComparerForPath(name)
	var pathErr *os.PathError
	if !errors.As(err, &pathErr) || pathErr.Op != "pathconf" || pathErr.Path != name {
		t.Fatalf("volume query did not preserve path error: %v", err)
	}
}

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
