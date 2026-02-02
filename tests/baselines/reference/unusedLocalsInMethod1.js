//// [tests/cases/compiler/unusedLocalsInMethod1.ts] ////

//// [unusedLocalsInMethod1.ts]
class greeter {
    public function1() {
        var x = 10;
    }
}

//// [unusedLocalsInMethod1.js]
class greeter {
    function1() {
        var x = 10;
    }
}
