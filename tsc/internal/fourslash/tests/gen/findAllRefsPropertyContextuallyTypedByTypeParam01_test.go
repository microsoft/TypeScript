package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsPropertyContextuallyTypedByTypeParam01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo {
    /*1*/a: string;
}
class C<T extends IFoo> {
    method() {
        var x: T = {
            a: ""
        };
        x.a;
    }
}


var x: IFoo = {
    a: "ss"
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1")
}
