package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExportEqualTypes(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @lib: es5
// @strict: false
// @Filename: exportEqualTypes_file0.ts
interface x {
    (): Date;
    foo: string;
}
export = x;
// @Filename: exportEqualTypes_file1.ts
///<reference path='exportEqualTypes_file0.ts'/>
import test = require('./exportEqualTypes_file0');
var t: /*1*/test;  // var 't' should be of type 'test'
var /*2*/r1 = t(); // Should return a Date
var /*3*/r2 = t./*4*/foo; // t should have 'foo' in dropdown list and be of type 'string'`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(alias) interface test\nimport test = require('./exportEqualTypes_file0')", "")
	f.VerifyQuickInfoAt(t, "2", "var r1: Date", "")
	f.VerifyQuickInfoAt(t, "3", "var r2: string", "")
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
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
	f.VerifyNoErrors(t)
}
