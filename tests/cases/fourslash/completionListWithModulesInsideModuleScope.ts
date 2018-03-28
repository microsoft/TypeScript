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
////        var tmp: /*namespaceType*/
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
////        var tmp: /*exportedNamespaceType*/
////    }
////    /*mod1*/
////    var tmp: /*mod1Type*/;
////}
////
////// EXTENDING NAMESPACE 1
////namespace mod1 {
////    export var mod1eexvar = 1;
////    var mod1exvar = 2;
////    /*extendedNamespace*/
////    var tmp: /*extendedNamespaceType*/;
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

interface GotoMarkVerifyOptions {
    isClassScope?: boolean;
    isTypeLocation?: boolean;
    insideMod1?: boolean;
}

function getVerify(isTypeLocation: boolean) {
    return {
        verifyValue: isTypeLocation ? verify.not : verify,
        verifyType: isTypeLocation ? verify : verify.not,
        verifyValueOrType: verify,
        verifyNotValueOrType: verify.not,
    };
}

function goToMarkAndGeneralVerify(marker: string, { isClassScope, isTypeLocation, insideMod1 }: GotoMarkVerifyOptions = {}) {
    goTo.marker(marker);

    const mod1Dot = insideMod1 ? "" : "mod1.";
    const verifyValueInModule = isClassScope || isTypeLocation ? verify.not : verify;
    const verifyValueOrTypeInModule = isClassScope ? verify.not : verify;
    const verifyTypeInModule = isTypeLocation ? verify : verify.not;
    verifyValueInModule.completionListContains('mod1var', 'var mod1var: number');
    verifyValueInModule.completionListContains('mod1fn', 'function mod1fn(): void');
    verifyValueInModule.completionListContains('mod1evar', `var ${mod1Dot}mod1evar: number`);
    verifyValueInModule.completionListContains('mod1efn', `function ${mod1Dot}mod1efn(): void`);
    verifyValueInModule.completionListContains('mod1eexvar', `var mod1.mod1eexvar: number`);
    verifyValueInModule.completionListContains('mod3', 'namespace mod3');
    verifyValueInModule.completionListContains('shwvar', 'var shwvar: number');
    verifyValueInModule.completionListContains('shwfn', 'function shwfn(): void');

    verifyTypeInModule.completionListContains('mod1int', 'interface mod1int');
    verifyTypeInModule.completionListContains('mod1eint', `interface ${mod1Dot}mod1eint`);
    verifyTypeInModule.completionListContains('shwint', 'interface shwint');

    verifyValueOrTypeInModule.completionListContains('mod1cls', 'class mod1cls');
    verifyValueOrTypeInModule.completionListContains('mod1mod', 'namespace mod1mod');
    verifyValueOrTypeInModule.completionListContains('mod1ecls', `class ${mod1Dot}mod1ecls`);
    verifyValueOrTypeInModule.completionListContains('mod1emod', `namespace ${mod1Dot}mod1emod`);
    verifyValueOrTypeInModule.completionListContains('mod2', 'namespace mod2');
    verifyValueOrTypeInModule.completionListContains('shwcls', 'class shwcls');

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
goToMarkAndGeneralVerify('mod1', { insideMod1: true });
// from mod1 in type position
goToMarkAndGeneralVerify('mod1Type', { isTypeLocation: true, insideMod1: true });

// from function in mod1
goToMarkAndGeneralVerify('function', { insideMod1: true });
verify.completionListContains('bar', '(local var) bar: number');
verify.completionListContains('foob', '(local function) foob(): void');

// from class in mod1
goToMarkAndGeneralVerify('class', { isClassScope: true });
//verify.not.completionListContains('ceFunc');
//verify.not.completionListContains('ceVar');

// from interface in mod1
verify.completionsAt("interface", ["readonly"], { isNewIdentifierLocation: true });

// from namespace in mod1
verifyNamespaceInMod1('namespace');
verifyNamespaceInMod1('namespaceType', /*isTypeLocation*/ true);

function verifyNamespaceInMod1(marker: string, isTypeLocation?: boolean) {
    goToMarkAndGeneralVerify(marker, { isTypeLocation, insideMod1: true });

    const { verifyValue, verifyType, verifyValueOrType, verifyNotValueOrType } = getVerify(isTypeLocation);

    verifyValue.completionListContains('m1X', 'var m1X: number');
    verifyValue.completionListContains('m1Func', 'function m1Func(): void');
    verifyValue.completionListContains('m1eX', 'var m1eX: number');
    verifyValue.completionListContains('m1eFunc', 'function m1eFunc(): void');

    verifyType.completionListContains('m1Int', 'interface m1Int');
    verifyType.completionListContains('m1eInt', 'interface m1eInt');

    verifyValueOrType.completionListContains('m1Class', 'class m1Class');
    verifyValueOrType.completionListContains('m1eClass', 'class m1eClass');

    verifyNotValueOrType.completionListContains('m1Mod', 'namespace m1Mod');
    verifyNotValueOrType.completionListContains('m1eMod', 'namespace m1eMod');
}

// from exported function in mod1
goToMarkAndGeneralVerify('exportedFunction', { insideMod1: true });
verify.completionListContains('bar', '(local var) bar: number');
verify.completionListContains('foob', '(local function) foob(): void');

// from exported class in mod1
goToMarkAndGeneralVerify('exportedClass', { isClassScope: true });
verify.not.completionListContains('ceFunc');
verify.not.completionListContains('ceVar');

// from exported interface in mod1
verify.completionsAt("exportedInterface", ["readonly"], { isNewIdentifierLocation: true });

// from exported namespace in mod1
verifyExportedNamespace('exportedNamespace');
verifyExportedNamespace('exportedNamespaceType', /*isTypeLocation*/ true);
function verifyExportedNamespace(marker: string, isTypeLocation?: boolean) {
    goToMarkAndGeneralVerify(marker, { isTypeLocation, insideMod1: true });
    const { verifyValue, verifyType, verifyValueOrType, verifyNotValueOrType } = getVerify(isTypeLocation);
    verifyValue.completionListContains('mX', 'var mX: number');
    verifyValue.completionListContains('mFunc', 'function mFunc(): void');
    verifyValue.completionListContains('meX', 'var meX: number');
    verifyValue.completionListContains('meFunc', 'function meFunc(): void');

    verifyType.completionListContains('mInt', 'interface mInt');
    verifyType.completionListContains('meInt', 'interface meInt');

    verifyValueOrType.completionListContains('mClass', 'class mClass');
    verifyValueOrType.completionListContains('meClass', 'class meClass');

    verifyNotValueOrType.completionListContains('mMod', 'namespace mMod');
    verifyNotValueOrType.completionListContains('meMod', 'namespace meMod');
}

// from extended namespace
verifyExtendedNamespace('extendedNamespace');
verifyExtendedNamespace('extendedNamespaceType', /*isTypeLocation*/ true);

function verifyExtendedNamespace(marker: string, isTypeLocation?: boolean) {
    goTo.marker(marker);
    const { verifyValue, verifyType, verifyValueOrType, verifyNotValueOrType } = getVerify(isTypeLocation);

    verifyValue.completionListContains('mod1evar', 'var mod1.mod1evar: number');
    verifyValue.completionListContains('mod1efn', 'function mod1.mod1efn(): void');
    verifyValue.completionListContains('mod1eexvar', 'var mod1eexvar: number');
    verifyValue.completionListContains('mod3', 'namespace mod3');
    verifyValue.completionListContains('shwvar', 'var shwvar: number');
    verifyValue.completionListContains('shwfn', 'function shwfn(): void');

    verifyType.completionListContains('mod1eint', 'interface mod1.mod1eint');
    verifyType.completionListContains('shwint', 'interface shwint');

    verifyValueOrType.completionListContains('mod1ecls', 'class mod1.mod1ecls');
    verifyValueOrType.completionListContains('mod1emod', 'namespace mod1.mod1emod');
    verifyValueOrType.completionListContains('mod2', 'namespace mod2');
    verifyValueOrType.completionListContains('shwcls', 'class shwcls');


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
}
