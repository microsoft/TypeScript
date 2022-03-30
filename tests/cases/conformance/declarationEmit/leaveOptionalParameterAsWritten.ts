// @module: esnext
// @outDir: dist
// @declaration: true
// @emitDeclarationOnly: true
// @strictNullChecks: true

// @Filename: a.ts
export interface Foo {}

// @Filename: b.ts
import * as a from "./a";
declare global {
  namespace teams {
    export namespace calling {
      export import Foo = a.Foo;
    }
  }
}

// @Filename: c.ts
type Foo = teams.calling.Foo;
export const bar = (p?: Foo) => {}