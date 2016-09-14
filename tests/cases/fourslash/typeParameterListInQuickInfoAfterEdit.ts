/// <reference path="fourslash.ts" />

//// class Dictionary<V> {
//// }
//// 
//// module Maps {
////    class C1 extends D/*1*/ictionary<string> { }
////    /*2*/
//// }
//// 

// Sanity check: type name here should include the type parameter
verify.quickInfoAt("1", "class Dictionary<V>");

// Add a similar class -- name does not match
goTo.marker('2');
edit.insert("class C2 extends Dictionary<string> { }");
edit.moveLeft('ictionary<string> { }'.length);
verify.quickInfoIs('class Dictionary<V>');
