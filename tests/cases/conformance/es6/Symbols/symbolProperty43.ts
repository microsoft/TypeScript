//@target: ES6
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
}