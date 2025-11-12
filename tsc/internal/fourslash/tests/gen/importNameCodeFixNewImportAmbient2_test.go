package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportAmbient2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|/*!
 * I'm a license or something
 */
f1/*0*/();|]
// @Filename: ambientModule.ts
 declare module "ambient-module" {
    export function f1();
    export var v1;
 }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyImportFixAtPosition(t, []string{
		`/*!
 * I'm a license or something
 */

import { f1 } from "ambient-module";

f1();`,
	}, nil /*preferences*/)
}
