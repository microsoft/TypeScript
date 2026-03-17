package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /basic.tsx
/*a*/const j/*b*/sx = (
    /*c*/</*0*/d/*1*/iv/*2*/>/*3*/
    </*4*///*5*/di/*6*/v/*7*/>/*8*/
);
const jsx2 = (
    </*9start*/d/*9*/iv/*9end*/>
        </*10start*/d/*10*/iv/*10end*/>
            </*11start*/p/*11*/>
            <//*12*/p/*12end*/>        
        <//*13start*/d/*13*/iv/*13end*/>
    <//*14start*/d/*14*/iv/*14end*/>
);/*d*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	linkedCursors1 := []lsproto.Range{
		{Start: f.MarkerByName(t, "0").LSPosition, End: f.MarkerByName(t, "2").LSPosition}, {Start: f.MarkerByName(t, "5").LSPosition, End: f.MarkerByName(t, "7").LSPosition},
	}
	linkedCursors2 := []lsproto.Range{
		{Start: f.MarkerByName(t, "9start").LSPosition, End: f.MarkerByName(t, "9end").LSPosition},
		{Start: f.MarkerByName(t, "14start").LSPosition, End: f.MarkerByName(t, "14end").LSPosition},
	}
	linkedCursors3 := []lsproto.Range{
		{Start: f.MarkerByName(t, "10start").LSPosition, End: f.MarkerByName(t, "10end").LSPosition},
		{Start: f.MarkerByName(t, "13start").LSPosition, End: f.MarkerByName(t, "13end").LSPosition},
	}
	linkedCursors4 := []lsproto.Range{
		{Start: f.MarkerByName(t, "11start").LSPosition, End: f.MarkerByName(t, "11").LSPosition},
		{Start: f.MarkerByName(t, "12").LSPosition, End: f.MarkerByName(t, "12end").LSPosition},
	}
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"0":  linkedCursors1,
		"1":  linkedCursors1,
		"2":  linkedCursors1,
		"3":  nil,
		"4":  nil,
		"5":  linkedCursors1,
		"6":  linkedCursors1,
		"7":  linkedCursors1,
		"8":  nil,
		"9":  linkedCursors2,
		"10": linkedCursors3,
		"11": linkedCursors4,
		"12": linkedCursors4,
		"13": linkedCursors3,
		"14": linkedCursors2,
		"a":  nil,
		"b":  nil,
		"c":  nil,
		"d":  nil,
	})
}
