/// <reference path="fourslash.ts"/>

//// Infinity;
//// NaN;
////
////// Regular properties
////
////const obj1 = {
////    Infinity: 100,
////    NaN: 200,
////    "-Infinity": 300
////};
////
////obj1.Infinity;
////obj1.NaN;
////obj1["-Infinity"];
////
////// Shorthand properties
////
////const obj2 = {
////    Infinity,
////    NaN,
////}
////
////obj2.Infinity;
////obj2.NaN;

// Basically only the obj1 and obj2 should be showing up in this list

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration.readonly", "obj1"), 
    c2.semanticToken("variable.readonly", "obj1"), 
    c2.semanticToken("variable.readonly", "obj1"), 
    c2.semanticToken("variable.readonly", "obj1"), 
    c2.semanticToken("variable.declaration.readonly", "obj2"), 
    c2.semanticToken("variable.readonly", "obj2"), 
    c2.semanticToken("variable.readonly", "obj2"), 
);