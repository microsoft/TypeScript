package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatComments(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `_.chain()
// wow/*callChain1*/
  .then()
// waa/*callChain2*/
    .then();
wow(
  3,
// uaa/*argument1*/
    4
// wua/*argument2*/
);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "callChain1")
	f.VerifyCurrentLineContent(t, `    // wow`)
	f.GoToMarker(t, "callChain2")
	f.VerifyCurrentLineContent(t, `    // waa`)
	f.GoToMarker(t, "argument1")
	f.VerifyCurrentLineContent(t, `    // uaa`)
	f.GoToMarker(t, "argument2")
	f.VerifyCurrentLineContent(t, `    // wua`)
}
