package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMissingMethodAfterEditAfterImport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace foo {
    export namespace bar { namespace baz { export class boo { } } }
}

import f = /*foo*/foo;

/*delete*/var x;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "foo", "namespace foo", "")
	f.GoToMarker(t, "delete")
	f.DeleteAtCaret(t, 6)
	f.VerifyQuickInfoAt(t, "foo", "namespace foo", "")
}
