/// <reference path='fourslash.ts'/>

//// const x = [
////     {
////         x: "bar",
////         y: { a: 1, b: 2 },
////         z: [ { /*zx*/x: "bar" } ],
////     },
////     {
////         x: "foo",
////         y: [ { /*yx*/x: "bar" } ],
////     }
//// ];

//// const el = x[0];
//// if (Array.isArray(el.y)) {
////     el.y[0]./*dotx*/x;
//// }

verify.goToDefinition({
    dotx: "yx",
});
