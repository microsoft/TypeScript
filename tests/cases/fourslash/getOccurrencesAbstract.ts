/// <reference path='fourslash.ts' />

////[|abstract|] class Animal {
////    [|abstract|] walk(): void;
////    [|abstract|] makeSound(): void;
////}
////// Abstract class below should not get highlighted
////abstract class Foo {
////    abstract foo(): void;
////    abstract bar(): void;
////}

test.ranges().forEach(r => {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(test.ranges().length);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
});
