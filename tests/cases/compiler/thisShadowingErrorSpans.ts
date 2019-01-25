// @strict: true
class C {
    m() {
        this.m();
        function f() {
            this.m();
        }
    }
}
