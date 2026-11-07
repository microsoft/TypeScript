// @module: commonjs, esnext
// @target: es2015
// @strict: true
// @skipLibCheck: true
// @noTypesAndSymbols: true

// @filename: a.d.ts
import type Foo from "./missing";
export { Foo };

// @filename: main.ts
import { Foo } from "./a";
const x = Foo;
