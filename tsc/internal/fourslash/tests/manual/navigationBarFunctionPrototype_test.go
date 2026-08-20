package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavigationBarFunctionPrototype(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: foo.js
function f() {}
f.prototype.x = 0;
f.y = 0;
f.prototype.method = function () {};
Object.defineProperty(f, 'staticProp', { 
    set: function() {}, 
    get: function(){
    } 
});
Object.defineProperty(f.prototype, 'name', { 
    set: function() {}, 
    get: function(){
    } 
}); `
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
