// @Filename: enum.ts
export const enum Enum {
  One = 1,
}

// @Filename: merge.ts
import { Enum } from "./enum";
namespace Enum {
  export type Foo = number;
}
export { Enum };

// @Filename: index.ts
import { Enum } from "./merge";
Enum.One;
