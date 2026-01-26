package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingJsxTexts4(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
function foo() {
const a = <ns: foobar   x : test1   x :test2="string"  x:test3={true?1:0}  />;

return a;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `function foo() {
    const a = <ns:foobar x:test1 x:test2="string" x:test3={true ? 1 : 0} />;

    return a;
}`)
}
