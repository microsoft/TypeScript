package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportAmbient1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import d from "other-ambient-module";
import * as ns from "yet-another-ambient-module";
var x = v1/*0*/ + 5;
// @Filename: ambientModule.ts
declare module "ambient-module" {
   export function f1();
   export var v1;
}
// @Filename: otherAmbientModule.ts
declare module "other-ambient-module" {
   export default function f2();
}
// @Filename: yetAnotherAmbientModule.ts
declare module "yet-another-ambient-module" {
   export function f3();
   export var v3;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import { v1 } from "ambient-module";
import d from "other-ambient-module";
import * as ns from "yet-another-ambient-module";
var x = v1 + 5;`,
	}, nil /*preferences*/)
}
