//@target: ES6
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
    [Symbol.iterator](x: any) {
        return undefined;
    }
}