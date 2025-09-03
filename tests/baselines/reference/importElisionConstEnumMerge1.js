//// [tests/cases/conformance/constEnums/importElisionConstEnumMerge1.ts] ////

//// [enum.ts]
export const enum Enum {
  One = 1,
}

//// [merge.ts]
import { Enum } from "./enum";
namespace Enum {
  export type Foo = number;
}
export { Enum };

//// [index.ts]
import { Enum } from "./merge";
Enum.One;


//// [enum.js]
export {};
//// [merge.js]
export { Enum };
//// [index.js]
import { Enum } from "./merge";
1 /* Enum.One */;
