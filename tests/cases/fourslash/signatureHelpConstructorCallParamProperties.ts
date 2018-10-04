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

verify.signatureHelp({
    marker: "",
    text: "Circle(radius: number): Circle",
    parameterName: "radius",
    parameterSpan: "radius: number",
    docComment: "Initialize a circle.",
    parameterDocComment: "The radius of the circle.",
    tags: [{ name: "param", text: "radius The radius of the circle." }],
});
