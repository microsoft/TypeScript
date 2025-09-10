//// [tests/cases/compiler/systemModuleNonTopLevelModuleMembers.ts] ////

//// [systemModuleNonTopLevelModuleMembers.ts]
export class TopLevelClass {}
export namespace TopLevelModule {var v;}
export function TopLevelFunction(): void {}
export enum TopLevelEnum {E}

export namespace TopLevelModule2 {
    export class NonTopLevelClass {}
    export namespace NonTopLevelModule {var v;}
    export function NonTopLevelFunction(): void {}
    export enum NonTopLevelEnum {E}
}

//// [systemModuleNonTopLevelModuleMembers.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var TopLevelClass, TopLevelModule, TopLevelEnum, TopLevelModule2;
    var __moduleName = context_1 && context_1.id;
    function TopLevelFunction() { }
    exports_1("TopLevelFunction", TopLevelFunction);
    return {
        setters: [],
        execute: function () {
            TopLevelClass = /** @class */ (function () {
                function TopLevelClass() {
                }
                return TopLevelClass;
            }());
            exports_1("TopLevelClass", TopLevelClass);
            (function (TopLevelModule) {
                var v;
            })(TopLevelModule || (exports_1("TopLevelModule", TopLevelModule = {})));
            (function (TopLevelEnum) {
                TopLevelEnum[TopLevelEnum["E"] = 0] = "E";
            })(TopLevelEnum || (exports_1("TopLevelEnum", TopLevelEnum = {})));
            (function (TopLevelModule2) {
                var NonTopLevelClass = /** @class */ (function () {
                    function NonTopLevelClass() {
                    }
                    return NonTopLevelClass;
                }());
                TopLevelModule2.NonTopLevelClass = NonTopLevelClass;
                var NonTopLevelModule;
                (function (NonTopLevelModule) {
                    var v;
                })(NonTopLevelModule = TopLevelModule2.NonTopLevelModule || (TopLevelModule2.NonTopLevelModule = {}));
                function NonTopLevelFunction() { }
                TopLevelModule2.NonTopLevelFunction = NonTopLevelFunction;
                var NonTopLevelEnum;
                (function (NonTopLevelEnum) {
                    NonTopLevelEnum[NonTopLevelEnum["E"] = 0] = "E";
                })(NonTopLevelEnum = TopLevelModule2.NonTopLevelEnum || (TopLevelModule2.NonTopLevelEnum = {}));
            })(TopLevelModule2 || (exports_1("TopLevelModule2", TopLevelModule2 = {})));
        }
    };
});
