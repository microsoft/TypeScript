package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixExistingImportEquals0(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `[|import ns = require("ambient-module");
var x = v1/*0*/ + 5;|]
// @Filename: ambientModule.ts
declare module "ambient-module" {
   export function f1();
   export var v1;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import ns = require("ambient-module");
var x = ns.v1 + 5;`,
		`import { v1 } from "ambient-module";
import ns = require("ambient-module");
var x = v1 + 5;`,
	}, nil /*preferences*/)
}
