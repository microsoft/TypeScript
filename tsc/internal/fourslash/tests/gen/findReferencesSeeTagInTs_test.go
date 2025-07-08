package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindReferencesSeeTagInTs(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function doStuffWithStuff/*1*/(stuff: { quantity: number }) {}

declare const stuff: { quantity: number };
/** @see {doStuffWithStuff} */
if (stuff.quantity) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1")
}
