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
namespace a {
    function foo() {}
}
namespace b {
    function foo() {}
}
namespace a {
    function bar() {}
}
// @Filename: file2.ts
namespace a {}
function a() {}
// @Filename: file3.ts
namespace a {
    interface A {
        foo: number;
    }
}
namespace a {
    interface A {
        bar: number;
    }
}
// @Filename: file4.ts
namespace A { export var x; }
namespace A.B { export var y; }`
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
