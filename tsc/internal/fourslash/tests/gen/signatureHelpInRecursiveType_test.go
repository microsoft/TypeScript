package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpInRecursiveType(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Tail<T extends any[]> =
	((...args: T) => any) extends ((head: any, ...tail: infer R) => any) ? R : never;

type Reverse<List extends any[]> = _Reverse<List, []>;

type _Reverse<Source extends any[], Result extends any[] = []> = {
	1: Result,
	0: _Reverse<Tail<Source>, 0>,
}[Source extends [] ? 1 : 0];

type Foo = Reverse<[0,/**/]>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "Reverse<List extends any[]>"})
}
