// @filename: assignmentToVoidZero2.js
// @declaration: true
// @module: commonjs
// @outdir: auss
// @checkJs: true
// @allowJs: true
// @noImplicitAny: true
exports.j = 1;
exports.k = void 0;
var o = {}
o.x = 1
o.y = void 0
o.x + o.y

function C() {
    this.p = 1
    this.q = void 0
}
var c = new C()
c.p + c.q

// @filename: importer.js
import { j, k } from './assignmentToVoidZero2'
j + k
