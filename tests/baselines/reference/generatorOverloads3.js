//// [generatorOverloads3.ts]
class C {
    *f(s: string): Iterable<any>;
    *f(s: number): Iterable<any>;
    *f(s: any): Iterable<any> { }
}

//// [generatorOverloads3.js]
class C {
    *f(s) { }
}
