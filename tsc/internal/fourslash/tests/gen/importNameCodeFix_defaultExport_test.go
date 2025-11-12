package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_defaultExport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @allowJs: true
// @checkJs: true
// @Filename: /a.js
class C {}
export default C;
// @Filename: /b.js
[|C;|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/b.js")
	f.VerifyImportFixAtPosition(t, []string{
		`import C from "./a";

C;`,
	}, nil /*preferences*/)
}
