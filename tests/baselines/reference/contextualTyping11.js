//// [contextualTyping11.js]
var foo = (function () {
    function foo() {
        this.bar = [({})];
    }
    return foo;
})();
