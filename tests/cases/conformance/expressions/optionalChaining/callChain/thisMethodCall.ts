// @strict: true
// @target: es6
class C {
    method?() {}
    other() {
        this.method?.();
    }
}