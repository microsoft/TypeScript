// https://github.com/Microsoft/TypeScript/issues/8612
// @declaration: true
// @filename: ThingA.ts
export class ThingA { } 

// @filename: ThingB.ts
export class ThingB { }

// @filename: Things.ts
export {ThingA} from "./ThingA";
export {ThingB} from "./ThingB";

// @filename: Test.ts
import * as things from "./Things";

export class Test {
    public method = (input: things.ThingA)  => { };
}