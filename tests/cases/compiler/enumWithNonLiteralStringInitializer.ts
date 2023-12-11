// @isolatedModules: true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: ./helpers.ts
export const foo = 2;

// @filename: ./bad.ts
import { foo } from "./helpers";
enum A {
   a = `${foo}`
}

// @filename: ./good.ts
enum A {
   a = `${"foo"}`,
   b = "" + 2,
   c = 2 + "",
   d = ("foo"),
}
