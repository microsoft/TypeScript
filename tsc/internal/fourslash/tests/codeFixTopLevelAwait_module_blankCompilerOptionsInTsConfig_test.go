package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixTopLevelAwait_module_blankCompilerOptionsInTsConfig(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /dir/a.ts
declare const p: Promise<number>;
await p;
export {};
// @filename: /dir/tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs"
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixNotAvailable(t, "fixModuleOption")
}
