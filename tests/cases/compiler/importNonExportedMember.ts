// @filename: a.ts
declare function foo(): any
declare function bar(): any;
export { foo, bar as baz };

// @filename: b.ts
import { foo, bar } from "./a";
