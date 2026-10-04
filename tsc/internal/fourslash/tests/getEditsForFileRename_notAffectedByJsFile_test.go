package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_notAffectedByJsFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const x = 0;
// @Filename: /a.js
exports.x = 0;
// @Filename: /b.ts
import { x } from "./a";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/a.ts", "/a2.ts", map[string]string{
		"/b.ts": `import { x } from "./a2";`,
	}, nil /*preferences*/)
}
