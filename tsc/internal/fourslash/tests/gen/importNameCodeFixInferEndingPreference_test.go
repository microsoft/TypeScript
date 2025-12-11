package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixInferEndingPreference(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @moduleResolution: bundler
// @Filename: /a.mts
export {};
// @Filename: /b.ts
export {};
// @Filename: /c.ts
export const c = 0;
// @Filename: /main.ts
import {} from "./a.mjs";
import {} from "./b";

c/**/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./c"}, nil /*preferences*/)
}
