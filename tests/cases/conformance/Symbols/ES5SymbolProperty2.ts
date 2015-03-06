//@target: ES5
module M {
    var Symbol;

    export class C {
        [Symbol.iterator]() { }
    }
    (new C)[Symbol.iterator];
}

(new M.C)[Symbol.iterator];