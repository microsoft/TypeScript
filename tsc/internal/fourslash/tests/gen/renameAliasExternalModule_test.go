package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameAliasExternalModule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
module SomeModule { export class SomeClass { } }
export = SomeModule;
// @Filename: b.ts
[|import [|{| "contextRangeIndex": 0 |}M|] = require("./a");|]
import C = [|M|].SomeClass;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "M")
}
