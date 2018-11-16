/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////module.exports = function() {}
////module.exports = function f() {}
////module.exports = class {}
////module.exports = class C {}
////module.exports = 0;

// See also `refactorConvertToEs6Module_export_moduleDotExportsEqualsRequire.ts`

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export default function() {}
export default function f() {}
export default class {}
export default class C {}
export default 0;`,
});
