//// [tests/cases/compiler/isolatedDeclarationsNonIdentifierAssignmentInference.ts] ////

//// [isolatedDeclarationsNonIdentifierAssignmentInference.ts]
declare function foo(): number;
declare function bar(): { x: number };
class Base { get y(): number { return 0; } set y(v: number) {} }
export class C extends Base {
    z = 0;
    a = { p: (this.z = foo()) };
    b = { p: (super.y = foo()) };
    c = { p: (bar().x = foo()) };
}
export const d = { p: (bar().x = foo()) };




//// [isolatedDeclarationsNonIdentifierAssignmentInference.d.ts]
declare class Base {
    get y(): number;
    set y(v: number);
}
export declare class C extends Base {
    z: number;
    a: {
        p: number;
    };
    b: {
        p: number;
    };
    c: {
        p: number;
    };
}
export declare const d: {
    p: number;
};
export {};
