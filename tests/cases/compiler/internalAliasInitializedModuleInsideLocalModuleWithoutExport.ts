//@module: commonjs
// @declaration: true
export namespace a {
    export namespace b {
        export class c {
        }
    }
}

export namespace c {
    import b = a.b;
    export var x: b.c = new b.c();
}