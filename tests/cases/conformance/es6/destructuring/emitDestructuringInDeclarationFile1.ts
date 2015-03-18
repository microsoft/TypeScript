// @declaration: true
// @module: amd
module M {
    export class c { }
    export var {b} = {
        b: new c()
    };
    export var {a}: { a: c };
}
