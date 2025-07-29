package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTripleSlashRefPathCompletionAbsolutePaths(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: tests/test0.ts
/// <reference path="/tests/cases/f/*0*/
// @Filename: tests/test1.ts
/// <reference path="/tests/cases/fourslash/*1*/
// @Filename: tests/test2.ts
/// <reference path="/tests/cases/fourslash//*2*/
// @Filename: f1.ts
/*f1*/
// @Filename: f2.tsx
/*f2*/
// @Filename: folder/f1.ts
/*subf1*/
// @Filename: f3.js
/*f3*/
// @Filename: f4.jsx
/*f4*/
// @Filename: e1.ts
/*e1*/
// @Filename: e2.js
/*e2*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"0", "1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"fourslash",
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
			Exact: []fourslash.CompletionsExpectedItem{
				"e1.ts",
				"f1.ts",
				"f2.tsx",
				"folder",
				"tests",
			},
		},
	})
}
