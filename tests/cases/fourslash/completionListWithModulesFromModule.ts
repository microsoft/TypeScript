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

function sharedNegativeVerify()
{
    verify.not.completionListContains('sfvar');
    verify.not.completionListContains('sffn');
    verify.not.completionListContains('scvar');
    verify.not.completionListContains('scfn');
    verify.not.completionListContains('scpfn');
    verify.not.completionListContains('scpvar');
    verify.not.completionListContains('scsvar');
    verify.not.completionListContains('scsfn');
    verify.not.completionListContains('sivar');
    verify.not.completionListContains('sifn');
    verify.not.completionListContains('mod1exvar');
    verify.not.completionListContains('mod2eexvar');
}

function goToMarkAndVerifyShadow()
{
    sharedNegativeVerify();
    verify.not.completionListContains('mod2var');
    verify.not.completionListContains('mod2fn');
    verify.not.completionListContains('mod2cls');
    verify.not.completionListContains('mod2int');
    verify.not.completionListContains('mod2mod');
    verify.not.completionListContains('mod2evar');
    verify.not.completionListContains('mod2efn');
    verify.not.completionListContains('mod2ecls');
    verify.not.completionListContains('mod2eint');
    verify.not.completionListContains('mod2emod');
}

function getVerify(isTypeLocation?: boolean) {
    return {
        verifyValue: isTypeLocation ? verify.not : verify,
        verifyType: isTypeLocation ? verify : verify.not,
        verifyValueOrType: verify
    };
}

function typeLocationVerify(valueMarker: string, verify: (typeMarker: string) => void) {
    verify(valueMarker + "Type");
    return valueMarker;
}
// from a shadow namespace with no export
verifyShadowNamespaceWithNoExport();
function verifyShadowNamespaceWithNoExport(marker?: string) {
    const { verifyValue, verifyType, verifyValueOrType } = getVerify(!!marker);
    if (!marker) {
        marker = typeLocationVerify('shadowNamespaceWithNoExport', verifyShadowNamespaceWithNoExport);
    }
    goTo.marker(marker);

    verifyValue.completionListContains('shwvar', 'var shwvar: string');
    verifyValue.completionListContains('shwfn', 'function shwfn(shadow: any): void');
    verifyValueOrType.completionListContains('shwcls', 'class shwcls');
    verifyType.completionListContains('shwint', 'interface shwint');

    goToMarkAndVerifyShadow();
}

// from a shadow namespace with export
verifyShadowNamespaceWithNoExport();
function verifyShadowNamespaceWithExport(marker?: string) {
    const { verifyValue, verifyType, verifyValueOrType } = getVerify(!!marker);
    if (!marker) {
        marker = typeLocationVerify('shadowNamespaceWithExport', verifyShadowNamespaceWithExport);
    }
    goTo.marker(marker);
    verifyValue.completionListContains('shwvar', 'var mod4.shwvar: string');
    verifyValue.completionListContains('shwfn', 'function mod4.shwfn(shadow: any): void');
    verifyValueOrType.completionListContains('shwcls', 'class mod4.shwcls');
    verifyType.completionListContains('shwint', 'interface mod4.shwint');
    goToMarkAndVerifyShadow();
}

// from a namespace with import
verifyShadowNamespaceWithNoExport();
function verifyNamespaceWithImport(marker?: string) {
    const { verifyValue, verifyType, verifyValueOrType } = getVerify(!!marker);
    if (!marker) {
        marker = typeLocationVerify('namespaceWithImport', verifyNamespaceWithImport);
    }
    goTo.marker(marker);

    verifyValue.completionListContains('mod1', 'namespace mod1');
    verifyValue.completionListContains('mod2', 'namespace mod2');
    verifyValue.completionListContains('mod3', 'namespace mod3');
    verifyValue.completionListContains('shwvar', 'var shwvar: number');
    verifyValue.completionListContains('shwfn', 'function shwfn(): void');
    verifyValueOrType.completionListContains('shwcls', 'class shwcls');
    verifyType.completionListContains('shwint', 'interface shwint');

    sharedNegativeVerify();

    verify.not.completionListContains('mod1var');
    verify.not.completionListContains('mod1fn');
    verify.not.completionListContains('mod1cls');
    verify.not.completionListContains('mod1int');
    verify.not.completionListContains('mod1mod');
    verify.not.completionListContains('mod1evar');
    verify.not.completionListContains('mod1efn');
    verify.not.completionListContains('mod1ecls');
    verify.not.completionListContains('mod1eint');
    verify.not.completionListContains('mod1emod');
    verify.not.completionListContains('mX');
    verify.not.completionListContains('mFunc');
    verify.not.completionListContains('mClass');
    verify.not.completionListContains('mInt');
    verify.not.completionListContains('mMod');
    verify.not.completionListContains('meX');
    verify.not.completionListContains('meFunc');
    verify.not.completionListContains('meClass');
    verify.not.completionListContains('meInt');
    verify.not.completionListContains('meMod');
}