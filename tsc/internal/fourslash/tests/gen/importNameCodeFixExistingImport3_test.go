package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixExistingImport3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|import d, * as ns from "./module"   ;
f1/*0*/();|]
// @Filename: module.ts
export function f1() {}
export var v1 = 5;
export default var d1 = 6;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import d, * as ns from "./module"   ;
ns.f1();`,
		`import d, * as ns from "./module"   ;
import { f1 } from "./module";
f1();`,
	}, nil /*preferences*/)
}
