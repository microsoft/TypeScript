package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestImportNameCodeFix_importType7(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: es2015
// @Filename: /exports.ts
export interface SomeInterface {}
export class SomePig {}
// @Filename: /a.ts
import {
    type SomeInterface,
    type SomePig,
} from "./exports.js";
new SomePig/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import {
    SomePig,
    type SomeInterface,
} from "./exports.js";
new SomePig`,
	}, nil /*preferences*/)
	f.VerifyImportFixAtPosition(t, []string{
		`import {
    SomePig,
    type SomeInterface,
} from "./exports.js";
new SomePig`,
	}, &lsutil.UserPreferences{OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderLast})
	f.VerifyImportFixAtPosition(t, []string{
		`import {
    type SomeInterface,
    SomePig,
} from "./exports.js";
new SomePig`,
	}, &lsutil.UserPreferences{OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderInline})
	f.VerifyImportFixAtPosition(t, []string{
		`import {
    type SomeInterface,
    SomePig,
} from "./exports.js";
new SomePig`,
	}, &lsutil.UserPreferences{OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderFirst})
}
