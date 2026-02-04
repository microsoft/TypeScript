//// [tests/cases/compiler/assignmentCompatInterfaceWithStringIndexSignature.ts] ////

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
"use strict";
class Foo {
    Boz() { }
}
function Biz(map) { }
Biz(new Foo());
