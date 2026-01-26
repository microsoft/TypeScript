package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingOnObjectLiteral(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = /*1*/{foo:/*2*/ 1,
bar: "tt",/*3*/
boo: /*4*/1 + 5}/*5*/;

var x2 = /*6*/{foo/*7*/: 1,
bar: /*8*/"tt",boo:1+5}/*9*/;

function Foo() {/*10*/
var typeICalc = {/*11*/
clear: {/*12*/
"()": [1, 2, 3]/*13*/
}/*14*/
}/*15*/
}/*16*/

// Rule for object literal members for the "value" of the memebr to follow the indent/*17*/
// of the member, i.e. the relative position of the value is maintained when the member/*18*/
// is indented./*19*/
var x2 = {/*20*/
  foo:/*21*/
3,/*22*/
          'bar':/*23*/
                    { a: 1, b : 2}/*24*/
};/*25*/

var x={    };/*26*/
var y = {};/*27*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `var x = {`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    foo: 1,`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    bar: "tt",`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `    boo: 1 + 5`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `};`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `var x2 = {`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    foo: 1,`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    bar: "tt", boo: 1 + 5`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `};`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `function Foo() {`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `    var typeICalc = {`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `        clear: {`)
	f.GoToMarker(t, "13")
	f.VerifyCurrentLineContent(t, `            "()": [1, 2, 3]`)
	f.GoToMarker(t, "14")
	f.VerifyCurrentLineContent(t, `        }`)
	f.GoToMarker(t, "15")
	f.VerifyCurrentLineContent(t, `    }`)
	f.GoToMarker(t, "16")
	f.VerifyCurrentLineContent(t, `}`)
	f.GoToMarker(t, "17")
	f.VerifyCurrentLineContent(t, `// Rule for object literal members for the "value" of the memebr to follow the indent`)
	f.GoToMarker(t, "18")
	f.VerifyCurrentLineContent(t, `// of the member, i.e. the relative position of the value is maintained when the member`)
	f.GoToMarker(t, "19")
	f.VerifyCurrentLineContent(t, `// is indented.`)
	f.GoToMarker(t, "20")
	f.VerifyCurrentLineContent(t, `var x2 = {`)
	f.GoToMarker(t, "21")
	f.VerifyCurrentLineContent(t, `    foo:`)
	f.GoToMarker(t, "22")
	f.VerifyCurrentLineContent(t, `        3,`)
	f.GoToMarker(t, "23")
	f.VerifyCurrentLineContent(t, `    'bar':`)
	f.GoToMarker(t, "24")
	f.VerifyCurrentLineContent(t, `        { a: 1, b: 2 }`)
	f.GoToMarker(t, "25")
	f.VerifyCurrentLineContent(t, `};`)
	f.GoToMarker(t, "26")
	f.VerifyCurrentLineContent(t, `var x = {};`)
	f.GoToMarker(t, "27")
	f.VerifyCurrentLineContent(t, `var y = {};`)
}
