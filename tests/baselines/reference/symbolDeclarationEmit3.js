//// [symbolDeclarationEmit3.ts]
class C {
    [Symbol.toPrimitive](x: number);
    [Symbol.toPrimitive](x: string);
    [Symbol.toPrimitive](x: any) { }
}

//// [symbolDeclarationEmit3.js]
class C {
    [Symbol.toPrimitive](x) { }
}


//// [symbolDeclarationEmit3.d.ts]
declare class C {
    [Symbol.toPrimitive](x: number): any;
    [Symbol.toPrimitive](x: string): any;
}
