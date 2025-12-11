package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpImportStarFromExportEquals(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /node_modules/@types/abs/index.d.ts
declare function abs(str: string): string;
export = abs;
// @Filename: /a.js
import * as abs from "abs";
abs/**/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "abs(str: string): string"})
}
