//@target: ES6
//@declaration: true
class C {
    [Symbol.isRegExp](x: number);
    [Symbol.isRegExp](x: string);
    [Symbol.isRegExp](x: any) { }
}