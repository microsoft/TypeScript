package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIssue57429(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
function Builder<I>(def: I) {
  return def;
}

interface IThing {
  doThing: (args: { value: object }) => string
  doAnotherThing: () => void
}

Builder<IThing>({
  doThing(args: { value: object }) {
    const { v/*1*/alue } = this.[|args|]
    return ` + "`" + `${value}` + "`" + `
  },
  doAnotherThing() { },
})`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const value: any", "")
	f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Message: "Property 'args' does not exist on type 'IThing'.",
			Code:    &lsproto.IntegerOrString{Integer: PtrTo[int32](2339)},
		},
	})
}
