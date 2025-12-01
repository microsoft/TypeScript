package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpExplicitTypeArguments(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function f<T = boolean, U = string>(x: T, y: U): T;
f<number, string>(/*1*/);
f(/*2*/);
f<number>(/*3*/);
f<number, string, boolean>(/*4*/);
interface A { a: number }
interface B extends A { b: string }
declare function g<T, U, V extends A = B>(x: T, y: U, z: V): T;
declare function h<T, U, V extends A>(x: T, y: U, z: V): T;
declare function j<T, U, V = B>(x: T, y: U, z: V): T;
g(/*5*/);
h(/*6*/);
j(/*7*/);
g<number>(/*8*/);
h<number>(/*9*/);
j<number>(/*10*/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(x: number, y: string): number"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(x: boolean, y: string): boolean"})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(x: number, y: string): number"})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(x: number, y: string): number"})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "g(x: unknown, y: unknown, z: B): unknown"})
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "h(x: unknown, y: unknown, z: A): unknown"})
	f.GoToMarker(t, "7")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "j(x: unknown, y: unknown, z: B): unknown"})
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "g(x: number, y: unknown, z: B): number"})
	f.GoToMarker(t, "9")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "h(x: number, y: unknown, z: A): number"})
	f.GoToMarker(t, "10")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "j(x: number, y: unknown, z: B): number"})
}
