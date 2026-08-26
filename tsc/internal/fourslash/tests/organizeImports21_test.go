package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports21(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /a.ts
export interface LocationDefinitions {}
export interface PersonDefinitions {}
// @filename: /b.ts
export {
    /** @deprecated Use LocationDefinitions instead */
    LocationDefinitions as AddressDefinitions,
    LocationDefinitions,
    /** @deprecated Use PersonDefinitions instead */
    PersonDefinitions as NameDefinitions,
    PersonDefinitions,
} from './a';`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/b.ts")
	f.VerifyOrganizeImports(t,
		`export {
    /** @deprecated Use LocationDefinitions instead */
    LocationDefinitions as AddressDefinitions,
    LocationDefinitions,
    /** @deprecated Use PersonDefinitions instead */
    PersonDefinitions as NameDefinitions,
    PersonDefinitions
} from './a';
`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		nil,
	)
}
