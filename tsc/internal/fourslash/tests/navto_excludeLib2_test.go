package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavto_excludeLib2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: /index.ts
import { someName as [|weirdName|] } from "bar";
// @filename: /tsconfig.json
{}
// @filename: /node_modules/bar/index.d.ts
export const someName: number;
// @filename: /node_modules/bar/package.json
{}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "weirdName",
			Preferences: &lsutil.UserPreferences{ExcludeLibrarySymbolsInNavTo: core.TSFalse},
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:     "weirdName",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[0].LSLocation(),
				},
			}),
		},
	})
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "weirdName",
			Preferences: nil,
			Exact: new([]*lsproto.SymbolInformation{
				{
					Name:     "weirdName",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[0].LSLocation(),
				},
			}),
		},
	})
}
