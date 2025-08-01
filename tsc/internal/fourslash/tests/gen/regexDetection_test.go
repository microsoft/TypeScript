package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRegexDetection(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` /*1*/15 / /*2*/Math.min(61 / /*3*/42, 32 / 15) / /*4*/15;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyNotQuickInfoExists(t)
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoIs(t, "var Math: Math", "An intrinsic object that provides basic mathematics functionality and constants.")
	f.GoToMarker(t, "3")
	f.VerifyNotQuickInfoExists(t)
	f.GoToMarker(t, "4")
	f.VerifyNotQuickInfoExists(t)
}
