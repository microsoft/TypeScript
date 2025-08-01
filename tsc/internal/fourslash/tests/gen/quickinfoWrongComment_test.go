package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickinfoWrongComment(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    /** The colour */
    readonly colour: string
}
interface A extends I {
    readonly colour: "red" | "green";
}
interface B extends I {
    readonly colour: "yellow" | "green";
}
type F = A | B
const f: F = { colour: "green" }
f.colour/*1*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoIs(t, "(property) colour: \"green\" | \"red\" | \"yellow\"", "The colour")
}
