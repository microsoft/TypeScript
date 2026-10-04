package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionListAtIdentifierDefinitionLocations_infers(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type UType = 1;
type Bar<T> = T extends { a: (x: infer /*1*/) => void; b: (x: infer U/*2*/) => void }
   ? U
   : never;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, f.Markers(), nil)
}
