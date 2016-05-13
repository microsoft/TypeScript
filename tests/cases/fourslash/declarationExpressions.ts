/// <reference path="fourslash.ts"/>

////class A {}
////const B = class C {
////    public x;
////};
////function D() {}
////const E = function F() {}

// Search for properties defined in the constructor, but not other constructor paramters
var searchValue = "search";
verify.navigationItemsListContains("A", "class", "A", "exact");
verify.navigationItemsListContains("B", "const", "B", "exact");
verify.navigationItemsListContains("C", "class", "C", "exact");
verify.navigationItemsListContains("x", "property", "x", "exact");

verify.navigationItemsListContains("D", "function", "D", "exact");
verify.navigationItemsListContains("E", "const", "E", "exact");
verify.navigationItemsListContains("F", "function", "F", "exact")
