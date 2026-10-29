package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @target: esnext
// @strict: true
type T = {
    a: boolean;
    b: 1;
    c: -1;
    d: "a";
    e: true;
    f: false;
    g: bigint;
    h: -1n;
    i: null;
    j: number[];
    k: { a: string };
    l: string | number;
    m: unknown;
    n: undefined;
};
const a: T = {};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: diagnostics.Add_missing_properties.Localize(locale.Default),
		NewFileContent: `type T = {
    a: boolean;
    b: 1;
    c: -1;
    d: "a";
    e: true;
    f: false;
    g: bigint;
    h: -1n;
    i: null;
    j: number[];
    k: { a: string };
    l: string | number;
    m: unknown;
    n: undefined;
};
const a: T = {
    a: false,
    b: 1,
    c: -1,
    d: "a",
    e: true,
    f: false,
    g: 0n,
    h: -1n,
    i: null,
    j: [],
    k: {
        a: ""
    },
    l: "",
    m: undefined,
    n: undefined
};`,
		ApplyChanges: true,
	})
	f.VerifyNoErrors(t)
}
