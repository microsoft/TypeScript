package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetOccurrencesSwitchCaseDefault5(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `switch/*1*/ (10) {
    case/*2*/ 1:
    case/*3*/ 2:
    case/*4*/ 4:
    case/*5*/ 8:
        foo: switch/*6*/ (20) {
            case/*7*/ 1:
            case/*8*/ 2:
                break/*9*/;
            default/*10*/:
                break foo;
        }
    case/*11*/ 0xBEEF:
    default/*12*/:
        break/*13*/;
    case 16/*14*/:
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
