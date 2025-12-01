package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericParameterHelpTypeReferences(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo { }

class testClass<T extends IFoo, U, M extends IFoo> {
    constructor(a:T, b:U, c:M){ }
}

// Generic types
testClass</*type1*/
var x : testClass</*type2*/
class Bar<T> extends testClass</*type3*/
var x : testClass<,, /*type4*/any>;

interface I<T> {}
let i: I</*interface*/>;

type Ty<T> = T;
let t: Ty</*typeAlias*/>;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "type1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "testClass<T extends IFoo, U, M extends IFoo>", ParameterName: "T", ParameterSpan: "T extends IFoo"})
	f.GoToMarker(t, "type2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "testClass<T extends IFoo, U, M extends IFoo>", ParameterName: "T", ParameterSpan: "T extends IFoo"})
	f.GoToMarker(t, "type3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "testClass<T extends IFoo, U, M extends IFoo>", ParameterName: "T", ParameterSpan: "T extends IFoo"})
	f.GoToMarker(t, "type4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "M", ParameterSpan: "M extends IFoo"})
	f.GoToMarker(t, "interface")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "I<T>", ParameterName: "T", ParameterSpan: "T"})
	f.GoToMarker(t, "typeAlias")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "Ty<T>", ParameterName: "T", ParameterSpan: "T"})
}
