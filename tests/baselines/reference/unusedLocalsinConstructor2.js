//// [unusedLocalsinConstructor2.ts]
class greeter {
    constructor() {
        var unused = 20;
        var used = "dummy";
        used = used + "second part";
    }
}

//// [unusedLocalsinConstructor2.js]
var greeter = (function () {
    function greeter() {
        var unused = 20;
        var used = "dummy";
        used = used + "second part";
    }
    return greeter;
}());
