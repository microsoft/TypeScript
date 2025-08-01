package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForShorthandProperty(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var name1 = undefined, id1 = undefined;
var /*obj1*/obj1 = {/*name1*/name1, /*id1*/id1};
var name2 = "Hello";
var id2 = 10000;
var /*obj2*/obj2 = {/*name2*/name2, /*id2*/id2};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "obj1", "var obj1: {\n    name1: any;\n    id1: any;\n}", "")
	f.VerifyQuickInfoAt(t, "name1", "(property) name1: any", "")
	f.VerifyQuickInfoAt(t, "id1", "(property) id1: any", "")
	f.VerifyQuickInfoAt(t, "obj2", "var obj2: {\n    name2: string;\n    id2: number;\n}", "")
	f.VerifyQuickInfoAt(t, "name2", "(property) name2: string", "")
	f.VerifyQuickInfoAt(t, "id2", "(property) id2: number", "")
}
