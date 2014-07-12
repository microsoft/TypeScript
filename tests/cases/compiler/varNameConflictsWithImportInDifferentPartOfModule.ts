module M1 {
    export var q = 5;
    export var s = '';
}
module M1 {
    export import q = M1.s; // Should be an error but isn't
}