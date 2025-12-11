package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixOptionalImport1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a/f1.ts
[|foo/*0*/();|]
// @Filename: a/node_modules/bar/index.ts
export function foo() {};
// @Filename: a/foo.ts
export { foo } from "bar";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import { foo } from "bar";

foo();`,
		`import { foo } from "./foo";

foo();`,
	}, nil /*preferences*/)
}
