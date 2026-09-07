package fswatch

import "testing"

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
		{"/", "/File.ts", "File.ts", true, true},
		{"", "/File.ts", "", false, false},
		{"/caf\u00e9", "/CAF\u00c9/File.ts", "/File.ts", false, true},
		{"/s", "/\u017f/File.ts", "/File.ts", false, true},
		{"/\u017f", "/S/File.ts", "/File.ts", false, true},
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
		}
	}
}

func TestFileCallbackCaseSensitivity(t *testing.T) {
	t.Parallel()
	for _, ignoreCase := range []bool{false, true} {
		var got []Event
		cb := fileCallback("/root/file.ts", func(events []Event, err error) {
			got = append(got, events...)
		}, pathComparer{ignoreCase: ignoreCase})
		cb([]Event{
			{Kind: EventUpdate, Path: "/root/FILE.ts"},
			{Kind: EventUpdate, Path: "/root/other.ts"},
		}, nil)
		if ignoreCase {
			if len(got) != 1 || got[0].Path != "/root/file.ts" {
				t.Fatalf("case-insensitive callback: got %v", got)
			}
		} else if len(got) != 0 {
			t.Fatalf("case-sensitive callback: got %v", got)
		}
	}
}
