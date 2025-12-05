//@module: commonjs
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

export var d = new c.b.c();