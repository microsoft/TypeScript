package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJavaScriptClass3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: Foo.js
class Foo {
   constructor() {
       this./*dst1*/alpha = 10;
       this./*dst2*/beta = 'gamma';
   }
   method() { return this.alpha; }
}
var x = new Foo();
x.[|alpha/*src1*/|];
x.[|beta/*src2*/|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "src1", "src2")
}
