package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetOccurrencesIfElse4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if (true) {
    if (false) {
    }
    else {
    }
    if (true) {
    }
    else {
        /*1*/if (false)
            /*2*/i/*3*/f (true)
                var x = undefined;
    }
}
else            if (null) {
}
else /* whar garbl */ if (undefined) {
}
else
if (false) {
}
else { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
