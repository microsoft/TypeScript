package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatDocumentPreserveTrailingWhitespace(t *testing.T) {
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
	opts233.FormatCodeSettings.TrimTrailingWhitespace = core.TSFalse
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
