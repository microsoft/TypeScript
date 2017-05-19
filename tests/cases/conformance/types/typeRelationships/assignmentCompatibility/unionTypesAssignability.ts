var unionNumberString: number | string;
class C { }
class D extends C { foo1() { } }
class E extends C { foo2() { } }
var unionDE: D | E;

var num: number;
var str: string;
var c: C;
var d: D;
var e: E;

// A union type U is assignable to a type T if each type in U is assignable to T
c = d;
c = e;
c = unionDE; // ok
d = d;
d = e;
d = unionDE; // error e is not assignable to d
e = d;
e = e;
e = unionDE; // error d is not assignable to e
num = num;
num = str;
num = unionNumberString; // error string is not assignable to number
str = num;
str = str;
str = unionNumberString; // error since number is not assignable to string

// A type T is assignable to a union type U if T is assignable to any type in U
d = c;
e = c;
unionDE = c; // error since C is not assinable to either D or E
d = d;
e = d;
unionDE = d; // ok
d = e;
e = e;
unionDE = e; // ok
num = num;
str = num;
unionNumberString = num; // ok 
num = str;
str = str;
unionNumberString = str; // ok

// Any
var anyVar: any;
anyVar = unionDE;
anyVar = unionNumberString;
unionDE = anyVar;
unionNumberString = anyVar;

// null
unionDE = null;
unionNumberString = null;

// undefined
unionDE = undefined;
unionNumberString = undefined;

// type parameters
function foo<T, U>(t: T, u: U) {
    t = u; // error
    u = t; // error
    var x : T | U;
    x = t; // ok
    x = u; // ok
    x = undefined;
    t = x; // error U not assignable to T
    u = x; // error T not assignable to U
}
