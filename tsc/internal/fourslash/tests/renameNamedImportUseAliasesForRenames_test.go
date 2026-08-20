package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRenameNamedImportUseAliasesForRenames(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
import { /*import*/MyTypeA } from "./b";
const type: MyTypeA = { foo: "bar" };
// @Filename: /b.ts
export interface MyTypeA {
    foo: string;
}`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse}, "import")
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue}, "import")
}

func TestRenameNamedImportDefaultInNodeModules(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /index.ts
import { /*fooImport*/[|Foo|] } from "foo";
declare const f: Foo;
// @Filename: /tsconfig.json
{}
// @Filename: /node_modules/foo/package.json
{ "types": "index.d.ts" }
// @Filename: /node_modules/foo/index.d.ts
export interface Foo {
    bar: string;
}`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRename(t, nil /*preferences*/, "fooImport")
	f.VerifyBaselineRename(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSTrue}, "fooImport")
	f.GoToMarker(t, "fooImport")
	f.VerifyRenameFailed(t, &lsutil.UserPreferences{UseAliasesForRename: core.TSFalse})
}
