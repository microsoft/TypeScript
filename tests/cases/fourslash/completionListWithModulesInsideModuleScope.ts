/// <reference path='fourslash.ts'/>

////namespace mod1 {
////    var mod1var = 1;
////    function mod1fn() {
////        var bar = 1;
////        function foob() { }
////        /*function*/
////    }
////    class mod1cls {
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////        /*class*/
////    }
////    interface mod1int {
////        (bar: any): any;
////        new (bar: any): any;
////        bar: any;
////        foob(bar: any): any;
////        /*interface*/
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
////        /*namespace*/
////    }
////    export var mod1evar = 1;
////    export function mod1efn() {
////        var bar = 1;
////        function foob() { }
////        /*exportedFunction*/
////    }
////    export class mod1ecls {
////        private cVar = 1;
////        public cFunc() { }
////        public ceFunc() { }
////        public ceVar = 1;
////        static csVar = 1;
////        static csFunc() { }
////        /*exportedClass*/
////    }
////    export interface mod1eint {
////        (bar: any): any;
////        new (bar: any): any;
////        bar: any;
////        foob(bar: any): any;
////        /*exportedInterface*/
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
////        /*exportedNamespace*/
////    }
////    /*mod1*/
////}
////
////// EXTENDING NAMESPACE 1
////namespace mod1 {
////    export var mod1eexvar = 1;
////    var mod1exvar = 2;
////    /*extendedNamespace*/
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

function goToMarkAndGeneralVerify(marker: string, isClassScope?: boolean)
{
    goTo.marker(marker);

    const verifyModule = isClassScope ? verify.not : verify;
    verifyModule.completionListContains('mod1var', 'var mod1var: number');
    verifyModule.completionListContains('mod1fn', 'function mod1fn(): void');
    verifyModule.completionListContains('mod1cls', 'class mod1cls');
    verifyModule.completionListContains('mod1int', 'interface mod1int');
    verifyModule.completionListContains('mod1mod', 'namespace mod1mod');
    verifyModule.completionListContains('mod1evar', 'var mod1.mod1evar: number');
    verifyModule.completionListContains('mod1efn', 'function mod1.mod1efn(): void');
    verifyModule.completionListContains('mod1ecls', 'class mod1.mod1ecls');
    verifyModule.completionListContains('mod1eint', 'interface mod1.mod1eint');
    verifyModule.completionListContains('mod1emod', 'namespace mod1.mod1emod');
    verifyModule.completionListContains('mod1eexvar', 'var mod1.mod1eexvar: number');
    verifyModule.completionListContains('mod2', 'namespace mod2');
    verifyModule.completionListContains('mod3', 'namespace mod3');
    verifyModule.completionListContains('shwvar', 'var shwvar: number');
    verifyModule.completionListContains('shwfn', 'function shwfn(): void');
    verifyModule.completionListContains('shwcls', 'class shwcls');
    verifyModule.completionListContains('shwint', 'interface shwint');

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

// from mod1
goToMarkAndGeneralVerify('mod1');

// from function in mod1
goToMarkAndGeneralVerify('function');
verify.completionListContains('bar', '(local var) bar: number');
verify.completionListContains('foob', '(local function) foob(): void');

// from class in mod1
goToMarkAndGeneralVerify('class', /*isClassScope*/ true);
//verify.not.completionListContains('ceFunc');
//verify.not.completionListContains('ceVar');

// from interface in mod1
goToMarkAndGeneralVerify('interface');

// from namespace in mod1
goToMarkAndGeneralVerify('namespace');
verify.completionListContains('m1X', 'var m1X: number');
verify.completionListContains('m1Func', 'function m1Func(): void');
verify.completionListContains('m1Class', 'class m1Class');
verify.completionListContains('m1Int', 'interface m1Int');
verify.completionListContains('m1Mod', 'namespace m1Mod');
verify.completionListContains('m1eX', 'var mod1mod.m1eX: number');
verify.completionListContains('m1eFunc', 'function mod1mod.m1eFunc(): void');
verify.completionListContains('m1eClass', 'class mod1mod.m1eClass');
verify.completionListContains('m1eInt', 'interface mod1mod.m1eInt');
verify.completionListContains('m1eMod', 'namespace mod1mod.m1eMod');

// from exported function in mod1
goToMarkAndGeneralVerify('exportedFunction');
verify.completionListContains('bar', '(local var) bar: number');
verify.completionListContains('foob', '(local function) foob(): void');

// from exported class in mod1
goToMarkAndGeneralVerify('exportedClass', /*isClassScope*/ true);
//verify.not.completionListContains('ceFunc');
//verify.not.completionListContains('ceVar');

// from exported interface in mod1
goToMarkAndGeneralVerify('exportedInterface');

// from exported namespace in mod1
goToMarkAndGeneralVerify('exportedNamespace');
verify.completionListContains('mX', 'var mX: number');
verify.completionListContains('mFunc', 'function mFunc(): void');
verify.completionListContains('mClass', 'class mClass');
verify.completionListContains('mInt', 'interface mInt');
verify.completionListContains('mMod', 'namespace mMod');
verify.completionListContains('meX', 'var mod1.mod1emod.meX: number');
verify.completionListContains('meFunc', 'function mod1.mod1emod.meFunc(): void');
verify.completionListContains('meClass', 'class mod1.mod1emod.meClass');
verify.completionListContains('meInt', 'interface mod1.mod1emod.meInt');
verify.completionListContains('meMod', 'namespace mod1.mod1emod.meMod');

// from extended namespace
goTo.marker('extendedNamespace');
verify.completionListContains('mod1evar', 'var mod1.mod1evar: number');
verify.completionListContains('mod1efn', 'function mod1.mod1efn(): void');
verify.completionListContains('mod1ecls', 'class mod1.mod1ecls');
verify.completionListContains('mod1eint', 'interface mod1.mod1eint');
verify.completionListContains('mod1emod', 'namespace mod1.mod1emod');
verify.completionListContains('mod1eexvar', 'var mod1.mod1eexvar: number');
verify.completionListContains('mod2', 'namespace mod2');
verify.completionListContains('mod3', 'namespace mod3');
verify.completionListContains('shwvar', 'var shwvar: number');
verify.completionListContains('shwfn', 'function shwfn(): void');
verify.completionListContains('shwcls', 'class shwcls');
verify.completionListContains('shwint', 'interface shwint');

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
verify.not.completionListContains('mod2eexvar');