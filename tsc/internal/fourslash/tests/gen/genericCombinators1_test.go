package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericCombinators1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Collection<T> {
    length: number;
    add(x: T): void;
    remove(x: T): boolean;
}
interface Combinators {
    map<T, U>(c: Collection<T>, f: (x: T) => U): Collection<U>;
    map<T>(c: Collection<T>, f: (x: T) => any): Collection<any>;
}
class A {
    foo<T>() { return this; }
}
class B<T> {
    foo(x: T): T { return null; }
}
var c2: Collection<number>;
var c3: Collection<Collection<number>>;
var c4: Collection<A>;
var c5: Collection<B<any>>;
var _: Combinators;
var rf1 = (x: number) => { return x.toFixed() };
var rf2 = (x: Collection<number>) => { return x.length };
var rf3 = (x: A) => { return x.foo() };
var /*9*/r1a = _.map(c2, (/*1*/x) => { return x.toFixed() });
var /*10*/r1b = _.map(c2, rf1);
var /*11*/r2a = _.map(c3, (/*2*/x: Collection<number>) => { return x.length });
var /*12*/r2b = _.map(c3, rf2);
var /*13*/r3a = _.map(c4, (/*3*/x) => { return x.foo() });
var /*14*/r3b = _.map(c4, rf3);
var /*15*/r4a = _.map(c5, (/*4*/x) => { return x.foo(1) });
var /*17*/r5a = _.map<number, string>(c2, (/*5*/x) => { return x.toFixed() });
var /*18*/r5b = _.map<number, string>(c2, rf1);
var /*19*/r6a = _.map<Collection<number>, number>(/*6*/c3, (x: Collection<number>) => { return x.length });
var /*20*/r6b = _.map<Collection<number>, number>(c3, rf2);
var /*21*/r7a = _.map<A, A>(c4, (/*7*/x: A) => { return x.foo() });
var /*22*/r7b = _.map<A, A>(c4, rf3);
var /*23*/r8a = _.map</*error1*/B/*error2*/, string>(c5, (/*8*/x) => { return x.foo() });`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(parameter) x: number", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) x: Collection<number>", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) x: A", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) x: B<any>", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) x: number", "")
	f.VerifyQuickInfoAt(t, "6", "var c3: Collection<Collection<number>>", "")
	f.VerifyQuickInfoAt(t, "7", "(parameter) x: A", "")
	f.VerifyQuickInfoAt(t, "8", "(parameter) x: any", "")
	f.VerifyQuickInfoAt(t, "9", "var r1a: Collection<string>", "")
	f.VerifyQuickInfoAt(t, "10", "var r1b: Collection<string>", "")
	f.VerifyQuickInfoAt(t, "11", "var r2a: Collection<number>", "")
	f.VerifyQuickInfoAt(t, "12", "var r2b: Collection<number>", "")
	f.VerifyQuickInfoAt(t, "13", "var r3a: Collection<A>", "")
	f.VerifyQuickInfoAt(t, "14", "var r3b: Collection<A>", "")
	f.VerifyQuickInfoAt(t, "15", "var r4a: Collection<any>", "")
	f.VerifyQuickInfoAt(t, "17", "var r5a: Collection<string>", "")
	f.VerifyQuickInfoAt(t, "18", "var r5b: Collection<string>", "")
	f.VerifyQuickInfoAt(t, "19", "var r6a: Collection<number>", "")
	f.VerifyQuickInfoAt(t, "20", "var r6b: Collection<number>", "")
	f.VerifyQuickInfoAt(t, "21", "var r7a: Collection<A>", "")
	f.VerifyQuickInfoAt(t, "22", "var r7b: Collection<A>", "")
	f.VerifyQuickInfoAt(t, "23", "var r8a: Collection<string>", "")
	f.VerifyErrorExistsBetweenMarkers(t, "error1", "error2")
}
