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

verify.rangesAreOccurrences(false);

goTo.marker("1");
verify.occurrencesAtPositionCount(0);

goTo.marker("2");
verify.occurrencesAtPositionCount(2);
