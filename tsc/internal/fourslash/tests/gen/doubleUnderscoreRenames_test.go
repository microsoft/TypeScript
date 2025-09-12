package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDoubleUnderscoreRenames(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: fileA.ts
[|export function [|{| "contextRangeIndex": 0 |}__foo|]() {
}|]

// @Filename: fileB.ts
[|import { [|{| "contextRangeIndex": 2 |}__foo|] as bar } from "./fileA";|]

bar();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "__foo")
}
