package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListForTransitivelyExportedMembers01(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: A.ts
export interface I1 { one: number }
export interface I2 { two: string }
export type I1_OR_I2 = I1 | I2;

export class C1 {
    one: string;
}

export module Inner {
    export interface I3 {
        three: boolean
    }

    export var varVar = 100;
    export let letVar = 200;
    export const constVar = 300;
}
// @Filename: B.ts
export var bVar = "bee!";
// @Filename: C.ts
export var cVar = "see!";
export * from "./A";
export * from "./B"
// @Filename: D.ts
import * as c from "./C";
var x = c./**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"bVar",
				"C1",
				"cVar",
				"Inner",
			},
		},
	})
}
