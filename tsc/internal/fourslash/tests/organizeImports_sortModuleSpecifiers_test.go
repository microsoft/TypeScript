package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports_sortModuleSpecifiers_nonRelativeVsNonRelative(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import x from "lib2";
import y from "lib1";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import y from "lib1";
import x from "lib2";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_sortModuleSpecifiers_relativeVsRelative(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import x from "./lib2";
import y from "./lib1";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import y from "./lib1";
import x from "./lib2";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_sortModuleSpecifiers_relativeVsNonRelative(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import x from "./lib";
import y from "lib";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import y from "lib";
import x from "./lib";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_sortModuleSpecifiers_caseInsensitive(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Verify "a" sorts before "Z" (case-insensitive)
	const content = `import x from "Z";
import y from "a";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import y from "a";
import x from "Z";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_sortModuleSpecifiers_caseInsensitiveReverse(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Verify "A" sorts before "z" (case-insensitive)
	const content = `import x from "z";
import y from "A";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import y from "A";
import x from "z";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}
