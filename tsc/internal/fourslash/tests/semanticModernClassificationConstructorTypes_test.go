package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSemanticModernClassificationConstructorTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
Object.create(null);
const x = Promise.resolve(Number.MAX_VALUE);
if (x instanceof Promise) {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "class.defaultLibrary", Text: "Object"},
		{Type: "method.defaultLibrary", Text: "create"},
		{Type: "variable.declaration.readonly", Text: "x"},
		{Type: "class.defaultLibrary", Text: "Number"},
		{Type: "property.readonly.defaultLibrary", Text: "MAX_VALUE"},
		{Type: "variable.readonly", Text: "x"},
	})
}
