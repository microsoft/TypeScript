//// [contextualTyping14.ts]
class foo { public bar:(a:number)=>number = function(a){return a}; }

//// [contextualTyping14.js]
var foo = (function () {
    function foo() {
        this.bar = function (a) { return a; };
    }
    return foo;
}());
