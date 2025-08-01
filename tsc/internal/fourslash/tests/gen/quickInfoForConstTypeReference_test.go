package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForConstTypeReference(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `"" as /**/const;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNotQuickInfoExists(t)
}
