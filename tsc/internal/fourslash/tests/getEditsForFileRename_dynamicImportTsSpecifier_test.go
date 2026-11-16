package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetEditsForFileRename_dynamicImportTsSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"strict": true,
		"module": "esnext",
		"moduleResolution": "bundler",
		"target": "es2022",
		"noEmit": true,
		"allowImportingTsExtensions": true
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
