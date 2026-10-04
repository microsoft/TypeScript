package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormattingObjectLiteralOpenCurlyNewlineTyping(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
var varName =/**/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "\n{")
	f.VerifyCurrentFileContent(t, `
var varName =
    {
`)
	f.Insert(t, "\na: 1")
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
var varName =
{
    a: 1
`)
	f.Insert(t, "\n};")
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `
var varName =
{
    a: 1
};
`)
}
