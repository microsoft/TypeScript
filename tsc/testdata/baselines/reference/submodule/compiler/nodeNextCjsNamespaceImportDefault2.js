//// [tests/cases/compiler/nodeNextCjsNamespaceImportDefault2.ts] ////

//// [a.cts]
export const a: number = 1;
export default 'string';
//// [foo.mts]
import d, {a} from './a.cjs';
import * as ns from './a.cjs';
export {d, a, ns};

d.a;
ns.default.a;

//// [a.cjs]
export const a = 1;
export default 'string';
//// [foo.mjs]
import d, { a } from './a.cjs';
import * as ns from './a.cjs';
export { d, a, ns };
d.a;
ns.default.a;
