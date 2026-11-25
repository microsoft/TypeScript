package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// Test case for crash when promoting type-only import to value import
// when existing type imports precede the new value import
// https://github.com/microsoft/TypeScript/tsc/issues/2559
func TestCodeFixPromoteTypeOnlyOrderingCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @verbatimModuleSyntax: true
// @Filename: /bar.ts
export interface AAA {}
export class BBB {}
// @Filename: /foo.ts
import type {
    AAA,
    BBB,
} from "./bar";

let x: AAA = new BBB()`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/foo.ts")

	f.VerifyImportFixAtPosition(t, []string{
		`import {
    BBB,
    type AAA,
} from "./bar";

let x: AAA = new BBB()`,
	}, nil /*preferences*/)
}

func TestCodeFixPromoteTypeOnlyStringName(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @Filename: /m.ts
class K {}
export { K as "a\\u0062" };
export const b = 1;
// @Filename: /a.ts
import { b, type "a\\u0062" as A } from "./m";
b;
new A();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.ts")
	f.VerifyImportFixAtPosition(t, []string{`import { a\u0062 as A, b } from "./m";
b;
new A();`}, nil /*preferences*/)
}
