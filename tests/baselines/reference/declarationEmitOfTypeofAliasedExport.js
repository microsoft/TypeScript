//// [tests/cases/compiler/declarationEmitOfTypeofAliasedExport.ts] ////

//// [a.ts]
class C {}
export { C as D }

//// [b.ts]
import * as a from "./a";
export default a.D;


//// [a.js]
class C {
}
export { C as D };
//// [b.js]
import * as a from "./a";
export default a.D;


//// [a.d.ts]
declare class C {
}
export { C as D };
//// [b.d.ts]
import * as a from "./a";
declare const _default: typeof a.D;
export default _default;
