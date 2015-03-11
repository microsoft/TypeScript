// @target:es6
class D {
    _bar: string;
    foo(a: any);
    foo() { }

    baz(...args): string;
    baz(z:string, v: number): string {
        return this._bar;
    } 
}