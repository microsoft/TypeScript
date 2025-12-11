package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncrementalResolveFunctionPropertyAssignment(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function bar(indexer: { getLength(): number; getTypeAtIndex(index: number): string; }): string {
    return indexer.getTypeAtIndex(indexer.getLength() - 1);
}
function foo(a: string[]) {
    return bar({
        getLength(): number {
            return "a.length";
        },
        getTypeAtIndex(index: number) {
            switch (index) {
                case 0: return a[0];
                case 1: return a[1];
                case 2: return a[2];
                default: return "invalid";
            }
        }
    });
}
var val = foo(["myString1", "myString2"]);
/*1*/val;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "var val: string", "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
