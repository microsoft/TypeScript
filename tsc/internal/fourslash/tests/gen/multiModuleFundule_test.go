package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMultiModuleFundule(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
function C(x: number) { }

namespace C {
    export var x = 1;
}
namespace C {
    export function foo() { }
}

var /*2*/r = C(/*1*/
var /*4*/r2 = new C(/*3*/ // using void returning function as constructor
var r3 = C./*5*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"C",
			},
		},
	})
	f.Insert(t, "C.x);")
	f.VerifyQuickInfoAt(t, "2", "var r: void", "")
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"C",
			},
		},
	})
	f.Insert(t, "C.x);")
	f.VerifyQuickInfoAt(t, "4", "var r2: any", "")
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"x",
				"foo",
			},
		},
	})
	f.Insert(t, "x;")
	f.VerifyNoErrors(t)
}
