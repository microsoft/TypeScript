package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncrementalEditInvocationExpressionAboveInterfaceDeclaration(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function alert(message?: any): void;
/*1*/
interface Foo {
    setISO8601(dString): Date;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, "alert(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "alert(message?: any): void"})
	f.VerifyErrorExistsAfterMarker(t, "1")
}
