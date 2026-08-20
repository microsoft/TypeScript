package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatOnEnterFunctionDeclaration(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*0*/function listAPIFiles(path: string): string[] {/*1*/ }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.InsertLine(t, "")
	f.GoToMarker(t, "0")
	f.VerifyCurrentLineContent(t, `function listAPIFiles(path: string): string[] {`)
}
