package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties8(t *testing.T) {
	t.Parallel()
	for i, test := range []struct {
		content string
		errors  int
	}{
		{`declare function a(b: { c: number }): void;
a({ c: "" });`, 1},
		{`const a = {};
const b: { c: number } = a;`, 1},
		{`const a = {};
a.b;`, 1},
		{`const a: { b?: number } = {};`, 0},
		{`declare function a({ b }: { b: number }): void;
a({});`, 1},
		{`declare function a(...[b]: { c: number }[]): void;
a({ c: 1 }, {});`, 1},
		{`declare function a(b: number): void;
a(1, {});`, 1},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			f.VerifyNumberOfErrorsInCurrentFile(t, test.errors)
			f.VerifyCodeFixNotAvailable(t, diagnostics.Add_missing_properties.Localize(locale.Default))
		})
	}
}
