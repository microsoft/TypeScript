//@target: ES6
//@declaration: true
class C {
    [Symbol.toPrimitive](x: number);
    [Symbol.toPrimitive](x: string);
    [Symbol.toPrimitive](x: any) { }
}