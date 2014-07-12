// @noimplicitany: true
// this should be an error
class C {
    public x = null;// error at "x"
    public x1: string  // no error

    constructor(c1, c2, c3: string) { }  // error at "c1, c2"
    funcOfC(f1, f2, f3: number) { }     // error at "f1,f2"
}
