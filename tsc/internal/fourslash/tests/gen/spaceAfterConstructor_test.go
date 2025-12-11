package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSpaceAfterConstructor(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export class myController {
    private _processId;
    constructor (processId: number) {/*1*/
        this._processId = processId;
    }/*2*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "2")
	f.Insert(t, "}")
	f.GoToMarker(t, "1")
	f.VerifyCurrentLineContentIs(t, "    constructor(processId: number) {")
}
