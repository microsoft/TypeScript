package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixDefaultExport7(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: dom
// @Filename: foo.ts
export default globalThis.localStorage;
// @Filename: index.ts
foo/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import foo from "./foo";

foo`,
	}, nil /*preferences*/)
}
