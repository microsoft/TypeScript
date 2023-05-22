// @moduleResolution: node10
// @module: commonjs

// @Filename: /node_modules/some-lib/package.json
{
  "name": "some-lib",
  "types": "./types/index.d.ts"
}

// @Filename: /node_modules/some-lib/types/index.d.ts
declare module 'some-lib' {
  export class Cls { constructor(arg: number); }
  export default Cls;

  namespace Cls {
    export function defaults(arg: number): void;
  }
}

// @Filename: /main.ts
import Cls from "some-lib";
new Cls(10);
