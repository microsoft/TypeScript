package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestInsertReturnStatementInDuplicateIdentifierFunction(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
class foo { };
function foo() { /**/ }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 2)
	f.Insert(t, "return null;")
	f.VerifyNumberOfErrorsInCurrentFile(t, 2)
}
