package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFixIndentedIdentifier(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
[|import * as b from "./b";
{
    x/**/
}|]
// @Filename: /b.ts
export const x = 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixAtPosition(t, []string{
		`import * as b from "./b";
{
    b.x
}`,
		`import * as b from "./b";
import { x } from "./b";
{
    x
}`,
	}, nil /*preferences*/)
}
