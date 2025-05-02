//// [tests/cases/conformance/es2019/globalThisAmbientModules.ts] ////

//// [globalThisAmbientModules.ts]
declare module "ambientModule" {
    export type typ = 1
    export var val: typ
}
namespace valueModule { export var val = 1 }
namespace namespaceModule { export type typ = 1 }
// should error
type GlobalBad1 = (typeof globalThis)["\"ambientModule\""]
type GlobalOk1 = (typeof globalThis)["valueModule"]
type GlobalOk2 = globalThis.namespaceModule.typ
const bad1: (typeof globalThis)["\"ambientModule\""] = 'ambientModule'


//// [globalThisAmbientModules.js]
var valueModule;
(function (valueModule) {
    valueModule.val = 1;
})(valueModule || (valueModule = {}));
var bad1 = 'ambientModule';
