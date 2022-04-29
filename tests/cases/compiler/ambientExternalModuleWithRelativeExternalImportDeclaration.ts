declare module "OuterModule" {
    import m2 = require("./SubModule");
    class SubModule {
        public static StaticVar: number;
        public InstanceVar: number;
        public x: m2.c;
        constructor();
    }
    export = SubModule;
}