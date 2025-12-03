package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixExistingImport7(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import [|{ v1 }|] from "../other_dir/module";
f1/*0*/();
// @Filename: ../other_dir/module.ts
export var v1 = 5;
export function f1();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`{ f1, v1 }`,
	}, nil /*preferences*/)
}
