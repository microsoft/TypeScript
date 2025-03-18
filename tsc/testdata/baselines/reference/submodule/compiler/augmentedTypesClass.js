//// [tests/cases/compiler/augmentedTypesClass.ts] ////

//// [augmentedTypesClass.ts]
//// class then var
class c1 { public foo() { } }
var c1 = 1; // error

//// class then enum
class c4 { public foo() { } }
enum c4 { One } // error

//// [augmentedTypesClass.js]
class c1 {
    foo() { }
}
var c1 = 1;
class c4 {
    foo() { }
}
(function (c4) {
    c4[c4["One"] = 0] = "One";
})(c4 || (c4 = {}));
