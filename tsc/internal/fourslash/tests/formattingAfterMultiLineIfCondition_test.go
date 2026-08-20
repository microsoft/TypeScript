package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingAfterMultiLineIfCondition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` var foo;
 if (foo &&
     foo) {
/*comment*/     // This is a comment
     foo.toString();
 /**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "}")
	f.GoToMarker(t, "comment")
	f.VerifyCurrentLineContent(t, `    // This is a comment`)
}
