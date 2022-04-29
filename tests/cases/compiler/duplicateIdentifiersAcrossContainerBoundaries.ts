module M {
    export interface I { }
}
module M {
    export class I { }
}

module M {
    export function f() { }
}
module M {
    export class f { } // error
}

module M {
    function g() { }
}
module M {
    export class g { } // no error
}

module M {
    export class C { }
}
module M {
    function C() { } // no error
}

module M {
    export var v = 3;
}
module M {
    export var v = 3; // error for redeclaring var in a different parent
}

class Foo {
    static x: number;
}

module Foo {
    export var x: number; // error for redeclaring var in a different parent
}

module N {
    export module F {
        var t;
    }
}
declare module N {
    export function F(); // no error because function is ambient
}
