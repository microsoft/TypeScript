package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingofSingleLineBlockConstructs(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module InternalModule/*1*/{}
interface MyInterface/*2*/{}
enum E/*3*/{}
class MyClass/*4*/{
constructor()/*cons*/{}
        public MyFunction()/*5*/{return 0;}
public get Getter()/*6*/{}
public set Setter(x)/*7*/{}}
function foo()/*8*/{{}}
(function()/*10*/{});
(() =>/*11*/{});
var x :/*12*/{};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `module InternalModule { }`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `interface MyInterface { }`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `enum E { }`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `class MyClass {`)
	f.GoToMarker(t, "cons")
	f.VerifyCurrentLineContent(t, `    constructor() { }`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    public MyFunction() { return 0; }`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    public get Getter() { }`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    public set Setter(x) { }`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `function foo() { { } }`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `(function() { });`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `(() => { });`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `var x: {};`)
}
