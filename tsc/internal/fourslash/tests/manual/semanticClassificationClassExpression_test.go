package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSemanticClassificationClassExpression(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = class /*0*/C {}
class /*1*/C {}
class /*2*/D extends class /*3*/B{} { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "class.declaration", Text: "x"},
		{Type: "class.declaration", Text: "C"},
		{Type: "class.declaration", Text: "C"},
		{Type: "class.declaration", Text: "D"},
		{Type: "class.declaration", Text: "B"},
	})
}
