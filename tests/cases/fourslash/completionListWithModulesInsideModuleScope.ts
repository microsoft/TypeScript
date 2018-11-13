/// <reference path='fourslash.ts'/>

// @noLib: true

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

interface VerifyGeneralOptions {
    readonly isClassScope?: boolean;
    readonly isTypeLocation?: boolean;
    readonly insideMod1?: boolean;
    readonly isNewIdentifierLocation?: boolean;
    readonly moreIncludes?: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry>;
    readonly moreExcludes?: ReadonlyArray<string>;
}

function verifyGeneral(marker: string, { isClassScope, isTypeLocation, insideMod1, isNewIdentifierLocation, moreIncludes, moreExcludes }: VerifyGeneralOptions = {}) {
    const mod1Dot = insideMod1 ? "" : "mod1.";

    const valueInModule: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mod1var", text: "var mod1var: number" },
        { name: "mod1fn", text: "function mod1fn(): void" },
        { name: "mod1evar", text: `var ${mod1Dot}mod1evar: number` },
        { name: "mod1efn", text: `function ${mod1Dot}mod1efn(): void` },
        { name: "mod1eexvar", text: `var mod1.mod1eexvar: number` },
        { name: "mod3", text: "namespace mod3" },
        { name: "shwvar", text: "var shwvar: number" },
        { name: "shwfn", text: "function shwfn(): void" },
    ];
    const typeInModule: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mod1int", text: "interface mod1int" },
        { name: "mod1eint", text: `interface ${mod1Dot}mod1eint` },
        { name: "shwint", text: "interface shwint" },
    ];
    const valueOrTypeInModule: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mod1cls", text: "class mod1cls" },
        { name: "mod1mod", text: "namespace mod1mod" },
        { name: "mod1ecls", text: `class ${mod1Dot}mod1ecls` },
        { name: "mod1emod", text: `namespace ${mod1Dot}mod1emod` },
        { name: "mod2", text: "namespace mod2" },
        { name: "shwcls", text: "class shwcls" },
    ];

    verify.completions({
        marker,
        includes: [
            ...(isClassScope || isTypeLocation ? [] : valueInModule),
            ...(isClassScope ? [] : valueOrTypeInModule),
            ...(isTypeLocation ? typeInModule : []),
            ...(moreIncludes || []),
        ],
        excludes: [
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
            ...(moreExcludes || []),
        ],
        isNewIdentifierLocation,
    });
}

// from mod1
verifyGeneral('mod1', { insideMod1: true });
// from mod1 in type position
verifyGeneral('mod1Type', { isTypeLocation: true, insideMod1: true });

// from function in mod1
verifyGeneral('function', {
    insideMod1: true,
    moreIncludes: [
        { name: "bar", text: "(local var) bar: number" },
        { name: "foob", text: "(local function) foob(): void" },
    ],
});

// from class in mod1
verifyGeneral('class', {
    isClassScope: true,
    isNewIdentifierLocation: true,
    moreExcludes: ["ceFunc", "ceVar"],
});

// from interface in mod1
verify.completions({
    marker: "interface",
    exact: "readonly",
    isNewIdentifierLocation: true,
});

// from namespace in mod1
verifyNamespaceInMod1('namespace');
verifyNamespaceInMod1('namespaceType', /*isTypeLocation*/ true);

function verifyNamespaceInMod1(marker: string, isTypeLocation?: boolean) {
    verifyGeneral(marker, { isTypeLocation, insideMod1: true });

    const values: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "m1X", text: "var m1X: number" },
        { name: "m1Func", text: "function m1Func(): void" },
        { name: "m1eX", text: "var m1eX: number" },
        { name: "m1eFunc", text: "function m1eFunc(): void" },
    ];
    const types: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "m1Int", text: "interface m1Int" },
        { name: "m1eInt", text: "interface m1eInt" },
    ];
    verify.completions({
        includes: [
            ...(isTypeLocation ? types : values),
            { name: "m1Class", text: "class m1Class" },
            { name: "m1eClass", text: "class m1eClass" },
        ],
        excludes: ["m1Mod", "m1eMod"],
    });
}

// from exported function in mod1
verifyGeneral('exportedFunction', {
    insideMod1: true,
    moreIncludes: [
        { name: "bar", text: "(local var) bar: number" },
        { name: "foob", text: "(local function) foob(): void" },
    ],
});

// from exported class in mod1
verifyGeneral('exportedClass', {
    isClassScope: true,
    isNewIdentifierLocation: true,
    moreExcludes: ["ceFunc", "ceVar"],
});

// from exported interface in mod1
verify.completions({ marker: "exportedInterface", exact: ["readonly"], isNewIdentifierLocation: true });

// from exported namespace in mod1
verifyExportedNamespace('exportedNamespace');
verifyExportedNamespace('exportedNamespaceType', /*isTypeLocation*/ true);
function verifyExportedNamespace(marker: string, isTypeLocation?: boolean) {
    const values: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mX", text: "var mX: number" },
        { name: "mFunc", text: "function mFunc(): void" },
        { name: "meX", text: "var meX: number" },
        { name: "meFunc", text: "function meFunc(): void" },
    ];
    const types: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mInt", text: "interface mInt" },
        { name: "meInt", text: "interface meInt" },
    ];
    verifyGeneral(marker, {
        isTypeLocation,
        insideMod1: true,
        moreIncludes: [
            ...(isTypeLocation ? types : values),
            { name: "mClass", text: "class mClass" },
            { name: "meClass", text: "class meClass" },
        ],
        moreExcludes: ["mMod", "meMod"],
    });
}

// from extended namespace
verifyExtendedNamespace('extendedNamespace');
verifyExtendedNamespace('extendedNamespaceType', /*isTypeLocation*/ true);

function verifyExtendedNamespace(marker: string, isTypeLocation?: boolean) {
    const values: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mod1evar", text: "var mod1.mod1evar: number" },
        { name: "mod1efn", text: "function mod1.mod1efn(): void" },
        { name: "mod1eexvar", text: "var mod1eexvar: number" },
        { name: "mod3", text: "namespace mod3" },
        { name: "shwvar", text: "var shwvar: number" },
        { name: "shwfn", text: "function shwfn(): void" },
    ];
    const types: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
        { name: "mod1eint", text: "interface mod1.mod1eint" },
        { name: "shwint", text: "interface shwint" },
    ];

    verify.completions({
        marker,
        includes: [
            ...(isTypeLocation ? types : values),
            { name: "mod1ecls", text: "class mod1.mod1ecls" },
            { name: "mod1emod", text: "namespace mod1.mod1emod" },
            { name: "mod2", text: "namespace mod2" },
            { name: "shwcls", text: "class shwcls" },
        ],
        excludes: [
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
            "mod2eexvar",
        ],
    });
}
