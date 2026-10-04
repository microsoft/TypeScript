package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/**/module Default{ 
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts131 := f.GetOptions()
	opts131.FormatCodeSettings.PlaceOpenBraceOnNewLineForFunctions = core.TSTrue
	f.Configure(t, opts131)
	opts199 := f.GetOptions()
	opts199.FormatCodeSettings.PlaceOpenBraceOnNewLineForControlBlocks = core.TSTrue
	f.Configure(t, opts199)
	f.FormatDocument(t, "")
	f.GoToMarker(t, "")
	f.VerifyCurrentLineContent(t, `module Default`)
}
