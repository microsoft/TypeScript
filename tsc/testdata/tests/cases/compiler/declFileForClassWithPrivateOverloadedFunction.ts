// @target: es2015
// @strict: false
// @declaration: true

class C {
    private foo(x: number);
    private foo(x: string);
    private foo(x: any) { }
}