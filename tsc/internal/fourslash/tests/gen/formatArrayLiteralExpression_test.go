package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatArrayLiteralExpression(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export let Things = [{
    Hat: 'hat', /*1*/
    Glove: 'glove',
    Umbrella: 'umbrella'
},{/*2*/
        Salad: 'salad', /*3*/
        Burrito: 'burrito',
        Pie: 'pie'
    }];/*4*/

export let Things2 = [
{
    Hat: 'hat', /*5*/
    Glove: 'glove',
    Umbrella: 'umbrella'
}/*6*/,
    {
        Salad: 'salad', /*7*/
        Burrito: ['burrito', 'carne asada', 'tinga de res', 'tinga de pollo'], /*8*/
        Pie: 'pie'
    }];/*9*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `    Hat: 'hat',`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `}, {`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    Salad: 'salad',`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `}];`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `        Hat: 'hat',`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `    },`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `        Salad: 'salad',`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `        Burrito: ['burrito', 'carne asada', 'tinga de res', 'tinga de pollo'],`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `    }];`)
}
