package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInImportClause01(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @ModuleResolution: classic
// @Filename: m1.ts
export var foo: number = 1;
export function bar() { return 10; }
export function baz() { return 10; }
// @Filename: m2.ts
import {/*1*/, /*2*/ from "m1"
import {/*3*/} from "m1"
import {foo,/*4*/ from "m1"
import {bar as /*5*/, /*6*/ from "m1"
import {foo, bar, baz as b,/*7*/} from "m1"
import { type /*8*/ } from "m1";
import { type b/*9*/ } from "m1";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"8", "9"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"bar",
				"baz",
				"foo",
			},
		},
	})
}
