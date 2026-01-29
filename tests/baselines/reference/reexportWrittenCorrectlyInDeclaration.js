//// [tests/cases/compiler/reexportWrittenCorrectlyInDeclaration.ts] ////

//// [ThingA.ts]
export class ThingA { } 

//// [ThingB.ts]
export class ThingB { }

//// [Things.ts]
export {ThingA} from "./ThingA";
export {ThingB} from "./ThingB";

//// [Test.ts]
import * as things from "./Things";

export class Test {
    public method = (input: things.ThingA)  => { };
}

//// [ThingA.js]
export class ThingA {
}
//// [ThingB.js]
export class ThingB {
}
//// [Things.js]
export { ThingA } from "./ThingA";
export { ThingB } from "./ThingB";
//// [Test.js]
export class Test {
    constructor() {
        this.method = (input) => { };
    }
}


//// [ThingA.d.ts]
export declare class ThingA {
}
//// [ThingB.d.ts]
export declare class ThingB {
}
//// [Things.d.ts]
export { ThingA } from "./ThingA";
export { ThingB } from "./ThingB";
//// [Test.d.ts]
import * as things from "./Things";
export declare class Test {
    method: (input: things.ThingA) => void;
}
