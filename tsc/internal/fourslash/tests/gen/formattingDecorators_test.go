package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingDecorators(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/        @    decorator1    
/*2*/            @        decorator2
/*3*/    @decorator3
/*4*/        @    decorator4    @            decorator5
/*5*/class C {
/*6*/            @    decorator6    
/*7*/                @        decorator7
/*8*/        @decorator8
/*9*/    method1() { }

/*10*/        @    decorator9    @            decorator10 @decorator11            method2() { }

    method3(
/*11*/                @    decorator12    
/*12*/                    @        decorator13
/*13*/            @decorator14
/*14*/        x) { }

    method4(
/*15*/            @    decorator15    @            decorator16 @decorator17             x) { }

/*16*/            @    decorator18    
/*17*/                @        decorator19
/*18*/        @decorator20    
/*19*/    ["computed1"]() { }

/*20*/        @    decorator21    @            decorator22 @decorator23            ["computed2"]() { }

/*21*/            @    decorator24    
/*22*/                @        decorator25
/*23*/        @decorator26
/*24*/    get accessor1() { }

/*25*/        @    decorator27    @            decorator28 @decorator29            get accessor2() { }

/*26*/            @    decorator30    
/*27*/                @        decorator31
/*28*/        @decorator32
/*29*/    property1;

/*30*/        @    decorator33    @            decorator34 @decorator35            property2;
/*31*/function test(@decorator36@decorator37 param) {};
/*32*/function test2(@decorator38()@decorator39()param) {};
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `@decorator1`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `@decorator2`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `@decorator3`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `@decorator4 @decorator5`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `class C {`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    @decorator6`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    @decorator7`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    @decorator8`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `    method1() { }`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `    @decorator9 @decorator10 @decorator11 method2() { }`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `        @decorator12`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `        @decorator13`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `        @decorator14`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `        x) { }`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `        @decorator15 @decorator16 @decorator17 x) { }`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `    @decorator18`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `    @decorator19`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `    @decorator20`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `    ["computed1"]() { }`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `    @decorator21 @decorator22 @decorator23 ["computed2"]() { }`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `    @decorator24`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `    @decorator25`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `    @decorator26`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `    get accessor1() { }`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `    @decorator27 @decorator28 @decorator29 get accessor2() { }`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `    @decorator30`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `    @decorator31`)
	f.GoToMarker(t, "28")
	f.VerifyCurrentLineContent(t, `    @decorator32`)
	f.GoToMarker(t, "29")
	f.VerifyCurrentLineContent(t, `    property1;`)
	f.GoToMarker(t, "30")
	f.VerifyCurrentLineContent(t, `    @decorator33 @decorator34 @decorator35 property2;`)
	f.GoToMarker(t, "31")
	f.VerifyCurrentLineContent(t, `function test(@decorator36 @decorator37 param) { };`)
	f.GoToMarker(t, "32")
	f.VerifyCurrentLineContent(t, `function test2(@decorator38() @decorator39() param) { };`)
}
