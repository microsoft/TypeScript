package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_casing(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
import { foo } from "./dir/fOo";
// @Filename: /dir/fOo.ts
export const foo = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/dir", "/newDir", map[string]string{
		"/a.ts": `import { foo } from "./newDir/fOo";`,
	}, nil /*preferences*/)
}
