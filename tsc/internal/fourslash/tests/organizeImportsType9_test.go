package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsType9(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { type a, type A, b, B } from "foo";
console.log(a, b, A, B);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { type a, type A, b, B } from "foo";
console.log(a, b, A, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
			OrganizeImportsTypeOrder:  lsutil.OrganizeImportsTypeOrderInline,
		},
	)
	f.ReplaceLine(t, 0, "import { type a, type A, b, B } from \"foo1\";")
	f.VerifyOrganizeImports(t,
		`import { type a, type A, b, B } from "foo1";
console.log(a, b, A, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
			OrganizeImportsTypeOrder:  lsutil.OrganizeImportsTypeOrderFirst,
		},
	)
	f.ReplaceLine(t, 0, "import { type a, type A, b, B } from \"foo2\";")
	f.VerifyOrganizeImports(t,
		`import { b, B, type a, type A } from "foo2";
console.log(a, b, A, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
			OrganizeImportsTypeOrder:  lsutil.OrganizeImportsTypeOrderLast,
		},
	)
	f.ReplaceLine(t, 0, "import { type a, type A, b, B } from \"foo3\";")
	f.VerifyOrganizeImports(t,
		`import { type a, type A, b, B } from "foo3";
console.log(a, b, A, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSUnknown,
		},
	)
	f.ReplaceLine(t, 0, "import { type a, type A, b, B } from \"foo4\";")
	f.VerifyOrganizeImports(t,
		`import { type a, type A, b, B } from "foo4";
console.log(a, b, A, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSTrue,
		},
	)
	f.ReplaceLine(t, 0, "import { type a, type A, b, B } from \"foo5\";")
	f.VerifyOrganizeImports(t,
		`import { type A, B, type a, b } from "foo5";
console.log(a, b, A, B);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSFalse,
		},
	)
}
