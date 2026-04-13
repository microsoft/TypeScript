package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Tests expansion of a class+interface merge (interface should be filtered when hovering value).
func TestQuickinfoVerbosityClassInterfaceMerge(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare class Foo/*1*/ {
    x: number;
}
declare interface Foo {
    y: string;
}
const f: Foo/*2*/ = { x: 1, y: "hello" };
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{
		"1": {0, 1},
		"2": {0, 1},
	})
}
