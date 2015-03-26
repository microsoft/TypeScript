//// [es5ExportDefaultIdentifier.ts]

export function f() { }

export default f;


//// [es5ExportDefaultIdentifier.js]
function f() {
}
exports.f = f;
exports.default = f;


//// [es5ExportDefaultIdentifier.d.ts]
export declare function f(): void;
export default f;
