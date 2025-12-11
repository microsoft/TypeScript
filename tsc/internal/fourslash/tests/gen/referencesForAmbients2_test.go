package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForAmbients2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /defA.ts
declare module "a" {
    /*1*/export type /*2*/T = number;
}
// @Filename: /defB.ts
declare module "b" {
    export import a = require("a");
    export const x: a./*3*/T;
}
// @Filename: /defC.ts
declare module "c" {
    import b = require("b");
    const x: b.a./*4*/T;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
}
