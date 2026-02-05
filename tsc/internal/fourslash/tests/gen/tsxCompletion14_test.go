package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletion14(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@module: commonjs
//@jsx: preserve
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
    }
    interface ElementAttributesProperty { props; }
}
//@Filename: exporter.tsx
export class Thing { props: { ONE: string; TWO: number } }
export namespace M {
   export declare function SFCComp(props: { Three: number; Four: string }): JSX.Element;
}
//@Filename: file.tsx
import * as Exp from './exporter';
var x1 = <Exp.Thing /*1*/ />;
var x2 = <Exp.M.SFCComp /*2*/ />;
var x3 = <Exp.Thing /*3*/ ></Exp.Thing>;
var x4 = <Exp.M.SFCComp /*4*/ ></Exp.M.SFCComp>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"ONE",
				"TWO",
			},
		},
	})
	f.VerifyCompletions(t, []string{"2", "4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"Four",
				"Three",
			},
		},
	})
}
