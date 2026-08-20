package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_unresolvableImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "paths": {
      "*": ["./next/src/*"],
      "@app": ["./modules/@app/*"],
      "@app/*": ["./modules/@app/*"],
      "@local": ["./modules/@local/*"],
      "@local/*": ["./modules/@local/*"]
    }
  }
}
// @Filename: /modules/@app/something/index.js
import "@local/some-other-import";
// @Filename: /modules/@local/index.js
import "@local/some-other-import";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/modules/@app/something", "/modules/@app/something-2", map[string]string{}, nil /*preferences*/)
}
