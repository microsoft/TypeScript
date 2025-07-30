package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocTags15(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @filename: /a.js
/**
 * @callback Bar
 * @param {string} name
 * @returns {string}
 */

/**
 * @typedef Foo
 * @property {Bar} getName
 */
export const foo = 1;
// @filename: /b.js
import * as _a from "./a.js";
/**
 * @implements {_a.Foo/*1*/}
 */
class C1 { }

/**
 * @extends {_a.Foo/*2*/}
 */
class C2 { }

/**
 * @augments {_a.Foo/*3*/}
 */
class C3 { }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/b.js")
	f.VerifyBaselineHover(t)
}
