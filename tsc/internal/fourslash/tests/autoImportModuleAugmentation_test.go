package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportModuleAugmentation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export interface Foo {
    x: number;
}

// @Filename: /b.ts
export {};
declare module "./a" {
    export const Foo: any;
}

// @Filename: /c.ts
Foo/**/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.BaselineAutoImportsCompletions(t, []string{""})
}
