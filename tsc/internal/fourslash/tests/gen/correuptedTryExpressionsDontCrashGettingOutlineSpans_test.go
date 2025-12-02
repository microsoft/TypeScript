package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCorreuptedTryExpressionsDontCrashGettingOutlineSpans(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `try[| {
  var x = [
    {% try[||] %}|][|{% except %}|] 
  ]
} catch (e)[| {
  
}|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyOutliningSpans(t)
}
