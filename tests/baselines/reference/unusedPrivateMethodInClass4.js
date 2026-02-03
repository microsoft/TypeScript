//// [tests/cases/compiler/unusedPrivateMethodInClass4.ts] ////

//// [unusedPrivateMethodInClass4.ts]
class greeter {
    private function1() {
        var y = 10;
    }

    private function2() {
        var y = 10;
    }

    public function3() {
        var y = 10;
        this.function2();
    }
}

//// [unusedPrivateMethodInClass4.js]
class greeter {
    function1() {
        var y = 10;
    }
    function2() {
        var y = 10;
    }
    function3() {
        var y = 10;
        this.function2();
    }
}
