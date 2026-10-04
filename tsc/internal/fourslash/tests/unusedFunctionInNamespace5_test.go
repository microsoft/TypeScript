package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestUnusedFunctionInNamespace5(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noUnusedLocals: true
// @noUnusedParameters:true
namespace Validation {
    var function1 = function() {
    }

    export function function2() {

    }

    [| function function3() {
        function1();
    }

    function function4() {

    }

    export let a = function3; |]
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyRangeAfterCodeFix(t, `function function3() {
        function1();
    }

    export let a = function3;`, false, 0, 0)
}
