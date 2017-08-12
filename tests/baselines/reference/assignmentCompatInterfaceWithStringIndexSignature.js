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
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.Boz = function () { };
    return Foo;
}());
function Biz(map) { }
Biz(new Foo());
