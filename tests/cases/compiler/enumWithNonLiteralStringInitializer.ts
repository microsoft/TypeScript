// @isolatedModules: true
// @noTypesAndSymbols: true

// @filename: ./helpers.ts
export const foo = 2;
export const bar = "bar";

// @filename: ./bad.ts
import { bar } from "./helpers";
enum A {
   a = bar,
}

// @filename: ./good.ts
import { foo } from "./helpers";
enum A {
   a = `${foo}`,
   b = "" + 2,
   c = 2 + "",
   d = ("foo"),
}
