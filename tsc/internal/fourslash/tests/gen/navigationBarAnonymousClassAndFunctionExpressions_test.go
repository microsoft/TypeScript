package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarAnonymousClassAndFunctionExpressions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `global.cls = class { };
(function() {
    const x = () => {
        // Presence of inner function causes x to be a top-level function.
        function xx() {}
    };
    const y = {
        // This is not a top-level function (contains nothing, but shows up in childItems of its parent.)
        foo: function() {}
    };
    (function nest() {
        function moreNest() {}
    })();
})();
(function() { // Different anonymous functions are not merged
    // These will only show up as childItems.
    function z() {}
    console.log(function() {})
    describe("this", 'function', ` + "`" + `is a function` + "`" + `, ` + "`" + `with template literal ${"a"}` + "`" + `, () => {});
    [].map(() => {});
})
(function classes() {
    // Classes show up in top-level regardless of whether they have names or inner declarations.
    const cls2 = class { };
    console.log(class cls3 {});
    (class { });
})`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
