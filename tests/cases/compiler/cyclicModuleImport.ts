// @declaration: true
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
