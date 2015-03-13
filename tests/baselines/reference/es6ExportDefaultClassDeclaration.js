//// [es6ExportDefaultClassDeclaration.ts]

export default class C {
    method() { }
}


//// [es6ExportDefaultClassDeclaration.js]
var C = (function () {
    function C() {
    }
    C.prototype.method = function () {
    };
    return C;
})();
export { C };


//// [es6ExportDefaultClassDeclaration.d.ts]
export declare class C {
    method(): void;
}
