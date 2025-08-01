package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForIndexerResultWithConstraint(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo<T>(x: T) {
        return x;
}
function other2<T extends Date>(arg: T) {
    var b: { [x: string]: T };
    var /*1*/r2 = foo(b); // just shows T
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(local var) r2: {\n    [x: string]: T;\n}", "")
}
