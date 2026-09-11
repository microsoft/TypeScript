package fswatch

import (
	"strings"
	"testing"
)

func TestPathComparer(t *testing.T) {
	t.Parallel()
	tests := []struct {
		root       string
		path       string
		suffix     string
		exact      bool
		ignoreCase bool
	}{
		{"/root", "/root", "", true, true},
		{"/root", "/root/file.ts", "/file.ts", true, true},
		{"/root", "/ROOT", "", false, true},
		{"/root", "/ROOT/File.ts", "/File.ts", false, true},
		{"/root", "/ROOT/Nested/File.ts", "/Nested/File.ts", false, true},
		{"/root", "/ROOT2/File.ts", "", false, false},
		{"/root", "/roo", "", false, false},
		{"/root/sub", "/ROOT", "", false, false},
		{"/root", "/other/File.ts", "", false, false},
		{"/root", "/ROOTish/File.ts", "", false, false},
		{"/root/sub", "/ROOT/SUB", "", false, true},
		{"/root/sub", "/ROOT/su", "", false, false},
		{"/root/[", "/ROOT/{/File.ts", "", false, false},
		{"/root/@", "/ROOT/`/File.ts", "", false, false},
		{"/", "/File.ts", "File.ts", true, true},
		{"/", "/", "", true, true},
		{"", "", "", false, false},
		{"", "/File.ts", "", false, false},
		{"/caf\u00e9", "/CAF\u00c9/File.ts", "/File.ts", false, true},
		{"/s", "/\u017f/File.ts", "/File.ts", false, true},
		{"/\u017f", "/S/File.ts", "/File.ts", false, true},
		{"/s/sub", "/\u017f/SUB/File.ts", "/File.ts", false, true},
		{"/\u017f/sub", "/S/SUB/File.ts", "/File.ts", false, true},
		{"/s", "/\u017foo/File.ts", "", false, false},
		{"/k", "/\u212a/File.ts", "/File.ts", false, true},
		{"/\u03c3", "/\u03c2/File.ts", "/File.ts", false, true},
		{"/\u00e9", "/\u00c8/File.ts", "", false, false},
		{"/\u00df", "/SS/File.ts", "/File.ts", false, nativePathFolding},
		{"/root/s", "/ROOT/\u017f/File.ts", "/File.ts", false, true},
		{"/root/\u017f", "/ROOT/S", "", false, true},
	}
	for _, tt := range tests {
		for _, ignoreCase := range []bool{false, true} {
			comparer := pathComparer{ignoreCase: ignoreCase}
			want := tt.exact
			if ignoreCase {
				want = tt.ignoreCase
			}
			suffix, ok := comparer.suffix(tt.root, tt.path)
			if ok != want || ok && suffix != tt.suffix {
				t.Errorf("suffix(%q, %q), ignoreCase=%v: got (%q, %v), want (%q, %v)", tt.root, tt.path, ignoreCase, suffix, ok, tt.suffix, want)
			}
			if comparer.contains(tt.root, tt.path) != want {
				t.Errorf("contains(%q, %q), ignoreCase=%v: want %v", tt.root, tt.path, ignoreCase, want)
			}
			for _, to := range []string{"/display", "/"} {
				rebased, ok := comparer.rebase(tt.path, tt.root, to)
				if ok != want || ok && rebased != joinPathSuffix(to, tt.suffix) {
					t.Errorf("rebase(%q, %q, %q), ignoreCase=%v: got (%q, %v)", tt.path, tt.root, to, ignoreCase, rebased, ok)
				}
			}
		}
	}
}

func TestPathComparerUnicodeAlignment(t *testing.T) {
	t.Parallel()
	parts := []string{"s", "S", "\u017f", "k", "K", "\u212a", "\u03c3", "\u03c2", "\u00e9", "\u00c9", "\u00c8", "\U00010400", "\U00010428", "\xff", "\xfe", "\xc3"}
	comparer := pathComparer{ignoreCase: true}
	for padding := range 16 {
		prefix := "/" + strings.Repeat("a", padding)
		for _, a := range parts {
			for _, b := range parts {
				for _, child := range []string{"", "/child"} {
					root := prefix + a + child
					path := prefix + b + strings.ToUpper(child) + "/File.ts"
					want := strings.EqualFold(a, b)
					suffix, ok := comparer.suffix(root, path)
					if ok != want || ok && suffix != "/File.ts" {
						t.Fatalf("suffix(%q, %q): got (%q, %v), want match=%v", root, path, suffix, ok, want)
					}
				}
			}
		}
	}
}

func TestFileCallbackCaseSensitivity(t *testing.T) {
	t.Parallel()
	for _, ignoreCase := range []bool{false, true} {
		var got []Event
		dw := newDirectWatcher(t, "/root")
		dw.setComparer(pathComparer{ignoreCase: ignoreCase})
		dw.addCallback("/root", "/root", false, func(events []Event, err error) {
			got = append(got, events...)
		}, nil, "/root/file.ts")
		dw.events.update("/root/FILE.ts")
		dw.events.update("/root/other.ts")
		dw.triggerCallbacks()
		if ignoreCase {
			if len(got) != 1 || got[0].Path != "/root/file.ts" {
				t.Fatalf("case-insensitive callback: got %v", got)
			}
		} else if len(got) != 0 {
			t.Fatalf("case-sensitive callback: got %v", got)
		}
	}
}
