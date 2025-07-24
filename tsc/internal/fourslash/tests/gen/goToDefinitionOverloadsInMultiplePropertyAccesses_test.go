package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionOverloadsInMultiplePropertyAccesses(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace A {
    export namespace B {
        export function f(value: number): void;
        export function /*1*/f(value: string): void;
        export function f(value: number | string) {}
    }
}
A.B.[|/*2*/f|]("");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "2")
}
