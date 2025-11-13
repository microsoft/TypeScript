package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocAugmentsAndExtends(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: dummy.js
/**
 * @augments {Thing<number>}
 * [|@extends {Thing<string>}|]
 */
class MyStringThing extends Thing {
    constructor() {
        super();
        var x = this.mine;
        x/**/;
    }
}
// @Filename: declarations.d.ts
declare class Thing<T> {
    mine: T;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyQuickInfoIs(t, "(local var) x: number", "")
	f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Message: "Class declarations cannot have more than one '@augments' or '@extends' tag.",
			Code:    &lsproto.IntegerOrString{Integer: PtrTo[int32](8025)},
		},
	})
}
