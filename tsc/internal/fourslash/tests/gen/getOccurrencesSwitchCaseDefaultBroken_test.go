package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesSwitchCaseDefaultBroken(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `swi/*1*/tch(10) {
    case 1:
    case 2:
    c/*2*/ase 4:
    case 8:
    case 0xBEEF:
    de/*4*/fult:
        break;
    /*5*/cas 16:
    c/*3*/ase 12:
        function f() {
            br/*11*/eak;
            /*12*/break;
        }
}

sw/*6*/itch (10) {
    de/*7*/fault
    case 1:
    case 2

    c/*8*/ose 4:
    case 8:
    case 0xBEEF:
        bre/*9*/ak;
    case 16:
        () => bre/*10*/ak;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
