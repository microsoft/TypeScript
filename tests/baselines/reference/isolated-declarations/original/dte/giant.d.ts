//// [tests/cases/compiler/giant.ts] ////

//// [giant.ts]
/*
    Prefixes
    p -> public
    r -> private
    i -> import
    e -> export
    a -> ambient
    t -> static
    s -> set
    g -> get

    MAX DEPTH 3 LEVELS
*/
var V;
function F() { };
class C {
    constructor () { }
    public pV;
    private rV;
    public pF() { }
    private rF() { }
    public pgF() { }
    public get pgF()
    public psF(param:any) { }
    public set psF(param:any)
    private rgF() { }
    private get rgF()
    private rsF(param:any) { }
    private set rsF(param:any)
    static tV;
    static tF() { }
    static tsF(param:any) { }
    static set tsF(param:any)
    static tgF() { }
    static get tgF()
}
interface I {
    //Call Signature
    ();
    (): number;
    (p);
    (p1: string);
    (p2?: string);
    (...p3: any[]);
    (p4: string, p5?: string);
    (p6: string, ...p7: any[]);
    //(p8?: string, ...p9: any[]);
    //(p10:string, p8?: string, ...p9: any[]);
    
    //Construct Signature
    new ();
    new (): number;
    new (p: string);
    new (p2?: string);
    new (...p3: any[]);
    new (p4: string, p5?: string);
    new (p6: string, ...p7: any[]);

    //Index Signature
    [p];
    [p1: string];
    [p2: string, p3: number];

    //Property Signature
    p;
    p1?;
    p2?: string;
    
    //Function Signature
    p3();
    p4? ();
    p5? (): void;
    p6(pa1): void;
    p7(pa1, pa2): void;
    p7? (pa1, pa2): void;
}
module M {
    var V;
    function F() { };
    class C {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    interface I {
        //Call Signature
        ();
        (): number;
        (p);
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
    
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);

        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];

        //Property Signature
        p;
        p1?;
        p2?: string;
    
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    module M {
        var V;
        function F() { };
        class C { };
        interface I { };
        module M { };
        export var eV;
        export function eF() { };
        export class eC { };
        export interface eI { };
        export module eM { };
        export declare var eaV;
        export declare function eaF() { };
        export declare class eaC { };
        export declare module eaM { };
    }
    export var eV;
    export function eF() { };
    export class eC {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p);
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
    
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);

        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];

        //Property Signature
        p;
        p1?;
        p2?: string;
    
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    export module eM {
        var V;
        function F() { };
        class C { };
        interface I { };
        module M { };
        export var eV;
        export function eF() { };
        export class eC { };
        export interface eI { };
        export module eM { };
        export declare var eaV;
        export declare function eaF() { };
        export declare class eaC { };
        export declare module eaM { };
    }
    export declare var eaV;
    export declare function eaF() { };
    export declare class eaC {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    export declare module eaM {
        var V;
        function F() { };
        class C { }
        interface I { }
        module M { }
        export var eV;
        export function eF() { };
        export class eC { }
        export interface eI { }
        export module eM { }
    }
}
export var eV;
export function eF() { };
export class eC {
    constructor () { }
    public pV;
    private rV;
    public pF() { }
    private rF() { }
    public pgF() { }
    public get pgF()
    public psF(param:any) { }
    public set psF(param:any)
    private rgF() { }
    private get rgF()
    private rsF(param:any) { }
    private set rsF(param:any)
    static tV;
    static tF() { }
    static tsF(param:any) { }
    static set tsF(param:any)
    static tgF() { }
    static get tgF()
}
export interface eI {
    //Call Signature
    ();
    (): number;
    (p);
    (p1: string);
    (p2?: string);
    (...p3: any[]);
    (p4: string, p5?: string);
    (p6: string, ...p7: any[]);
    //(p8?: string, ...p9: any[]);
    //(p10:string, p8?: string, ...p9: any[]);
    
    //Construct Signature
    new ();
    new (): number;
    new (p: string);
    new (p2?: string);
    new (...p3: any[]);
    new (p4: string, p5?: string);
    new (p6: string, ...p7: any[]);

