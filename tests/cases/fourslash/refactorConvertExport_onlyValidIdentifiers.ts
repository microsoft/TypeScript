/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*[| |]*/ /** x */ export default 1;

// @Filename: /b.js
/////*[| |]*/ /** x */ export default (1);

// @Filename: /c.js
/////*[| |]*/ /** x */ export default x;

goTo.eachRange(r => {
    goTo.selectRange(r);
    verify.not.refactorAvailable("Convert export");
});

// goTo.selectRange(test.ranges()[0]);
// edit.applyRefactor({
//     refactorName: "Convert export",
//     actionName: "Convert default export to named export",
//     actionDescription: "Convert default export to named export",
//     newContent: { "/a.js": `...` },
// });
