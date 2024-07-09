// @module: nodenext
// @moduleResolution: nodenext
// @outDir: ./out
// @declaration: true
// @filename: src/a.cts
export const a: number = 1;
// @filename: src/foo.mts
import d, {a} from './a.cjs';
import * as ns from './a.cjs';
export {d, a, ns};

d.a;
ns.default.a;