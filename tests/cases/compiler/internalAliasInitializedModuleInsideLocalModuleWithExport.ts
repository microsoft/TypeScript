//@module: amd
// @declaration: true
export namespace a {
    export namespace b {
        export class c {
        }
    }
}

export namespace c {
    export import b = a.b;
    export var x: b.c = new b.c();
}