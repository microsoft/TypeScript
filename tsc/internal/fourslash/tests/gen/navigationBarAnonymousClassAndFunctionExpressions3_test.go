package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarAnonymousClassAndFunctionExpressions3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `describe('foo', () => {
    test(` + "`" + `a ${1} b ${2}` + "`" + `, () => {})
})

const a = 1;
const b = 2;
describe('foo', () => {
    test(` + "`" + `a ${a} b {b}` + "`" + `, () => {})
})`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
