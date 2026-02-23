package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOrganizeImports_coalesceImports_sortSpecifiersCaseInsensitive(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { default as M, a as n, B, y, Z as O } from "lib";
M; n; B; y; O;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { B, default as M, a as n, Z as O, y } from "lib";
M; n; B; y; O;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_combineSideEffectOnly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import "lib";
import "lib";
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import "lib";
void 0;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_combineNamespaceImportsNotMerged(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Namespace imports from the same module should not be merged into one.
	const content = `import * as x from "lib";
import * as y from "lib";
import { z } from "aaa";
x; y; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { z } from "aaa";
import * as x from "lib";
import * as y from "lib";
x; y; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_combineDefaultImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import x from "lib";
import y from "lib";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { default as x, default as y } from "lib";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_combinePropertyImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { x } from "lib";
import { y as z } from "lib";
x; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { x, y as z } from "lib";
x; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_sideEffectWithNamespace(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Side-effect-only import and namespace import from same module should not be combined.
	const content = `import "lib";
import * as x from "lib";
import { z } from "aaa";
x; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { z } from "aaa";
import "lib";
import * as x from "lib";
x; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_sideEffectWithDefault(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Side-effect-only import and default import from same module should not be combined.
	const content = `import "lib";
import x from "lib";
import { z } from "aaa";
x; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { z } from "aaa";
import "lib";
import x from "lib";
x; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_sideEffectWithProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Side-effect-only import and property import from same module should not be combined.
	const content = `import "lib";
import { x } from "lib";
import { z } from "aaa";
x; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { z } from "aaa";
import "lib";
import { x } from "lib";
x; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_namespaceWithDefault(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Namespace import and default import from same module should be combined.
	const content = `import * as x from "lib";
import y from "lib";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import y, * as x from "lib";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_namespaceWithProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Namespace import and property import from same module should not be combined.
	const content = `import * as x from "lib";
import { y } from "lib";
import { z } from "aaa";
x; y; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { z } from "aaa";
import * as x from "lib";
import { y } from "lib";
x; y; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_defaultWithProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Default import and property import from same module should be combined.
	const content = `import x from "lib";
import { y } from "lib";
x; y;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import x, { y } from "lib";
x; y;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_combineMany(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import "lib";
import * as y from "lib";
import w from "lib";
import { b } from "lib";
import "lib";
import * as x from "lib";
import z from "lib";
import { a } from "lib";
w; x; y; z; a; b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import "lib";
import * as x from "lib";
import * as y from "lib";
import { a, b, default as w, default as z } from "lib";
w; x; y; z; a; b;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_twoNamespacesOneDefault(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Descriptive test: two namespace imports + one default should not combine.
	const content = `import * as x from "lib";
import * as y from "lib";
import z from "lib";
import { w } from "aaa";
x; y; z; w;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { w } from "aaa";
import * as x from "lib";
import * as y from "lib";
import z from "lib";
x; y; z; w;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_typeOnlySeparate(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Type-only imports should be coalesced separately from value imports.
	const content = `import type { x } from "lib";
import type { y } from "lib";
import { z } from "lib";
x; y; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import type { x, y } from "lib";
import { z } from "lib";
x; y; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_typeOnlyKindsNotCombined(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Type-only default, namespace, and named imports should not be combined with each other.
	const content = `import type { x } from "lib";
import type * as y from "lib";
import type z from "lib";
x; y; z;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import type * as y from "lib";
import type z from "lib";
import type { x } from "lib";
x; y; z;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsIgnoreCase: core.TSTrue},
	)
}

func TestOrganizeImports_coalesceImports_sortSpecifiersTypeOnlyInline(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { type z, y, type x, c, type b, a } from "lib";
z; y; x; c; b; a;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import { a, type b, c, type x, y, type z } from "lib";
z; y; x; c; b; a;`,
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSTrue,
			OrganizeImportsTypeOrder:  lsutil.OrganizeImportsTypeOrderInline,
		},
	)
}
