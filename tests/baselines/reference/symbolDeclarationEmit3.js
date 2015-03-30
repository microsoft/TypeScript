//// [symbolDeclarationEmit3.ts]
class C {
    [Symbol.isRegExp](x: number);
    [Symbol.isRegExp](x: string);
    [Symbol.isRegExp](x: any) { }
}

//// [symbolDeclarationEmit3.js]
class C {
    [Symbol.isRegExp](x) { }
}


//// [symbolDeclarationEmit3.d.ts]
declare class C {
    [Symbol.isRegExp](x: number): any;
    [Symbol.isRegExp](x: string): any;
}
