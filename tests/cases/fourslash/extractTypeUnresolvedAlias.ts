/// <reference path="fourslash.ts" />

//// import {Renderer} from '';
//// 
//// export class X {
////   constructor(renderer: /**/[|Renderer|]) {}
//// }

goTo.selectRange(test.ranges()[0]);
verify.refactorAvailable("Extract type", "Extract to type alias");