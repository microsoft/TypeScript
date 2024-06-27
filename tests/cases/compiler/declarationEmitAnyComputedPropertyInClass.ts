// @declaration: true
// @declaration

// @filename: ambient.d.ts
declare module "abcdefgh";

// @filename: main.ts
import Test from "abcdefgh";

export class C {
    [Test.someKey]() {};
}
