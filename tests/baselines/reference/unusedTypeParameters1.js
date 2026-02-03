//// [tests/cases/compiler/unusedTypeParameters1.ts] ////

//// [unusedTypeParameters1.ts]
class greeter<typeparameter1> {

}

//// [unusedTypeParameters1.js]
var greeter = /** @class */ (function () {
    function greeter() {
    }
    return greeter;
}());
