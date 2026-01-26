package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatTypeArgumentOnNewLine(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const genericObject = new GenericObject<
  /*1*/{}
>();
const genericObject2 = new GenericObject2<
  /*2*/{},
  /*3*/{}
>();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    {}`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    {},`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    {}`)
}
