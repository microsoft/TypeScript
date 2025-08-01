package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOverloadQuickInfo(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function Foo(a: string, b: number, c: boolean);
function Foo(a: any, name: string, age: number);
function Foo(fred: any[], name: string, age: number);
function Foo(fred: any[  ] , name: string[], age: number);
function Foo(fred: any[], name: string[], age: number[]);
function Foo(fred:         any, name: string[], age: number[]); // Extraneous spaces should get removed
function Foo(fred: any, name: boolean, age: number[]);
function Foo(dave: boolean, name: string);
function Foo(fred: any, mandy: {(): number}, age: number[]);    // Embedded interface will get converted to shorthand notation, () => 
function Foo(fred: any, name: string, age: { });
function Foo(fred: any, name: string, age: number[]);
function Foo(test: string, name, age: number);
function Foo();
function Foo(x?: any, y?: any, z?: any) {
}
Fo/**/o();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "function Foo(): any (+12 overloads)", "")
}
