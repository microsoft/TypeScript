package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_typeOnly2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @importsNotUsedAsValues: error
// @Filename: types.ts
export class A {}
// @Filename: index.ts
const a: A = new A();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "index.ts")
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixMissingImport",
		NewFileContent: `import { A } from "./types";

const a: A = new A();`,
	})
}
