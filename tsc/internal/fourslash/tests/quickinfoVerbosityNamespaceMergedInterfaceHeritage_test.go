package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickinfoVerbosityNamespaceMergedInterfaceHeritage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare namespace NS/*1*/ {
    interface Config extends A {
        a: string;
    }

    interface Config extends B {
        b: number;
    }

    interface A {
        a: string;
    }

    interface B {
        b: number;
    }
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
