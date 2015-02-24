//@target: ES6
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator](0);
