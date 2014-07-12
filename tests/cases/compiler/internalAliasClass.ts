// @declaration: true
module a {
    export class c {
    }
}

module c {
    import b = a.c;
    export var x: b = new b();
}