    //Index Signature
    [p];
    [p1: string];
    [p2: string, p3: number];

    //Property Signature
    p;
    p1?;
    p2?: string;
    
    //Function Signature
    p3();
    p4? ();
    p5? (): void;
    p6(pa1): void;
    p7(pa1, pa2): void;
    p7? (pa1, pa2): void;
}
export module eM {
    var V;
    function F() { };
    class C {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    interface I {
        //Call Signature
        ();
        (): number;
        (p);
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
    
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);

        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];

        //Property Signature
        p;
        p1?;
        p2?: string;
    
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    module M {
        var V;
        function F() { };
        class C { };
        interface I { };
        module M { };
        export var eV;
        export function eF() { };
        export class eC { };
        export interface eI { };
        export module eM { };
        export declare var eaV;
        export declare function eaF() { };
        export declare class eaC { };
        export declare module eaM { };
    }
    export var eV;
    export function eF() { };
    export class eC {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p);
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
    
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);

        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];

        //Property Signature
        p;
        p1?;
        p2?: string;
    
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    export module eM {
        var V;
        function F() { };
        class C { };
        interface I { };
        module M { };
        export var eV;
        export function eF() { };
        export class eC { };
        export interface eI { };
        export module eM { };
        export declare var eaV;
        export declare function eaF() { };
        export declare class eaC { };
        export declare module eaM { };
    }
    export declare var eaV;
    export declare function eaF() { };
    export declare class eaC {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    export declare module eaM {
        var V;
        function F() { };
        class C { }
        interface I { }
        module M { }
        export var eV;
        export function eF() { };
        export class eC { }
        export interface eI { }
        export module eM { }
    }
}
export declare var eaV;
export declare function eaF() { };
export declare class eaC {
    constructor () { }
    public pV;
    private rV;
    public pF() { }
    private rF() { }
    public pgF() { }
    public get pgF()
    public psF(param:any) { }
    public set psF(param:any)
    private rgF() { }
    private get rgF()
    private rsF(param:any) { }
    private set rsF(param:any)
    static tV;
    static tF() { }
    static tsF(param:any) { }
    static set tsF(param:any)
    static tgF() { }
    static get tgF()
}
export declare module eaM {
    var V;
    function F() { };
    class C {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        static tV;
        static tF() { }
    }
    interface I {
        //Call Signature
        ();
        (): number;
        (p: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
    
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);

        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];

        //Property Signature
        p;
        p1?;
        p2?: string;
    
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    module M {
        var V;
        function F() { };
        class C { }
        interface I { }
        module M { }
        export var eV;
        export function eF() { };
        export class eC { }
        export interface eI { }
        export module eM { }
        export declare var eaV
        export declare function eaF() { };
        export declare class eaC { }
        export declare module eaM { }
    }
    export var eV;
    export function eF() { };
    export class eC {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        static tV
        static tF() { }
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p);
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
    
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);

        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];

        //Property Signature
        p;
        p1?;
        p2?: string;
    
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    export module eM {
        var V;
        function F() { };
        class C { }
        module M { }
        export var eV;
        export function eF() { };
        export class eC { }
        export interface eI { }
        export module eM { }
    }
}

/// [Declarations] ////



