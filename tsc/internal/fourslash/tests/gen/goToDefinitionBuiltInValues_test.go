package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionBuiltInValues(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var u = /*undefined*/undefined;
var n = /*null*/null;
var a = function() { return /*arguments*/arguments; };
var t = /*true*/true;
var f = /*false*/false;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, f.MarkerNames()...)
}
