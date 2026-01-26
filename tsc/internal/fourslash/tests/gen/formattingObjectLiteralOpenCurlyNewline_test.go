package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingObjectLiteralOpenCurlyNewline(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
var clear =
{
    outerKey:
    {
        innerKey: 1,
        innerKey2:
            2
    }
};
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
var clear =
{
    outerKey:
    {
        innerKey: 1,
        innerKey2:
            2
    }
};
`)
	opts444 := f.GetOptions()
	opts444.FormatCodeSettings.IndentMultiLineObjectLiteralBeginningOnBlankLine = core.TSTrue
	f.Configure(t, opts444)
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
var clear =
    {
        outerKey:
            {
                innerKey: 1,
                innerKey2:
                    2
            }
    };
`)
}
