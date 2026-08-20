package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestIncrementalParsingWithJsDoc(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|import a from 'a/aaaaaaa/aaaaaaa/aaaaaa/aaaaaaa';
/**/import b from 'b';
import c from 'c';|]
[|/** @internal */|]
export class LanguageIdentifier[| { }|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
	f.GoToMarker(t, "")
	f.Backspace(t, 1)
	f.VerifyOutliningSpans(t)
}
