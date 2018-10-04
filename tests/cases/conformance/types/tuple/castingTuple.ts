interface I { }
class A { a = 10; }
class C implements I { c };
class D implements I { d };
class E extends A { e };
class F extends A { f };
enum E1 { one }
enum E2 { one }

// no error
var numStrTuple: [number, string] = [5, "foo"];
var emptyObjTuple = <[{}, {}]>numStrTuple;
var numStrBoolTuple = <[number, string, boolean]>numStrTuple;
var shorter = numStrBoolTuple as [number, string]
var longer = numStrTuple as [number, string, boolean]
var classCDTuple: [C, D] = [new C(), new D()];
var interfaceIITuple = <[I, I]>classCDTuple;
var classCDATuple = <[C, D, A]>classCDTuple;
var eleFromCDA1 = classCDATuple[2]; // A
var eleFromCDA2 = classCDATuple[5]; // C | D | A
var t10: [E1, E2] = [E1.one, E2.one];
var t11 = <[number, number]>t10;
var array1 = <{}[]>emptyObjTuple;
var unionTuple: [C, string | number] = [new C(), "foo"];
var unionTuple2: [C, string | number, D] = [new C(), "foo", new D()];
var unionTuple3: [number, string| number] = [10, "foo"]; 
var unionTuple4 = <[number, number]>unionTuple3; 

// error
var t3 = <[number, number]>numStrTuple;
var t9 = <[A, I]>classCDTuple;
var array1 = <number[]>numStrTuple;
t4[2] = 10;
