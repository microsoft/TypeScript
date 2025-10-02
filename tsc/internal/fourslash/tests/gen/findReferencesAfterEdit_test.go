package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindReferencesAfterEdit(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
interface A {
    /*1*/foo: string;
}
// @Filename: b.ts
///<reference path='a.ts'/>
/**/
function foo(x: A) {
    x./*2*/foo
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2")
	f.GoToMarker(t, "")
	f.Insert(t, "\n")
	f.VerifyBaselineFindAllReferences(t, "1", "2")
}
