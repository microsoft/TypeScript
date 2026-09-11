package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoDistributedTypeParameter(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Conditional<T> =
    T/*check*/ extends T/*extends*/
        ? T/*trueType*/
        : T/*falseType*/;

type Mapped<T> = { [P in keyof T/*mappedConstraint*/]: T/*mappedType*/ };

type NonDistributed<T> = [T/*nonDistributed*/] extends [unknown] ? T : never;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "check", "(type parameter) (distributed) T in type Conditional<T>", "")
	f.VerifyQuickInfoAt(t, "extends", "(type parameter) (distributed) T in type Conditional<T>", "")
	f.VerifyQuickInfoAt(t, "trueType", "(type parameter) (distributed) T in type Conditional<T>", "")
	f.VerifyQuickInfoAt(t, "falseType", "(type parameter) (distributed) T in type Conditional<T>", "")
	f.VerifyQuickInfoAt(t, "mappedConstraint", "(type parameter) (distributed) T in type Mapped<T>", "")
	f.VerifyQuickInfoAt(t, "mappedType", "(type parameter) (distributed) T in type Mapped<T>", "")
	f.VerifyQuickInfoAt(t, "nonDistributed", "(type parameter) T in type NonDistributed<T>", "")
}
