package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetEditsForFileRename_preferences(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /dir/a.ts
export const a = 0;
// @Filename: /dir/b.ts
import {} from "dir/a";
import {} from 'dir/a';
// @Filename: /tsconfig.json
{"compilerOptions":{"paths":{"*":["*"]}}}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/dir/a.ts", "/dir/a1.ts", map[string]string{
		"/dir/b.ts": `import {} from "dir/a1";
import {} from 'dir/a1';`,
	}, &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative", QuotePreference: lsutil.QuotePreference("single")})
}
