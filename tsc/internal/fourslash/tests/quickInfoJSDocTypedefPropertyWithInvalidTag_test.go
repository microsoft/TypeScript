package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocTypedefPropertyWithInvalidTag(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.js
/**
 * @typedef {Object} MyType1
 * @property {string} name
 * @-rule
 * @property {number} age
 */

/**
 * @typedef {Object} MyType2
 * @property {string} name
 * some comment
 * @property {number} age
 */

/**
 * @typedef {Object} MyType3
 * @property {string} name
 * @*stars
 * @property {number} age
 */

/**
 * @typedef {Object} MyType4
 * @property {string} name
 * @(parens)
 * @property {number} age
 */

/**
 * @typedef {Object} MyType5
 * @property {string} name
 * @foo*bar
 * @property {number} age
 */

/** @type {/*t1*/MyType1} */
const obj1 = { /*1n*/name: "", /*1a*/age: 10 };

/** @type {/*t2*/MyType2} */
const obj2 = { /*2n*/name: "", /*2a*/age: 10 };

/** @type {/*t3*/MyType3} */
const obj3 = { /*3n*/name: "", /*3a*/age: 10 };

/** @type {/*t4*/MyType4} */
const obj4 = { /*4n*/name: "", /*4a*/age: 10 };

/** @type {/*t5*/MyType5} */
const obj5 = { /*5n*/name: "", /*5a*/age: 10 };
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyQuickInfoAt(t, "t1", "type MyType1 = {\n    name: string;\n    age: number;\n}", "")
	f.VerifyQuickInfoAt(t, "t2", "type MyType2 = {\n    name: string;\n    age: number;\n}", "")
	f.VerifyQuickInfoAt(t, "t3", "type MyType3 = {\n    name: string;\n    age: number;\n}", "")
	f.VerifyQuickInfoAt(t, "t4", "type MyType4 = {\n    name: string;\n    age: number;\n}", "")
	f.VerifyQuickInfoAt(t, "t5", "type MyType5 = {\n    name: string;\n}", ""+
		"\n\n*@foo* — *bar\n"+
		"\n\n*@property* — {number} age\n")

	f.VerifyQuickInfoAt(t, "1n", "(property) name: string", "@-rule\n")
	f.VerifyQuickInfoAt(t, "2n", "(property) name: string", "some comment\n")
	f.VerifyQuickInfoAt(t, "3n", "(property) name: string", "@*stars\n")
	f.VerifyQuickInfoAt(t, "4n", "(property) name: string", "@(parens)\n")
	f.VerifyQuickInfoAt(t, "5n", "(property) name: string", "")

	f.VerifyQuickInfoAt(t, "1a", "(property) age: number", "")
	f.VerifyQuickInfoAt(t, "2a", "(property) age: number", "")
	f.VerifyQuickInfoAt(t, "3a", "(property) age: number", "")
	f.VerifyQuickInfoAt(t, "4a", "(property) age: number", "")
	f.VerifyQuickInfoAt(t, "5a", "(property) age: number", "")
}
