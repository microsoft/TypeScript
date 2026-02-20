package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionObjectBindingPattern(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface SomeType {
    targetProperty: number;
}

function foo(callback: (p: SomeType) => void) {}

foo(({ /*1*/targetProperty }) => {
    /*4*/targetProperty
});

let { /*2*/targetProperty }: SomeType = { /*3*/targetProperty: 42 };

let { /*5*/targetProperty: /*6*/alias_1 }: SomeType = { targetProperty: 42 };

let { x: { /*7*/targetProperty: /*8*/{} } }: { x: SomeType } = { x: { targetProperty: 42 } };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, f.MarkerNames()...)
}

func TestGoToDefinitionObjectBindingPatternRest(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
interface SomeType {
    targetProperty: number;
}

let { .../*1*/rest }: SomeType = { targetProperty: 42 };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, f.MarkerNames()...)
}
