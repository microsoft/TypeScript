package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestErrorConsistency(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Int<T> {
val<U>(f: (t: T) => U): Int<U>;
}
declare var v1: Int<string>;
var /*1*/v2/*2*/: Int<number> = v1;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToEOF(t)
	f.VerifyErrorExistsBetweenMarkers(t, "1", "2")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.Backspace(t, 1)
	f.VerifyErrorExistsBetweenMarkers(t, "1", "2")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
