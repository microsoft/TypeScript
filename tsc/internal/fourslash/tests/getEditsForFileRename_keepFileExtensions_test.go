package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_keepFileExtensions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "Node16",
    "rootDirs": ["src"]
  }
}
// @Filename: /src/person.ts
export const name = 0;
// @Filename: /src/index.ts
import {name} from "./person.js";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/src/person.ts", "/src/vip.ts", map[string]string{
		"/src/index.ts": `import {name} from "./vip.js";`,
	}, nil /*preferences*/)
}
