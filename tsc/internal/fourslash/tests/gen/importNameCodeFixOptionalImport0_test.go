package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixOptionalImport0(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a/f1.ts
[|import * as ns from "./foo";
foo/*0*/();|]
// @Filename: a/foo/bar.ts
export function foo() {};
// @Filename: a/foo.ts
export { foo } from "./foo/bar";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import * as ns from "./foo";
ns.foo();`,
		`import * as ns from "./foo";
import { foo } from "./foo";
foo();`,
	}, nil /*preferences*/)
}
