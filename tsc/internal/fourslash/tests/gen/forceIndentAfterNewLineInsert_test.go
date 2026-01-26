package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestForceIndentAfterNewLineInsert(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f1()
{ return 0; }
function f2()
{
return 0;
}
function g()
{ function h() {
return 0;
}}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `function f1() { return 0; }
function f2() {
    return 0;
}
function g() {
    function h() {
        return 0;
    }
}`)
}
