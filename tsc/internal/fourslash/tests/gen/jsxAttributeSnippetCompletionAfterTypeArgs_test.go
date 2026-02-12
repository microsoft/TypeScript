package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsxAttributeSnippetCompletionAfterTypeArgs(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
//@Filename: file.tsx
declare const React: any;

namespace JSX {
    export interface IntrinsicElements {
        div: any;
    }
}

function GenericElement<T>(props: {xyz?: T}) {
    return <></>
}

function fn1() {
    return <div>
        <GenericElement<number> /*1*/ />
    </div>
}

function fn2() {
    return <>
        <GenericElement<number> /*2*/ />
    </>
}
function fn3() {
    return <div>
        <GenericElement<number> /*3*/ ></GenericElement>
    </div>
}

function fn4() {
    return <>
        <GenericElement<number> /*4*/ ></GenericElement>
    </>
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "xyz?",
					InsertText:       new("xyz={$1}"),
					FilterText:       new("xyz"),
					Detail:           new("(property) xyz?: number"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
