package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForGetterAndSetter(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Test {
    constructor() {
        this.value;
    }

    /** Getter text */
    get val/*1*/ue() {
        return this.value;
    }

    /** Setter text */
    set val/*2*/ue(value) {
        this.value = value;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoIs(t, "(getter) Test.value: any", "Getter text")
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoIs(t, "(setter) Test.value: any", "Setter text")
}
