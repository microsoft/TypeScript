//// [tests/cases/compiler/interfaceSubtyping.ts] ////

//// [interfaceSubtyping.ts]
interface iface {
    foo(): void;
}
class Camera implements iface{
    constructor (public str: string) {
    }
    foo() {  return "s";   }
}


//// [interfaceSubtyping.js]
"use strict";
class Camera {
    constructor(str) {
        this.str = str;
    }
    foo() { return "s"; }
}
