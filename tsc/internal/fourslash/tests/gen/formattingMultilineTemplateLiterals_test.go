package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingMultilineTemplateLiterals(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/new Error(` + "`" + `Failed to expand glob: ${projectSpec.filesGlob}
/*2*/                at projectPath : ${projectFile}
/*3*/                with error: ${ex.message}` + "`" + `)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, "new Error(`Failed to expand glob: ${projectSpec.filesGlob}")
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `                at projectPath : ${projectFile}`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, "                with error: ${ex.message}`)")
}
