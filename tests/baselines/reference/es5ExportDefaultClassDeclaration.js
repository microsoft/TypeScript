//// [es5ExportDefaultClassDeclaration.ts]

export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
var C = (function () {
    function C() {
    }
    C.prototype.method = function () {
    };
    return C;
})();
module.exports = C;


//// [es5ExportDefaultClassDeclaration.d.ts]
export declare class C {
    method(): void;
}
