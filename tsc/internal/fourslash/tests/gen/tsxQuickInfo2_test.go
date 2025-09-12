package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxQuickInfo2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
declare module JSX {
    interface Element { }
    interface IntrinsicElements {
        div: any
    }
}
var x1 = <di/*1*/v></di/*2*/v>
class MyElement {}
var z = <My/*3*/Element></My/*4*/Element>`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) JSX.IntrinsicElements.div: any", "")
	f.VerifyQuickInfoAt(t, "2", "(property) JSX.IntrinsicElements.div: any", "")
	f.VerifyQuickInfoAt(t, "3", "class MyElement", "")
	f.VerifyQuickInfoAt(t, "4", "class MyElement", "")
}
