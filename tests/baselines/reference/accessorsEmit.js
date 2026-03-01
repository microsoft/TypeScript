//// [tests/cases/compiler/accessorsEmit.ts] ////

//// [accessorsEmit.ts]
class Result { }

class Test {
    get Property(): Result {
        var x = 1;
        return null;
    }
}

class Test2 {
    get Property() {
        var x = 1;
        return null;
    }
}

//// [accessorsEmit.js]
"use strict";
class Result {
}
class Test {
    get Property() {
        var x = 1;
        return null;
    }
}
class Test2 {
    get Property() {
        var x = 1;
        return null;
    }
}
