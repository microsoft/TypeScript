package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import {
    d, d as D,
    c,
    c as C, b,
    b as B, a
} from './foo';
import {
    h, h as H,
    g,
    g as G, f,
    f as F, e
} from './foo';

console.log(a, B, b, c, C, d, D);
console.log(e, f, F, g, G, H, h);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImportsWithRequestKind(t,
		`import {
    a,
    b,
    b as B,
    c,
    c as C,
    d, d as D,
    e,
    f,
    f as F,
    g,
    g as G,
    h, h as H
} from './foo';

console.log(a, B, b, c, C, d, D);
console.log(e, f, F, g, G, H, h);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSTrue,
		},
	)
	f.VerifyOrganizeImports(t,
		`import {
    b as B,
    c as C,
    d as D,
    f as F,
    g as G,
    h as H,
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h
} from './foo';

console.log(a, B, b, c, C, d, D);
console.log(e, f, F, g, G, H, h);`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSFalse,
		},
	)
}
