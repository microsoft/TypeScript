package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionObjectLiteralProperties1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface PropsBag {
   /*first*/propx: number
}
function foo(arg: PropsBag) {}
foo({
   [|pr/*p1*/opx|]: 10
})
function bar(firstarg: boolean, secondarg: PropsBag) {}
bar(true, {
   [|pr/*p2*/opx|]: 10
})`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "p1", "p2")
}
