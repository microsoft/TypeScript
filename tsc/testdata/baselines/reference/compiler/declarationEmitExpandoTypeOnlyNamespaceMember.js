//// [tests/cases/compiler/declarationEmitExpandoTypeOnlyNamespaceMember.ts] ////

//// [declarationEmitExpandoTypeOnlyNamespaceMember.ts]
export class C {}
export function f1() {}
f1.a = C;
f1.b = C;
export namespace f1 { export type a = 0; }

export enum E { A }
export function f2() {}
f2.a = E;
export namespace f2 { export interface a { x: string } }

export function g() {}
export function f3() {}
f3.a = g;
export namespace f3 { export namespace a { export type T = string; } }

export function Target() { return null; }
export namespace Target { export type Props = number; }

export function Popover() { return null; }
Popover.Target = Target;
export namespace Popover {
  export namespace Target {
    export type Extra = string;
  }
}


//// [declarationEmitExpandoTypeOnlyNamespaceMember.js]
export class C {
}
export function f1() { }
f1.a = C;
f1.b = C;
export var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
export function f2() { }
f2.a = E;
export function g() { }
export function f3() { }
f3.a = g;
export function Target() { return null; }
export function Popover() { return null; }
Popover.Target = Target;


//// [declarationEmitExpandoTypeOnlyNamespaceMember.d.ts]
export declare class C {
}
export declare function f1(): void;
export declare namespace f1 {
    export { C as a };
    export { C as b };
}
export declare namespace f1 {
    type a = 0;
}
export declare enum E {
    A = 0
}
export declare function f2(): void;
export declare namespace f2 {
    export { E as a };
}
export declare namespace f2 {
    interface a {
        x: string;
    }
}
export declare function g(): void;
export declare function f3(): void;
export declare namespace f3 {
    export { g as a };
}
export declare namespace f3 {
    namespace a {
        type T = string;
    }
}
export declare function Target(): null;
export declare namespace Target {
    type Props = number;
}
export declare function Popover(): null;
export declare namespace Popover {
    export { Target };
}
export declare namespace Popover {
    namespace Target {
        type Extra = string;
    }
}


//// [DtsFileErrors]


declarationEmitExpandoTypeOnlyNamespaceMember.d.ts(5,14): error TS2484: Export declaration conflicts with exported declaration of 'a'.
declarationEmitExpandoTypeOnlyNamespaceMember.d.ts(16,14): error TS2484: Export declaration conflicts with exported declaration of 'a'.
declarationEmitExpandoTypeOnlyNamespaceMember.d.ts(39,14): error TS2484: Export declaration conflicts with exported declaration of 'Target'.


==== declarationEmitExpandoTypeOnlyNamespaceMember.d.ts (3 errors) ====
    export declare class C {
    }
    export declare function f1(): void;
    export declare namespace f1 {
        export { C as a };
                 ~~~~~~
!!! error TS2484: Export declaration conflicts with exported declaration of 'a'.
        export { C as b };
    }
    export declare namespace f1 {
        type a = 0;
    }
    export declare enum E {
        A = 0
    }
    export declare function f2(): void;
    export declare namespace f2 {
        export { E as a };
                 ~~~~~~
!!! error TS2484: Export declaration conflicts with exported declaration of 'a'.
    }
    export declare namespace f2 {
        interface a {
            x: string;
        }
    }
    export declare function g(): void;
    export declare function f3(): void;
    export declare namespace f3 {
        export { g as a };
    }
    export declare namespace f3 {
        namespace a {
            type T = string;
        }
    }
    export declare function Target(): null;
    export declare namespace Target {
        type Props = number;
    }
    export declare function Popover(): null;
    export declare namespace Popover {
        export { Target };
                 ~~~~~~
!!! error TS2484: Export declaration conflicts with exported declaration of 'Target'.
    }
    export declare namespace Popover {
        namespace Target {
            type Extra = string;
        }
    }
    