package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsType2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowSyntheticDefaultImports: true
// @moduleResolution: bundler
// @noUnusedLocals: true
// @target: es2018
type A = string;
type B = string;
const C = "hello";
export { A, type B, C };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`type A = string;
type B = string;
const C = "hello";
export { A, C, type B };
`,
		lsproto.CodeActionKindSourceOrganizeImports,
		nil,
	)
	f.VerifyOrganizeImports(t,
		`type A = string;
type B = string;
const C = "hello";
export { A, type B, C };
`,
		lsproto.CodeActionKindSourceOrganizeImports,
		&lsutil.UserPreferences{
			OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderInline,
		},
	)
	f.VerifyOrganizeImports(t,
		`type A = string;
type B = string;
const C = "hello";
export { type B, A, C };
`,
		lsproto.CodeActionKindSourceOrganizeImports,
		&lsutil.UserPreferences{
			OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderFirst,
		},
	)
	f.VerifyOrganizeImports(t,
		`type A = string;
type B = string;
const C = "hello";
export { A, C, type B };
`,
		lsproto.CodeActionKindSourceOrganizeImports,
		&lsutil.UserPreferences{
			OrganizeImportsTypeOrder: lsutil.OrganizeImportsTypeOrderLast,
		},
	)
}
