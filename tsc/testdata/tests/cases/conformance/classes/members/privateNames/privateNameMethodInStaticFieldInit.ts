// @target: es2015

class C {
    static s = new C().#method();
    #method() { return 42; }
}

console.log(C.s);
