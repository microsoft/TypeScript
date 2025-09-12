package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameAliasExternalModule2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
[|module [|{| "contextRangeIndex": 0 |}SomeModule|] { export class SomeClass { } }|]
[|export = [|{| "contextRangeIndex": 2 |}SomeModule|];|]
// @Filename: b.ts
[|import [|{| "contextRangeIndex": 4 |}M|] = require("./a");|]
import C = [|M|].SomeClass;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineRename(t, nil /*preferences*/, f.Ranges()[1], f.Ranges()[3], f.Ranges()[5], f.Ranges()[6])
}
