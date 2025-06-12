//// [tests/cases/compiler/unusedLocalsInMethod2.ts] ////

//// [unusedLocalsInMethod2.ts]
class greeter {
    public function1() {
        var x, y = 10;
    }
}

//// [unusedLocalsInMethod2.js]
class greeter {
    function1() {
        var x, y = 10;
    }
}
