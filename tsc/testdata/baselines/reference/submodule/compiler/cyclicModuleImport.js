//// [tests/cases/compiler/cyclicModuleImport.ts] ////

//// [cyclicModuleImport.ts]
declare module "SubModule" {
    import MainModule = require('MainModule');
    class SubModule {
        public static StaticVar: number;
        public InstanceVar: number;
        public main: MainModule;
        constructor();
    }
    export = SubModule;
}
declare module "MainModule" {
    import SubModule = require('SubModule');
    class MainModule {
        public SubModule: SubModule;
        constructor();
    }
    export = MainModule;
}


//// [cyclicModuleImport.js]


//// [cyclicModuleImport.d.ts]
declare module "SubModule" {
    import MainModule = require('MainModule');
    class SubModule {
        static StaticVar: number;
        InstanceVar: number;
        main: MainModule;
        constructor();
    }
    export = SubModule;
}
declare module "MainModule" {
    import SubModule = require('SubModule');
    class MainModule {
        SubModule: SubModule;
        constructor();
    }
    export = MainModule;
}
