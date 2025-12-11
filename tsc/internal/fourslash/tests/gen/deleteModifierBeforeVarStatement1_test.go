package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDeleteModifierBeforeVarStatement1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `

/////////////////////////////
/// Windows Script Host APIS
/////////////////////////////

declare var ActiveXObject: { new (s: string): any; };

interface ITextWriter {
    WriteLine(s): void;
}

declare var WScript: {
    Echo(s): void;
    StdErr: ITextWriter;
    Arguments: { length: number; Item(): string; };
    ScriptFullName: string;
    Quit(): number;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFileNumber(t, 0)
	f.GoToPosition(t, 0)
	f.DeleteAtCaret(t, 100)
	f.GoToPosition(t, 198)
	f.DeleteAtCaret(t, 16)
	f.GoToPosition(t, 198)
	f.Insert(t, "Item(): string; ")
}
