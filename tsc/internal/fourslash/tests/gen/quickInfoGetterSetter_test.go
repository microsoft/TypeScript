package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoGetterSetter(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @target: es2015
class C {
    #x = Promise.resolve("")
    set /*setterDef*/myValue(x: Promise<string> | string) {
        this.#x = Promise.resolve(x);
    }
    get /*getterDef*/myValue(): Promise<string> {
        return this.#x;
    }
}
let instance = new C();
instance./*setterUse*/myValue = instance./*getterUse*/myValue;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "getterUse", "(property) C.myValue: Promise<string>", "")
	f.VerifyQuickInfoAt(t, "getterDef", "(getter) C.myValue: Promise<string>", "")
	f.VerifyQuickInfoAt(t, "setterUse", "(property) C.myValue: string | Promise<string>", "")
	f.VerifyQuickInfoAt(t, "setterDef", "(setter) C.myValue: string | Promise<string>", "")
}
