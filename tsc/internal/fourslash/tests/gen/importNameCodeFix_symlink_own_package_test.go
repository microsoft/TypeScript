package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_symlink_own_package(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /packages/b/b0.ts
// @Symlink: /node_modules/b/b0.ts
x;
// @Filename: /packages/b/b1.ts
// @Symlink: /node_modules/b/b1.ts
import { a } from "a";
export const x = 0;
// @Filename: /packages/a/index.d.ts
// @Symlink: /node_modules/a/index.d.ts
export const a: number;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/packages/b/b0.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import { x } from "./b1";

x;`,
	}, nil /*preferences*/)
}
