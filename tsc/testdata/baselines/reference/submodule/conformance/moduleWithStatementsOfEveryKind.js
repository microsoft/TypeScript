//// [tests/cases/conformance/internalModules/moduleBody/moduleWithStatementsOfEveryKind.ts] ////

//// [moduleWithStatementsOfEveryKind.ts]
module A {
    class A { s: string }
    class AA<T> { s: T }
    interface I { id: number }

    class B extends AA<string> implements I { id: number }
    class BB<T> extends A {
        id: number;
    }

    module Module {
        class A { s: string }
    }
    enum Color { Blue, Red }
    var x = 12;
    function F(s: string): number {
        return 2;
    }
    var array: I[] = null;
    var fn = (s: string) => {
        return 'hello ' + s;
    }
    var ol = { s: 'hello', id: 2, isvalid: true };

    declare class DC {
        static x: number;
    }
}

module Y {
    export class A { s: string }
    export class AA<T> { s: T }
    export interface I { id: number }

    export class B extends AA<string> implements I { id: number }
    export class BB<T> extends A {
        id: number;
    }

    export module Module {
        class A { s: string }
    }
    export enum Color { Blue, Red }
    export var x = 12;
    export function F(s: string): number {
        return 2;
    }
    export var array: I[] = null;
    export var fn = (s: string) => {
        return 'hello ' + s;
    }
    export var ol = { s: 'hello', id: 2, isvalid: true };

    export declare class DC {
        static x: number;
    }
}


//// [moduleWithStatementsOfEveryKind.js]
var A;
(function (A_1) {
    class A {
        s;
    }
    class AA {
        s;
    }
    class B extends AA {
        id;
    }
    class BB extends A {
        id;
    }
    let Module;
    (function (Module) {
        class A {
            s;
        }
    })(Module || (Module = {}));
    let Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color || (Color = {}));
    var x = 12;
    function F(s) {
        return 2;
    }
    var array = null;
    var fn = (s) => {
        return 'hello ' + s;
    };
    var ol = { s: 'hello', id: 2, isvalid: true };
})(A || (A = {}));
var Y;
(function (Y) {
    class A {
        s;
    }
    Y.A = A;
    class AA {
        s;
    }
    Y.AA = AA;
    class B extends AA {
        id;
    }
    Y.B = B;
    class BB extends A {
        id;
    }
    Y.BB = BB;
    let Module;
    (function (Module) {
        class A {
            s;
        }
    })(Module = Y.Module || (Y.Module = {}));
    let Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color = Y.Color || (Y.Color = {}));
    Y.x = 12;
    function F(s) {
        return 2;
    }
    Y.F = F;
    Y.array = null;
    Y.fn = (s) => {
        return 'hello ' + s;
    };
    Y.ol = { s: 'hello', id: 2, isvalid: true };
})(Y || (Y = {}));
