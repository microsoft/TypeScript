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
class Camera {
    str;
    constructor(str) {
        this.str = str;
    }
    foo() { return "s"; }
}
