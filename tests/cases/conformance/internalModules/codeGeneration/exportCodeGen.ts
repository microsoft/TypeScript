
// should replace all refs to 'x' in the body,
// with fully qualified
namespace A {
    export var x = 12;
    function lt12() {
        return x < 12;
    }
} 

// should not fully qualify 'x'
namespace B {
    var x = 12;
    function lt12() {
        return x < 12;
    }
}

// not copied, since not exported
namespace C {
    function no() {
        return false;
    }
}

// copies, since exported
namespace D {
    export function yes() {
        return true;
    }
}

// validate all exportable statements
namespace E {
    export enum Color { Red }
    export function fn() { }
    export interface I { id: number }
    export class C { name: string }
    export namespace M {
        export var x = 42;
    }
}

// validate all exportable statements,
// which are not exported
namespace F {
    enum Color { Red }
    function fn() { }
    interface I { id: number }
    class C { name: string }
    namespace M {
        var x = 42;
    }
}