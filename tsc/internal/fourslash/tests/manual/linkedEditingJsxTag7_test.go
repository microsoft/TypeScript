package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag7(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @FileName: /fragment.tsx
/*a*/const j/*b*/sx =/*c*/ (
    /*5*/</*0*/>/*1*/
        <img />
    /*6*/</*2*///*3*/>/*4*/
)/*d*/;
const jsx2 = (
    /* this is comment *//*13*/</*10*//* /*11*/more comment *//*12*/>/*8*/Hello/*9*/
    <//*14*/ /*18*///*17*/* even/*15*/ more comment *//*16*/>
);
const jsx3 = (
    <>/*7*/
    </>
);/*e*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	startRange := f.MarkerByName(t, "0").LSPosition
	endRange := f.MarkerByName(t, "3").LSPosition
	linkedCursors1 := []lsproto.Range{
		{Start: startRange, End: startRange},
		{Start: endRange, End: endRange},
	}
	startRange2 := f.MarkerByName(t, "10").LSPosition
	endRange2 := f.MarkerByName(t, "14").LSPosition
	linkedCursors2 := []lsproto.Range{
		{Start: startRange2, End: startRange2},
		{Start: endRange2, End: endRange2},
	}
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"0":  linkedCursors1,
		"1":  nil,
		"2":  nil,
		"3":  linkedCursors1,
		"4":  nil,
		"5":  nil,
		"6":  nil,
		"7":  nil,
		"8":  nil,
		"9":  nil,
		"10": linkedCursors2,
		"11": nil,
		"12": nil,
		"13": nil,
		"14": linkedCursors2,
		"15": nil,
		"16": nil,
		"17": nil,
		"18": nil,
		"a":  nil,
		"b":  nil,
		"c":  nil,
		"d":  nil,
		"e":  nil,
	})
}
