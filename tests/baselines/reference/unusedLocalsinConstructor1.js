//// [unusedLocalsinConstructor1.ts]
class greeter {
    constructor() {
        var unused = 20;
    }
}

//// [unusedLocalsinConstructor1.js]
var greeter = (function () {
    function greeter() {
        var unused = 20;
    }
    return greeter;
}());
