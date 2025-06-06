package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsUnionStringLiteralProperty(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` type Foo = { a: 0, b: 'x' } | { a: 0, b: 'y' } | { a: 1, b: 'z' };
 const foo: Foo = { a: 0, b: '/*1*/' }

 type Bar = { a: 0, b: 'fx' } | { a: 0, b: 'fy' } | { a: 1, b: 'fz' };
 const bar: Bar = { a: 0, b: 'f/*2*/' }

 type Baz = { x: 0, y: 0, z: 'a' } | { x: 0, y: 1, z: 'b' } | { x: 1, y: 0, z: 'c' } | { x: 1, y: 1, z: 'd' };
 const baz1: Baz = { z: '/*3*/' };
 const baz2: Baz = { x: 0, z: '/*4*/' };
 const baz3: Baz = { x: 0, y: 1, z: '/*5*/' };
 const baz4: Baz = { x: 2, y: 1, z: '/*6*/' };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"x", "y"},
			Excludes: []string{"z"},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"fx", "fy"},
			Excludes: []string{"fz"},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"a", "b", "c", "d"},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"a", "b"},
			Excludes: []string{"c", "d"},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"b"},
			Excludes: []string{"a", "c", "d"},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"b", "d"},
			Excludes: []string{"a", "c"},
		},
	})
}
