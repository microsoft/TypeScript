//// [tests/cases/compiler/unusedPrivateMethodInClass1.ts] ////

//// [unusedPrivateMethodInClass1.ts]
class greeter {
    private function1() {
        var y = 10;
    }
}

//// [unusedPrivateMethodInClass1.js]
class greeter {
    function1() {
        var y = 10;
    }
}
