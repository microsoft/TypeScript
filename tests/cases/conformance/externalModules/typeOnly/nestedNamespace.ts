// @Filename: a.ts
export namespace types {
  export class A {}
}

// @Filename: b.ts
import type * as a from './a';
interface B extends a.types.A {}
