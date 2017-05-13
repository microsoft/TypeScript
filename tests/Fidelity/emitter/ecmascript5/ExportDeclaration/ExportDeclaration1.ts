module M1 {
    var v1, v2;
    export var v3, v4;
    class C1 {
    }
    export class C2 {
    }
    function f1() {
    }
    export function f2() {
    }
    module M2 {
    }
    export module M3 {
    }
}

module M1.M2.M3 {
    var v1, v2;
    export var v3, v4;
    class C1 {
    }
    export class C2 {
    }
    function f1() {
    }
    export function f2() {
    }
    module M4 {
    }
    export module M5 {
    }
}