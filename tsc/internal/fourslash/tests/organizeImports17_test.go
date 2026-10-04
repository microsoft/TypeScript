package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports17(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { Both } from "module-specifiers-unsorted";
import { aa, CaseInsensitively, sorted } from "aardvark";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { aa, CaseInsensitively, sorted } from "aardvark";
import { Both } from "module-specifiers-unsorted";
`,
		lsproto.CodeActionKindSourceSortImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
		},
	)
}
