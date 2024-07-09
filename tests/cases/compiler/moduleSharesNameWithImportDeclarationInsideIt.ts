module Z.M {
    export function bar() {
        return "";
    }
}
module A.M {
    import M = Z.M;
    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}