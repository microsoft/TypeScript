package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestHoverOverPrivateName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A {
    #f/*1*/oo = 3;
    #b/*2*/ar: number;
    #b/*3*/az = () => "hello";
    #q/*4*/ux(n: number): string {
        return "" + n;
    }
    static #staticF/*5*/oo = 3;
    static #staticB/*6*/ar: number;
    static #staticB/*7*/az = () => "hello";
    static #staticQ/*8*/ux(n: number): string {
        return "" + n;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) A.#foo: number", "")
	f.VerifyQuickInfoAt(t, "2", "(property) A.#bar: number", "")
	f.VerifyQuickInfoAt(t, "3", "(property) A.#baz: () => string", "")
	f.VerifyQuickInfoAt(t, "4", "(method) A.#qux(n: number): string", "")
	f.VerifyQuickInfoAt(t, "5", "(property) A.#staticFoo: number", "")
	f.VerifyQuickInfoAt(t, "6", "(property) A.#staticBar: number", "")
	f.VerifyQuickInfoAt(t, "7", "(property) A.#staticBaz: () => string", "")
	f.VerifyQuickInfoAt(t, "8", "(method) A.#staticQux(n: number): string", "")
}
