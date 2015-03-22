//// [symbolProperty41.ts]
class C {
    [Symbol.iterator](x: string): { x: string };
    [Symbol.iterator](x: "hello"): { x: string; hello: string };
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator]("hello");


//// [symbolProperty41.js]
class C {
    [Symbol.iterator](x) {
        return undefined;
    }
}
var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator]("hello");
