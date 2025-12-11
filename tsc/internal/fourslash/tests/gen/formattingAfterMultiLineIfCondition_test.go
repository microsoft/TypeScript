package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingAfterMultiLineIfCondition(t *testing.T) {
	t.Parallel()
	t.Skip()
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
	f.VerifyCurrentLineContentIs(t, "    // This is a comment")
}
