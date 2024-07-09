// @noUnusedLocals: true
// @strict: true
// @target: esnext

class C1 {
    private a = "a"; // ok
    private b = "b"; // ok

    private c = "c"; // error unused prop
    private d = "d"; // error unused prop

    getValue(key: "a" | "b") {
        return this[key];
    }
}
