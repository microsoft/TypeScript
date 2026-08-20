package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodefixCrashExportGlobal(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @esModuleInterop: false
// @allowSyntheticDefaultImports: false
// @Filename: bar.ts
import * as foo from './foo'
export as namespace foo
export = foo;

declare global {
    const foo: typeof foo;
}
// @Filename: foo.d.ts
interface Root {
    /**
     * A .default property for ES6 default import compatibility
     */
    default: Root;
}

declare const root: Root;
export = root;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "bar.ts")
	f.VerifyCodeFixNotAvailable(t)
	f.GoToFile(t, "foo.d.ts")
	f.VerifyCodeFixNotAvailable(t)
}
