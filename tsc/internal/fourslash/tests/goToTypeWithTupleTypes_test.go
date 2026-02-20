package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToTypeWithTupleTypes1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
export let x/*1*/: [number, number] = [1, 2];

type DoubleTupleTrouble<T> = [T, T];

export let y/*2*/: DoubleTupleTrouble<number> = [1, 2];
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToTypeDefinition(t, f.MarkerNames()...)
}
