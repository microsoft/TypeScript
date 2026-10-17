package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties2(t *testing.T) {
	t.Parallel()
	for i, test := range []struct {
		content string
		result  string
	}{
		{
			`interface T { a: number; b: string; c?: boolean }
const b = { a: 1 };
const a: T = { ...b };`,
			`interface T { a: number; b: string; c?: boolean }
const b = { a: 1 };
const a: T = {
    ...b,
    b: ""
};`,
		},
		{
			`// @allowJs: true
// @checkJs: true
// @Filename: a.js
/** @type {{ a: number; b: string }} */
const a = {};`,
			`/** @type {{ a: number; b: string }} */
const a = {
    a: 0,
    b: ""
};`,
		},
		{
			`const a: { b: { c: number } } = { b: {} };`,
			`const a: { b: { c: number } } = { b: {
    c: 0
} };`,
		},
		{
			`declare function a(...b: [{ c: number }]): void;
a({});`,
			`declare function a(...b: [{ c: number }]): void;
a({
    c: 0
});`,
		},
		{
			`declare function a<T extends { b: number }>(b: T): void;
a({});`,
			`declare function a<T extends { b: number }>(b: T): void;
a({
    b: 0
});`,
		},
		{
			`declare function a(...b: { c: number }[]): void;
a({ c: 1 }, {});`,
			`declare function a(...b: { c: number }[]): void;
a({ c: 1 }, {
    c: 0
});`,
		},
		{
			`declare function a(...b: [{ c: number }, { d: string }]): void;
a({ c: 1 }, {});`,
			`declare function a(...b: [{ c: number }, { d: string }]): void;
a({ c: 1 }, {
    d: ""
});`,
		},
		{
			`declare function a(...b: [number, ...{ c: number }[]]): void;
a(1, { c: 1 }, {});`,
			`declare function a(...b: [number, ...{ c: number }[]]): void;
a(1, { c: 1 }, {
    c: 0
});`,
		},
		{
			`declare function a(b: number, ...c: { d: string }[]): void;
a(1, { d: "" }, {});`,
			`declare function a(b: number, ...c: { d: string }[]): void;
a(1, { d: "" }, {
    d: ""
});`,
		},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
				Description:    diagnostics.Add_missing_properties.Localize(locale.Default),
				NewFileContent: test.result,
				ApplyChanges:   true,
			})
			f.VerifyNoErrors(t)
		})
	}
}
