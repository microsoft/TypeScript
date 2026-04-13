package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests namespace expansion with a nested class that extends another class.
func TestQuickinfoVerbosityNamespaceClassHeritage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare class Base {
    id: number;
}

declare namespace Shapes/*1*/ {
    class Circle extends Base {
        radius: number;
    }
    class Square extends Base {
        side: number;
    }
    interface Drawable {
        draw(): void;
    }
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {0, 1}})
}
