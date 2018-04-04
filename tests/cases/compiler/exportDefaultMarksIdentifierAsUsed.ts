// @target: es2017
// @module: commonjs
// @strict: true
// @allowJs: true
// @outDir: /dist
// @filename: a.js
const Obj = {};
export default Obj;
// @filename: b.js
import Obj from './a';

Obj.fn = function() {};