package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsType5(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {
    d, 
    type d as D,
    type c,
    c as C,
    b,
    b as B,
    type A,
    a
} from './foo';
console.log(A, a, B, b, c, C, d, D);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import {
    type A,
    a,
    b,
    b as B,
    type c,
    c as C,
    d,
    type d as D
} from './foo';
console.log(A, a, B, b, c, C, d, D);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
			OrganizeImportsTypeOrder:  lsutil.OrganizeImportsTypeOrderInline,
		},
	)
	f.VerifyOrganizeImports(t,
		`import {
    type A,
    a,
    b,
    b as B,
    type c,
    c as C,
    d,
    type d as D
} from './foo';
console.log(A, a, B, b, c, C, d, D);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
			OrganizeImportsTypeOrder:  lsutil.OrganizeImportsTypeOrderInline,
		},
	)
}
