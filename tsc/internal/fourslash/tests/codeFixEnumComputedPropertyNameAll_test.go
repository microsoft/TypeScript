package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixEnumComputedPropertyNameAll(t *testing.T) {
	t.Parallel()
	const content = `enum CHAR {
    /*first*/['\t'] = 0x09,
    ['\n'] = 0x0A,
    [` + "`\\r`" + `] = 0x0D,
    Plain = 0x20,
}
const enum Other {
    ["key"] = 1,
}
enum Invalid {
    ["a" + "b"] = 1,
    [42] = 2,
}`
	const expected = `enum CHAR {
    "\t" = 0x09,
    "\n" = 0x0A,
    "\r" = 0x0D,
    Plain = 0x20,
}
const enum Other {
    "key" = 1,
}
enum Invalid {
    ["a" + "b"] = 1,
    [42] = 2,
}`
	for _, sourceFixAll := range []bool{false, true} {
		name := "quickfix"
		if sourceFixAll {
			name = "source.fixAll"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.GoToMarker(t, "first")
			if sourceFixAll {
				f.VerifySourceFixAll(t, expected)
			} else {
				f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
					FixID:          "convertComputedEnumMemberName",
					NewFileContent: expected,
				})
			}
			f.VerifySuggestionDiagnostics(t, nil)
		})
	}
}
