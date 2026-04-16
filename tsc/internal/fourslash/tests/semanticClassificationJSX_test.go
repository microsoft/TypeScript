package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSemanticClassificationJSX(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.tsx
const Component = () => <div>Hello</div>;
const afterJSX = 42;
const alsoAfterJSX = "test";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.tsx")
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "function.declaration.readonly", Text: "Component"},
		{Type: "variable.declaration.readonly", Text: "afterJSX"},
		{Type: "variable.declaration.readonly", Text: "alsoAfterJSX"},
	})
}
