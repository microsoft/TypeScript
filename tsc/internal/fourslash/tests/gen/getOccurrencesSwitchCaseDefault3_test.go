package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesSwitchCaseDefault3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `foo: [|switch|] (1) {
    [|case|] 1:
    [|case|] 2:
        [|break|];
    [|case|] 3:
        switch (2) {
            case 1:
                [|break|] foo;
                continue; // invalid
            default:
                break;
        }
    [|default|]:
        [|break|];
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
