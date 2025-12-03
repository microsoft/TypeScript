package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: signatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles_file0.ts
declare function fn(x: string, y: number);
// @Filename: signatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles_file1.ts
declare function fn(x: string);
// @Filename: signatureHelpInFunctionCallOnFunctionDeclarationInMultipleFiles_file2.ts
fn(/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
}
