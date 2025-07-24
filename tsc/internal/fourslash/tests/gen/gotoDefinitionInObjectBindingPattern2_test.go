package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGotoDefinitionInObjectBindingPattern2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var p0 = ({a/*1*/a}) => {console.log(aa)};
function f2({ [|a/*a1*/1|], [|b/*b1*/1|] }: { /*a1_dest*/a1: number, /*b1_dest*/b1: number } = { a1: 0, b1: 0 }) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1", "a1", "b1")
}
