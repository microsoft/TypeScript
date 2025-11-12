package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_fileWithNoTrailingNewline(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const foo = 0;
// @Filename: /b.ts
export const bar = 0;
// @Filename: /c.ts
foo;
import { bar } from "./b";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/c.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`foo;
import { foo } from "./a";
import { bar } from "./b";`,
	}, nil /*preferences*/)
}
