package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericFunctionSignatureHelp3MultiFile(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: genericFunctionSignatureHelp_0.ts
function foo1<T>(x: number, callback: (y1: T) => number) { }
// @Filename: genericFunctionSignatureHelp_1.ts
function foo2<T>(x: number, callback: (y2: T) => number) { }
// @Filename: genericFunctionSignatureHelp_2.ts
function foo3<T>(x: number, callback: (y3: T) => number) { }
// @Filename: genericFunctionSignatureHelp_3.ts
function foo4<T>(x: number, callback: (y4: T) => number) { }
// @Filename: genericFunctionSignatureHelp_4.ts
function foo5<T>(x: number, callback: (y5: T) => number) { }
// @Filename: genericFunctionSignatureHelp_5.ts
function foo6<T>(x: number, callback: (y6: T) => number) { }
// @Filename: genericFunctionSignatureHelp_6.ts
function foo7<T>(x: number, callback: (y7: T) => number) { }
// @Filename: genericFunctionSignatureHelp_7.ts
foo1(/*1*/               // signature help shows y as T
foo2(1,/*2*/             // signature help shows y as {}
foo3(1, (/*3*/           // signature help shows y as T
foo4<string>(1,/*4*/     // signature help shows y as string
foo5<string>(1, (/*5*/   // signature help shows y as T
foo6(1, </*6*/           // signature help shows y as {}
foo7(1, <string>(/*7*/   // signature help shows y as T`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo1(x: number, callback: (y1: unknown) => number): void"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo2(x: number, callback: (y2: unknown) => number): void"})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callback(y3: unknown): number"})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo4(x: number, callback: (y4: string) => number): void"})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callback(y5: string): number"})
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo6(x: number, callback: (y6: unknown) => number): void"})
	f.Insert(t, "string>(null,null);")
	f.GoToMarker(t, "7")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo7(x: number, callback: (y7: unknown) => number): void"})
}
