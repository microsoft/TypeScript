package glob

import "testing"

func TestString(t *testing.T) {
	t.Parallel()
	for _, pattern := range []string{"[0-9]", "[!0-9]", "example.[!α-ω]"} {
		t.Run(pattern, func(t *testing.T) {
			t.Parallel()
			g, err := Parse(pattern)
			if err != nil {
				t.Fatal(err)
			}
			if got := g.String(); got != pattern {
				t.Errorf("String() = %q, want %q", got, pattern)
			}
		})
	}
}

func TestMatch(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct {
		pattern string
		input   string
		want    bool
	}{
		{"[!0-9]", "a", true},
		{"[!0-9]", "0", false},
		{"[!0-9]", "5", false},
		{"[!0-9]", "9", false},
		{"[!0-9]", "/", false},
		{"[!0-9]", "", false},
		{"[!α-ω]", "a", true},
		{"[!α-ω]", "β", false},
		{"a/*/c", "a/b/c", true},
		{"*/c", "b/c", true},
		{"a/*/c", "a/b//c", true},
		{"a/*/c", "a/b/d/c", false},
		{"*/c", "bc", false},
		{"*b/c", "abbb/c", true},
		{"*b/c", "abbb/d", false},
		{"a/", "a", false},
		{"a/", "a/", true},
		{"a/", "a///", true},
		{"*/", "b/", true},
	} {
		t.Run(tt.pattern+"_"+tt.input, func(t *testing.T) {
			t.Parallel()
			g, err := Parse(tt.pattern)
			if err != nil {
				t.Fatal(err)
			}
			if got := g.Match(tt.input); got != tt.want {
				t.Errorf("Match(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}
