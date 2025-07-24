package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportTypeNodeGoToDefinition(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /ns.ts
/*refFile*/export namespace /*refFoo*/Foo {
    export namespace /*refBar*/Bar {
        export class /*refBaz*/Baz {}
    }
}
// @Filename: /usage.ts
type A = typeof import([|/*1*/"./ns"|]).[|/*2*/Foo|].[|/*3*/Bar|];
type B = import([|/*4*/"./ns"|]).[|/*5*/Foo|].[|/*6*/Bar|].[|/*7*/Baz|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1", "2", "3", "4", "5", "6", "7")
}
