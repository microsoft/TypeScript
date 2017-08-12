//// [assignmentCompatInterfaceWithStringIndexSignature.ts]
interface IHandler {
    (e): boolean;
}

interface IHandlerMap {
    [type: string]: IHandler;
}

class Foo {
    public Boz(): void { }
}

function Biz(map: IHandlerMap) { }

Biz(new Foo());


//// [assignmentCompatInterfaceWithStringIndexSignature.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Boz = function () { };
    __names(Foo.prototype, ["Boz"]);
    return Foo;
}());
function Biz(map) { }
Biz(new Foo());
