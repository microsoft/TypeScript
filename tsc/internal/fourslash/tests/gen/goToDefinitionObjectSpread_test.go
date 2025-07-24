package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionObjectSpread(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A1 { /*1*/a: number };
interface A2 { /*2*/a?: number };
let a1: A1;
let a2: A2;
let a12 = { ...a1, ...a2 };
a12.[|a/*3*/|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "3")
}
