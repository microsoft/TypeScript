package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListFunctionExpression(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class DataHandler {
    dataArray: Uint8Array;
    loadData(filename) {
        var xmlReq = new XMLHttpRequest();
        xmlReq.open("GET", "/" + filename, true);
        xmlReq.responseType = "arraybuffer";
        xmlReq.onload = function(xmlEvent) {
            /*local*/
            this./*this*/;
        }
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "local")
	f.InsertLine(t, "")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"xmlEvent",
			},
		},
	})
	f.VerifyCompletions(t, "this", nil)
}
