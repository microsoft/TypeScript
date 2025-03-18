//// [tests/cases/compiler/nodeNextCjsNamespaceImportDefault1.ts] ////

//// [a.cts]
export const a: number = 1;
//// [foo.mts]
import d, {a} from './a.cjs';
import * as ns from './a.cjs';
export {d, a, ns};

d.a;
ns.default.a;

//// [a.cjs]
export const a = 1;
//// [foo.mjs]
import d, { a } from './a.cjs';
import * as ns from './a.cjs';
export { d, a, ns };
d.a;
ns.default.a;
