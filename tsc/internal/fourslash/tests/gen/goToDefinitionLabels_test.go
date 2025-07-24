package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionLabels(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*label1Definition*/label1: while (true) {
    /*label2Definition*/label2: while (true) {
        break [|/*1*/label1|];
        continue [|/*2*/label2|];
        () => { break [|/*3*/label1|]; }
        continue /*4*/unknownLabel;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1", "2", "3", "4")
}
