// @target: esnext
class T {
    field = () => {}
}
class T2 extends T {
    f() {
        super.field() // error
    }
}

new T2().f()
