package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExportEqualCallableInterface(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @Filename: exportEqualCallableInterface_file0.ts
interface x {
    (): Date;
    foo: string;
}
export = x;
// @Filename: exportEqualCallableInterface_file1.ts
///<reference path='exportEqualCallableInterface_file0.ts'/>
import test = require('./exportEqualCallableInterface_file0');
var t2: test;
t2./**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersWithPrototypePlus(
				[]fourslash.CompletionsExpectedItem{
					"foo",
				}),
		},
	})
}
