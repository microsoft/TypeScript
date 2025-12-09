package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// !!! can delete, there are similar tests that haven't been ported yet.
func TestCompletionImportAttributes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @target: esnext
// @module: esnext
// @filename: main.ts
import yadda1 from "yadda" with {/*attr*/}
import yadda2 from "yadda" with {attr/*attrEnd1*/: true}
import yadda3 from "yadda" with {attr: /*attrValue*/}

// @filename: yadda
export default {};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToEachMarker(t, nil, func(marker *fourslash.Marker, index int) {
		f.VerifyCompletions(t, marker, nil)
	})
}
