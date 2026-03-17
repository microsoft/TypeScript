package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag6(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /namespace.tsx
const jsx = (
    </*start*/someNamespa/*3*/ce./*2*/Thing/*startend*/>
    <//*end*/someNamespace/*1*/.Thing/*endend*/>
);
 const jsx1 = </*4*/foo/*5*/  /*6*/./*7*/ /*8*/ba/*9*/r><//*10*/foo.bar>;
 const jsx2 = <foo./*11*/bar><//*12*/ /*13*/f/*14*/oo /*15*/./*16*/b/*17*/ar/*18*/>;
 const jsx3 = </*19*/foo/*20*/ //*21*// /*22*/some comment
     /*23*/./*24*/bar>
     </f/*25*/oo.bar>;
 let jsx4 =
     </*26*/foo  /*27*/ .// hi/*28*/
     /*29*/bar/*26end*/>
     <//*30*/foo  /*31*/ .// hi/*32*/
     /*33*/bar/*30end*/>`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	linkedCursors1 := []lsproto.Range{
		{Start: f.MarkerByName(t, "start").LSPosition, End: f.MarkerByName(t, "startend").LSPosition},
		{Start: f.MarkerByName(t, "end").LSPosition, End: f.MarkerByName(t, "endend").LSPosition},
	}
	linkedCursors2 := []lsproto.Range{
		{Start: f.MarkerByName(t, "26").LSPosition, End: f.MarkerByName(t, "26end").LSPosition},
		{Start: f.MarkerByName(t, "30").LSPosition, End: f.MarkerByName(t, "30end").LSPosition},
	}
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"1":  linkedCursors1,
		"2":  linkedCursors1,
		"3":  linkedCursors1,
		"4":  nil,
		"5":  nil,
		"6":  nil,
		"7":  nil,
		"8":  nil,
		"9":  nil,
		"10": nil,
		"11": nil,
		"12": nil,
		"13": nil,
		"14": nil,
		"15": nil,
		"16": nil,
		"17": nil,
		"18": nil,
		"19": nil,
		"20": nil,
		"21": nil,
		"22": nil,
		"23": nil,
		"24": nil,
		"25": nil,
		"26": linkedCursors2,
		"27": linkedCursors2,
		"28": linkedCursors2,
		"29": linkedCursors2,
		"30": linkedCursors2,
		"31": linkedCursors2,
		"32": linkedCursors2,
		"33": linkedCursors2,
	})
}
