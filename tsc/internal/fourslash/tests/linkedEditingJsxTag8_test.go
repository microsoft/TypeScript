package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestLinkedEditingJsxTag8(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @FileName: /mismatchedNames.tsx
const A = thing;
const B = thing;
const jsx = (
    </*8*/A>
    </B>
);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
		"8": nil,
	})
}
