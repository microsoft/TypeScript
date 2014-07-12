

module mod1 {
    var mod1var = 1;
    function mod1fn() {
        var bar = 1;
        function foob( ){ }
        static foovar;
        static foosfunc( ) { }
    } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
    class mod1cls {
        public cFunc() { }
        public ceFunc() { }
        public ceVar = 1;
        static csVar = 1;
        static csFunc(){ }
    } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    
    interface mod1int { 
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        bar:any;
        foob(bar:any): any;
    }
    export var mod1evar = 1;
    export function mod1efn() { 
        var bar = 1;
        function foob( ){ }
        static foovar;
        static foosfunc( ) { }
    } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
    export class mod1ecls { 
        private cVar = 1;
        public cFunc() { }
        public ceFunc() { }
        public ceVar = 1;
        static csVar = 1;
        static csFunc(){ }
    } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();
    export interface mod1eint {
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        bar:any;
        foob(bar:any): any;
    }
    module mod1mod {
        var m1X = 1;
        function m1Func() {
            var bar = 1;
        function foob( ){ }
            static foovar;
            static foosfunc( ) { }
        } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
        class m1Class {
            private cVar = 1;
            public cFunc() { }
            public ceFunc() { }
            public ceVar = 1;
            static csVar = 1;
            static csFunc(){ }
        } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    
        interface m1Int { 
            (bar:any): any;
            new (bar:any): any;
            [bar:any]: any;
            bar:any;
            foob(bar:any): any;
        }
        export var m1eX = 1;
        export function m1eFunc() { 
            static foovar;
            static foosfunc( ) { }
        } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
        export class m1eClass { 
            private cVar = 1;
            public cFunc() { }
            public ceFunc() { }
            public ceVar = 1;
            static csVar = 1;
            static csFunc(){ }
        } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();
        export interface m1eInt {
            (bar:any): any;
            new (bar:any): any;
            [bar:any]: any;
            bar:any;
            foob(bar:any): any;
        }
        module m1Mod { }
        export module m1eMod { }
    }
    export module mod1emod {
        var mX = 1;
        function mFunc() {
            var bar = 1;
        function foob( ){ }
            static foovar;
            static foosfunc( ) { }
        } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
        class mClass {
            public cFunc() { }
            public ceFunc() { }
            public ceVar = 1;
            static csVar = 1;
            static csFunc(){ }
        } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    
        interface mInt { 
            (bar:any): any;
            new (bar:any): any;
            [bar:any]: any;
            bar:any;
            foob(bar:any): any;
        }
        export var meX = 1;
        export function meFunc() { 
            static foovar;
            static foosfunc( ) { }
        } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
        export class meClass { 
            private cVar = 1;
            public cFunc() { }
            public ceFunc() { }
            public ceVar = 1;
            static csVar = 1;
            static csFunc(){ }
        } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();
        export interface meInt {
            (bar:any): any;
            new (bar:any): any;
            [bar:any]: any;
            bar:any;
            foob(bar:any): any;
        }
        module mMod { }
        export module meMod { }
    }
} 

module mod1 {
    export var mod1eexvar = 1;
    var mod1exvar = 2;
}   // EXTENDING MODULE 1

module mod2 {
    var mod2var = "shadow";
    function mod2fn() {
        var bar = 1;
		function foob( ){ }
        static foovar;
        static foosfunc( ) { }
    } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
    class mod2cls {
        private cVar = 1;
        public cFunc() { }
        public ceFunc() { }
        public ceVar = 1;
        static csVar = 1;
        static csFunc(){ }
    } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    
    interface mod2int { 
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        bar:any;
        foob(bar:any): any;
    }
    export var mod2evar = 1;
    export function mod2efn() { 
        static foovar;
        static foosfunc( ) { }
    } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
    export class mod2ecls { 
        public cFunc() { }
        public ceFunc() { }
        public ceVar = 1;
        static csVar = 1;
        static csFunc(){ }
    } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();
    export interface mod2eint {
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        bar:any;
        foob(bar:any): any;
    }
    module mod2mod { }
} 

module mod3 {
    var shwvar = "shadow";
    function shwfn() {
        var bar = 1;
		function foob( ){ }
        static foovar;
        static foosfunc( ) { }
    } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
    class shwcls {
        constructor (public shadow: any) { }
        private cVar = 1;
        public cFunc() { }
        public ceFunc() { }
        public ceVar = 1;
        static csVar = 1;
        static csFunc(){ }
    } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    
    interface shwint { 
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        sivar:string;
        sifn(shadow:any): any;
    }
}

module mod4 {
    export var shwvar = "shadow";
    export function shwfn(shadow: any) {
        var bar = 1;
		function foob( ){ }
        static foovar;
        static foosfunc( ) { }
    } // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )
    export class shwcls {
        constructor (shadow: any) { }
        public cFunc() { }
        public ceFunc() { }
        public ceVar = 1;
        static csVar = 1;
        static csFunc(){ }
    } // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    
    export interface shwint { 
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        sivar:string;
        sifn(shadow:any): any;
    }
}

function shwfn() {
        var sfvar = 1;
        function sffn( ){ }
        static sfsvar;
        static sfsfn( ) { }
} // Not fully implemented yet: static get fooGet( ); static set fooSet( bar )

class shwcls {
        private scvar = 1;
        public scfn() { }
        public scpfn() { }
        public scpvar = 1;
        static scsvar = 1;
        static scsfn(){ }
} // Not fully implemented yet: private cpVar = 1; private cpFunc(){ }; static get csGetter(); static set csSetter();    

interface shwint { 
        (bar:any): any;
        new (bar:any): any;
        [bar:any]: any;
        sivar:any;
        sifn(bar:any): any;
}

var shwvar = 1;

module mod5 {
    import Mod1 = mod1;
    import iMod1 = mod1.mod1emod;    
}

class extCls extends shwcls {
    
}

function shwFnTest() {
    function shwFnTest {

    }
    static shwvar = "2";
    var shwvar = "1";
}

var obj = {
    x: 1,
    y: "string",
    x: 4
}