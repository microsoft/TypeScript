package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperSupplementalDefinition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /globals.astro
const [|supplementalValue|] = 1;
[|supplemental/*use*/Value|];
supplementalV/*completion*/;
`, contentmappertest.SupplementalMapper, ".astro")
	defer done()

	f.VerifyBaselineGoToDefinition(t, false, "use")
	f.VerifyQuickInfoAt(t, "use", "const supplementalValue: 1", "")
	f.VerifyBaselineFindAllReferences(t, "use")

	f.GoToMarker(t, "completion")
	completions := f.GetCompletions(t, nil)
	var completion *lsproto.CompletionItem
	for _, item := range completions.Items {
		if item.Label == "supplementalValue" {
			completion = item
			break
		}
	}
	if completion == nil {
		t.Fatal("supplementalValue completion not found")
	}
	if completion.Data.FileName != "/globals.astro" || completion.Data.SupplementalFileIndex == nil || *completion.Data.SupplementalFileIndex != 0 {
		t.Fatalf("unexpected completion content mapper file data: %#v", completion.Data)
	}
	f.ResolveCompletionItem(t, completion)
}
