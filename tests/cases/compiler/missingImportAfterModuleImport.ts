//@module: commonjs
// @declaration: true

// @Filename: missingImportAfterModuleImport_0.ts
declare module "SubModule" {
    class SubModule {
        public static StaticVar: number;
        public InstanceVar: number;
        constructor();
    }
    export = SubModule;
}

// @Filename: missingImportAfterModuleImport_1.ts
///<reference path='missingImportAfterModuleImport_0.ts' preserve="true" />
import SubModule = require('SubModule');
class MainModule {
    // public static SubModule: SubModule;
    public SubModule: SubModule;
    constructor() { }
}
export = MainModule;

