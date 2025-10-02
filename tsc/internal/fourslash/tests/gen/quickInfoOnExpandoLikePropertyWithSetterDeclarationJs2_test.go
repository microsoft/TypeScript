package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnExpandoLikePropertyWithSetterDeclarationJs2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @checkJs: true
// @filename: index.js
const obj = {};
let val = 10;
Object.defineProperty(obj, "a", {
  configurable: true,
  enumerable: true,
  set(v) {
    val = v;
  },
});

obj.a/**/ = 100;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "(property) obj.a: any", "")
}
