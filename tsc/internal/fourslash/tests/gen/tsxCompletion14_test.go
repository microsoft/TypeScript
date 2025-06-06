package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletion14(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@module: commonjs
//@jsx: preserve
 declare module JSX {
     interface Element { }
     interface IntrinsicElements {
     }
     interface ElementAttributesProperty { props; }
 }
//@Filename: exporter.tsx
 export class Thing { props: { ONE: string; TWO: number } }
 export module M {
    export declare function SFCComp(props: { Three: number; Four: string }): JSX.Element;
 }
//@Filename: file.tsx
 import * as Exp from './exporter';
 var x1 = <Exp.Thing /*1*/ />;
 var x2 = <Exp.M.SFCComp /*2*/ />;
 var x3 = <Exp.Thing /*3*/ ></Exp.Thing>;
 var x4 = <Exp.M.SFCComp /*4*/ ></Exp.M.SFCComp>;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "3"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"ONE", "TWO"},
		},
	})
	f.VerifyCompletions(t, []string{"2", "4"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Four", "Three"},
		},
	})
}
