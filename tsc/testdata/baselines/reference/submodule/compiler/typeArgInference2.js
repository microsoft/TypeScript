//// [tests/cases/compiler/typeArgInference2.ts] ////

//// [typeArgInference2.ts]
interface Item {
    name: string;
}

declare function foo<T extends Item>(x?: T, y?: T): T;

var z1 = foo(null);                   // any
var z2 = foo();                       // Item
var z3 = foo({ name: null });         // { name: any }
var z4 = foo({ name: "abc" });        // { name: string }
var z5 = foo({ name: "abc", a: 5 });  // { name: string; a: number }
var z6 = foo({ name: "abc", a: 5 }, { name: "def", b: 5 });  // error

//// [typeArgInference2.js]
var z1 = foo(null); // any
var z2 = foo(); // Item
var z3 = foo({ name: null }); // { name: any }
var z4 = foo({ name: "abc" }); // { name: string }
var z5 = foo({ name: "abc", a: 5 }); // { name: string; a: number }
var z6 = foo({ name: "abc", a: 5 }, { name: "def", b: 5 }); // error
