package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports7(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import * as something from "path"; /**
 * some comment here
 * and there
 */
import * as somethingElse from "anotherpath";

something;
somethingElse;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import * as somethingElse from "anotherpath";
import * as something from "path"; /**
 * some comment here
 * and there
 */

something;
somethingElse;`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		nil,
	)
}
