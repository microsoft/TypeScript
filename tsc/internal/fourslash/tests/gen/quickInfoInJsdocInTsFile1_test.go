package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInJsdocInTsFile1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** @type {() => { /*1*/data: string[] }} */
function test(): { data: string[] } {
  return {
    data: [],
  };
}

/** @returns {{ /*2*/data: string[] }} */
function test2(): { data: string[] } {
  return {
    data: [],
  };
}

/** @type {{ /*3*/bar: string; }} */
const test3 = { bar: '' };

type SomeObj = { bar: string; };
/** @type {SomeObj/*4*/} */
const test4 = { bar: '' }

/**
 * @param/*5*/ stuff/*6*/ Stuff to do stuff with
 */
function doStuffWithStuff(stuff: { quantity: number }) {}

declare const stuff: { quantity: number };
/** @see {doStuffWithStuff/*7*/} */
if (stuff.quantity) {}

/** @type {(a/*8*/: string) => void} */
function test2(a: string) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "", "")
	f.VerifyQuickInfoAt(t, "2", "", "")
	f.VerifyQuickInfoAt(t, "3", "", "")
	f.VerifyQuickInfoAt(t, "4", "type SomeObj = {\n    bar: string;\n}", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) stuff: {\n    quantity: number;\n}", "(parameter) stuff: {\n    quantity: number;\n}")
	f.VerifyQuickInfoAt(t, "6", "(parameter) stuff: {\n    quantity: number;\n}", "(parameter) stuff: {\n    quantity: number;\n}")
	f.VerifyQuickInfoAt(t, "7", "function doStuffWithStuff(stuff: {\n    quantity: number;\n}): void", "")
	f.VerifyQuickInfoAt(t, "8", "", "")
}
