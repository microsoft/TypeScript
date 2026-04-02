package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestWorkspaceSymbolMultiProjectNonExistentRef verifies that workspace symbol
// requests work correctly in a multi-project scenario where one project's
// tsconfig has a reference to a non-existent path.
func TestWorkspaceSymbolMultiProjectNonExistentRef(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /home/src/projects/project-a/tsconfig.json
{
  "compilerOptions": { "composite": true },
  "references": [{ "path": "../project-nonexistent" }]
}

// @Filename: /home/src/projects/project-a/index.ts
export const [|myValueA: number = 1|];

// @Filename: /home/src/projects/project-b/tsconfig.json
{
  "compilerOptions": { "composite": true },
  "references": [{ "path": "../project-a" }]
}

// @Filename: /home/src/projects/project-b/index.ts
export const [|myValueB: string = "hello"|];
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Verify we can find symbols from both projects with a single pattern
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern: "myValue",
			Includes: new([]*lsproto.SymbolInformation{
				{
					Name:     "myValueA",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[0].LSLocation(),
				},
				{
					Name:     "myValueB",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[1].LSLocation(),
				},
			}),
		},
	})
}
