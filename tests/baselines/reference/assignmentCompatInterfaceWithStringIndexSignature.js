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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.Boz = function () { };
    return Foo;
}());
function Biz(map) { }
Biz(new Foo());
