package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSemanticModernClassificationPrivateIdentifiers(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo {
	#privateField = 1;
	#privateMethod() {}

	test() {
		this.#privateField;
		this.#privateMethod();
	}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "class.declaration", Text: "Foo"},
		{Type: "property.declaration", Text: "#privateField"},
		{Type: "method.declaration", Text: "#privateMethod"},
		{Type: "method.declaration", Text: "test"},
		{Type: "property", Text: "#privateField"},
		{Type: "method", Text: "#privateMethod"},
	})
}
