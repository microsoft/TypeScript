// #34802
// @Filename: jsdocTypeReferenceToImport.js
// @noEmit: true
// @allowJs: true
// @checkJs: true

const C = require('./ex').C;
const D = require('./ex')?.C;
/** @type {C} c */
var c = new C()
c.start
c.end

/** @type {D} c */
var d = new D()
d.start
d.end

// @Filename: ex.d.ts
export class C {
    start: number
    end: number
}
