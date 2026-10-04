package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRemoveDeclareFunctionExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare namespace M {
    function RegExp2(pattern: string): RegExp2;
    export function RegExp2(pattern: string, flags: string): RegExp2;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToBOF(t)
	f.DeleteAtCaret(t, 8)
}
