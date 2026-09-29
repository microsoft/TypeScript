package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports19(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const a = 1;
export { a };

const b = 1;
export { b };

const c = 1;
export { c };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`const a = 1;
export { a };

const b = 1;
export { b };

const c = 1;
export { c };
`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		nil,
	)
}
