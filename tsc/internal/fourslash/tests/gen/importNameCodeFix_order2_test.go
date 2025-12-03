package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportNameCodeFix_order2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
export const _aB: number;
export const _Ab: number;
export const aB: number;
export const Ab: number;
// @Filename: /b.ts
[|import {
    _aB,
    _Ab,
    Ab,
} from "./a";
aB;|]
// @Filename: /c.ts
[|import {
    _aB,
    _Ab,
    Ab,
} from "./a";
aB;|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/b.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import {
    _aB,
    _Ab,
    Ab,
    aB,
} from "./a";
aB;`,
	}, nil /*preferences*/)
	f.GoToFile(t, "/c.ts")
	f.VerifyImportFixAtPosition(t, []string{
		`import {
    _aB,
    _Ab,
    aB,
    Ab,
} from "./a";
aB;`,
	}, nil /*preferences*/)
}
