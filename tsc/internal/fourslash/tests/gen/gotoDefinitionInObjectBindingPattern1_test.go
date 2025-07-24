package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGotoDefinitionInObjectBindingPattern1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function bar<T>(onfulfilled: (value: T) => void) {
  return undefined;
}
interface Test {
  /*destination*/prop2: number
}
bar<Test>(({[|pr/*goto*/op2|]})=>{});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "goto")
}
