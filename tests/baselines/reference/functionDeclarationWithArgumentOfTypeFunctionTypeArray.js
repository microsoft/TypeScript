//// [functionDeclarationWithArgumentOfTypeFunctionTypeArray.ts]
function foo(args: { (x): number }[]) {
    return args.length;
}


//// [functionDeclarationWithArgumentOfTypeFunctionTypeArray.js]
function foo(args) {
    return args.length;
}


//// [functionDeclarationWithArgumentOfTypeFunctionTypeArray.d.ts]
declare function foo(args: {
    (x: any): number;
}[]): number;
