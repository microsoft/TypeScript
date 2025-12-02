package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningSpansForRegions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// region without label
[|// #region

// #endregion|]

// region without label with trailing spaces
[|// #region

// #endregion|]

// region with label
[|// #region label1

// #endregion|]

// region with extra whitespace in all valid locations
             [|//              #region          label2    label3

        //        #endregion|]

// No space before directive
[|//#region label4

//#endregion|]

// Nested regions
[|// #region outer

[|// #region inner

// #endregion inner|]

// #endregion outer|]

// region delimiters not valid when there is preceding text on line
 test // #region invalid1

test // #endregion

// region delimiters not valid when in multiline comment
/*
// #region invalid2
*/

/*
// #endregion
*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.MarkTestAsStradaServer()
	f.VerifyOutliningSpans(t, lsproto.FoldingRangeKindRegion)
}
