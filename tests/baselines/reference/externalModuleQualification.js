//// [externalModuleQualification.ts]
export var ID = "test";
export class DiffEditor<A, B, C> {
    private previousDiffAction: NavigateAction;
    constructor(id: string = ID) {
    }
}
class NavigateAction {
    f(editor: DiffEditor<any, any, any>) {
    }
}


//// [externalModuleQualification.js]
"use strict";
exports.__esModule = true;
exports.DiffEditor = exports.ID = void 0;
exports.ID = "test";
var DiffEditor = /** @class */ (function () {
    function DiffEditor(id) {
        if (id === void 0) { id = exports.ID; }
    }
    return DiffEditor;
}());
exports.DiffEditor = DiffEditor;
var NavigateAction = /** @class */ (function () {
    function NavigateAction() {
    }
    NavigateAction.prototype.f = function (editor) {
    };
    return NavigateAction;
}());
