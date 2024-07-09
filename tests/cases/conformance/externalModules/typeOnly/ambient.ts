// @Filename: /a.ts
export class A { a!: string }

// @Filename: /b.ts
import type { A } from './a';
declare class B extends A {}
declare namespace ns {
  class C extends A {}
}
