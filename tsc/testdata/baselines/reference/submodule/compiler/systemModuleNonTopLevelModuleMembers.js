//// [tests/cases/compiler/systemModuleNonTopLevelModuleMembers.ts] ////

//// [systemModuleNonTopLevelModuleMembers.ts]
export class TopLevelClass {}
export module TopLevelModule {var v;}
export function TopLevelFunction(): void {}
export enum TopLevelEnum {E}

export module TopLevelModule2 {
    export class NonTopLevelClass {}
    export module NonTopLevelModule {var v;}
    export function NonTopLevelFunction(): void {}
    export enum NonTopLevelEnum {E}
}

//// [systemModuleNonTopLevelModuleMembers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopLevelModule2 = exports.TopLevelEnum = exports.TopLevelModule = exports.TopLevelClass = void 0;
exports.TopLevelFunction = TopLevelFunction;
class TopLevelClass {
}
exports.TopLevelClass = TopLevelClass;
var TopLevelModule;
(function (TopLevelModule) {
    var v;
})(TopLevelModule || (exports.TopLevelModule = TopLevelModule = {}));
function TopLevelFunction() { }
var TopLevelEnum;
(function (TopLevelEnum) {
    TopLevelEnum[TopLevelEnum["E"] = 0] = "E";
})(TopLevelEnum || (exports.TopLevelEnum = TopLevelEnum = {}));
var TopLevelModule2;
(function (TopLevelModule2) {
    class NonTopLevelClass {
    }
    TopLevelModule2.NonTopLevelClass = NonTopLevelClass;
    let NonTopLevelModule;
    (function (NonTopLevelModule) {
        var v;
    })(NonTopLevelModule = TopLevelModule2.NonTopLevelModule || (TopLevelModule2.NonTopLevelModule = {}));
    function NonTopLevelFunction() { }
    TopLevelModule2.NonTopLevelFunction = NonTopLevelFunction;
    let NonTopLevelEnum;
    (function (NonTopLevelEnum) {
        NonTopLevelEnum[NonTopLevelEnum["E"] = 0] = "E";
    })(NonTopLevelEnum = TopLevelModule2.NonTopLevelEnum || (TopLevelModule2.NonTopLevelEnum = {}));
})(TopLevelModule2 || (exports.TopLevelModule2 = TopLevelModule2 = {}));
