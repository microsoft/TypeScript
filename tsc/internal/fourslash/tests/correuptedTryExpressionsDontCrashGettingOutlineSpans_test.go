package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
