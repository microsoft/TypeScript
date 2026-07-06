package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoContextualObjectMethodJSDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface I {
    /**
     * Description of func.
     * @param arg Description of arg.
     */
    func(arg: number): void
}

class Foo {
    constructor(i: I) {}
}

new Foo({ func/*1*/() {} })
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(method) I.func(arg: number): void", "Description of func.\n\n*@param* `arg` — Description of arg.")
}
