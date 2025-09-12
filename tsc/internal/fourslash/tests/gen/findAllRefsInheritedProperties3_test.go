package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsInheritedProperties3(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class class1 extends class1 {
    [|/*0*/doStuff() { }|]
    [|/*1*/propName: string;|]
}
interface interface1 extends interface1 {
    [|/*2*/doStuff(): void;|]
    [|/*3*/propName: string;|]
}
class class2 extends class1 implements interface1 {
    [|/*4*/doStuff() { }|]
    [|/*5*/propName: string;|]
}

var v: class2;
v./*6*/doStuff();
v./*7*/propName;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2", "3", "4", "6", "5", "7")
}
