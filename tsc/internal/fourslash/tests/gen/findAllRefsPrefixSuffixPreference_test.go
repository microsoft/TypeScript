package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsPrefixSuffixPreference(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /file1.ts
declare function log(s: string | number): void;
[|const /*q0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}q|] = 1;|]
[|export { /*q1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}q|] };|]
const x = {
    [|/*z0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}z|]: 'value'|]
}
[|const { /*z1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}z|] } = x;|]
log(/*z2*/[|z|]);
// @Filename: /file2.ts
declare function log(s: string | number): void;
[|import { /*q2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 9 |}q|] } from "./file1";|]
log(/*q3*/[|q|] + 1);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "q0", "q1", "q2", "q3", "z0", "z1", "z2")
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue}, f.Ranges()[1], f.Ranges()[3], f.Ranges()[10], f.Ranges()[11])
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse}, f.Ranges()[1], f.Ranges()[3], f.Ranges()[10], f.Ranges()[11])
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue}, f.Ranges()[5], f.Ranges()[7], f.Ranges()[8])
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse}, f.Ranges()[5], f.Ranges()[7], f.Ranges()[8])
}
