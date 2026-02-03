//// [tests/cases/compiler/unusedLocalsInMethod3.ts] ////

//// [unusedLocalsInMethod3.ts]
class greeter {
    public function1() {
        var x, y;
        y = 1;
    }
}

//// [unusedLocalsInMethod3.js]
class greeter {
    function1() {
        var x, y;
        y = 1;
    }
}
