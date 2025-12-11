package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoMeaning(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: foo.d.ts
declare const [|/*foo_value_declaration*/foo: number|];
[|declare module "foo_module" {
    interface /*foo_type_declaration*/I { x: number; y: number }
    export = I;
}|]
// @Filename: foo_user.ts
///<reference path="foo.d.ts" />
[|import foo = require("foo_module");|]
const x = foo/*foo_value*/;
const i: foo/*foo_type*/ = { x: 1, y: 2 };
// @Filename: bar.d.ts
[|declare interface /*bar_type_declaration*/bar { x: number; y: number }|]
[|declare module "bar_module" {
    const /*bar_value_declaration*/x: number;
    export = x;
}|]
// @Filename: bar_user.ts
///<reference path="bar.d.ts" />
[|import bar = require("bar_module");|]
const x = bar/*bar_value*/;
const i: bar/*bar_type*/ = { x: 1, y: 2 };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "foo",
			Preferences: nil,
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:     "foo",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[0].LSLocation(),
				},
				{
					Name:     "foo",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[2].LSLocation(),
				},
				{
					Name:     "foo_module",
					Kind:     lsproto.SymbolKindNamespace,
					Location: f.Ranges()[1].LSLocation(),
				},
			}),
		},
	})
	f.GoToMarker(t, "foo_value")
	f.VerifyQuickInfoIs(t, "const foo: number", "")
	f.GoToMarker(t, "foo_type")
	f.VerifyQuickInfoIs(t, "(alias) interface foo\nimport foo = require(\"foo_module\")", "")
	f.VerifyWorkspaceSymbol(t, []*fourslash.VerifyWorkspaceSymbolCase{
		{
			Pattern:     "bar",
			Preferences: nil,
			Exact: PtrTo([]*lsproto.SymbolInformation{
				{
					Name:     "bar",
					Kind:     lsproto.SymbolKindInterface,
					Location: f.Ranges()[3].LSLocation(),
				},
				{
					Name:     "bar",
					Kind:     lsproto.SymbolKindVariable,
					Location: f.Ranges()[5].LSLocation(),
				},
				{
					Name:     "bar_module",
					Kind:     lsproto.SymbolKindNamespace,
					Location: f.Ranges()[4].LSLocation(),
				},
			}),
		},
	})
	f.GoToMarker(t, "bar_value")
	f.VerifyQuickInfoIs(t, "(alias) const bar: number\nimport bar = require(\"bar_module\")", "")
	f.GoToMarker(t, "bar_type")
	f.VerifyQuickInfoIs(t, "interface bar", "")
	f.VerifyBaselineGoToDefinition(t, false, "foo_value", "foo_type", "bar_value", "bar_type")
}
