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

function verifyNotContainFunctionMembers()
{
    verify.not.completionListContains('sfvar');
    verify.not.completionListContains('sffn');
}

function verifyNotContainClassMembers()
{
    verify.not.completionListContains('scvar');
    verify.not.completionListContains('scfn');
    verify.not.completionListContains('scpfn');
    verify.not.completionListContains('scpvar');
    verify.not.completionListContains('scsvar');
    verify.not.completionListContains('scsfn');
}

function verifyNotContainInterfaceMembers()
{
    verify.not.completionListContains('sivar');
    verify.not.completionListContains('sifn');
}

function goToMarkAndGeneralVerify(marker: string)
{
    goTo.marker(marker);

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
    verify.not.completionListContains('mod1eexvar');
}

// from global scope
goToMarkAndGeneralVerify('global');
verify.completionListContains('mod1', 'namespace mod1');
verify.completionListContains('mod2', 'namespace mod2');
verify.completionListContains('mod3', 'namespace mod3');
verify.completionListContains('shwvar', 'var shwvar: number');
verify.completionListContains('shwfn', 'function shwfn(): void');
verify.completionListContains('shwcls', 'class shwcls');
verify.completionListContains('shwint', 'interface shwint');

verifyNotContainFunctionMembers();
verifyNotContainClassMembers();
verifyNotContainInterfaceMembers();

// from function scope
goToMarkAndGeneralVerify('function');
verify.completionListContains('sfvar', '(local var) sfvar: number');
verify.completionListContains('sffn', '(local function) sffn(): void');

verifyNotContainClassMembers();
verifyNotContainInterfaceMembers();

// from class scope
goToMarkAndGeneralVerify('class');
verifyNotContainFunctionMembers();
verifyNotContainInterfaceMembers();

// from interface scope
goToMarkAndGeneralVerify('interface');
verifyNotContainClassMembers();
verifyNotContainFunctionMembers();