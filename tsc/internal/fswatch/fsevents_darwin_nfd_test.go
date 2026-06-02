//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"os"
	"path/filepath"
	"testing"
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
