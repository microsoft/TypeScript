package glob

import "testing"

func TestMatch(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name    string
		pattern string
		input   string
		want    bool
	}{
		// A "/" element matches a run of one or more separators, including a run that
		// reaches the end of the input. These inputs previously panicked with an index
		// out of range because the separator-consuming loop re-read input[0] after the
		// run emptied the string.
		{name: "trailing separator matches", pattern: "a/", input: "a/", want: true},
		{name: "missing trailing separator", pattern: "a/", input: "a", want: false},
		{name: "input ends after literal and separator", pattern: "src/**/*.ts", input: "src/", want: false},
		{name: "rooted pattern, separator-terminated input", pattern: "/dir/**/*.{ts,js}", input: "/dir/", want: false},
		// Ordinary matching is unaffected.
		{name: "star matches one segment", pattern: "a/*", input: "a/b", want: true},
		{name: "double star matches nested file", pattern: "a/**/*.ts", input: "a/b/c.ts", want: true},
		{name: "double star matches direct file", pattern: "a/**/*.ts", input: "a/x.ts", want: true},
		{name: "extension mismatch", pattern: "a/*.ts", input: "a/b.js", want: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			g, err := Parse(tt.pattern)
			if err != nil {
				t.Fatalf("Parse(%q) returned error: %v", tt.pattern, err)
			}
			if got := g.Match(tt.input); got != tt.want {
				t.Fatalf("Parse(%q).Match(%q) = %v, want %v", tt.pattern, tt.input, got, tt.want)
			}
		})
	}
}
