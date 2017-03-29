//// [unusedTypeParameters1.ts]
class greeter<typeparameter1> {

}

//// [unusedTypeParameters1.js]
var greeter = (function () {
    function greeter() {
    }
    return greeter;
}());
