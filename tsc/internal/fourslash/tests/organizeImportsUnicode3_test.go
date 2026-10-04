package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsUnicode3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {
    B,
    À,
    A,
} from './foo';

console.log(A, À, B);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import {
    A,
    À,
    B,
} from './foo';

console.log(A, À, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase:      core.TSFalse,
			OrganizeImportsCollation:       lsutil.OrganizeImportsCollationUnicode,
			OrganizeImportsAccentCollation: core.TSFalse,
		},
	)
	f.VerifyOrganizeImports(t,
		`import {
    A,
    À,
    B,
} from './foo';

console.log(A, À, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase:      core.TSFalse,
			OrganizeImportsCollation:       lsutil.OrganizeImportsCollationUnicode,
			OrganizeImportsAccentCollation: core.TSTrue,
		},
	)
}
