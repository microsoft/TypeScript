package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindReferencesJSXTagName3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
// @Filename: /a.tsx
namespace JSX {
    export interface Element { }
    export interface IntrinsicElements {
        [|[|/*1*/div|]: any;|]
    }
}

[|const [|/*6*/Comp|] = () =>
    [|<[|/*2*/div|]>
        Some content
        [|<[|/*3*/div|]>More content</[|/*4*/div|]>|]
    </[|/*5*/div|]>|];|]

const x = [|<[|/*7*/Comp|]>
    Content
</[|/*8*/Comp|]>|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5", "6", "7", "8")
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[5], f.Ranges()[7], f.Ranges()[8], f.Ranges()[9])
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, f.Ranges()[3], f.Ranges()[11], f.Ranges()[12])
}
