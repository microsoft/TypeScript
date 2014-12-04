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
