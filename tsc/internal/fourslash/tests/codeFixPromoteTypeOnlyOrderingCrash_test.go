package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test case for crash when promoting type-only import to value import
// when existing type imports precede the new value import
// https://github.com/microsoft/typescript-go/issues/2559
func TestCodeFixPromoteTypeOnlyOrderingCrash(t *testing.T) {
	fourslash.SkipIfFailing(t)
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

	// TODO: fix formatting
	f.VerifyImportFixAtPosition(t, []string{
		`import {
BBB,     type AAA,
} from "./bar";

let x: AAA = new BBB()`,
	}, nil /*preferences*/)
}
