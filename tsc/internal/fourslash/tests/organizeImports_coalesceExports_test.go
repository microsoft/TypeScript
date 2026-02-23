package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports_coalesceExports_sortSpecifiersCaseInsensitive(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export { default as M, a as n, B, y, Z as O } from "lib";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`export { B, default as M, a as n, Z as O, y } from "lib";
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_combineNamespaceReExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export * from "lib";
export * from "lib";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`export * from "lib";
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_combinePropertyExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const x = 1, z = 2;
export { x };
export { z as y };
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`const x = 1, z = 2;
export { x, z as y };
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_combinePropertyReExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export { x } from "lib";
export { y as z } from "lib";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`export { x, y as z } from "lib";
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_namespaceWithPropertyReExport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Namespace re-export and property re-export from same module should not be combined.
	const content = `export * from "lib";
export { y } from "lib";
export { z } from "aaa";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`export { z } from "aaa";
export * from "lib";
export { y } from "lib";
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_combineMany(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const x = 1, w = 2, z = 3, q = 4;
export { x };
export { w as y, z as default };
export { q as w };
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`const x = 1, w = 2, z = 3, q = 4;
export { z as default, q as w, x, w as y };
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_combineManyReExports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export { x as a, y } from "lib";
export * from "lib";
export { z as b } from "lib";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`export * from "lib";
export { x as a, z as b, y } from "lib";
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_keepTypeOnlySeparate(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Type-only exports should be kept separate from value exports.
	const content = `const x = 1;
type y = string;
export { x };
export type { y };
export { z } from "aaa";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`const x = 1;
type y = string;
export { z } from "aaa";
export { x };
export type { y };
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceExports_combineTypeOnly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type x = string;
type y = number;
export type { x };
export type { y };
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`type x = string;
type y = number;
export type { x, y };
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}
