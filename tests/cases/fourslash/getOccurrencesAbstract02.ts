/// <reference path='fourslash.ts' />

////// Not valid TS (abstract methods can only appear in abstract classes)
////class Animal {
////    [|abstract|] walk(): void;
////    [|abstract|] makeSound(): void;
////}
////// abstract cannot appear here, won't get highlighted
////let c = [|abstract|] class Foo {
////    [|abstract|] foo(): void;
////    abstract bar(): void;
////}

goTo.eachRange(() => verify.occurrencesAtPositionCount(0));
