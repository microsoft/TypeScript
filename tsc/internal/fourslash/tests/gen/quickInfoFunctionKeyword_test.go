package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoFunctionKeyword(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[1].forEach(fu/*1*/nction() {});
[1].map(x =/*2*/> x + 1);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(local function)(): void", "")
	f.VerifyQuickInfoAt(t, "2", "function(x: number): number", "")
}
