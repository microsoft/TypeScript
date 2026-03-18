package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsForContextualConstraintTypeInJsDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @allowJs: true
// @filename: a.ts
export interface Blah<T extends { a: "hello" | "world" }> {
}

// @filename: b.js
/** @import * as a from "./a" */

/** @type {a.Blah<{ a: /*1*/ }>} */
let x;

// @filename: c.js
/** @import * as a from "./a" */

/** @type {a.Blah<{ a: /*2*/ }>} */
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// These examples both would panic in retrieving the symbols
	// of property signature nodes within JSDoc types.
	// In both cases, we'd have a JSDoc property signature that has no symbol.
	//
	// The two cases differ in whether or not there is a variable declaration
	// following the `@type` comment. These are important to test differently
	// because of how JSDoc re-parsing would construct nodes in the tree.
	//
	// Getting the symbol of the reparsed node is a sufficient fix for marker 1.
	// However, that would not fix the case at marker 2 because
	// there is no variable to attach the `@type` annotation, so the node basically
	// doesn't exist for subsequent passes like the binder.

	f.VerifyCompletions(t, f.Markers(), &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{CommitCharacters: &[]string{".", ",", ";"}},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				`"hello"`,
				`"world"`,
			},
		},
	})
}
