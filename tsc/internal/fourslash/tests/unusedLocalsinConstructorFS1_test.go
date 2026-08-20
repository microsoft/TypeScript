package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestUnusedLocalsinConstructorFS1(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noUnusedLocals: true
// @noUnusedParameters:true
class greeter {
    [| constructor() {
        var unused = 20;
    } |]
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `constructor() {
}`, false, 0, 0)
}
