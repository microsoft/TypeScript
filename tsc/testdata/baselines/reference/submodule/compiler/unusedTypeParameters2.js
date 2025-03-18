//// [tests/cases/compiler/unusedTypeParameters2.ts] ////

//// [unusedTypeParameters2.ts]
class greeter<typeparameter1, typeparameter2> {
    private x: typeparameter2;

    public function1() {
        this.x;
    }
}

//// [unusedTypeParameters2.js]
class greeter {
    x;
    function1() {
        this.x;
    }
}
