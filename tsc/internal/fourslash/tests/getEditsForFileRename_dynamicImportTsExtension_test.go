package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_dynamicImportTsExtension(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The "import" prefix in "./imported.ts" is another match for the text scan and used to collect this node twice.
	const content = `// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "es2022",
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
// @Filename: /imported.ts
export const value = 1;
// @Filename: /loads.ts
export const load = () => import("./imported.ts");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWillRenameFilesEdits(t, "/imported.ts", "/sub/moved.ts", map[string]string{
		"/loads.ts": `export const load = () => import("./sub/moved.ts");`,
	}, nil /*preferences*/)
}
