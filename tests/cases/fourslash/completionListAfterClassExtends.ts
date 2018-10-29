/// <reference path='fourslash.ts'/>

////module Bar {
////    export class Bleah {
////    }
////    export class Foo extends /**/Bleah {
////    }
////}
////
////function Blah(x: Bar.Bleah) {
////}

verify.completions({ marker: "", includes: ["Bar", "Bleah", "Foo"] });
