package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForUMDModuleAlias(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: 0.d.ts
export function doThing(): string;
export function doTheOtherThing(): void;
export as namespace /*0*/myLib;
// @Filename: 1.ts
/// <reference path="0.d.ts" />
/*1*/myLib.doThing();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "0", "export namespace myLib", "")
	f.VerifyQuickInfoAt(t, "1", "export namespace myLib", "")
}
