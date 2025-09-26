package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesIfElse2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `if (true) {
    [|if|] (false) {
    }
    [|else|]{
    }
    if (true) {
    }
    else {
        if (false)
            if (true)
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
