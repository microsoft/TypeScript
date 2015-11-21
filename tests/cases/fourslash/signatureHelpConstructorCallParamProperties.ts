/// <reference path='fourslash.ts' />

////class Circle {
////    /**
////      * Initialize a circle.
////      * @param  radius The radius of the circle.
////      */
////    constructor(private radius: number) {
////    }
////}
////var a = new Circle(/**/

goTo.marker('');
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("Circle(radius: number): Circle");
verify.currentParameterHelpArgumentNameIs("radius");
verify.currentParameterSpanIs("radius: number");
verify.currentParameterHelpArgumentDocCommentIs("The radius of the circle.");