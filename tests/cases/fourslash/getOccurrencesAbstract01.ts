/// <reference path='fourslash.ts' />

////[|abstract|] class Animal {
////    [|abstract|] prop1; // Does not compile
////    [|abstract|] abstract();
////    [|abstract|] walk(): void;
////    [|abstract|] makeSound(): void;
////}
////// Abstract class below should not get highlighted
////abstract class Foo {
////    abstract foo(): void;
////    abstract bar(): void;
////}

verify.baselineDocumentHighlights();