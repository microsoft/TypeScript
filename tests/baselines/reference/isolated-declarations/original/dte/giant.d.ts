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



//// [giant.d.ts]
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

giant.ts(22,12): error TS2300: Duplicate identifier 'pgF'.
giant.ts(23,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(23,20): error TS1005: '{' expected.
giant.ts(24,12): error TS2300: Duplicate identifier 'psF'.
giant.ts(25,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(25,29): error TS1005: '{' expected.
giant.ts(26,13): error TS2300: Duplicate identifier 'rgF'.
giant.ts(27,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(27,21): error TS1005: '{' expected.
giant.ts(28,13): error TS2300: Duplicate identifier 'rsF'.
giant.ts(29,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(29,30): error TS1005: '{' expected.
giant.ts(32,12): error TS2300: Duplicate identifier 'tsF'.
giant.ts(33,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(33,29): error TS1005: '{' expected.
giant.ts(34,12): error TS2300: Duplicate identifier 'tgF'.
giant.ts(35,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(35,20): error TS1005: '{' expected.
giant.ts(60,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(60,6): error TS2304: Cannot find name 'p'.
giant.ts(61,5): error TS1021: An index signature must have a type annotation.
giant.ts(62,6): error TS1096: An index signature must have exactly one parameter.
giant.ts(75,5): error TS2386: Overload signatures must all be optional or required.
giant.ts(86,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(87,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(87,24): error TS1005: '{' expected.
giant.ts(88,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(89,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(89,33): error TS1005: '{' expected.
giant.ts(90,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(91,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(91,25): error TS1005: '{' expected.
giant.ts(92,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(93,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(93,34): error TS1005: '{' expected.
giant.ts(96,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(97,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(97,33): error TS1005: '{' expected.
giant.ts(98,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(99,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(99,24): error TS1005: '{' expected.
giant.ts(124,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(124,10): error TS2304: Cannot find name 'p'.
giant.ts(125,9): error TS1021: An index signature must have a type annotation.
giant.ts(126,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(139,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(153,39): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(165,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(166,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(166,24): error TS1005: '{' expected.
giant.ts(167,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(168,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(168,33): error TS1005: '{' expected.
giant.ts(169,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(170,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(170,25): error TS1005: '{' expected.
giant.ts(171,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(172,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(172,34): error TS1005: '{' expected.
giant.ts(175,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(176,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(176,33): error TS1005: '{' expected.
giant.ts(177,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(178,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(178,24): error TS1005: '{' expected.
giant.ts(203,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(203,10): error TS2304: Cannot find name 'p'.
giant.ts(204,9): error TS1021: An index signature must have a type annotation.
giant.ts(205,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(218,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(232,39): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(237,35): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(239,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(242,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(243,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(244,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(244,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(245,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(246,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(246,31): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(247,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(248,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(248,23): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(249,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(250,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(250,32): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(251,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(253,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(254,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(254,31): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(255,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(256,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(256,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(257,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(261,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(261,25): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(266,30): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(272,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(273,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(276,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(278,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(280,12): error TS2300: Duplicate identifier 'pgF'.
giant.ts(280,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(281,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(281,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(281,20): error TS1005: '{' expected.
giant.ts(282,12): error TS2300: Duplicate identifier 'psF'.
giant.ts(282,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(283,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(283,29): error TS1005: '{' expected.
giant.ts(284,13): error TS2300: Duplicate identifier 'rgF'.
giant.ts(285,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(285,21): error TS1005: '{' expected.
giant.ts(286,13): error TS2300: Duplicate identifier 'rsF'.
giant.ts(287,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(287,30): error TS1005: '{' expected.
giant.ts(288,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(289,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(290,12): error TS2300: Duplicate identifier 'tsF'.
giant.ts(290,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(291,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(291,29): error TS1005: '{' expected.
giant.ts(292,12): error TS2300: Duplicate identifier 'tgF'.
giant.ts(292,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(293,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(293,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(293,20): error TS1005: '{' expected.
giant.ts(299,6): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(318,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(318,6): error TS2304: Cannot find name 'p'.
giant.ts(319,5): error TS1021: An index signature must have a type annotation.
giant.ts(320,6): error TS1096: An index signature must have exactly one parameter.
giant.ts(331,8): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(332,8): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(332,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(333,5): error TS2386: Overload signatures must all be optional or required.
giant.ts(333,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(333,15): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(344,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(345,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(345,24): error TS1005: '{' expected.
giant.ts(346,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(347,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(347,33): error TS1005: '{' expected.
giant.ts(348,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(349,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(349,25): error TS1005: '{' expected.
giant.ts(350,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(351,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(351,34): error TS1005: '{' expected.
giant.ts(354,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(355,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(355,33): error TS1005: '{' expected.
giant.ts(356,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(357,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(357,24): error TS1005: '{' expected.
giant.ts(382,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(382,10): error TS2304: Cannot find name 'p'.
giant.ts(383,9): error TS1021: An index signature must have a type annotation.
giant.ts(384,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(397,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(411,39): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(415,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(416,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(419,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(421,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(423,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(423,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(424,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(424,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(424,24): error TS1005: '{' expected.
giant.ts(425,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(425,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(426,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(426,33): error TS1005: '{' expected.
giant.ts(427,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(428,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(428,25): error TS1005: '{' expected.
giant.ts(429,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(430,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(430,34): error TS1005: '{' expected.
giant.ts(431,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(432,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(433,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(433,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(434,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(434,33): error TS1005: '{' expected.
giant.ts(435,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(435,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(436,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(436,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(436,24): error TS1005: '{' expected.
giant.ts(442,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(461,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(461,10): error TS2304: Cannot find name 'p'.
giant.ts(462,9): error TS1021: An index signature must have a type annotation.
giant.ts(463,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(474,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(475,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(475,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(476,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(476,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(476,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(484,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(485,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(489,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(490,33): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(490,39): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(494,24): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(495,29): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(495,35): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(497,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(498,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(500,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(500,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(501,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(502,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(502,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(502,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(503,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(503,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(504,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(504,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(504,31): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(505,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(506,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(506,23): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(507,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(508,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(508,32): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(509,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(510,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(511,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(511,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(512,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(512,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(512,31): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(513,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(514,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(514,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(514,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(515,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(515,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(518,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(519,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(519,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(519,25): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(523,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(524,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(524,30): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(530,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(531,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(531,31): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(533,20): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(534,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(536,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(536,17): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(537,18): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(538,12): error TS2300: Duplicate identifier 'pgF'.
giant.ts(538,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(538,18): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(539,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(539,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(540,12): error TS2300: Duplicate identifier 'psF'.
giant.ts(540,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(540,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(541,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(542,13): error TS2300: Duplicate identifier 'rgF'.
giant.ts(542,19): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(543,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(544,13): error TS2300: Duplicate identifier 'rsF'.
giant.ts(544,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(545,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(546,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(547,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(547,17): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(548,12): error TS2300: Duplicate identifier 'tsF'.
giant.ts(548,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(548,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(549,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(550,12): error TS2300: Duplicate identifier 'tgF'.
giant.ts(550,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(550,18): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(551,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(551,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(554,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(555,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(555,18): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(555,21): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(557,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(558,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(560,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(560,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(561,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(562,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(562,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(586,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(586,10): error TS2304: Cannot find name 'p'.
giant.ts(587,9): error TS1021: An index signature must have a type annotation.
giant.ts(588,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(599,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(600,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(600,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(601,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(601,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(601,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(604,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(605,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(605,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(605,25): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(609,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(610,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(610,30): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(614,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(614,28): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(615,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(615,33): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(615,39): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(616,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(617,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(619,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(620,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(620,26): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(622,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(623,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(625,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(625,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(626,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(627,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(627,21): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(633,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(652,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(652,10): error TS2304: Cannot find name 'p'.
giant.ts(653,9): error TS1021: An index signature must have a type annotation.
giant.ts(654,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(665,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(666,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(666,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(667,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(667,14): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(667,19): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(670,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(671,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(671,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(671,25): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(674,20): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(675,25): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
giant.ts(675,30): error TS1183: An implementation cannot be declared in ambient contexts.


==== giant.ts (348 errors) ====
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
               ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
        public get pgF()
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                       ~
!!! error TS1005: '{' expected.
        public psF(param:any) { }
               ~~~
!!! error TS2300: Duplicate identifier 'psF'.
        public set psF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                ~
!!! error TS1005: '{' expected.
        private rgF() { }
                ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
        private get rgF()
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                        ~
!!! error TS1005: '{' expected.
        private rsF(param:any) { }
                ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
        private set rsF(param:any)
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                 ~
!!! error TS1005: '{' expected.
        static tV;
        static tF() { }
        static tsF(param:any) { }
               ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
        static set tsF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                ~
!!! error TS1005: '{' expected.
        static tgF() { }
               ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
        static get tgF()
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                       ~
!!! error TS1005: '{' expected.
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
        ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'p'.
        [p1: string];
        ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
        [p2: string, p3: number];
         ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
        ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
            public get pgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                           ~
!!! error TS1005: '{' expected.
            public psF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
            public set psF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                    ~
!!! error TS1005: '{' expected.
            private rgF() { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
            private get rgF()
                        ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                            ~
!!! error TS1005: '{' expected.
            private rsF(param:any) { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
            private set rsF(param:any)
                        ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                     ~
!!! error TS1005: '{' expected.
            static tV;
            static tF() { }
            static tsF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                    ~
!!! error TS1005: '{' expected.
            static tgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
            static get tgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                           ~
!!! error TS1005: '{' expected.
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
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
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
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
            public get pgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                           ~
!!! error TS1005: '{' expected.
            public psF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
            public set psF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                    ~
!!! error TS1005: '{' expected.
            private rgF() { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
            private get rgF()
                        ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                            ~
!!! error TS1005: '{' expected.
            private rsF(param:any) { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
            private set rsF(param:any)
                        ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                     ~
!!! error TS1005: '{' expected.
            static tV;
            static tF() { }
            static tsF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                    ~
!!! error TS1005: '{' expected.
            static tgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
            static get tgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                           ~
!!! error TS1005: '{' expected.
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
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export declare class eaC { };
            export declare module eaM { };
        }
        export declare var eaV;
        export declare function eaF() { };
                                      ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        export declare class eaC {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV;
            private rV;
            public pF() { }
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private rF() { }
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public get pgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
            public psF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                  ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public set psF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'psF'.
            private rgF() { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private get rgF()
                        ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
            private rsF(param:any) { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                   ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private set rsF(param:any)
                        ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
            static tV;
            static tF() { }
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tsF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                  ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static tgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static get tgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
        }
        export declare module eaM {
            var V;
            function F() { };
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                            ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            interface I { }
            module M { }
            export var eV;
            export function eF() { };
                                 ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
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
!!! error TS2300: Duplicate identifier 'pgF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public get pgF()
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~
!!! error TS1005: '{' expected.
        public psF(param:any) { }
               ~~~
!!! error TS2300: Duplicate identifier 'psF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public set psF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                ~
!!! error TS1005: '{' expected.
        private rgF() { }
                ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
        private get rgF()
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                        ~
!!! error TS1005: '{' expected.
        private rsF(param:any) { }
                ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
        private set rsF(param:any)
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                 ~
!!! error TS1005: '{' expected.
        static tV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tsF(param:any) { }
               ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static set tsF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                ~
!!! error TS1005: '{' expected.
        static tgF() { }
               ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static get tgF()
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                       ~
!!! error TS1005: '{' expected.
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
        ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'p'.
        [p1: string];
        ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
        [p2: string, p3: number];
         ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
        ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
            public get pgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                           ~
!!! error TS1005: '{' expected.
            public psF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
            public set psF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                    ~
!!! error TS1005: '{' expected.
            private rgF() { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
            private get rgF()
                        ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                            ~
!!! error TS1005: '{' expected.
            private rsF(param:any) { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
            private set rsF(param:any)
                        ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                     ~
!!! error TS1005: '{' expected.
            static tV;
            static tF() { }
            static tsF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                    ~
!!! error TS1005: '{' expected.
            static tgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
            static get tgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                           ~
!!! error TS1005: '{' expected.
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
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
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
!!! error TS2300: Duplicate identifier 'pgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public get pgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                           ~
!!! error TS1005: '{' expected.
            public psF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public set psF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                                    ~
!!! error TS1005: '{' expected.
            private rgF() { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
            private get rgF()
                        ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                            ~
!!! error TS1005: '{' expected.
            private rsF(param:any) { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
            private set rsF(param:any)
                        ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                     ~
!!! error TS1005: '{' expected.
            static tV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tsF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                    ~
!!! error TS1005: '{' expected.
            static tgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static get tgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                           ~
!!! error TS1005: '{' expected.
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
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export declare class eaC { };
            export declare module eaM { };
        }
        export declare var eaV;
                           ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export declare function eaF() { };
                                ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                      ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        export declare class eaC {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private rF() { }
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public get pgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                       ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            public psF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                  ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public set psF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'psF'.
            private rgF() { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private get rgF()
                        ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
            private rsF(param:any) { }
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                                   ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private set rsF(param:any)
                        ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
            static tV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tsF(param:any) { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                  ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static tgF() { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static get tgF()
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
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
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                            ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            interface I { }
            module M { }
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                 ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
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
                                  ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
    export declare class eaC {
        constructor () { }
                       ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public pV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        private rV;
        public pF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        private rF() { }
                     ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public pgF() { }
               ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                     ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public get pgF()
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                   ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        public psF(param:any) { }
               ~~~
!!! error TS2300: Duplicate identifier 'psF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public set psF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'psF'.
        private rgF() { }
                ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
                      ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        private get rgF()
                    ~~~
!!! error TS2300: Duplicate identifier 'rgF'.
        private rsF(param:any) { }
                ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        private set rsF(param:any)
                    ~~~
!!! error TS2300: Duplicate identifier 'rsF'.
        static tV;
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static tF() { }
               ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        static tsF(param:any) { }
               ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        static set tsF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
        static tgF() { }
               ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                     ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        static get tgF()
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
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
                     ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                        ~
!!! error TS1036: Statements are not allowed in ambient contexts.
        class C {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
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
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                            ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            interface I { }
            module M { }
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                 ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export class eC { }
            export interface eI { }
            export module eM { }
            export declare var eaV
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
                               ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export declare function eaF() { };
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
                                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export declare class eaC { }
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
            export declare module eaM { }
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
        }
        export var eV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        export function eF() { };
                        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                             ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        export class eC {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV;
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            private rV;
            public pF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tV
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            static tF() { }
                   ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
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
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    
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
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                            ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            module M { }
            export var eV;
                       ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            export function eF() { };
                            ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                 ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export class eC { }
            export interface eI { }
            export module eM { }
        }
    }