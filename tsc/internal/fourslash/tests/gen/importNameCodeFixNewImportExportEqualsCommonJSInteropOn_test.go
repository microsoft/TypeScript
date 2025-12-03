package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportExportEqualsCommonJSInteropOn(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Module: commonjs
// @EsModuleInterop: true
// @Filename: /foo.d.ts
declare module "bar" {
  const bar: number;
  export = bar;
}
declare module "foo" {
  const foo: number;
  export = foo;
}
declare module "es" {
  const es = 0;
  export default es;
}
// @Filename: /a.ts
import bar = require("bar");

foo
// @Filename: /b.ts
foo
// @Filename: /c.ts
import es from "es";
import bar = require("bar");

foo`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import bar = require("bar");
import foo = require("foo");

foo`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/b.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import foo from "foo";

foo`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/c.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import es from "es";
import bar = require("bar");
import foo = require("foo");

foo`,
	}, nil /*preferences*/)
}
