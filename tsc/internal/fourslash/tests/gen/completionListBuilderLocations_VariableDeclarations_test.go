package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListBuilderLocations_VariableDeclarations(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = a/*var1*/
var x = (b/*var2*/
var x = (c, d/*var3*/
 var y : any = "", x = a/*var4*/
 var y : any = "", x = (a/*var5*/
class C{}
var y = new C(/*var6*/
 class C{}
 var y = new C(0, /*var7*/
var y = [/*var8*/
var y = [0, /*var9*/
var y = ` + "`" + `${/*var10*/
var y = ` + "`" + `${10} dd ${ /*var11*/
var y = 10; y=/*var12*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"var1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					"C",
					"y",
				}, false),
		},
	})
	f.VerifyCompletions(t, []string{"var2", "var3", "var4", "var5", "var6", "var7", "var8", "var9", "var10", "var11", "var12"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					"C",
					"x",
					"y",
				}, false),
		},
	})
}
