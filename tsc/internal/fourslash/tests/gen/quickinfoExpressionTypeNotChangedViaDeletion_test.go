package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickinfoExpressionTypeNotChangedViaDeletion(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

const /*2*/test1: TypeEq<number[], [number, ...number[]]> = false;

declare const foo: [number, ...number[]];
declare const bar: number[];

const /*1*/test2: TypeEq<typeof foo, typeof bar> = false;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoIs(t, "const test2: false", "")
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoIs(t, "const test1: false", "")
}
