//// [tests/cases/compiler/unusedTypeParameters3.ts] ////

//// [unusedTypeParameters3.ts]
class greeter<typeparameter1, typeparameter2, typeparameter3> {
    private x: typeparameter2;

    public function1() {
        this.x;
    }
}

//// [unusedTypeParameters3.js]
class greeter {
    x;
    function1() {
        this.x;
    }
}
