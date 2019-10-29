// #34802
// @Filename: jsdocTypeReferenceToImport.js
// @noEmit: true
// @allowJs: true
// @checkJs: true

const C = require('./ex').C;
/** @type {C} c */
var c = new C()
c.start
c.end

// @Filename: ex.d.ts
export class C {
    start: number
    end: number
}
