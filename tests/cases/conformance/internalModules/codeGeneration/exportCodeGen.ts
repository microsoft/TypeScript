
// should replace all refs to 'x' in the body,
// with fully qualified
module A {
    export var x = 12;
    function lt12() {
        return x < 12;
    }
} 

// should not fully qualify 'x'
module B {
    var x = 12;
    function lt12() {
        return x < 12;
    }
}

// not copied, since not exported
module C {
    function no() {
        return false;
    }
}

// copies, since exported
module D {
    export function yes() {
        return true;
    }
}

// validate all exportable statements
module E {
    export enum Color { Red }
    export function fn() { }
    export interface I { id: number }
    export class C { name: string }
    export module M {
        export var x = 42;
    }
}

// validate all exportable statements,
// which are not exported
module F {
    enum Color { Red }
    function fn() { }
    interface I { id: number }
    class C { name: string }
    module M {
        var x = 42;
    }
}