//// [tests/cases/compiler/checkMergedGlobalUMDSymbol.ts] ////

//// [three.d.ts]
export namespace THREE {
  export class Vector2 {}
}

//// [global.d.ts]
import * as _three from './three';

export as namespace THREE;

declare global {
  export const THREE: typeof _three;
}

//// [test.ts]
const m = THREE


//// [test.js]
var m = THREE;
