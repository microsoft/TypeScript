/// <reference path='fourslash.ts' />

////// Not valid TS (abstract methods can only appear in abstract classes)
////class Animal {
////    [|abstract|] walk(): void;
////    [|abstract|] makeSound(): void;
////}
////// abstract can appear on class expressions
////let c = /*1*/abstract class Foo {
////    /*2*/abstract foo(): void;
////    abstract bar(): void;
////}

verify.rangesAreOccurrences(false);

goTo.marker("1");
verify.occurrencesAtPositionCount(3);

goTo.marker("2");
verify.occurrencesAtPositionCount(3);
