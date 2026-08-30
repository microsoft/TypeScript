package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoMappedPropertyUnionUndefined4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
type A/*1*/ = { [K in keyof { a?: string }]-?: string };
type B/*2*/ = { [K in keyof A]: string | undefined };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "type A = {\n    a: string;\n}", "")
	f.VerifyQuickInfoAt(t, "2", "type B = {\n    a: string | undefined;\n}", "")
}
