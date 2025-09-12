package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameReExportDefault(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export { default } from "./b";
[|export { default as [|{| "contextRangeIndex": 0 |}b|] } from "./b";|]
export { default as bee } from "./b";
[|import { default as [|{| "contextRangeIndex": 2 |}b|] } from "./b";|]
import { default as bee } from "./b";
[|import [|{| "contextRangeIndex": 4 |}b|] from "./b";|]
// @Filename: /b.ts
[|const [|{| "contextRangeIndex": 6 |}b|] = 0;|]
[|export default [|{| "contextRangeIndex": 8 |}b|];|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[3], f.Ranges()[5], f.Ranges()[7], f.Ranges()[9])
}
