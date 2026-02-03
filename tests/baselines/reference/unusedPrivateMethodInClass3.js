//// [tests/cases/compiler/unusedPrivateMethodInClass3.ts] ////

//// [unusedPrivateMethodInClass3.ts]
class greeter {
    private function1() {
        var y = 10;
    }

    private function2() {
        var y = 10;
    }

    public function3() {
        var y = 10;
    }
}

//// [unusedPrivateMethodInClass3.js]
class greeter {
    function1() {
        var y = 10;
    }
    function2() {
        var y = 10;
    }
    function3() {
        var y = 10;
    }
}
