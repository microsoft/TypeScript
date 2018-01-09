/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*a*/module/*b*/.exports = function() {}
////module.exports = function f() {}
////module.exports = class {}
////module.exports = class C {}
////module.exports = 0;

// See also `refactorConvertToEs6Module_export_moduleDotExportsEqualsRequire.ts`

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `export default function() { }
export default function f() { }
export default class {
}
export default class C {
}
export default 0;`
});
