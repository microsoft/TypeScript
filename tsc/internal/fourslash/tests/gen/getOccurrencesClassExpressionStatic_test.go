package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesClassExpressionStatic(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let A = class Foo {
    public [|static|] foo;
    [|static|] a;
    constructor(public y: string, private x: string) {
    }
    public method() { }
    private method2() {}
    public [|static|] static() { }
    private [|static|] static2() { }
}

let B = class D {
    static a;
    constructor(private x: number) {
    }
    private static test() {}
    public static test2() {}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
