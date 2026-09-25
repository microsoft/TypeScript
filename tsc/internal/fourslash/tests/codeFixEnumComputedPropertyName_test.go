package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixEnumComputedPropertyName(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		expression string
		literal    string
	}{
		{"string", `'\t'`, `"\t"`},
		{"template", "`\\r`", `"\r"`},
		{"escapes", `'a"\\b\n'`, `"a\"\\b\n"`},
		{"multiline template", "`a\nb`", `"a\nb"`},
		{"unicode escape", `'\u0061'`, `"a"`},
		{"surrogate", `'\uD800'`, `"\uD800"`},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := "enum CHAR {\n    [|[" + test.expression + "]|] = 0x09,\n    Other = 0x0A,\n}"
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToRangeStart(t, f.Ranges()[0])
			f.VerifyCodeFixAvailableExact(t, []string{"Remove unnecessary computed property name syntax"})
			f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
				Description:    "Remove unnecessary computed property name syntax",
				NewFileContent: "enum CHAR {\n    " + test.literal + " = 0x09,\n    Other = 0x0A,\n}",
				ApplyChanges:   true,
			})
			f.VerifyDiagnostics(t, nil)
		})
	}
}
