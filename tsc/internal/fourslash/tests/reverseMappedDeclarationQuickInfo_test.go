package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReverseMappedDeclarationQuickInfo(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;
declare const input: { [key: string]: { value: string } };
const /*index*/indexed = unwrap(input);
indexed["name"].charAt/*member*/(0);

type Validator<T> = ((input: unknown) => T | undefined) | {
    [K in keyof T]: Validator<T[K]>;
};
declare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;
declare const stringValidator: (input: unknown) => string | undefined;
const /*deep*/deep = decode({ a: { b: { c: { d: stringValidator } } } });
deep.a.b.c./*leaf*/d;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineHover(t)
}
