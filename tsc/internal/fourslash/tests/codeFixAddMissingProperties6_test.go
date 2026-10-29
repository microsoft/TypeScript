package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties6(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es2015
const a = Symbol();
type T = {
    [a]: number;
    "a-b": string;
    1: boolean;
    constructor: number;
    b: { "a-b": string };
};
const b: T = {
    // a
    constructor: 1
};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewFileContent: `const a = Symbol();
type T = {
    [a]: number;
    "a-b": string;
    1: boolean;
    constructor: number;
    b: { "a-b": string };
};
const b: T = {
    // a
    constructor: 1,
    [a]: 0,
    'a-b': '',
    1: false,
    b: {
        'a-b': ''
    }
};`,
		UserPreferences: &lsutil.UserPreferences{QuotePreference: "single"},
		ApplyChanges:    true,
	})
	f.VerifyNoErrors(t)
}

func TestCodeFixAddMissingProperties6_1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    "new"(x: number) {}
}
const a: C = [|{}|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewRangeContent: `{
    new: function(x: number): void {
        throw new Error("Function not implemented.");
    }
}`,
		ApplyChanges: true,
	})
	f.VerifyNoErrors(t)
}

func TestCodeFixAddMissingProperties6_2(t *testing.T) {
	t.Parallel()
	for i, test := range []struct {
		declaration string
		value       string
	}{
		{`declare class C { constructor(a: number); }`, "undefined"},
		{`class B { constructor(a: number) {} }
class C extends B {}`, "undefined"},
		{`class C { private constructor() {} }`, "undefined"},
		{`class C { protected constructor() {} }`, "undefined"},
		{`class C { constructor(a?: number) {} }`, "new C"},
		{`class C { constructor(a: number = 0) {} }`, "new C"},
		{`declare class C { constructor(); }`, "new C"},
		{`class C {
    constructor();
    constructor(a: number);
    constructor(a?: number) {}
}`, "new C"},
		{`class C { constructor(...a: number[]) {} }`, "new C"},
		{`class C { constructor(...a: [number]) {} }`, "undefined"},
		{`class C { constructor(...a: [number?]) {} }`, "new C"},
		{`abstract class C {}`, "undefined"},
		{`class B { protected constructor() {} }
class C extends B {}`, "undefined"},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := test.declaration + "\nconst a: { a: C } = [|{}|];"
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
				Description:     diagnostics.Add_missing_properties.Localize(locale.Default),
				NewRangeContent: "{\n    a: " + test.value + "\n}",
				ApplyChanges:    true,
			})
			if test.value == "undefined" {
				f.VerifyNumberOfErrorsInCurrentFile(t, 1)
			} else {
				f.VerifyNoErrors(t)
			}
		})
	}
}

func TestCodeFixAddMissingProperties6_3(t *testing.T) {
	t.Parallel()
	for i, declaration := range []string{
		`class C {
    private constructor() {}
    static a() {`,
		`class C { protected constructor() {} }
class B extends C {
    static a() {`,
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := declaration + "\nconst a: { a: C } = [|{}|];\nreturn a;\n    }\n}"
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
				Description: diagnostics.Add_missing_properties.Localize(locale.Default),
				NewRangeContent: `{
    a: new C
}`,
				ApplyChanges: true,
			})
			f.VerifyNoErrors(t)
		})
	}
}
