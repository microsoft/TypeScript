//// [es6ExportDefaultFunctionDeclarationOverload.ts]
export default function b(a: string): string;
export default function b(a: number): number;
export default function b(a: any): any {
}

//// [es6ExportDefaultFunctionDeclarationOverload.js]
function b(a) {
}
exports.b = b;


//// [es6ExportDefaultFunctionDeclarationOverload.d.ts]
export declare function b(a: string): string;
export declare function b(a: number): number;
