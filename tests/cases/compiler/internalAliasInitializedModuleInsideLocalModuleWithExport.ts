//@module: amd
// @declaration: true
export module a {
    export module b {
        export class c {
        }
    }
}

export module c {
    export import b = a.b;
    export var x: b.c = new b.c();
}