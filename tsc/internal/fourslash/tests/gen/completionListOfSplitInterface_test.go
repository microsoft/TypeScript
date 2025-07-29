package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListOfSplitInterface(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A {
    a: number;
}
interface I extends A {
    i1: number;
}
interface I1 extends A {
    i11: number;
}
interface B {
    b: number;
}
interface B1 {
    b1: number;
}
interface I extends B {
    i2: number;
}
interface I1 extends B, B1 {
    i12: number;
}
interface C {
    c: number;
}
interface I extends C {
    i3: number;
}
var ci: I;
ci./*1*/b;
var ci1: I1;
ci1./*2*/b;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"i1",
				"i2",
				"i3",
				"a",
				"b",
				"c",
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"i11",
				"i12",
				"a",
				"b",
				"b1",
			},
		},
	})
}
