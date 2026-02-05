package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameAliasExternalModule3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
namespace SomeModule { [|export class [|{| "contextRangeIndex": 0 |}SomeClass|] { }|] }
export = SomeModule;
// @Filename: b.ts
import M = require("./a");
import C = M.[|SomeClass|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRenameAtRangesWithText(t, nil /*preferences*/, "SomeClass")
}
