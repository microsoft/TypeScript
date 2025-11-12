package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportAllowSyntheticDefaultImports1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Module: system
// @Filename: a/f1.ts
[|export var x = 0;
bar/*0*/();|]
// @Filename: a/foo.d.ts
declare function bar(): number;
export = bar;
export as namespace bar;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import bar from "./foo";

export var x = 0;
bar();`,
	}, nil /*preferences*/)
}
