package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigateToImport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: library.ts
[|export function foo() {}|]
[|export function bar() {}|]
// @Filename: user.ts
import {foo, [|bar as baz|]} from './library';`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "foo",
			Preferences: nil,
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:     "foo",
					Kind:     lsproto.SymbolKindFunction,
					Location: f.Ranges()[0].LSLocation(),
				},
			}),
		}, {
			Pattern:     "bar",
			Preferences: nil,
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:     "bar",
					Kind:     lsproto.SymbolKindFunction,
					Location: f.Ranges()[1].LSLocation(),
				},
			}),
		}, {
			Pattern:     "baz",
			Preferences: nil,
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:     "baz",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[2].LSLocation(),
				},
			}),
		},
	})
}
