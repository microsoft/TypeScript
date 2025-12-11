package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFunctionTypes(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var f: Function;
function g() { }

class C {
    h: () => void ;
    i(): number { return 5; }
    static j = (e) => e;
    static k() { return 'hi';}
}
var l = () => void 0;
var z = new C;

f./*1*/apply(this, [1]);
g./*2*/arguments;
z.h./*3*/bind(undefined, 1, 2);
z.i./*4*/call(null)
C.j./*5*/length === 1;
typeof C.k./*6*/caller === 'function';
l./*7*/prototype = Object.prototype;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyCompletions(t, []string{"1", "2", "3", "4", "5", "6"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersWithPrototype,
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					"prototype",
				}),
		},
	})
}
