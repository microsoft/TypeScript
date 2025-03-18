//// [tests/cases/compiler/externalModuleQualification.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffEditor = exports.ID = void 0;
exports.ID = "test";
class DiffEditor {
    previousDiffAction;
    constructor(id = exports.ID) {
    }
}
exports.DiffEditor = DiffEditor;
class NavigateAction {
    f(editor) {
    }
}
