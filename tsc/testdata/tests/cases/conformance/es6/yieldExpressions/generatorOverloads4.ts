//@target: ES6
class C {
    f(s: string): Iterable<any>;
    f(s: number): Iterable<any>;
    *f(s: any): Iterable<any> { }
}