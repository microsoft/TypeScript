package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsGroup_Newline(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import c from "C";

import d from "D";
import a from "A"; // not count
import b from "B";

console.log(a, b, c, d)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import c from "C";

import a from "A"; // not count
import b from "B";
import d from "D";

console.log(a, b, c, d)`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
}
