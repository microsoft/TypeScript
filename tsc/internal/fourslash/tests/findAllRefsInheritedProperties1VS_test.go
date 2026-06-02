package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsInheritedProperties1VS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class class1 extends class1 {
   /*1*/doStuff() { }
   /*2*/propName: string;
}

var v: class1;
v./*3*/doStuff();
v./*4*/propName;`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineVSFindAllReferences(t, "1", "2", "3", "4")
}
