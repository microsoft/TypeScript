package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportIndex_notForClassicResolution(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: classic
// @Filename: /a/index.ts
export const foo = 0;
// @Filename: /node_modules/x/index.d.ts
export const bar = 0;
// @Filename: /b.ts
[|foo;|]
// @Filename: /c.ts
[|bar;|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/a/index.ts")
	f.GoToFile(t, "/b.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import { foo } from "./a/index";

foo;`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/c.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import { bar } from "./node_modules/x/index";

bar;`,
	}, nil /*preferences*/)
}
