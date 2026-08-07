package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestWorkspaceSymbolCurrentProject(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /home/projects/a/tsconfig.json
{}

// @Filename: /home/projects/a/index.ts
export function [|fromA|]() {}

// @Filename: /home/projects/b/tsconfig.json
{}

// @Filename: /home/projects/b/index.ts
export function [|fromB|]() {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/home/projects/a/index.ts")

	allOpenProjects := lsutil.NewDefaultUserPreferences()
	currentProject := lsutil.NewDefaultUserPreferences()
	currentProject.WorkspaceSymbolsScope = lsutil.WorkspaceSymbolsScopeCurrentProject

	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "from",
			Preferences: &allOpenProjects,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:     "fromA",
					Kind:     lsproto.SymbolKindFunction,
					Location: f.Ranges()[0].LSLocation(),
				},
				{
					Name:     "fromB",
					Kind:     lsproto.SymbolKindFunction,
					Location: f.Ranges()[1].LSLocation(),
				},
			}),
		},
		{
			Pattern:     "from",
			Preferences: &currentProject,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:     "fromA",
					Kind:     lsproto.SymbolKindFunction,
					Location: f.Ranges()[0].LSLocation(),
				},
			}),
		},
	})
}
