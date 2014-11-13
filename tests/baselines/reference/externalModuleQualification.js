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
exports.ID = "test";
var DiffEditor = (function () {
    function DiffEditor() {
        var id = (arguments[0] === void 0) ? exports.ID : arguments[0];
    }
    return DiffEditor;
})();
exports.DiffEditor = DiffEditor;
var NavigateAction = (function () {
    function NavigateAction() {
    }
    NavigateAction.prototype.f = function (editor) {
    };
    return NavigateAction;
})();
