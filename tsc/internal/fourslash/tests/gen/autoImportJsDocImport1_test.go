package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportJsDocImport1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @verbatimModuleSyntax: true
// @target: esnext
// @allowJs: true
// @checkJs: true
// @Filename: /foo.ts
 export const A = 1;
 export type B = { x: number };
 export type C = 1;
 export class D { y: string }
// @Filename: /test.js
/**
 * @import { A, D, C } from "./foo"
 */

/**
 * @param { typeof A } a
 * @param { B/**/ | C } b
 * @param { C } c
 * @param { D } d
 */
export function f(a, b, c, d) { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`/**
 * @import { A, D, C, B } from "./foo"
 */

/**
 * @param { typeof A } a
 * @param { B | C } b
 * @param { C } c
 * @param { D } d
 */
export function f(a, b, c, d) { }`,
	}, nil /*preferences*/)
}
