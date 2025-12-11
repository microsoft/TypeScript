package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsconfig(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.js
function f(/**/x) {
}
// @Filename: /jsconfig.json
{
    "compilerOptions": {
        "checkJs": true,
        "noImplicitAny": true
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.js")
	f.VerifyErrorExistsAfterMarker(t, "")
}
