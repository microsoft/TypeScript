package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_reExport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export default function foo(): void {}
// @Filename: /b.ts
export { default } from "./a";
// @Filename: /user.ts
[|foo;|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/user.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import foo from "./a";

foo;`,
		`import foo from "./b";

foo;`,
	}, nil /*preferences*/)
}
