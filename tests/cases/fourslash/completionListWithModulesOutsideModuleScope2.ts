/// <reference path='fourslash.ts'/>

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

goTo.marker('extendedClass');

verify.not.completionListContains('mod1');
verify.not.completionListContains('mod2');
verify.not.completionListContains('mod3');
verify.not.completionListContains('shwvar', 'var shwvar: number');
verify.not.completionListContains('shwfn', 'function shwfn(): void');
verify.not.completionListContains('shwcls', 'class shwcls');
verify.not.completionListContains('shwint', 'interface shwint');

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
verify.completionListContains('scpfn');
verify.completionListContains('scpvar');
verify.not.completionListContains('scsvar');
verify.not.completionListContains('scsfn');
verify.not.completionListContains('sivar');
verify.not.completionListContains('sifn');
verify.not.completionListContains('mod1exvar');
verify.not.completionListContains('mod2eexvar');

function goToMarkerAndVerify(marker: string)
{
    goTo.marker(marker);

    verify.completionListContains('mod1');
    verify.completionListContains('mod2');
    verify.completionListContains('mod3');
    verify.completionListContains('shwvar', 'var shwvar: number');
    verify.completionListContains('shwfn', 'function shwfn(): void');
    verify.completionListContains('shwcls', 'class shwcls');
    verify.not.completionListContains('shwint', 'interface shwint');

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

goToMarkerAndVerify('objectLiteral');

goTo.marker('localVar');
verify.completionListContains('shwvar', '(local var) shwvar: string');