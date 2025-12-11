package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarItemsBindingPatterns(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `'use strict'
var foo, {}
var bar, []
let foo1, {a, b}
const bar1, [c, d]
var {e, x: [f, g]} = {a:1, x:[]};
var { h: i = function j() {} } = obj;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