//// [/.src/giant.d.ts]
export declare var eV: invalid;
export declare function eF(): invalid;
export declare class eC {
    constructor();
    pV: invalid;
    private rV;
    pF(): invalid;
    private rF;
    pgF(): invalid;
    get pgF(): invalid;
    psF(param: any): invalid;
    set psF(param: any);
    private rgF;
    private get rgF();
    private rsF;
    private set rsF(value);
    static tV: invalid;
    static tF(): invalid;
    static tsF(param: any): invalid;
    static set tsF(param: any);
    static tgF(): invalid;
    static get tgF(): invalid;
}
export interface eI {
    (): any;
    (): number;
    (p: invalid): any;
    (p1: string): any;
    (p2?: string): any;
    (...p3: any[]): any;
    (p4: string, p5?: string): any;
    (p6: string, ...p7: any[]): any;
    new (): any;
    new (): number;
    new (p: string): any;
    new (p2?: string): any;
    new (...p3: any[]): any;
    new (p4: string, p5?: string): any;
    new (p6: string, ...p7: any[]): any;
    [p]: any;
    [p1: string]: any;
    [p2: string, p3: number]: any;
    p: any;
    p1?: any;
    p2?: string;
    p3(): any;
    p4?(): any;
    p5?(): void;
    p6(pa1: invalid): void;
    p7(pa1: invalid, pa2: invalid): void;
    p7?(pa1: invalid, pa2: invalid): void;
}
export declare namespace eM {
    var eV: invalid;
    function eF(): invalid;
    class eC {
        constructor();
        pV: invalid;
        private rV;
        pF(): invalid;
        private rF;
        pgF(): invalid;
        get pgF(): invalid;
        psF(param: any): invalid;
        set psF(param: any);
        private rgF;
        private get rgF();
        private rsF;
        private set rsF(value);
        static tV: invalid;
        static tF(): invalid;
        static tsF(param: any): invalid;
        static set tsF(param: any);
        static tgF(): invalid;
        static get tgF(): invalid;
    }
    interface eI {
        (): any;
        (): number;
        (p: invalid): any;
        (p1: string): any;
        (p2?: string): any;
        (...p3: any[]): any;
        (p4: string, p5?: string): any;
        (p6: string, ...p7: any[]): any;
        new (): any;
        new (): number;
        new (p: string): any;
        new (p2?: string): any;
        new (...p3: any[]): any;
        new (p4: string, p5?: string): any;
        new (p6: string, ...p7: any[]): any;
        [p]: any;
        [p1: string]: any;
        [p2: string, p3: number]: any;
        p: any;
        p1?: any;
        p2?: string;
        p3(): any;
        p4?(): any;
        p5?(): void;
        p6(pa1: invalid): void;
        p7(pa1: invalid, pa2: invalid): void;
        p7?(pa1: invalid, pa2: invalid): void;
    }
    namespace eM {
        var eV: invalid;
        function eF(): invalid;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
        var eaV: invalid;
        function eaF(): invalid;
        class eaC {
        }
        namespace eaM { }
    }
    var eaV: invalid;
    function eaF(): invalid;
    class eaC {
        constructor();
        pV: invalid;
        private rV;
        pF(): invalid;
        private rF;
        pgF(): invalid;
        get pgF(): invalid;
        psF(param: any): invalid;
        set psF(param: any);
        private rgF;
        private get rgF();
        private rsF;
        private set rsF(value);
        static tV: invalid;
        static tF(): invalid;
        static tsF(param: any): invalid;
        static set tsF(param: any);
        static tgF(): invalid;
        static get tgF(): invalid;
    }
    namespace eaM {
        var V: invalid;
        function F(): invalid;
        class C {
        }
        interface I {
        }
        namespace M { }
        var eV: invalid;
        function eF(): invalid;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
    }
}
export declare var eaV: invalid;
export declare function eaF(): invalid;
export declare class eaC {
    constructor();
    pV: invalid;
    private rV;
    pF(): invalid;
    private rF;
    pgF(): invalid;
    get pgF(): invalid;
    psF(param: any): invalid;
    set psF(param: any);
    private rgF;
    private get rgF();
    private rsF;
    private set rsF(value);
    static tV: invalid;
    static tF(): invalid;
    static tsF(param: any): invalid;
    static set tsF(param: any);
    static tgF(): invalid;
    static get tgF(): invalid;
}
export declare namespace eaM {
    var V: invalid;
    function F(): invalid;
    class C {
        constructor();
        pV: invalid;
        private rV;
        pF(): invalid;
        static tV: invalid;
        static tF(): invalid;
    }
    interface I {
        (): any;
        (): number;
        (p: string): any;
        (p2?: string): any;
        (...p3: any[]): any;
        (p4: string, p5?: string): any;
        (p6: string, ...p7: any[]): any;
        new (): any;
        new (): number;
        new (p: string): any;
        new (p2?: string): any;
        new (...p3: any[]): any;
        new (p4: string, p5?: string): any;
        new (p6: string, ...p7: any[]): any;
        [p]: any;
        [p1: string]: any;
        [p2: string, p3: number]: any;
        p: any;
        p1?: any;
        p2?: string;
        p3(): any;
        p4?(): any;
        p5?(): void;
        p6(pa1: invalid): void;
        p7(pa1: invalid, pa2: invalid): void;
        p7?(pa1: invalid, pa2: invalid): void;
    }
    namespace M {
        var V: invalid;
        function F(): invalid;
        class C {
        }
        interface I {
        }
        namespace M { }
        var eV: invalid;
        function eF(): invalid;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
        var eaV: invalid;
        function eaF(): invalid;
        class eaC {
        }
        namespace eaM { }
    }
    var eV: invalid;
    function eF(): invalid;
    class eC {
        constructor();
        pV: invalid;
        private rV;
        pF(): invalid;
        static tV: invalid;
        static tF(): invalid;
    }
    interface eI {
        (): any;
        (): number;
        (p: invalid): any;
        (p1: string): any;
        (p2?: string): any;
        (...p3: any[]): any;
        (p4: string, p5?: string): any;
        (p6: string, ...p7: any[]): any;
        new (): any;
        new (): number;
        new (p: string): any;
        new (p2?: string): any;
        new (...p3: any[]): any;
        new (p4: string, p5?: string): any;
        new (p6: string, ...p7: any[]): any;
        [p]: any;
        [p1: string]: any;
        [p2: string, p3: number]: any;
        p: any;
        p1?: any;
        p2?: string;
        p3(): any;
        p4?(): any;
        p5?(): void;
        p6(pa1: invalid): void;
        p7(pa1: invalid, pa2: invalid): void;
        p7?(pa1: invalid, pa2: invalid): void;
    }
    namespace eM {
        var V: invalid;
        function F(): invalid;
        class C {
        }
        namespace M { }
        var eV: invalid;
        function eF(): invalid;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
    }
}
/// [Errors] ////

