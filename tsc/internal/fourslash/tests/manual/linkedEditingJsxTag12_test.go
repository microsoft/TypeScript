package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag12(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /incomplete.tsx
function Test() {
    return <div>
        </*0*/
        <div {...{}}>
        </div>
    </div>
}
// @Filename: /incompleteMismatched.tsx
function Test() {
    return <div>
        <T
        <div {...{}}>
        </div>
    </div>
}
// @Filename: /incompleteMismatched2.tsx
function Test() {
    return <div>
        <T
        <div {...{}}>
        T</div>
    </div>
}
// @Filename: /incompleteMismatched3.tsx
function Test() {
    return <div>
        <div {...{}}>
        </div>
        <T
    </div>
}
// @Filename: /mismatched.tsx
function Test() {
    return <div>
        <T>
        <div {...{}}>
        </div>
    </div>
}
// @Filename: /matched.tsx
function Test() {
    return <div>

        <div {...{}}>
        </div>
    </div>
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{"0": nil})
	f.VerifyBaselineLinkedEditing(t)
}
