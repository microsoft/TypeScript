package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_avoidRelativeNodeModules(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a/index.d.ts
// @Symlink: /b/node_modules/a/index.d.ts
// @Symlink: /c/node_modules/a/index.d.ts
export const a: number;
// @Filename: /b/index.ts
// @Symlink: /c/node_modules/b/index.d.ts
import { a } from 'a'
export const b: number;
// @Filename: /c/a_user.ts
import { a } from "a";
// @Filename: /c/foo.ts
[|import { b } from "b";
a;|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/c/foo.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import { a } from "a";
import { b } from "b";
a;`,
	}, nil /*preferences*/)
}
