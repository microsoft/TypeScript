package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportRootDirs0(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a/f1.ts
[|foo/*0*/();|]
// @Filename: b/c/f2.ts
export function foo() {};
// @Filename: tsconfig.json
{
    "compilerOptions": {
        "rootDirs": [
            "a",
            "b/c"
        ]
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import { foo } from "./f2";

foo();`,
	}, nil /*preferences*/)
}
