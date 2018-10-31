/// <reference path="fourslash.ts"/>

////module mod1 {
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
////    module mod1mod {
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
////        module m1Mod { }
////        export module m1eMod { }
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
////    export module mod1emod {
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
////        module mMod { }
////    	export module meMod { }
////    }
////}
////
////// EXTENDING MODULE 1
////module mod1 {
////    export var mod1eexvar = 1;
////    var mod1exvar = 2;
////}
////
////module mod2 {
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
////    module mod2mod { }
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
////    export module mod2emod { }
////}
////
////module mod2 {
////    export var mod2eexvar = 1;
////}
////
////module mod3 {
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
////}
////
////class shwcls {
////    private scvar = 1;
////    private scfn() { }
////    public scpfn() { }
////    public scpvar = 1;
////    static scsvar = 1;
////    static scsfn() { }
////}
////
////interface shwint {
////    (bar: any): any;
////    new (bar: any): any;
////    sivar: any;
////    sifn(bar: any): any;
////}
////
////var shwvar = 1;
////
////class extCls extends shwcls {
////    /*extendedClass*/
////}
////
////function shwFnTest() {
////    function shwFnTest {
////
////    }
////    var shwvar = "1";
////    /*localVar*/
////}
////
////var obj = {
////    x: /*objectLiteral*/
////}

verify.completions(
    {
        marker: "extendedClass",
        exact: ["scpfn", "scpvar", ...completion.classElementKeywords],
        isNewIdentifierLocation: true,
    },
    {
        marker: "objectLiteral",
        includes: [
            "mod1",
            "mod2",
            "mod3",
            { name: "shwvar", text: "var shwvar: number" },
            { name: "shwfn", text: "function shwfn(): void" },
            { name: "shwcls", text: "class shwcls" },
        ],
        excludes: [
            "shwint",
            "mod2var",
            "mod2fn",
            "mod2cls",
            "mod2int",
            "mod2mod",
            "mod2evar",
            "mod2efn",
            "mod2ecls",
            "mod2eint",
            "mod2emod",
            "sfvar",
            "sffn",
            "scvar",
            "scfn",
            "scpfn",
            "scpvar",
            "scsvar",
            "scsfn",
            "sivar",
            "sifn",
            "mod1exvar",
            "mod2eexvar",
        ]
    },
    {
        marker: "localVar",
        includes: { name: "shwvar", text: "(local var) shwvar: string" },
    },
);
