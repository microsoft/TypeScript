package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericInterfacesWithConstraints1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A { a: string; }
interface B extends A { b: string; }
interface C extends B { c: string; }
interface G<T, U extends B> {
    x: T;
    y: U;
}
var v/*1*/1: G<A, C>;               // Ok
var v/*2*/2: G<{ a: string }, C>;   // Ok, equivalent to G<A, C>
var v/*3*/3: G<G<A, B>, C>;         // Ok`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var v1: G<A, C>", "")
	f.VerifyQuickInfoAt(t, "2", "var v2: G<{\n    a: string;\n}, C>", "")
	f.VerifyQuickInfoAt(t, "3", "var v3: G<G<A, B>, C>", "")
}
