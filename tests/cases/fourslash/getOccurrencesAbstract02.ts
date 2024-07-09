/// <reference path='fourslash.ts' />

////// Not valid TS (abstract methods can only appear in abstract classes)
////class Animal {
////    [|abstract|] walk(): void;
////    [|abstract|] makeSound(): void;
////}
////// abstract cannot appear here, won't get highlighted
////let c = /*1*/abstract class Foo {
////    /*2*/abstract foo(): void;
////    abstract bar(): void;
////}

verify.baselineDocumentHighlights(["1", "2"]);
verify.baselineDocumentHighlights();
