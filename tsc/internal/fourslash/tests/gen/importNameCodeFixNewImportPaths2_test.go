package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportPaths2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|foo/*0*/();|]
// @Filename: folder_b/index.ts
export function foo() {};
// @Filename: tsconfig.path.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "b": [ "folder_b/index" ]
        }
    }
}
// @Filename: tsconfig.json
{
    "extends": "./tsconfig.path",
    "compilerOptions": { }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import { foo } from "b";

foo();`,
	}, nil /*preferences*/)
}
