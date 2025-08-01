package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForTypeParameterInTypeAlias1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Ctor<AA> = new () => A/*1*/A;
type MixinCtor<AA> = new () => AA & { constructor: MixinCtor<A/*2*/A> };
type NestedCtor<AA> = new() => AA & (new () => AA & { constructor: NestedCtor<A/*3*/A> });
type Method<AA> = { method(): A/*4*/A };
type Construct<AA> = { new(): A/*5*/A };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(type parameter) AA in type Ctor<AA>", "")
	f.VerifyQuickInfoAt(t, "2", "(type parameter) AA in type MixinCtor<AA>", "")
	f.VerifyQuickInfoAt(t, "3", "(type parameter) AA in type NestedCtor<AA>", "")
	f.VerifyQuickInfoAt(t, "4", "(type parameter) AA in type Method<AA>", "")
	f.VerifyQuickInfoAt(t, "5", "(type parameter) AA in type Construct<AA>", "")
}
