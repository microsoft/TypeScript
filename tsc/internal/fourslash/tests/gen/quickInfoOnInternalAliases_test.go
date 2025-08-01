package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnInternalAliases(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** Module comment*/
export module m1 {
    /** m2 comments*/
    export module m2 {
        /** class comment;*/
        export class /*1*/c {
        };
    }
    export function foo() {
    }
}
/**This is on import declaration*/
import /*2*/internalAlias = m1.m2./*3*/c;
var /*4*/newVar = new /*5*/internalAlias();
var /*6*/anotherAliasVar = /*7*/internalAlias;
import /*8*/internalFoo = m1./*9*/foo;
var /*10*/callVar = /*11*/internalFoo();
var /*12*/anotherAliasFoo = /*13*/internalFoo;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "class m1.m2.c", "class comment;")
	f.VerifyQuickInfoAt(t, "2", "(alias) class internalAlias\nimport internalAlias = m1.m2.c", "This is on import declaration")
	f.VerifyQuickInfoAt(t, "3", "class m1.m2.c", "class comment;")
	f.VerifyQuickInfoAt(t, "4", "var newVar: internalAlias", "")
	f.VerifyQuickInfoAt(t, "5", "(alias) new internalAlias(): internalAlias\nimport internalAlias = m1.m2.c", "This is on import declaration")
	f.VerifyQuickInfoAt(t, "6", "var anotherAliasVar: typeof internalAlias", "")
	f.VerifyQuickInfoAt(t, "7", "(alias) class internalAlias\nimport internalAlias = m1.m2.c", "This is on import declaration")
	f.VerifyQuickInfoAt(t, "8", "(alias) function internalFoo(): void\nimport internalFoo = m1.foo", "")
	f.VerifyQuickInfoAt(t, "9", "function m1.foo(): void", "")
	f.VerifyQuickInfoAt(t, "10", "var callVar: void", "")
	f.VerifyQuickInfoAt(t, "11", "(alias) internalFoo(): void\nimport internalFoo = m1.foo", "")
	f.VerifyQuickInfoAt(t, "12", "var anotherAliasFoo: () => void", "")
	f.VerifyQuickInfoAt(t, "13", "(alias) function internalFoo(): void\nimport internalFoo = m1.foo", "")
}
