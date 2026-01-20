namespace Z {
    export namespace M {
        export function bar() {
            return "";
        }
    }
    export interface I { }
}
namespace A.M {
    import M = Z.M;
    import M = Z.I;

    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}