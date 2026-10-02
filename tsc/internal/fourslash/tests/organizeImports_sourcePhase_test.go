package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports_sourcePhaseImportsAreNotCoalesced(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import source b from "lib";
import source a from "lib";
a; b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(
		t,
		`import source a from "lib";
import source b from "lib";
a; b;`,
		lsproto.CodeActionKindSourceSortImportsTs,
		&lsutil.UserPreferences{OrganizeImportsSort: lsutil.OrganizeImportsSortOrdinalIgnoreCase},
	)
}

func TestOrganizeImports_sourceAndEvaluationPhaseImportsAreNotCoalesced(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import { c } from "lib";
import source b from "lib";
import { a } from "lib";
a; b; c;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(
		t,
		`import source b from "lib";
import { a, c } from "lib";
a; b; c;`,
		lsproto.CodeActionKindSourceSortImportsTs,
		&lsutil.UserPreferences{OrganizeImportsSort: lsutil.OrganizeImportsSortOrdinalIgnoreCase},
	)
}

func TestOrganizeImports_sourcePhaseImportSorting(t *testing.T) {
	t.Parallel()
	const imports = `import source a from "lib";
import source b from "lib";
import source c from "lib";
import source d from "lib";
import source e from "lib";
import source f from "lib";
import source g from "lib";
import source h from "lib";
import source i from "lib";
import source j from "lib";
import source k from "lib";
import source l from "lib";
import source m from "lib";
`
	for _, test := range []struct {
		name     string
		content  string
		expected string
	}{
		{
			name: "case insensitive bindings",
			content: `import { b, D } from "B";
import "a";
import source C from "lib";
import source a from "lib";`,
			expected: `import { b, D } from "B";
import "a";
import source a from "lib";
import source C from "lib";`,
		},
		{
			name: "case sensitive bindings",
			content: `import { D, b } from "a";
import "B";
import source a from "lib";
import source C from "lib";`,
			expected: `import { D, b } from "a";
import "B";
import source C from "lib";
import source a from "lib";`,
		},
		{
			name: "no named imports",
			content: `import source a from "lib";
import source B from "lib";`,
			expected: `import source B from "lib";
import source a from "lib";`,
		},
		{
			name: "mixed import kinds",
			content: `import { n } from "lib";
` + imports + `import * as o from "lib";
import type { T } from "lib";`,
			expected: `import type { T } from "lib";
import * as o from "lib";
` + imports + `import { n } from "lib";`,
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			f.VerifyOrganizeImports(t, test.expected+"\n", lsproto.CodeActionKindSourceSortImportsTs, &lsutil.UserPreferences{OrganizeImportsSort: lsutil.OrganizeImportsSortAuto})
		})
	}
}
