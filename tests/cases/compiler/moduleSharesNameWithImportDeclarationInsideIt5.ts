module Z {
    export module M {
        export function bar() {
            return "";
        }
    }
    export interface I { }
}
module A.M {
    import M = Z.I;
    import M = Z.M;

    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}