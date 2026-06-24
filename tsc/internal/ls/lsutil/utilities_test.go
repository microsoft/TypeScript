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

func TestResolveOrganizeImportsSort(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		preferences UserPreferences
		want        OrganizeImportsSort
	}{
		{
			name: "explicit sort wins",
			preferences: UserPreferences{
				OrganizeImportsSort:       OrganizeImportsSortOrdinal,
				OrganizeImportsCollation:  OrganizeImportsCollationUnicode,
				OrganizeImportsIgnoreCase: core.TSTrue,
			},
			want: OrganizeImportsSortOrdinal,
		},
		{
			name: "unicode case-sensitive maps to natural",
			preferences: UserPreferences{
				OrganizeImportsCollation:  OrganizeImportsCollationUnicode,
				OrganizeImportsIgnoreCase: core.TSFalse,
			},
			want: OrganizeImportsSortNatural,
		},
		{
			name: "unicode ignore case maps to natural ignore case",
			preferences: UserPreferences{
				OrganizeImportsCollation:  OrganizeImportsCollationUnicode,
				OrganizeImportsIgnoreCase: core.TSTrue,
			},
			want: OrganizeImportsSortNaturalIgnoreCase,
		},
		{
			name: "unicode unknown case sensitivity stays auto for detection",
			preferences: UserPreferences{
				OrganizeImportsCollation: OrganizeImportsCollationUnicode,
			},
			want: OrganizeImportsSortAuto,
		},
		{
			name: "ordinal ignore case maps to ordinal ignore case",
			preferences: UserPreferences{
				OrganizeImportsIgnoreCase: core.TSTrue,
			},
			want: OrganizeImportsSortOrdinalIgnoreCase,
		},
		{
			name: "ordinal case sensitive maps to ordinal",
			preferences: UserPreferences{
				OrganizeImportsIgnoreCase: core.TSFalse,
			},
			want: OrganizeImportsSortOrdinal,
		},
		{
			name: "unknown ordinal stays auto",
			want: OrganizeImportsSortAuto,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := ResolveOrganizeImportsSort(tt.preferences); got != tt.want {
				t.Fatalf("ResolveOrganizeImportsSort() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCompareOrganizeImportsNaturalStrings(t *testing.T) {
	t.Parallel()

	comparer := getOrganizeImportsPresetStringComparer(OrganizeImportsSortNaturalIgnoreCase)
	tests := []struct {
		name string
		a    string
		b    string
		want int
	}{
		{
			name: "numeric runs sort by numeric value",
			a:    "a2",
			b:    "a100",
			want: -1,
		},
		{
			name: "numeric runs with equal value use raw tie break",
			a:    "a02",
			b:    "a2",
			want: -1,
		},
		{
			name: "accents are folded for primary comparison",
			a:    "À",
			b:    "B",
			want: -1,
		},
		{
			name: "raw comparison breaks accent ties",
			a:    "A",
			b:    "À",
			want: -1,
		},
		{
			name: "hyphen sorts before slash like Intl.Collator fallback",
			a:    "app-init",
			b:    "app/app",
			want: -1,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := cmpSign(comparer(tt.a, tt.b)); got != tt.want {
				t.Fatalf("comparer(%q, %q) = %v, want sign %v", tt.a, tt.b, got, tt.want)
			}
		})
	}
}

func cmpSign(value int) int {
	switch {
	case value < 0:
		return -1
	case value > 0:
		return 1
	default:
		return 0
	}
}
