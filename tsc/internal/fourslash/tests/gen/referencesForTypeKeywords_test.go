package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForTypeKeywords(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {}
function f<T /*typeParam_extendsKeyword*/extends I>() {}
type A1<T, U> = T /*conditionalType_extendsKeyword*/extends U ? 1 : 0;
type A2<T> = T extends /*inferType_inferKeyword*/infer U ? 1 : 0;
type A3<T> = { [P /*mappedType_inOperator*/in keyof T]: 1 };
type A4<T> = /*keyofOperator_keyofKeyword*/keyof T;
type A5<T> = /*readonlyOperator_readonlyKeyword*/readonly T[];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "typeParam_extendsKeyword", "conditionalType_extendsKeyword", "inferType_inferKeyword", "mappedType_inOperator", "keyofOperator_keyofKeyword", "readonlyOperator_readonlyKeyword")
}
