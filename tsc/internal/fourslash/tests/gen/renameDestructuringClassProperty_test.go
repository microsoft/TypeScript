package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameDestructuringClassProperty(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A {
    [|[|{| "contextRangeIndex": 0 |}foo|]: string;|]
}
class B {
    syntax1(a: A): void {
        [|let { [|{| "contextRangeIndex": 2 |}foo|] } = a;|]
    }
    syntax2(a: A): void {
        [|let { [|{| "contextRangeIndex": 4 |}foo|]: foo } = a;|]
    }
    syntax11(a: A): void {
        [|let { [|{| "contextRangeIndex": 6 |}foo|] } = a;|]
        [|foo|] = "newString";
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[5], f.Ranges()[3], f.Ranges()[7], f.Ranges()[8])
}
