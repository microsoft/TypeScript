package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsVariableTypes2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const object = { foo: 1, bar: 2 }
const array = [1, 2]
const a = object;
const { foo, bar } = object;
const {} = object;
const b = array;
const [ first, second ] = array;
const [] = array;
declare function foo<T extends number>(t: T): T
const x = foo(1)`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{IncludeInlayVariableTypeHints: true})
}
