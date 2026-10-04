// @target: es2015
interface I {
    foo(callback: (a: any, b: any) => void): I
    is(): boolean;
}