package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestHoverNilBaseSymbolIntersection(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @strict: true
// @filename: main.ts

class Base {}

declare const BaseFactory: new() => Base & { c: string };

class Derived extends BaseFactory {
  static /*1*/idField = "id" as const;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// We only care that hover/quickinfo does not crash (panic) when baseType.Symbol() is nil.
	// Pre-fix (#2763), hovering on the static property could panic in getJSDocOrTag.
	f.VerifyBaselineHover(t)
}
