package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericCombinators3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Collection<T, U> {
}

interface Combinators {
    map<T, U, V>(c: Collection<T,U>, f: (x: T, y: U) => V): Collection<T, V>;
    map<T, U>(c: Collection<T,U>, f: (x: T, y: U) => any): Collection<any, any>;
}

var c2: Collection<number, string>;

var _: Combinators;

var /*9*/r1a  = _.ma/*1c*/p(c2, (/*1a*/x,/*1b*/y) => { return x + "" });  // check quick info of map here`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1a", "(parameter) x: number", "")
	f.VerifyQuickInfoAt(t, "1b", "(parameter) y: string", "")
	f.VerifyQuickInfoAt(t, "1c", "(method) Combinators.map<number, string, string>(c: Collection<number, string>, f: (x: number, y: string) => string): Collection<number, string> (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "9", "var r1a: Collection<number, string>", "")
}
