package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatOnOpenCurlyBraceRemoveNewLine(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if(true)
/**/ }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts124 := f.GetOptions()
	opts124.FormatCodeSettings.PlaceOpenBraceOnNewLineForControlBlocks = core.TSFalse
	f.Configure(t, opts124)
	f.GoToMarker(t, "")
	f.Insert(t, "{")
	f.VerifyCurrentFileContent(t, `if (true) { }`)
}
