package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixNewImportExportEqualsESNextInteropOn(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @EsModuleInterop: true
// @Module: es2015
// @Filename: /foo.d.ts
declare module "foo" {
  const foo: number;
  export = foo;
}
// @Filename: /index.ts
[|foo|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/index.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import foo from "foo";

foo`,
	}, nil /*preferences*/)
}
