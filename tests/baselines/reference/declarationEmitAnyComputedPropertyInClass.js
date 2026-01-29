//// [tests/cases/compiler/declarationEmitAnyComputedPropertyInClass.ts] ////

//// [ambient.d.ts]
declare module "abcdefgh";

//// [main.ts]
import Test from "abcdefgh";

export class C {
    [Test.someKey]() {};
}


//// [main.js]
import Test from "abcdefgh";
export class C {
    [Test.someKey]() { }
    ;
}


//// [main.d.ts]
import Test from "abcdefgh";
export declare class C {
    [Test.someKey]: () => void;
}
