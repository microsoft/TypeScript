//@target: ES6
class C {
    [Symbol.iterator](x: string): string;
    static [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
}