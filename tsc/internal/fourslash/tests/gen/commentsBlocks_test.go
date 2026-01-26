package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsBlocks(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/// 1
var x,
    /*2*/// 2
    y,
/*3*/     /* %3 */
    z;

/*4*/ // 4
switch (x) {
/*5*/     // 5
    case 1:
/*6*/         // 6
        break;
/*7*/     // 7
    case 2:
/*8*/     // 8
}

/*9*/ // 9
if (true)
/*10*/     // 10
    ;
/*11*/ // 11
else {
/*12*/     // 12
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContent(t, `// 1`)
	f.GoToMarker(t, "2")
	f.VerifyCurrentLineContent(t, `    // 2`)
	f.GoToMarker(t, "3")
	f.VerifyCurrentLineContent(t, `    /* %3 */`)
	f.GoToMarker(t, "4")
	f.VerifyCurrentLineContent(t, `// 4`)
	f.GoToMarker(t, "5")
	f.VerifyCurrentLineContent(t, `    // 5`)
	f.GoToMarker(t, "6")
	f.VerifyCurrentLineContent(t, `        // 6`)
	f.GoToMarker(t, "7")
	f.VerifyCurrentLineContent(t, `    // 7`)
	f.GoToMarker(t, "8")
	f.VerifyCurrentLineContent(t, `    // 8`)
	f.GoToMarker(t, "9")
	f.VerifyCurrentLineContent(t, `// 9`)
	f.GoToMarker(t, "10")
	f.VerifyCurrentLineContent(t, `    // 10`)
	f.GoToMarker(t, "11")
	f.VerifyCurrentLineContent(t, `// 11`)
	f.GoToMarker(t, "12")
	f.VerifyCurrentLineContent(t, `    // 12`)
}
