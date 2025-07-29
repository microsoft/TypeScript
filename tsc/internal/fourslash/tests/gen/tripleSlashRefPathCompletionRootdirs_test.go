package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTripleSlashRefPathCompletionRootdirs(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @rootDirs: sub/src1,src2
// @Filename: src2/test0.ts
/// <reference path="./mo/*0*/
// @Filename: src2/module0.ts
export var w = 0;
// @Filename: sub/src1/module1.ts
export var x = 0;
// @Filename: sub/src1/module2.ts
export var y = 0;
// @Filename: sub/src1/more/module3.ts
export var z = 0;
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
	f.VerifyCompletions(t, "0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"module0.ts",
			},
		},
	})
}
