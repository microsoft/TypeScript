/// <reference path='fourslash.ts'/>

// @noLib: true

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
////    function shwfn(shadow: any) {
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
////    /*shadowNamespaceWithNoExport*/
////    var tmp: /*shadowNamespaceWithNoExportType*/
////}
////
////namespace mod4 {
////	export var shwvar = "shadow";
////	export function shwfn(shadow: any) {
////		var bar = 1;
////		function foob(){ }
////	}
////	export class shwcls {
////		constructor(shadow: any) { }
////		public cFunc() { }
////		public ceFunc() { }
////		public ceVar = 1;
////		static csVar = 1;
////		static csFunc() { }
////	}
////	export interface shwint {
////		(bar: any): any;
////		new (bar: any): any;
////		sivar: string;
////		sifn(shadow: any): any;
////	}
////    /*shadowNamespaceWithExport*/
////    var tmp: /*shadowNamespaceWithExportType*/
////}
////
////namespace mod5 {
////    import Mod1 = mod1;
////    import iMod1 = mod1.mod1emod;
////    /*namespaceWithImport*/
////    var tmp: /*namespaceWithImportType*/
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

const commonValues: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> =
    [1, 2, 3, 4, 5].map(n => ({ name: `mod${n}`, text: `namespace mod${n}` }));
const commonTypes: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> =
    [1, 2, 4].map(n => ({ name: `mod${n}`, text: `namespace mod${n}` }));

verify.completions(
    {
        marker: ["shadowNamespaceWithNoExport", "shadowNamespaceWithExport"],
        exact: [
            { name: "shwfn", text: "function shwfn(shadow: any): void" },
            { name: "shwvar", text: "var shwvar: string" },
            { name: "shwcls", text: "class shwcls" },
            "tmp",
            "globalThis",
            ...commonValues,
            "undefined",
            ...completion.statementKeywordsWithTypes,
        ],
    }, {
        marker: ["shadowNamespaceWithNoExportType", "shadowNamespaceWithExportType"],
        exact: [
            { name: "shwcls", text: "class shwcls" },
            { name: "shwint", text: "interface shwint" },
            "globalThis",
            ...commonTypes,
            ...completion.typeKeywords,
        ]
    },
    {
        marker: "namespaceWithImport",
        exact: [
            "Mod1",
            "iMod1",
            "tmp",
            "globalThis",
            { name: "shwfn", text: "function shwfn(): void" },
            ...commonValues,
            { name: "shwcls", text: "class shwcls" },
            { name: "shwvar", text: "var shwvar: number" },
            "undefined",
            ...completion.statementKeywordsWithTypes,
        ],
    },
    {
        marker: "namespaceWithImportType",
        exact: [
            "Mod1",
            "iMod1",
            "globalThis",
            ...commonTypes,
            { name: "shwcls", text: "class shwcls" },
            { name: "shwint", text: "interface shwint" },
            ...completion.typeKeywords,
        ],
    }
);
