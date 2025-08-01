package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForTypeParameterInTypeAlias2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type Call<AA> = { (): A/*1*/A };
type Index<AA> = {[foo: string]: A/*2*/A};
type GenericMethod<AA> = { method<BB>(): A/*3*/A & B/*4*/B }
type Nesting<TT> = { method<UU>(): new <WW>() => T/*5*/T & U/*6*/U & W/*7*/W };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(type parameter) AA in type Call<AA>", "")
	f.VerifyQuickInfoAt(t, "2", "(type parameter) AA in type Index<AA>", "")
	f.VerifyQuickInfoAt(t, "3", "(type parameter) AA in type GenericMethod<AA>", "")
	f.VerifyQuickInfoAt(t, "4", "(type parameter) BB in method<BB>(): AA & BB", "")
	f.VerifyQuickInfoAt(t, "5", "(type parameter) TT in type Nesting<TT>", "")
	f.VerifyQuickInfoAt(t, "6", "(type parameter) UU in method<UU>(): new <WW>() => TT & UU & WW", "")
	f.VerifyQuickInfoAt(t, "7", "(type parameter) WW in <WW>(): TT & UU & WW", "")
}
