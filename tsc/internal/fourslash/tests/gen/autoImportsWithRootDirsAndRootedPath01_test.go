package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportsWithRootDirsAndRootedPath01(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /dir/foo.ts
 export function foo() {}
// @Filename: /dir/bar.ts
 /*$*/
// @Filename: /dir/tsconfig.json
{
    "compilerOptions": {
        "module": "amd",
        "moduleResolution": "classic",
        "rootDirs": ["D:/"]
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "$")
	f.VerifyCompletions(t, nil, nil)
}
