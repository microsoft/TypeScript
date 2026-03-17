package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag4(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /typeTag.tsx
const jsx = (
   </*0*/div/*1*/</*2*/T/*3*/>/*4*/>/*5*/
      <p>
         <img />
      </p>
   <//*6*/div/*7*/>
);
// @Filename: /typeTagError.tsx
const jsx = (
   </*10*/div/*11*/</*12*/T/*13*/>/*14*/
      </*15*/p />
   <//*16*/div>
);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	linkedCursors := []lsproto.Range{
		{Start: f.MarkerByName(t, "0").LSPosition, End: f.MarkerByName(t, "1").LSPosition},
		{Start: f.MarkerByName(t, "6").LSPosition, End: f.MarkerByName(t, "7").LSPosition},
	}
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"0":  linkedCursors,
		"1":  linkedCursors,
		"2":  nil,
		"3":  nil,
		"4":  nil,
		"5":  nil,
		"6":  linkedCursors,
		"10": nil,
		"11": nil,
		"12": nil,
		"13": nil,
		"14": nil,
		"15": nil,
		"16": nil,
	})
}
