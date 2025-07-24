package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionInstanceof2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: esnext
// @filename: /main.ts
class C {
  static /*end*/[Symbol.hasInstance](value: unknown): boolean { return true; }
}
declare var obj: any;
obj [|/*start*/instanceof|] C;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "start")
}
