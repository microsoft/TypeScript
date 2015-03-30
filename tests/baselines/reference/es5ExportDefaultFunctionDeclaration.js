//// [es5ExportDefaultFunctionDeclaration.ts]

export default function f() { }


//// [es5ExportDefaultFunctionDeclaration.js]
function f() { }
exports.default = f;


//// [es5ExportDefaultFunctionDeclaration.d.ts]
export default function f(): void;
