//// [es5ExportDefaultFunctionDeclaration.ts]

export default function f() { }


//// [es5ExportDefaultFunctionDeclaration.js]
<<<<<<< HEAD
function f() {
}
exports.default = f;
=======
function f() { }
exports.f = f;
>>>>>>> master


//// [es5ExportDefaultFunctionDeclaration.d.ts]
export default function f(): void;
