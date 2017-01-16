/// <reference path="fourslash.ts"/>

////class A {}
////const B = class C {
////    public x;
////};
////function D() {}
////const E = function F() {}
////console.log(function() {}, class {}); // Expression with no name should have no effect.
////console.log(function inner() {});
////String(function fun() { class cls { public prop; } }));

function navExact(name: string, kind: string) {
	verify.navigationItemsListContains(name, kind, name, "exact");
}

navExact("A", "class");
navExact("B", "const");
navExact("C", "class");
navExact("x", "property");

navExact("D", "function");
navExact("E", "const");
navExact("F", "function")

navExact("inner", "function");

navExact("fun", "function");
navExact("cls", "class");
navExact("prop", "property");
