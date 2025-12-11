package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarMerging(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: file1.ts
module a {
    function foo() {}
}
module b {
    function foo() {}
}
module a {
    function bar() {}
}
// @Filename: file2.ts
module a {}
function a() {}
// @Filename: file3.ts
module a {
    interface A {
        foo: number;
    }
}
module a {
    interface A {
        bar: number;
    }
}
// @Filename: file4.ts
module A { export var x; }
module A.B { export var y; }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "file2.ts")
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "file3.ts")
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "file4.ts")
	f.VerifyBaselineDocumentSymbol(t)
}
