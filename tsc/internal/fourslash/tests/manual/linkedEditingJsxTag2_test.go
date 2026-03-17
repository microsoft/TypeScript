package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLinkedEditingJsxTag2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /attrs.tsx
const jsx = (
   </*0*/div/*1*/ /*2*/styl/*3*/e={{ color: 'red' }}/*4*/>/*5*/
      <p>
         <img />
      </p>
   <//*6start*/di/*6*/v/*6end*/>
);
// @Filename: /attrsError.tsx
const jsx = (
   </*10*/div/*11*/ /*12*/styl/*13*/e={{ color: 'red' }/*14*/>/*15*/
         </*16*/p />
   <//*17*/div>
);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Test file content (for readability):
	// const jsx = (
	//    <div style={{ color: 'red' }}>
	//       <p>
	//          <img />
	//       </p>
	//    </div>
	// );
	linkedCursors := []lsproto.Range{
		{Start: f.MarkerByName(t, "0").LSPosition, End: f.MarkerByName(t, "1").LSPosition},
		{Start: f.MarkerByName(t, "6start").LSPosition, End: f.MarkerByName(t, "6end").LSPosition},
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
