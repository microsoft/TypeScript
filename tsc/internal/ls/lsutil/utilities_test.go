package lsutil

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
)

func parseTS(t *testing.T, text string) *ast.SourceFile {
	t.Helper()
	return parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/test.ts",
		Path:     "/test.ts",
	}, text, core.ScriptKindTS)
}

func TestProbablyUsesSemicolons(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		src  string
		want bool
	}{
		{
			name: "mixed semicolons and ASI favors semicolons when ratio exceeds one fifth",
			// First five observations: 2 with semicolon, 3 without. Real ratio 2/3 > 1/5.
			// Integer division bug compared against 1/5==0 and used with/without as ints,
			// so the old check was effectively (with/without) > 0, which failed here.
			src: `let a = 1;
let b = 2;
let c = 3
let d = 4
let e = 5
`,
			want: true,
		},
		{
			name: "consistent ASI with no semicolons",
			src: `let a = 1
let b = 2
let c = 3
`,
			want: false,
		},
		{
			name: "consistent semicolons",
			src: `let a = 1;
let b = 2;
let c = 3;
`,
			want: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			file := parseTS(t, tt.src)
			if got := ProbablyUsesSemicolons(file); got != tt.want {
				t.Errorf("ProbablyUsesSemicolons() = %v, want %v", got, tt.want)
			}
		})
	}
}
