package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImportsPathsUnicode1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `import * as Ab from "./Ab";
import * as _aB from "./_aB";
import * as aB from "./aB";
import * as _Ab from "./_Ab";

console.log(_aB, _Ab, aB, Ab);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(t,
		`import * as Ab from "./Ab";
import * as _Ab from "./_Ab";
import * as _aB from "./_aB";
import * as aB from "./aB";

console.log(_aB, _Ab, aB, Ab);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSFalse,
			OrganizeImportsCollation:  lsutil.OrganizeImportsCollationOrdinal,
		},
	)
	f.VerifyOrganizeImports(t,
		`import * as _aB from "./_aB";
import * as _Ab from "./_Ab";
import * as aB from "./aB";
import * as Ab from "./Ab";

console.log(_aB, _Ab, aB, Ab);`,
		lsproto.CodeActionKindSourceOrganizeImports,
		&lsutil.UserPreferences{
			OrganizeImportsIgnoreCase: core.TSFalse,
			OrganizeImportsCollation:  lsutil.OrganizeImportsCollationUnicode,
		},
	)
}
