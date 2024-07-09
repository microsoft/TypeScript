// @isolatedModules: true

// @filename: enum.ts
export const enum Foo { Bar }

// @filename: index.ts
import { Foo } from "./enum";
function f(foo: Foo) { return; }
