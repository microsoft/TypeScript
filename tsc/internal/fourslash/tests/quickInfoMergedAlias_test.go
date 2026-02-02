package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoMergedAlias(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
/**
 * A function
 */
export function foo/*1*/() {}
// @filename: /b.ts
import { foo/*2*/ } from './a';
export { foo/*3*/ };

/**
 * A type
 */
type foo/*4*/ = number;

foo/*5*/()
let x1: foo/*6*/;
// @filename: /c.ts
import { foo/*7*/ } from './b';

/**
 * A namespace
 */
namespace foo/*8*/ {
    export type bar = string[];
}

foo/*9*/()
let x1: foo/*10*/;
let x2: foo/*11*/.bar;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
