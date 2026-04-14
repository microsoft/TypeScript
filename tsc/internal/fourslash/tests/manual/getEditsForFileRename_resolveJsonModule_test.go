package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_resolveJsonModule(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @resolveJsonModule: true
// @Filename: /a.ts
import text from "./message.json";
// @Filename: /message.json
{}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/a.ts", "/src/a.ts", map[string]string{
		"/src/a.ts": `import text from "../message.json";`,
	}, nil /*preferences*/)
}
