/// <reference path='fourslash.ts'/>

////module mod1 {
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
////        /*module*/
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
////        /*exportedModule*/
////    }
////    /*mod1*/
////}
////
////// EXTENDING MODULE 1
////module mod1 {
////    export var mod1eexvar = 1;
////    var mod1exvar = 2;
////    /*extendedModule*/
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

function goToMarkAndGeneralVerify(marker: string)
{
    goTo.marker(marker);

    verify.completionListContains('mod1var', 'number');
    verify.completionListContains('mod1fn', '(): void');
    verify.completionListContains('mod1cls', 'mod1cls');
    verify.completionListContains('mod1int', 'mod1int');
    verify.completionListContains('mod1mod', 'mod1mod');
    verify.completionListContains('mod1evar', 'number');
    verify.completionListContains('mod1efn', '(): void');
    verify.completionListContains('mod1ecls', 'mod1ecls');
    verify.completionListContains('mod1eint', 'mod1eint');
    verify.completionListContains('mod1emod', 'mod1emod');
    verify.completionListContains('mod1eexvar', 'number');
    verify.completionListContains('mod2', 'mod2');
    verify.completionListContains('mod3', 'mod3');
    verify.completionListContains('shwvar', 'number');
    verify.completionListContains('shwfn', '(): void');
    verify.completionListContains('shwcls', 'shwcls');
    verify.completionListContains('shwint', 'shwint');

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
verify.completionListContains('bar', 'number');
verify.completionListContains('foob', '(): void');

// from class in mod1
goToMarkAndGeneralVerify('class');
//verify.not.completionListContains('ceFunc');
//verify.not.completionListContains('ceVar');

// from interface in mod1
goToMarkAndGeneralVerify('interface');

// from module in mod1
goToMarkAndGeneralVerify('module');
verify.completionListContains('m1X', 'number');
verify.completionListContains('m1Func', '(): void');
verify.completionListContains('m1Class', 'm1Class');
verify.completionListContains('m1Int', 'm1Int');
verify.completionListContains('m1Mod', 'm1Mod');
verify.completionListContains('m1eX', 'number');
verify.completionListContains('m1eFunc', '(): void');
verify.completionListContains('m1eClass', 'm1eClass');
verify.completionListContains('m1eInt', 'm1eInt');
verify.completionListContains('m1eMod', 'm1eMod');

// from exported function in mod1
goToMarkAndGeneralVerify('exportedFunction');
verify.completionListContains('bar', 'number');
verify.completionListContains('foob', '(): void');

// from exported class in mod1
goToMarkAndGeneralVerify('exportedClass');
//verify.not.completionListContains('ceFunc');
//verify.not.completionListContains('ceVar');

// from exported interface in mod1
goToMarkAndGeneralVerify('exportedInterface');

// from exported module in mod1
goToMarkAndGeneralVerify('exportedModule');
verify.completionListContains('mX', 'number');
verify.completionListContains('mFunc', '(): void');
verify.completionListContains('mClass', 'mClass');
verify.completionListContains('mInt', 'mInt');
verify.completionListContains('mMod', 'mMod');
verify.completionListContains('meX', 'number');
verify.completionListContains('meFunc', '(): void');
verify.completionListContains('meClass', 'meClass');
verify.completionListContains('meInt', 'meInt');
verify.completionListContains('meMod', 'meMod');

// from extended module
goTo.marker('extendedModule');
verify.completionListContains('mod1evar', 'number');
verify.completionListContains('mod1efn', '(): void');
verify.completionListContains('mod1ecls', 'mod1ecls');
verify.completionListContains('mod1eint', 'mod1eint');
verify.completionListContains('mod1emod', 'mod1emod');
verify.completionListContains('mod1eexvar', 'number');
verify.completionListContains('mod2', 'mod2');
verify.completionListContains('mod3', 'mod3');
verify.completionListContains('shwvar', 'number');
verify.completionListContains('shwfn', '(): void');
verify.completionListContains('shwcls', 'shwcls');
verify.completionListContains('shwint', 'shwint');

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