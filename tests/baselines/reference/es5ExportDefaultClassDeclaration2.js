//// [es5ExportDefaultClassDeclaration2.ts]

export default class {
    method() { }
}


//// [es5ExportDefaultClassDeclaration2.js]
var _default = (function () {
    function _default() {
    }
    _default.prototype.method = function () {
    };
    return _default;
})();
module.exports = _default;


//// [es5ExportDefaultClassDeclaration2.d.ts]
export default class  {
    method(): void;
}
