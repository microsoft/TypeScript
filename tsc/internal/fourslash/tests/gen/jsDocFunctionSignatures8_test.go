package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocFunctionSignatures8(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: Foo.js
/**
 * Represents a person
 * a b multiline test
 * @constructor
 * @param {string} name The name of the person
 * @param {number} age The age of the person
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var p = new Pers/**/on();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyQuickInfoIs(t, "constructor Person(name: string, age: number): Person", "Represents a person\na b multiline test")
}
