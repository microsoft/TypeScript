//// [es5ExportDefaultFunctionDeclaration.ts]

export default function f() { }


//// [es5ExportDefaultFunctionDeclaration.js]
function f() {
}
module.exports = f;


//// [es5ExportDefaultFunctionDeclaration.d.ts]
export default function f(): void;
