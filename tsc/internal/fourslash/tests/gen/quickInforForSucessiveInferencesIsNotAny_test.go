package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInforForSucessiveInferencesIsNotAny(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function schema<T> (value : T) : {field : T};

declare const b: boolean;
const obj/*1*/ = schema(b);
const actualTypeOfNested/*2*/ = schema(obj);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const obj: {\n    field: boolean;\n}", "")
	f.VerifyQuickInfoAt(t, "2", "const actualTypeOfNested: {\n    field: {\n        field: boolean;\n    };\n}", "")
}
