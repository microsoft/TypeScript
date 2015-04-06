/// <reference path='fourslash.ts'/>

////module Bar {
////    export class Bleah {
////    }
////    export class Foo extends Bleah {
////    }
////}
////
////function Blah(x: /**/Bar.Bleah) {
////}

goTo.marker();
verify.completionListContains("Bar");