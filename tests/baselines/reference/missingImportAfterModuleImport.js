//// [missingImportAfterModuleImport_1.ts]
///<reference path='missingImportAfterModuleImport_0.ts'/>
import SubModule = require('SubModule');
class MainModule {
    // public static SubModule: SubModule;
    public SubModule: SubModule;
    constructor() { }
}
export = MainModule;



//// [missingImportAfterModuleImport_0.js]
//// [missingImportAfterModuleImport_1.js]
var MainModule = (function () {
    function MainModule() {
    }
    return MainModule;
})();
module.exports = MainModule;


////[missingImportAfterModuleImport_0.d.ts]
declare module "SubModule" {
    class SubModule {
        static StaticVar: number;
        public InstanceVar: number;
        constructor();
    }
    export = SubModule;
}
////[missingImportAfterModuleImport_1.d.ts]
/// <reference path="missingImportAfterModuleImport_0.d.ts" />
import SubModule = require('SubModule');
declare class MainModule {
    public SubModule: SubModule;
    constructor();
}
export = MainModule;
