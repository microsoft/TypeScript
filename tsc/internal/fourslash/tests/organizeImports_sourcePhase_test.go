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
		lsproto.CodeActionKindSourceSortImports,
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
		lsproto.CodeActionKindSourceSortImports,
		&lsutil.UserPreferences{OrganizeImportsSort: lsutil.OrganizeImportsSortOrdinalIgnoreCase},
	)
}
