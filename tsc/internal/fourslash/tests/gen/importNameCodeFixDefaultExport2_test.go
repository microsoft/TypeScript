package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixDefaultExport2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /lib.ts
class Base { }
export default Base;
// @Filename: /test.ts
[|class Derived extends Base { }|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/test.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import Base from "./lib";

class Derived extends Base { }`,
	}, nil /*preferences*/)
}
