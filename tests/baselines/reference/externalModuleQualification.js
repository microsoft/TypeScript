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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
exports.ID = "test";
var DiffEditor = (function () {
    function DiffEditor(id) {
        if (id === void 0) { id = exports.ID; }
    }
    return DiffEditor;
}());
exports.DiffEditor = DiffEditor;
var NavigateAction = (function () {
    function NavigateAction() {
    }
    NavigateAction.prototype.f = function (editor) {
    };
    __names(NavigateAction.prototype, ["f"]);
    return NavigateAction;
}());
