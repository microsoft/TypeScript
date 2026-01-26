package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatDocumentPreserveTrailingWhitespace(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
var a;     
var b     
     
//     
function b(){     
    while(true){     
    }     
}     
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts233 := f.GetOptions()
	opts233.FormatCodeSettings.TrimTrailingWhitespace = false
	f.Configure(t, opts233)
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
var a;     
var b     
     
//     
function b() {     
    while (true) {     
    }     
}     
`)
}
