package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRegexErrorRecovery(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` // test code
//var x = //**/a/;/*1*/
//x.exec("bab");
 Bug 579071: Parser no longer detects a Regex when an open bracket is inserted
verify.quickInfoIs("RegExp");
verify.not.errorExistsAfterMarker("1");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.Insert(t, "(")
}
