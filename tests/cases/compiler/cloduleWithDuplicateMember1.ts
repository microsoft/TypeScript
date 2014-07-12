class C {
    get x() { return 1; }
    static get x() {
        return '';
    }
    static foo() { }
}

module C {
    export var x = 1;
}
module C {
    export function foo() { }
    export function x() { }
}