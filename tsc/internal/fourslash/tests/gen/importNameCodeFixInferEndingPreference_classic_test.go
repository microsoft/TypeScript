package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixInferEndingPreference_classic(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @checkJs: true
// @allowJs: true
// @noEmit: true
// @Filename: /a.js
export const a = 0;
// @Filename: /b.js
export const b = 0;
// @Filename: /c.js
import { a } from "./a.js";

b/**/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"./b.js"}, nil /*preferences*/)
}
