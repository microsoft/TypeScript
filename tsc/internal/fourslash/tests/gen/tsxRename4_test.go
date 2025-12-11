package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxRename4(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
//@Filename: file.tsx
declare module JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {};
    }
}
[|class [|{| "contextRangeIndex": 0 |}MyClass|] {}|]

[|<[|{| "contextRangeIndex": 2 |}MyClass|]></[|{| "contextRangeIndex": 2 |}MyClass|]>|];
[|<[|{| "contextRangeIndex": 5 |}MyClass|]/>|];

[|<[|{| "contextRangeIndex": 7 |}div|]> </[|{| "contextRangeIndex": 7 |}div|]>|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "MyClass", "div")
}
