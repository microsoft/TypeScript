class C {
    set x(y) { }
    static set y(z) { }
}

module C {
    export var x = 1;
}
module C {
    export function x() { }
}