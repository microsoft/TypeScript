package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningSpansForUnbalancedEndRegion(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// bottom-heavy region balance
[|// #region matched

// #endregion matched|]

// #endregion unmatched`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyOutliningSpans(t, lsproto.FoldingRangeKindRegion)
}
