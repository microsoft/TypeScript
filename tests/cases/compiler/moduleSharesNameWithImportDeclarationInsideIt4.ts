namespace Z.M {
    export function bar() {
        return "";
    }
}
namespace A.M {
    interface M { }
    import M = Z.M;
    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}