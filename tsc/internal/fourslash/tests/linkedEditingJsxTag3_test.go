package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestLinkedEditingJsxTag3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /selfClosing.tsx
/*0*/const jsx = /*1*/(
   <div> /*2*/
      <p>/*3*/
         No lin/*4*/ked cursors here!
         /*5*/</*6*/img/*7*/ /*8*///*9*/>
     /*10*/ </p>/*11*/
   /*12*/</div>
/*13*/)/*14*/;/*15*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"0":  nil,
		"1":  nil,
		"2":  nil,
		"3":  nil,
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
	})
}
