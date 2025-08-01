package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoClassKeyword(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[1].forEach(cla/*1*/ss {});
[1].forEach(cla/*2*/ss OK{});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(local class) (Anonymous class)", "")
	f.VerifyQuickInfoAt(t, "2", "(local class) OK", "")
}
