package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoGenerics(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Con/*1*/tainer<T> {
    x: T;
}
interface IList</*2*/T> {
    getItem(i: number): /*3*/T;
}
class List2</*4*/T extends IList<number>> implements IList<T> {
    private __it/*6*/em: /*5*/T[];
    public get/*7*/Item(i: number) {
        return this.__item[i];
    }
    public /*8*/method</*9*/S extends IList<T>>(s: S, p: /*10*/T[]) {
        return s;
    }
}
function foo4</*11*/T extends Date>(test: T): T;
function foo4</*12*/S extends string>(test: S): S;
function foo4(test: any): any;
function foo4</*13*/T extends Date>(test: any): any { return null; }
var x: List2<IList<number>>;
var y = x./*14*/getItem(10);
var x2: IList<IList<number>>;
var x3: IList<number>;
var y2 = x./*15*/method(x2, [x3, x3]);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "class Container<T>", "")
	f.VerifyQuickInfoAt(t, "2", "(type parameter) T in IList<T>", "")
	f.VerifyQuickInfoAt(t, "3", "(type parameter) T in IList<T>", "")
	f.VerifyQuickInfoAt(t, "4", "(type parameter) T in List2<T extends IList<number>>", "")
	f.VerifyQuickInfoAt(t, "5", "(type parameter) T in List2<T extends IList<number>>", "")
	f.VerifyQuickInfoAt(t, "6", "(property) List2<T extends IList<number>>.__item: T[]", "")
	f.VerifyQuickInfoAt(t, "7", "(method) List2<T extends IList<number>>.getItem(i: number): T", "")
	f.VerifyQuickInfoAt(t, "8", "(method) List2<T extends IList<number>>.method<S extends IList<T>>(s: S, p: T[]): S", "")
	f.VerifyQuickInfoAt(t, "9", "(type parameter) S in List2<T extends IList<number>>.method<S extends IList<T>>(s: S, p: T[]): S", "")
	f.VerifyQuickInfoAt(t, "10", "(type parameter) T in List2<T extends IList<number>>", "")
	f.VerifyQuickInfoAt(t, "11", "(type parameter) T in foo4<T extends Date>(test: T): T", "")
	f.VerifyQuickInfoAt(t, "12", "(type parameter) S in foo4<S extends string>(test: S): S", "")
	f.VerifyQuickInfoAt(t, "13", "(type parameter) T in foo4<T extends Date>(test: any): any", "")
	f.VerifyQuickInfoAt(t, "14", "(method) List2<IList<number>>.getItem(i: number): IList<number>", "")
	f.VerifyQuickInfoAt(t, "15", "(method) List2<IList<number>>.method<IList<IList<number>>>(s: IList<IList<number>>, p: IList<number>[]): IList<IList<number>>", "")
}
