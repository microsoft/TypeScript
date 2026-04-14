package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_jsRename(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /tsconfig.json
{ "compilerOptions": { "module": "nodenext" } }
// @Filename: /a.ts
export const a = 1;
// @Filename: /b.ts
import { a } from ".//*rename*/a.js";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRename(t, "rename", "c.js", map[string]string{
		"/c.ts": `export const a = 1;`,
		"/b.ts": `import { a } from "./c.js";`,
	})
}
