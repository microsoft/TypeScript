package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxRename2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
declare module JSX {
    interface Element { }
    interface IntrinsicElements {
        div: {
            [|[|{| "contextRangeIndex": 0 |}name|]?: string;|]
            isOpen?: boolean;
        };
        span: { n: string; };
    }
}
var x = <div [|[|{| "contextRangeIndex": 2 |}name|]="hello"|] />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "name")
}
