package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Regression test for a stack overflow in checkTypeExpandability (issue #4380).
//
// This is a minimized reproduction of pixijs's Container type, which crashed the language
// server on hover. `Container` defaults its own type parameter to the alias `ContainerChild`,
// and `type ContainerChild = Container` closes the loop, so `Container` is `Container<Container<...>>`
// — a reference type whose type argument is itself. During verbosity expansion the node builder
// probes the reused `Container` annotation, and checkTypeExpandability recursed into that
// self-referential type argument forever (a fatal runtime error, so it could not be recovered).
//
// The alias indirection is essential: `Container<C = Container>` directly is broken by the
// checker's cycle detection, but the `ContainerChild` alias defeats it — matching the real code.
// Hovering must terminate and produce quick info at every verbosity level without overflowing.
func TestQuickinfoVerbositySelfReferentialTypeArg(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `type ContainerChild = Container;
interface Container<C = ContainerChild> {
    parent: Container;
}
declare const x: Container;
x/*1*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{"1": {3}})
}
