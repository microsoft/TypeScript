package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixUMDGlobalJavaScript(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @AllowSyntheticDefaultImports: false
// @Module: commonjs
// @CheckJs: true
// @AllowJs: true
// @Filename: a/f1.js
[|export function test() { };
bar1/*0*/.bar;|]
// @Filename: a/foo.d.ts
export declare function bar(): number;
export as namespace bar1; `
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`import * as bar1 from "./foo";

export function test() { };
bar1.bar;`,
	}, nil /*preferences*/)
}
