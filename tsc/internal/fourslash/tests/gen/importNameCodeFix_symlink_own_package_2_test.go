package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_symlink_own_package_2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /packages/a/test.ts
// @Symlink: /node_modules/a/test.ts
x;
// @Filename: /packages/a/utils.ts
// @Symlink: /node_modules/a/utils.ts
import {} from "a/utils";
export const x = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/packages/a/test.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import { x } from "./utils";

x;`,
	}, nil /*preferences*/)
}
