package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestHoverMixinOverrideDocumentation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @strict: true
// @filename: main.ts

declare class BaseClass {
    /** some documentation */
    static method(): number;
}

type AnyConstructor = abstract new (...args: any[]) => object

class MixinClass {}
declare function Mix<T extends AnyConstructor>(BaseClass: T): typeof MixinClass & T;

declare class Mixed extends Mix(BaseClass) {
    static method(): number;
}

Mixed./*1*/method;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyQuickInfoAt(t, "1", "(method) Mixed.method(): number", "some documentation")
}
