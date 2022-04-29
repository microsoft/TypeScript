// @Filename: three.d.ts
export namespace THREE {
  export class Vector2 {}
}

// @Filename: global.d.ts
import * as _three from './three';

export as namespace THREE;

declare global {
  export const THREE: typeof _three;
}

// @Filename: test.ts
const m = THREE
