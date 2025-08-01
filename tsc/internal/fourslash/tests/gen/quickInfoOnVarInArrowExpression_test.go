package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnVarInArrowExpression(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IMap<T> {
    [key: string]: T;
}
var map: IMap<string[]>;
var categories: string[];
each(categories, category => {
    var /*1*/changes = map[category];
    return each(changes, change => {
    });
});
function each<T>(items: T[], handler: (item: T) => void) { }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(local var) changes: string[]", "")
}
