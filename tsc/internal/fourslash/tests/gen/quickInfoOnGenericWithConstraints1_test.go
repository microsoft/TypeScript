package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnGenericWithConstraints1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Fo/*1*/o<T/*2*/T extends Date> {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "interface Foo<TT extends Date>", "")
	f.VerifyQuickInfoAt(t, "2", "(type parameter) TT in Foo<TT extends Date>", "")
}
