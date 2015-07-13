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

const ranges = test.ranges();

for(let r of ranges) {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(ranges.length);

    for(let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}
