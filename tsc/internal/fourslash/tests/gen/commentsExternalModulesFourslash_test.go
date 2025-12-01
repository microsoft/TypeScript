package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsExternalModulesFourslash(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: commentsExternalModules_file0.ts
/** Namespace comment*/
export namespace m/*1*/1 {
    /** b's comment*/
    export var b: number;
    /** foo's comment*/
    function foo() {
        return /*2*/b;
    }
    /** m2 comments*/
    export namespace m2 {
        /** class comment;*/
        export class c {
        };
        /** i*/
        export var i = new c();
    }
    /** exported function*/
    export function fooExport() {
        return f/*3q*/oo(/*3*/);
    }
}
/*4*/m1./*5*/fooEx/*6q*/port(/*6*/);
var my/*7*/var = new m1.m2./*8*/c();
// @Filename: commentsExternalModules_file1.ts
/**This is on import declaration*/
import ex/*9*/tMod = require("./commentsExternalModules_file0");
/*10*/extMod./*11*/m1./*12*/fooExp/*13q*/ort(/*13*/);
var new/*14*/Var = new extMod.m1.m2./*15*/c();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "commentsExternalModules_file0.ts")
	f.VerifyQuickInfoAt(t, "1", "namespace m1", "Namespace comment")
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("var b: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "b's comment",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "foo",
					Detail: PtrTo("function foo(): number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "foo's comment",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foo's comment"})
	f.VerifyQuickInfoAt(t, "3q", "function foo(): number", "foo's comment")
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "m1",
					Detail: PtrTo("namespace m1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Namespace comment",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("var m1.b: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "b's comment",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "fooExport",
					Detail: PtrTo("function m1.fooExport(): number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "exported function",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "m2",
					Detail: PtrTo("namespace m1.m2"),
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
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "exported function"})
	f.VerifyQuickInfoAt(t, "6q", "function m1.fooExport(): number", "exported function")
	f.VerifyQuickInfoAt(t, "7", "var myvar: m1.m2.c", "")
	f.VerifyCompletions(t, "8", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "c",
					Detail: PtrTo("constructor m1.m2.c(): m1.m2.c"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "class comment;",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i",
					Detail: PtrTo("var m1.m2.i: m1.m2.c"),
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
	f.GoToFile(t, "commentsExternalModules_file1.ts")
	f.VerifyQuickInfoAt(t, "9", "import extMod = require(\"./commentsExternalModules_file0\")", "This is on import declaration")
	f.VerifyCompletions(t, "10", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "extMod",
					Detail: PtrTo("import extMod = require(\"./commentsExternalModules_file0\")"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "This is on import declaration",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "11", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "m1",
					Detail: PtrTo("namespace extMod.m1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Namespace comment",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "12", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
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
	f.GoToMarker(t, "13")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "exported function"})
	f.VerifyQuickInfoAt(t, "13q", "function extMod.m1.fooExport(): number", "exported function")
	f.VerifyQuickInfoAt(t, "14", "var newVar: extMod.m1.m2.c", "")
	f.VerifyCompletions(t, "15", &fourslash.CompletionsExpectedList{
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
