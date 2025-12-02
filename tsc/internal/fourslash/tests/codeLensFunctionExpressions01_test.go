package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCodeLensFunctionExpressions01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
// @filename: anonymousFunctionExpressions.ts
export let anonFn1 = function () {};
export const anonFn2 = function () {};

let anonFn3 = function () {};
const anonFn4 = function () {};

// @filename: arrowFunctions.ts
export let arrowFn1 = () => {};
export const arrowFn2 = () => {};

let arrowFn3 = () => {};
const arrowFn4 = () => {};

// @filename: namedFunctions.ts
export let namedFn1 = function namedFn1() {
    namedFn1();
}
namedFn1();

export const namedFn2 = function namedFn2() {
    namedFn2();
}
namedFn2();

let namedFn3 = function namedFn3() {};
const namedFn4 = function namedFn4() {};
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineCodeLens(t, &lsutil.UserPreferences{
		ReferencesCodeLensEnabled:            true,
		ReferencesCodeLensShowOnAllFunctions: true,

		ImplementationsCodeLensEnabled:                true,
		ImplementationsCodeLensShowOnInterfaceMethods: true,
		ImplementationsCodeLensShowOnAllClassMethods:  true,
	})
}
