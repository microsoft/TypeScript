/// <reference path='fourslash.ts'/>

////namespace mod1 {
////    var mod1var = 1;
////    function mod1fn() {
////        var bar = 1;
////        function foob() { }
////    }
////    class mod1cls {
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////    }
////    interface mod1int {
////        (bar: any): any;
////        new (bar: any): any;
////        bar: any;
////        foob(bar: any): any;
////    }
////    namespace mod1mod {
////        var m1X = 1;
////        function m1Func() {
////            var bar = 1;
////            function foob() { }
////        }
////        class m1Class {
////            private cVar = 1;
////            public cFunc() { }
////            public ceFunc() { }
////            public ceVar = 1;
////            static csVar = 1;
////            static csFunc() { }
////        }
////        interface m1Int {
////            (bar: any): any;
////            new (bar: any): any;
////            bar: any;
////            foob(bar: any): any;
////        }
////        export var m1eX = 1;
////        export function m1eFunc() {
////        }
////        export class m1eClass {
////            private cVar = 1;
////            public cFunc() { }
////            public ceFunc() { }
////            public ceVar = 1;
////            static csVar = 1;
////            static csFunc() { }
////        }
////        export interface m1eInt {
////            (bar: any): any;
////            new (bar: any): any;
////            bar: any;
////            foob(bar: any): any;
////        }
////        namespace m1Mod { }
////        export namespace m1eMod { }
////    }
////    export var mod1evar = 1;
////    export function mod1efn() {
////        var bar = 1;
////        function foob() { }
////    }
////    export class mod1ecls {
////        private cVar = 1;
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////    }
////    export interface mod1eint {
////        (bar: any): any;
////        new (bar: any): any;
////        bar: any;
////        foob(bar: any): any;
////    }
////    export namespace mod1emod {
////        var mX = 1;
////        function mFunc() {
////            var bar = 1;
////            function foob() { }
////        }
////        class mClass {
////            public cFunc() { }
////            public ceFunc() { }
////            public ceVar = 1;
////            static csVar = 1;
////            static csFunc() { }
////        }
////        interface mInt {
////            (bar: any): any;
////            new (bar: any): any;
////            bar: any;
////            foob(bar: any): any;
////        }
////        export var meX = 1;
////        export function meFunc() {
////        }
////        export class meClass {
////            private cVar = 1;
////            public cFunc() { }
////            public ceFunc() { }
////            public ceVar = 1;
////            static csVar = 1;
////            static csFunc() { }
////        }
////        export interface meInt {
////            (bar: any): any;
////            new (bar: any): any;
////            bar: any;
////            foob(bar: any): any;
////        }
////        namespace mMod { }
////    	export namespace meMod { }
////    }
////}
////
////// EXTENDING NAMESPACE 1
////namespace mod1 {
////    export var mod1eexvar = 1;
////    var mod1exvar = 2;
////}
////
////namespace mod2 {
////    var mod2var = "shadow";
////    function mod2fn() {
////        var bar = 1;
////        function foob() { }
////    }
////    class mod2cls {
////        private cVar = 1;
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////    }
////    namespace mod2mod { }
////    interface mod2int {
////        (bar: any): any;
////        new (bar: any): any;
////        bar: any;
////        foob(bar: any): any;
////    }
////    export var mod2evar = 1;
////    export function mod2efn() {
////    }
////    export class mod2ecls {
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////    }
////    export interface mod2eint {
////        (bar: any): any;
////        new (bar: any): any;
////        bar: any;
////        foob(bar: any): any;
////    }
////    export namespace mod2emod { }
////}
////
////namespace mod2 {
////    export var mod2eexvar = 1;
////}
////
////namespace mod3 {
////    var shwvar = "shadow";
////    function shwfn() {
////        var bar = 1;
////        function foob() { }
////    }
////    class shwcls {
////        constructor(public shadow: any) { }
////        private cVar = 1;
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////    }
////    interface shwint {
////        (bar: any): any;
////        new (bar: any): any;
////        sivar: string;
////        sifn(shadow: any): any;
////    }
////}
////
////function shwfn() {
////    var sfvar = 1;
////    function sffn() { }
////    /*function*/
////}
////
////class shwcls {
////    private scvar = 1;
////    private scfn() { }
////    public scpfn() { }
////    public scpvar = 1;
////    static scsvar = 1;
////    static scsfn() { }
////    /*class*/
////}
////
////interface shwint {
////    (bar: any): any;
////    new (bar: any): any;
////    sivar: any;
////    sifn(bar: any): any;
////    /*interface*/
////}
////
////var shwvar = 1;
/////*global*/

const commonExcludes: ReadonlyArray<string> = [
    "mod1var", "mod1fn", "mod1cls", "mod1int", "mod1mod", "mod1evar", "mod1efn", "mod1ecls", "mod1eint", "mod1emod", "mod1eexvar",
    "scvar", "scfn", "scpfn", "scpvar", "scsvar", "scsfn",
    "sivar", "sifn",
];
verify.completions(
    // from global scope
    {
        marker: "global",
        includes: [
            { name: "mod1", text: "namespace mod1" },
            { name: "mod2", text: "namespace mod2" },
            { name: "mod3", text: "namespace mod3" },
            { name: "shwvar", text: "var shwvar: number" },
            { name: "shwfn", text: "function shwfn(): void" },
            { name: "shwcls", text: "class shwcls" },
        ],
        excludes: [...commonExcludes, "shwint", "sfvar", "sffn"],
    },
    // from function scope
    {
        marker: "function",
        includes: [
            { name: "sfvar", text: "(local var) sfvar: number" },
            { name: "sffn", text: "(local function) sffn(): void" },
        ],
        excludes: commonExcludes,
    },
    // from class scope
    {
        marker: "class",
        exact: completion.classElementKeywords,
        isNewIdentifierLocation: true,
    },
    // from interface scope
    {
        marker: "interface",
        exact: ["readonly"],
        isNewIdentifierLocation: true,
    }
);