giant.ts(272,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(273,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(276,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(278,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(280,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(281,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(282,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(288,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(289,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(290,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(292,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(293,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(299,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(331,8): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(332,8): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(332,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(333,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(333,15): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(415,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(416,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(419,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(421,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(423,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(424,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(425,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(431,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(432,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(433,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(435,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(436,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(442,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(474,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(475,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(475,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(476,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(476,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(484,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(485,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(489,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(490,33): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(494,24): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(495,29): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(498,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(500,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(502,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(503,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(504,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(510,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(511,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(512,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(514,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(515,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(518,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(519,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(523,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(524,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(530,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(531,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(534,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(536,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(538,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(539,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(540,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(546,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(547,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(548,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(550,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(551,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(554,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(555,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(558,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(560,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(561,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(562,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(599,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(600,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(600,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(601,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(601,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(604,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(605,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(609,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(610,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(614,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(615,33): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(619,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(620,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(623,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(625,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(626,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(627,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(633,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(665,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(666,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(666,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(667,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(667,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(670,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(671,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(674,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(675,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== giant.ts (101 errors) ====
    /*
        Prefixes
        p -> public
        r -> private
        i -> import
        e -> export
        a -> ambient
        t -> static
        s -> set
        g -> get
    
        MAX DEPTH 3 LEVELS
    */
    var V;
    function F() { };
    class C {
        constructor () { }
        public pV;
        private rV;
        public pF() { }
        private rF() { }
        public pgF() { }
        public get pgF()
        public psF(param:any) { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
        static tF() { }
        static tsF(param:any) { }
        static set tsF(param:any)
        static tgF() { }
        static get tgF()
    }
    interface I {
        //Call Signature
        ();
        (): number;
        (p);
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
        
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);
    
        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];
    
        //Property Signature
        p;
        p1?;
        p2?: string;
        
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
        p7(pa1, pa2): void;
        p7? (pa1, pa2): void;
    }
    module M {
        var V;
        function F() { };
        class C {
            constructor () { }
            public pV;
            private rV;
            public pF() { }
            private rF() { }
            public pgF() { }
            public get pgF()
            public psF(param:any) { }
            public set psF(param:any)
            private rgF() { }
            private get rgF()
            private rsF(param:any) { }
            private set rsF(param:any)
            static tV;
            static tF() { }
            static tsF(param:any) { }
            static set tsF(param:any)
            static tgF() { }
            static get tgF()
        }
        interface I {
            //Call Signature
            ();
            (): number;
            (p);
            (p1: string);
            (p2?: string);
            (...p3: any[]);
            (p4: string, p5?: string);
            (p6: string, ...p7: any[]);
            //(p8?: string, ...p9: any[]);
            //(p10:string, p8?: string, ...p9: any[]);
        
            //Construct Signature
            new ();
            new (): number;
            new (p: string);
            new (p2?: string);
            new (...p3: any[]);
            new (p4: string, p5?: string);
            new (p6: string, ...p7: any[]);
    
            //Index Signature
            [p];
            [p1: string];
            [p2: string, p3: number];
    
            //Property Signature
            p;
            p1?;
            p2?: string;
        
            //Function Signature
            p3();
            p4? ();
            p5? (): void;
            p6(pa1): void;
            p7(pa1, pa2): void;
            p7? (pa1, pa2): void;
        }
        module M {
            var V;
            function F() { };
            class C { };
            interface I { };
            module M { };
            export var eV;
            export function eF() { };
            export class eC { };
            export interface eI { };
            export module eM { };
            export declare var eaV;
            export declare function eaF() { };
            export declare class eaC { };
            export declare module eaM { };
        }
        export var eV;
        export function eF() { };
        export class eC {
            constructor () { }
            public pV;
            private rV;
            public pF() { }
            private rF() { }
            public pgF() { }
            public get pgF()
            public psF(param:any) { }
            public set psF(param:any)
            private rgF() { }
            private get rgF()
            private rsF(param:any) { }
            private set rsF(param:any)
            static tV;
            static tF() { }
            static tsF(param:any) { }
            static set tsF(param:any)
            static tgF() { }
            static get tgF()
        }
        export interface eI {
            //Call Signature
            ();
            (): number;
            (p);
            (p1: string);
            (p2?: string);
            (...p3: any[]);
            (p4: string, p5?: string);
            (p6: string, ...p7: any[]);
            //(p8?: string, ...p9: any[]);
            //(p10:string, p8?: string, ...p9: any[]);
        
            //Construct Signature
            new ();
            new (): number;
            new (p: string);
            new (p2?: string);
            new (...p3: any[]);
            new (p4: string, p5?: string);
            new (p6: string, ...p7: any[]);
    
            //Index Signature
            [p];
            [p1: string];
            [p2: string, p3: number];
    
            //Property Signature
            p;
            p1?;
            p2?: string;
        
            //Function Signature
            p3();
            p4? ();
            p5? (): void;
            p6(pa1): void;
            p7(pa1, pa2): void;
            p7? (pa1, pa2): void;
        }
        export module eM {
            var V;
            function F() { };
            class C { };
            interface I { };
            module M { };
            export var eV;
            export function eF() { };
            export class eC { };
            export interface eI { };
            export module eM { };
            export declare var eaV;
            export declare function eaF() { };
            export declare class eaC { };
            export declare module eaM { };
        }
        export declare var eaV;
        export declare function eaF() { };
        export declare class eaC {
            constructor () { }
            public pV;
            private rV;
            public pF() { }
            private rF() { }
            public pgF() { }
            public get pgF()
            public psF(param:any) { }
            public set psF(param:any)
            private rgF() { }
            private get rgF()
            private rsF(param:any) { }
            private set rsF(param:any)
            static tV;
            static tF() { }
            static tsF(param:any) { }
            static set tsF(param:any)
            static tgF() { }
            static get tgF()
        }
        export declare module eaM {
            var V;
            function F() { };
            class C { }
            interface I { }
            module M { }
            export var eV;
            export function eF() { };
            export class eC { }
            export interface eI { }
            export module eM { }
        }
    }
    export var eV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    export function eF() { };
                    ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    export class eC {
        constructor () { }
        public pV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        private rV;
        public pF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        private rF() { }
        public pgF() { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public get pgF()
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public psF(param:any) { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tsF(param:any) { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static set tsF(param:any)
        static tgF() { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static get tgF()
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p);
         ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        (p1: string);
        (p2?: string);
        (...p3: any[]);
        (p4: string, p5?: string);
        (p6: string, ...p7: any[]);
        //(p8?: string, ...p9: any[]);
        //(p10:string, p8?: string, ...p9: any[]);
        
        //Construct Signature
        new ();
        new (): number;
        new (p: string);
        new (p2?: string);
        new (...p3: any[]);
        new (p4: string, p5?: string);
        new (p6: string, ...p7: any[]);
    
        //Index Signature
        [p];
        [p1: string];
        [p2: string, p3: number];
    
        //Property Signature
        p;
        p1?;
        p2?: string;
        
        //Function Signature
        p3();
        p4? ();
        p5? (): void;
        p6(pa1): void;
           ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        p7(pa1, pa2): void;
           ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        p7? (pa1, pa2): void;
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                  ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    export module eM {
        var V;
        function F() { };
        class C {
            constructor () { }
            public pV;
            private rV;
            public pF() { }
            private rF() { }
            public pgF() { }
            public get pgF()
            public psF(param:any) { }
            public set psF(param:any)
            private rgF() { }
            private get rgF()
            private rsF(param:any) { }
            private set rsF(param:any)
            static tV;
            static tF() { }
            static tsF(param:any) { }
            static set tsF(param:any)
            static tgF() { }
            static get tgF()
        }
        interface I {
            //Call Signature
            ();
            (): number;
            (p);
            (p1: string);
            (p2?: string);
            (...p3: any[]);
            (p4: string, p5?: string);
            (p6: string, ...p7: any[]);
            //(p8?: string, ...p9: any[]);
            //(p10:string, p8?: string, ...p9: any[]);
        
            //Construct Signature
            new ();
            new (): number;
            new (p: string);
            new (p2?: string);
            new (...p3: any[]);
            new (p4: string, p5?: string);
            new (p6: string, ...p7: any[]);
    
            //Index Signature
            [p];
            [p1: string];
            [p2: string, p3: number];
    
            //Property Signature
            p;
            p1?;
            p2?: string;
        
            //Function Signature
            p3();
            p4? ();
            p5? (): void;
            p6(pa1): void;
            p7(pa1, pa2): void;
            p7? (pa1, pa2): void;
        }
        module M {
            var V;
            function F() { };
            class C { };
            interface I { };
            module M { };
            export var eV;
            export function eF() { };
            export class eC { };
            export interface eI { };
            export module eM { };
            export declare var eaV;
            export declare function eaF() { };
            export declare class eaC { };
            export declare module eaM { };
        }
        export var eV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export function eF() { };
                        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export class eC {
            constructor () { }
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rF() { }
            public pgF() { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public get pgF()
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public psF(param:any) { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public set psF(param:any)
            private rgF() { }
            private get rgF()
            private rsF(param:any) { }
            private set rsF(param:any)
            static tV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tsF(param:any) { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static set tsF(param:any)
            static tgF() { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static get tgF()
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        export interface eI {
            //Call Signature
            ();
            (): number;
            (p);
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            (p1: string);
            (p2?: string);
            (...p3: any[]);
            (p4: string, p5?: string);
            (p6: string, ...p7: any[]);
            //(p8?: string, ...p9: any[]);
            //(p10:string, p8?: string, ...p9: any[]);
        
            //Construct Signature
            new ();
            new (): number;
            new (p: string);
            new (p2?: string);
            new (...p3: any[]);
            new (p4: string, p5?: string);
            new (p6: string, ...p7: any[]);
    
            //Index Signature
            [p];
            [p1: string];
            [p2: string, p3: number];
    
            //Property Signature
            p;
            p1?;
            p2?: string;
        
            //Function Signature
            p3();
            p4? ();
            p5? (): void;
            p6(pa1): void;
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            p7(pa1, pa2): void;
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            p7? (pa1, pa2): void;
                 ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        export module eM {
            var V;
            function F() { };
            class C { };
            interface I { };
            module M { };
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export class eC { };
            export interface eI { };
            export module eM { };
            export declare var eaV;
                               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export declare function eaF() { };
                                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export declare class eaC { };
            export declare module eaM { };
        }
        export declare var eaV;
                           ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export declare function eaF() { };
                                ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export declare class eaC {
            constructor () { }
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rF() { }
            public pgF() { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public get pgF()
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public psF(param:any) { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public set psF(param:any)
            private rgF() { }
            private get rgF()
            private rsF(param:any) { }
            private set rsF(param:any)
            static tV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tsF(param:any) { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static set tsF(param:any)
            static tgF() { }
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static get tgF()
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        export declare module eaM {
            var V;
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            function F() { };
                     ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            class C { }
            interface I { }
            module M { }
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export class eC { }
            export interface eI { }
            export module eM { }
        }
    }
    export declare var eaV;
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    export declare function eaF() { };
                            ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    export declare class eaC {
        constructor () { }
        public pV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        private rV;
        public pF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        private rF() { }
        public pgF() { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public get pgF()
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public psF(param:any) { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tsF(param:any) { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static set tsF(param:any)
        static tgF() { }
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static get tgF()
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    export declare module eaM {
        var V;
            ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        function F() { };
                 ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        class C {
            constructor () { }
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        interface I {
            //Call Signature
            ();
            (): number;
            (p: string);
            (p2?: string);
            (...p3: any[]);
            (p4: string, p5?: string);
            (p6: string, ...p7: any[]);
            //(p8?: string, ...p9: any[]);
            //(p10:string, p8?: string, ...p9: any[]);
        
            //Construct Signature
            new ();
            new (): number;
            new (p: string);
            new (p2?: string);
            new (...p3: any[]);
            new (p4: string, p5?: string);
            new (p6: string, ...p7: any[]);
    
            //Index Signature
            [p];
            [p1: string];
            [p2: string, p3: number];
    
            //Property Signature
            p;
            p1?;
            p2?: string;
        
            //Function Signature
            p3();
            p4? ();
            p5? (): void;
            p6(pa1): void;
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            p7(pa1, pa2): void;
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            p7? (pa1, pa2): void;
                 ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        module M {
            var V;
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            function F() { };
                     ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            class C { }
            interface I { }
            module M { }
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export class eC { }
            export interface eI { }
            export module eM { }
            export declare var eaV
                               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export declare function eaF() { };
                                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export declare class eaC { }
            export declare module eaM { }
        }
        export var eV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export function eF() { };
                        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export class eC {
            constructor () { }
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tV
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        export interface eI {
            //Call Signature
            ();
            (): number;
            (p);
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            (p1: string);
            (p2?: string);
            (...p3: any[]);
            (p4: string, p5?: string);
            (p6: string, ...p7: any[]);
            //(p8?: string, ...p9: any[]);
            //(p10:string, p8?: string, ...p9: any[]);
        
            //Construct Signature
            new ();
            new (): number;
            new (p: string);
            new (p2?: string);
            new (...p3: any[]);
            new (p4: string, p5?: string);
            new (p6: string, ...p7: any[]);
    
            //Index Signature
            [p];
            [p1: string];
            [p2: string, p3: number];
    
            //Property Signature
            p;
            p1?;
            p2?: string;
        
            //Function Signature
            p3();
            p4? ();
            p5? (): void;
            p6(pa1): void;
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            p7(pa1, pa2): void;
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            p7? (pa1, pa2): void;
                 ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                      ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
        export module eM {
            var V;
                ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            function F() { };
                     ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            class C { }
            module M { }
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export class eC { }
            export interface eI { }
            export module eM { }
        }
    }