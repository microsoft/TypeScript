//// [tests/cases/compiler/unusedPrivateMethodInClass2.ts] ////

//// [unusedPrivateMethodInClass2.ts]
class greeter {
    private function1() {
        var y = 10;
    }

    private function2() {
        var y = 10;
    }
}

//// [unusedPrivateMethodInClass2.js]
class greeter {
    function1() {
        var y = 10;
    }
    function2() {
        var y = 10;
    }
}
