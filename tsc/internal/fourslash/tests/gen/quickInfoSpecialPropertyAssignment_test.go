package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoSpecialPropertyAssignment(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.js
class C {
    constructor() {
      /** Doc */
      this./*write*/x = 0;
      this./*read*/x;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "write", "(property) C.x: any", "Doc")
	f.VerifyQuickInfoAt(t, "read", "(property) C.x: number", "Doc")
}
