/// <reference path="fourslash.ts" />
// @lib: esnext,dom
// @strict: true

////function func<T, D>(param: ProblematicType<T, D>) {}
////type ProblematicType<T, D> = {
////  prop: ProblematicType<T[keyof T], any>;
////};
////class TestRefactoring<T> {
////  createElement() {
////    [|document.createElement('span');|]
////  }
////}

goTo.selectRange(test.ranges()[0]);
verify.not.refactorAvailable("Extract function");