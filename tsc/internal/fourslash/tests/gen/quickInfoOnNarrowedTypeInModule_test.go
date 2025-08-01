package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnNarrowedTypeInModule(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var strOrNum: string | number;
module m {
    var nonExportedStrOrNum: string | number;
    export var exportedStrOrNum: string | number;
    var num: number;
    var str: string;
    if (typeof /*1*/nonExportedStrOrNum === "number") {
        num = /*2*/nonExportedStrOrNum;
    }
    else {
        str = /*3*/nonExportedStrOrNum.length;
    }
    if (typeof /*4*/exportedStrOrNum === "number") {
        strOrNum = /*5*/exportedStrOrNum;
    }
    else {
        strOrNum = /*6*/exportedStrOrNum;
    }
}
if (typeof m./*7*/exportedStrOrNum === "number") {
    strOrNum = m./*8*/exportedStrOrNum;
}
else {
    strOrNum = m./*9*/exportedStrOrNum;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var nonExportedStrOrNum: string | number", "")
	f.VerifyQuickInfoAt(t, "2", "var nonExportedStrOrNum: number", "")
	f.VerifyQuickInfoAt(t, "3", "var nonExportedStrOrNum: string", "")
	f.VerifyQuickInfoAt(t, "4", "var m.exportedStrOrNum: string | number", "")
	f.VerifyQuickInfoAt(t, "5", "var m.exportedStrOrNum: number", "")
	f.VerifyQuickInfoAt(t, "6", "var m.exportedStrOrNum: string", "")
	f.VerifyQuickInfoAt(t, "7", "var m.exportedStrOrNum: string | number", "")
	f.VerifyQuickInfoAt(t, "8", "var m.exportedStrOrNum: number", "")
	f.VerifyQuickInfoAt(t, "9", "var m.exportedStrOrNum: string", "")
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "nonExportedStrOrNum",
					Detail: PtrTo("var nonExportedStrOrNum: string | number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "nonExportedStrOrNum",
					Detail: PtrTo("var nonExportedStrOrNum: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "nonExportedStrOrNum",
					Detail: PtrTo("var nonExportedStrOrNum: string"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "exportedStrOrNum",
					Detail: PtrTo("var exportedStrOrNum: string | number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "exportedStrOrNum",
					Detail: PtrTo("var exportedStrOrNum: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "exportedStrOrNum",
					Detail: PtrTo("var exportedStrOrNum: string"),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "exportedStrOrNum",
					Detail: PtrTo("var m.exportedStrOrNum: string | number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "8", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "exportedStrOrNum",
					Detail: PtrTo("var m.exportedStrOrNum: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "9", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "exportedStrOrNum",
					Detail: PtrTo("var m.exportedStrOrNum: string"),
				},
			},
		},
	})
}
