package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnMethodOfImportEquals(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.d.ts
declare class C<T> {
    m(): void;
}
export = C;
// @Filename: /b.ts
import C = require("./a");
declare var x: C<number>;
x./**/m;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "(method) C<number>.m(): void", "")
}
