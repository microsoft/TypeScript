package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixCorrectQualifiedNameToIndexedAccessType01(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export interface Foo {
  bar: string;
}
export const x: [|Foo.bar|] = ""`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `Foo["bar"]`, false, 0, 0)
}
