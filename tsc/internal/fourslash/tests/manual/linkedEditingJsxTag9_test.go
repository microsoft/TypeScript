package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag9(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /whitespace.tsx
const whitespaceOpening = (
   </*0*/ /*1*/div/*2*/ /*3*/> /*4*/
   <//*5*/di/*6*/v/*5end*/>
);
const whitespaceClosing = (
   </*7*/di/*8*/v/*8end*/>
   <//*9*/ /*10*/div/*11*/ /*12*/> /*13*/
);
const triviaOpening = (
    /* this is/*14*/ comment *//*15*/</*16*//* /*17*/more/*18*/ comment *//*19*/ /*20start*/di/*20*/v/*20end*/ /* comments */>/*21*/Hello/*22*/
    <//*23*/ /*24*///*25*/* even/*26*/ more comment *//*27*/ /*28start*/d/*28*/iv/*28end*/ /* b/*29*/ye */>
);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	linkedCursors1 := []lsproto.Range{
		{Start: f.MarkerByName(t, "1").LSPosition, End: f.MarkerByName(t, "2").LSPosition},
		{Start: f.MarkerByName(t, "5").LSPosition, End: f.MarkerByName(t, "5end").LSPosition},
	}
	linkedCursors2 := []lsproto.Range{
		{Start: f.MarkerByName(t, "7").LSPosition, End: f.MarkerByName(t, "8end").LSPosition},
		{Start: f.MarkerByName(t, "10").LSPosition, End: f.MarkerByName(t, "11").LSPosition},
	}
	linkedCursors3 := []lsproto.Range{
		{Start: f.MarkerByName(t, "20start").LSPosition, End: f.MarkerByName(t, "20end").LSPosition},
		{Start: f.MarkerByName(t, "28start").LSPosition, End: f.MarkerByName(t, "28end").LSPosition},
	}

	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"0":  nil,
		"1":  linkedCursors1,
		"2":  linkedCursors1,
		"3":  nil,
		"4":  nil,
		"5":  linkedCursors1,
		"6":  linkedCursors1,
		"7":  linkedCursors2,
		"8":  linkedCursors2,
		"9":  nil,
		"10": linkedCursors2,
		"11": linkedCursors2,
		"12": nil,
		"13": nil,
		"14": nil,
		"15": nil,
		"16": nil,
		"17": nil,
		"18": nil,
		"19": nil,
		"20": linkedCursors3,
		"21": nil,
		"22": nil,
		"23": nil,
		"24": nil,
		"25": nil,
		"26": nil,
		"27": nil,
		"28": linkedCursors3,
		"29": nil,
	})
}
