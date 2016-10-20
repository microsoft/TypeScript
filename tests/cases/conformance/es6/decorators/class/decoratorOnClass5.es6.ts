// @target:es6
// @experimentaldecorators: true
declare function dec<T>(target: T): T;

@dec
class C {
    static x() { return C.y; }
    static y = 1;
}

let c = new C();