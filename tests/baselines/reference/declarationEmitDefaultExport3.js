//// [declarationEmitDefaultExport3.ts]
export default function foo() {
    return ""
}

//// [declarationEmitDefaultExport3.js]
function foo() {
    return "";
}
module.exports = foo;


//// [declarationEmitDefaultExport3.d.ts]
export default function foo(): string;
