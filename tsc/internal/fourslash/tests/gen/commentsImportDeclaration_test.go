package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsImportDeclaration(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: commentsImportDeclaration_file0.ts
/** NamespaceComment*/
export namespace m/*2*/1 {
    /** b's comment*/
    export var b: number;
    /** m2 comments*/
    export namespace m2 {
        /** class comment;*/
        export class c {
        };
        /** i*/
        export var i: c;;
    }
    /** exported function*/
    export function fooExport(): number;
}
// @Filename: commentsImportDeclaration_file1.ts
///<reference path='commentsImportDeclaration_file0.ts'/>
/** Import declaration*/
import /*3*/extMod = require("./commentsImportDeclaration_file0/*4*/");
extMod./*6*/m1./*7*/fooEx/*8q*/port(/*8*/);
var new/*9*/Var = new extMod.m1.m2./*10*/c();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "2", "namespace m1", "NamespaceComment")
	f.VerifyQuickInfoAt(t, "3", "import extMod = require(\"./commentsImportDeclaration_file0\")", "Import declaration")
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "m1",
					Detail: PtrTo("namespace extMod.m1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "NamespaceComment",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("var extMod.m1.b: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "b's comment",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "fooExport",
					Detail: PtrTo("function extMod.m1.fooExport(): number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "exported function",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "m2",
					Detail: PtrTo("namespace extMod.m1.m2"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "m2 comments",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "exported function"})
	f.VerifyQuickInfoAt(t, "8q", "function extMod.m1.fooExport(): number", "exported function")
	f.VerifyQuickInfoAt(t, "9", "var newVar: extMod.m1.m2.c", "")
	f.VerifyCompletions(t, "10", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "c",
					Detail: PtrTo("constructor extMod.m1.m2.c(): extMod.m1.m2.c"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "class comment;",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i",
					Detail: PtrTo("var extMod.m1.m2.i: extMod.m1.m2.c"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i",
						},
					},
				},
			},
		},
	})
}
