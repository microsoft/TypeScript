package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocCallbackTag(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: jsdocCallbackTag.js
/**
 * @callback FooHandler - A kind of magic
 * @param {string} eventName - So many words
 * @param eventName2 {number | string} - Silence is golden
 * @param eventName3 - Osterreich mos def
 * @return {number} - DIVEKICK
 */
/**
 * @type {FooHa/*8*/ndler} callback
 */
var t/*1*/;

/**
 * @callback FooHandler2 - What, another one?
 * @param {string=} eventName - it keeps happening
 * @param {string} [eventName2] - i WARNED you dog
 */
/**
 * @type {FooH/*3*/andler2} callback
 */
var t2/*2*/;
t(/*4*/"!", /*5*/12, /*6*/false);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoIs(t, "var t: FooHandler", "")
	f.GoToMarker(t, "2")
	f.VerifyQuickInfoIs(t, "var t2: FooHandler2", "")
	f.GoToMarker(t, "3")
	f.VerifyQuickInfoIs(t, "type FooHandler2 = (eventName?: string | undefined, eventName2?: string) => any", "- What, another one?")
	f.GoToMarker(t, "8")
	f.VerifyQuickInfoIs(t, "type FooHandler = (eventName: string, eventName2: number | string, eventName3: any) => number", "- A kind of magic")
}
