package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestBasicQuickInfo(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
/**
 * Some var
 */
var someVar/*1*/ = 123;

/**
 * Other var
 * See {@link someVar}
 */
var otherVar/*2*/ = someVar;

class Foo/*3*/ {
	#bar: string;
}
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var someVar: number", "Some var")
	f.VerifyQuickInfoAt(t, "2", "var otherVar: number", "Other var\nSee `someVar`")
}
