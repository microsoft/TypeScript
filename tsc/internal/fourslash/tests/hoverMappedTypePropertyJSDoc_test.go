package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestHoverMappedTypePropertyJSDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: a.ts
export declare const A: Readonly<{
  /**
   * x prop
   */
  readonly X: 200;

  /**
   * y prop
   */
  readonly Y: 201;
}>;

A.X/*1*/;

// @filename: b.ts
import { A } from './a';

A.X/*2*/;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}

func TestHoverMappedTypeWithoutPropertyType(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare function uhoh/*1*/<T>(x: { [K in keyof T] }): void;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
