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
export var eV: any;
export function eF(): void { };
export class eC {
    constructor () { }
    public pV: any;
    private rV;
    public pF(): void { }
    private rF() { }
    public pgF(): void { }
    public get pgF(): any
    public psF(param:any): void { }
    public set psF(param:any)
    private rgF() { }
    private get rgF()
    private rsF(param:any) { }
    private set rsF(param:any)
    static tV: any;
    static tF(): void { }
    static tsF(param:any): void { }
    static set tsF(param:any)
    static tgF(): void { }
    static get tgF(): any
}
export interface eI {
    //Call Signature
    ();
    (): number;
    (p: any);
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
    p6(pa1: any): void;
    p7(pa1: any, pa2: any): void;
    p7? (pa1: any, pa2: any): void;
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
    export var eV: any;
    export function eF(): void { };
    export class eC {
        constructor () { }
        public pV: any;
        private rV;
        public pF(): void { }
        private rF() { }
        public pgF(): void { }
        public get pgF(): any
        public psF(param:any): void { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV: any;
        static tF(): void { }
        static tsF(param:any): void { }
        static set tsF(param:any)
        static tgF(): void { }
        static get tgF(): any
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p: any);
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7? (pa1: any, pa2: any): void;
    }
    export module eM {
        var V;
        function F() { };
        class C { };
        interface I { };
        module M { };
        export var eV: any;
        export function eF(): void { };
        export class eC { };
        export interface eI { };
        export module eM { };
        export declare var eaV: any;
        export declare function eaF(): void { };
        export declare class eaC { };
        export declare module eaM { };
    }
    export declare var eaV: any;
    export declare function eaF(): void { };
    export declare class eaC {
        constructor () { }
        public pV: any;
        private rV;
        public pF(): void { }
        private rF() { }
        public pgF(): void { }
        public get pgF(): any
        public psF(param:any): void { }
        public set psF(param:any)
        private rgF() { }
        private get rgF()
        private rsF(param:any) { }
        private set rsF(param:any)
        static tV: any;
        static tF(): void { }
        static tsF(param:any): void { }
        static set tsF(param:any)
        static tgF(): void { }
        static get tgF(): any
    }
    export declare module eaM {
        var V: any;
        function F(): void { };
        class C { }
        interface I { }
        module M { }
        export var eV: any;
        export function eF(): void { };
        export class eC { }
        export interface eI { }
        export module eM { }
    }
}
export declare var eaV: any;
export declare function eaF(): void { };
export declare class eaC {
    constructor () { }
    public pV: any;
    private rV;
    public pF(): void { }
    private rF() { }
    public pgF(): void { }
    public get pgF(): any
    public psF(param:any): void { }
    public set psF(param:any)
    private rgF() { }
    private get rgF()
    private rsF(param:any) { }
    private set rsF(param:any)
    static tV: any;
    static tF(): void { }
    static tsF(param:any): void { }
    static set tsF(param:any)
    static tgF(): void { }
    static get tgF(): any
}
export declare module eaM {
    var V: any;
    function F(): void { };
    class C {
        constructor () { }
        public pV: any;
        private rV;
        public pF(): void { }
        static tV: any;
        static tF(): void { }
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7? (pa1: any, pa2: any): void;
    }
    module M {
        var V: any;
        function F(): void { };
        class C { }
        interface I { }
        module M { }
        export var eV: any;
        export function eF(): void { };
        export class eC { }
        export interface eI { }
        export module eM { }
        export declare var eaV: any
        export declare function eaF(): void { };
        export declare class eaC { }
        export declare module eaM { }
    }
    export var eV: any;
    export function eF(): void { };
    export class eC {
        constructor () { }
        public pV: any;
        private rV;
        public pF(): void { }
        static tV: any
        static tF(): void { }
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p: any);
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7? (pa1: any, pa2: any): void;
    }
    export module eM {
        var V: any;
        function F(): void { };
        class C { }
        module M { }
        export var eV: any;
        export function eF(): void { };
        export class eC { }
        export interface eI { }
        export module eM { }
    }
}

/// [Declarations] ////



//// [giant.d.ts]
export declare var eV: any;
export declare function eF(): void;
export declare class eC {
    constructor();
    pV: any;
    private rV;
    pF(): void;
    private rF;
    pgF(): void;
    get pgF(): any;
    psF(param: any): void;
    set psF(param: any);
    private rgF;
    private get rgF();
    private rsF;
    private set rsF(value);
    static tV: any;
    static tF(): void;
    static tsF(param: any): void;
    static set tsF(param: any);
    static tgF(): void;
    static get tgF(): any;
}
export interface eI {
    (): any;
    (): number;
    (p: any): any;
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
    p6(pa1: any): void;
    p7(pa1: any, pa2: any): void;
    p7?(pa1: any, pa2: any): void;
}
export declare namespace eM {
    var eV: any;
    function eF(): void;
    class eC {
        constructor();
        pV: any;
        private rV;
        pF(): void;
        private rF;
        pgF(): void;
        get pgF(): any;
        psF(param: any): void;
        set psF(param: any);
        private rgF;
        private get rgF();
        private rsF;
        private set rsF(value);
        static tV: any;
        static tF(): void;
        static tsF(param: any): void;
        static set tsF(param: any);
        static tgF(): void;
        static get tgF(): any;
    }
    interface eI {
        (): any;
        (): number;
        (p: any): any;
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7?(pa1: any, pa2: any): void;
    }
    namespace eM {
        var eV: any;
        function eF(): void;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
        var eaV: any;
        function eaF(): void;
        class eaC {
        }
        namespace eaM { }
    }
    var eaV: any;
    function eaF(): void;
    class eaC {
        constructor();
        pV: any;
        private rV;
        pF(): void;
        private rF;
        pgF(): void;
        get pgF(): any;
        psF(param: any): void;
        set psF(param: any);
        private rgF;
        private get rgF();
        private rsF;
        private set rsF(value);
        static tV: any;
        static tF(): void;
        static tsF(param: any): void;
        static set tsF(param: any);
        static tgF(): void;
        static get tgF(): any;
    }
    namespace eaM {
        var V: any;
        function F(): void;
        class C {
        }
        interface I {
        }
        namespace M { }
        var eV: any;
        function eF(): void;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
    }
}
export declare var eaV: any;
export declare function eaF(): void;
export declare class eaC {
    constructor();
    pV: any;
    private rV;
    pF(): void;
    private rF;
    pgF(): void;
    get pgF(): any;
    psF(param: any): void;
    set psF(param: any);
    private rgF;
    private get rgF();
    private rsF;
    private set rsF(value);
    static tV: any;
    static tF(): void;
    static tsF(param: any): void;
    static set tsF(param: any);
    static tgF(): void;
    static get tgF(): any;
}
export declare namespace eaM {
    var V: any;
    function F(): void;
    class C {
        constructor();
        pV: any;
        private rV;
        pF(): void;
        static tV: any;
        static tF(): void;
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7?(pa1: any, pa2: any): void;
    }
    namespace M {
        var V: any;
        function F(): void;
        class C {
        }
        interface I {
        }
        namespace M { }
        var eV: any;
        function eF(): void;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
        var eaV: any;
        function eaF(): void;
        class eaC {
        }
        namespace eaM { }
    }
    var eV: any;
    function eF(): void;
    class eC {
        constructor();
        pV: any;
        private rV;
        pF(): void;
        static tV: any;
        static tF(): void;
    }
    interface eI {
        (): any;
        (): number;
        (p: any): any;
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7?(pa1: any, pa2: any): void;
    }
    namespace eM {
        var V: any;
        function F(): void;
        class C {
        }
        namespace M { }
        var eV: any;
        function eF(): void;
        class eC {
        }
        interface eI {
        }
        namespace eM { }
    }
}
//# sourceMappingURL=giant.d.ts.map
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
giant.ts(280,12): error TS2300: Duplicate identifier 'pgF'.
giant.ts(281,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(281,25): error TS1005: '{' expected.
giant.ts(282,12): error TS2300: Duplicate identifier 'psF'.
giant.ts(283,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(283,29): error TS1005: '{' expected.
giant.ts(284,13): error TS2300: Duplicate identifier 'rgF'.
giant.ts(285,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(285,21): error TS1005: '{' expected.
giant.ts(286,13): error TS2300: Duplicate identifier 'rsF'.
giant.ts(287,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(287,30): error TS1005: '{' expected.
giant.ts(290,12): error TS2300: Duplicate identifier 'tsF'.
giant.ts(291,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(291,29): error TS1005: '{' expected.
giant.ts(292,12): error TS2300: Duplicate identifier 'tgF'.
giant.ts(293,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(293,25): error TS1005: '{' expected.
giant.ts(318,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(318,6): error TS2304: Cannot find name 'p'.
giant.ts(319,5): error TS1021: An index signature must have a type annotation.
giant.ts(320,6): error TS1096: An index signature must have exactly one parameter.
giant.ts(333,5): error TS2386: Overload signatures must all be optional or required.
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
giant.ts(423,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(424,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(424,29): error TS1005: '{' expected.
giant.ts(425,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(426,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(426,33): error TS1005: '{' expected.
giant.ts(427,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(428,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(428,25): error TS1005: '{' expected.
giant.ts(429,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(430,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(430,34): error TS1005: '{' expected.
giant.ts(433,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(434,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(434,33): error TS1005: '{' expected.
giant.ts(435,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(436,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(436,29): error TS1005: '{' expected.
giant.ts(461,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(461,10): error TS2304: Cannot find name 'p'.
giant.ts(462,9): error TS1021: An index signature must have a type annotation.
giant.ts(463,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(476,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(490,45): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(495,41): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(497,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(500,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(501,22): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(502,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(502,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(503,20): error TS2300: Duplicate identifier 'pgF'.
giant.ts(504,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(504,37): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(505,20): error TS2300: Duplicate identifier 'psF'.
giant.ts(506,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(506,23): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(507,21): error TS2300: Duplicate identifier 'rgF'.
giant.ts(508,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(508,32): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(509,21): error TS2300: Duplicate identifier 'rsF'.
giant.ts(511,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(512,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(512,37): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(513,20): error TS2300: Duplicate identifier 'tsF'.
giant.ts(514,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(514,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(515,20): error TS2300: Duplicate identifier 'tgF'.
giant.ts(519,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(519,31): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(524,36): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(531,37): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(533,20): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(536,23): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(537,18): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(538,12): error TS2300: Duplicate identifier 'pgF'.
giant.ts(538,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(539,16): error TS2300: Duplicate identifier 'pgF'.
giant.ts(540,12): error TS2300: Duplicate identifier 'psF'.
giant.ts(540,33): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(541,16): error TS2300: Duplicate identifier 'psF'.
giant.ts(542,13): error TS2300: Duplicate identifier 'rgF'.
giant.ts(542,19): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(543,17): error TS2300: Duplicate identifier 'rgF'.
giant.ts(544,13): error TS2300: Duplicate identifier 'rsF'.
giant.ts(544,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(545,17): error TS2300: Duplicate identifier 'rsF'.
giant.ts(547,23): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(548,12): error TS2300: Duplicate identifier 'tsF'.
giant.ts(548,33): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(549,16): error TS2300: Duplicate identifier 'tsF'.
giant.ts(550,12): error TS2300: Duplicate identifier 'tgF'.
giant.ts(550,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(551,16): error TS2300: Duplicate identifier 'tgF'.
giant.ts(555,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(555,27): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(557,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(560,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(562,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(586,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(586,10): error TS2304: Cannot find name 'p'.
giant.ts(587,9): error TS1021: An index signature must have a type annotation.
giant.ts(588,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(601,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(605,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(605,31): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(610,36): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(614,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(615,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(615,45): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(616,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(617,16): error TS1038: A 'declare' modifier cannot be used in an already ambient context.
giant.ts(620,32): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(622,24): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(625,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(627,27): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(652,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
giant.ts(652,10): error TS2304: Cannot find name 'p'.
giant.ts(653,9): error TS1021: An index signature must have a type annotation.
giant.ts(654,10): error TS1096: An index signature must have exactly one parameter.
giant.ts(667,9): error TS2386: Overload signatures must all be optional or required.
giant.ts(671,28): error TS1183: An implementation cannot be declared in ambient contexts.
giant.ts(671,31): error TS1036: Statements are not allowed in ambient contexts.
giant.ts(675,36): error TS1183: An implementation cannot be declared in ambient contexts.


==== giant.ts (247 errors) ====
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
    export var eV: any;
    export function eF(): void { };
    export class eC {
        constructor () { }
        public pV: any;
        private rV;
        public pF(): void { }
        private rF() { }
        public pgF(): void { }
               ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
        public get pgF(): any
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                            ~
!!! error TS1005: '{' expected.
        public psF(param:any): void { }
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
        static tV: any;
        static tF(): void { }
        static tsF(param:any): void { }
               ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
        static set tsF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                ~
!!! error TS1005: '{' expected.
        static tgF(): void { }
               ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
        static get tgF(): any
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                            ~
!!! error TS1005: '{' expected.
    }
    export interface eI {
        //Call Signature
        ();
        (): number;
        (p: any);
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
        p6(pa1: any): void;
        p7(pa1: any, pa2: any): void;
        p7? (pa1: any, pa2: any): void;
        ~~
!!! error TS2386: Overload signatures must all be optional or required.
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
        export var eV: any;
        export function eF(): void { };
        export class eC {
            constructor () { }
            public pV: any;
            private rV;
            public pF(): void { }
            private rF() { }
            public pgF(): void { }
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
            public get pgF(): any
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                                ~
!!! error TS1005: '{' expected.
            public psF(param:any): void { }
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
            static tV: any;
            static tF(): void { }
            static tsF(param:any): void { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                    ~
!!! error TS1005: '{' expected.
            static tgF(): void { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
            static get tgF(): any
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                                ~
!!! error TS1005: '{' expected.
        }
        export interface eI {
            //Call Signature
            ();
            (): number;
            (p: any);
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
            p6(pa1: any): void;
            p7(pa1: any, pa2: any): void;
            p7? (pa1: any, pa2: any): void;
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
        }
        export module eM {
            var V;
            function F() { };
            class C { };
            interface I { };
            module M { };
            export var eV: any;
            export function eF(): void { };
            export class eC { };
            export interface eI { };
            export module eM { };
            export declare var eaV: any;
            export declare function eaF(): void { };
                                                ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export declare class eaC { };
            export declare module eaM { };
        }
        export declare var eaV: any;
        export declare function eaF(): void { };
                                            ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        export declare class eaC {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV: any;
            private rV;
            public pF(): void { }
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            private rF() { }
                         ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pgF(): void { }
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public get pgF(): any
                       ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
            public psF(param:any): void { }
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
            static tV: any;
            static tF(): void { }
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tsF(param:any): void { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static set tsF(param:any)
                       ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
            static tgF(): void { }
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static get tgF(): any
                       ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
        }
        export declare module eaM {
            var V: any;
            function F(): void { };
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                                  ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            interface I { }
            module M { }
            export var eV: any;
            export function eF(): void { };
                                       ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export class eC { }
            export interface eI { }
            export module eM { }
        }
    }
    export declare var eaV: any;
    export declare function eaF(): void { };
                                        ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
    export declare class eaC {
        constructor () { }
                       ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public pV: any;
        private rV;
        public pF(): void { }
                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        private rF() { }
                     ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public pgF(): void { }
               ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        public get pgF(): any
                   ~~~
!!! error TS2300: Duplicate identifier 'pgF'.
        public psF(param:any): void { }
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
        static tV: any;
        static tF(): void { }
                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        static tsF(param:any): void { }
               ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
                                    ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        static set tsF(param:any)
                   ~~~
!!! error TS2300: Duplicate identifier 'tsF'.
        static tgF(): void { }
               ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        static get tgF(): any
                   ~~~
!!! error TS2300: Duplicate identifier 'tgF'.
    }
    export declare module eaM {
        var V: any;
        function F(): void { };
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                              ~
!!! error TS1036: Statements are not allowed in ambient contexts.
        class C {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV: any;
            private rV;
            public pF(): void { }
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tV: any;
            static tF(): void { }
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
            p6(pa1: any): void;
            p7(pa1: any, pa2: any): void;
            p7? (pa1: any, pa2: any): void;
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
        }
        module M {
            var V: any;
            function F(): void { };
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                                  ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            interface I { }
            module M { }
            export var eV: any;
            export function eF(): void { };
                                       ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export class eC { }
            export interface eI { }
            export module eM { }
            export declare var eaV: any
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
            export declare function eaF(): void { };
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
                                                ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export declare class eaC { }
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
            export declare module eaM { }
                   ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
        }
        export var eV: any;
        export function eF(): void { };
                                   ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        export class eC {
            constructor () { }
                           ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            public pV: any;
            private rV;
            public pF(): void { }
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static tV: any
            static tF(): void { }
                              ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        }
        export interface eI {
            //Call Signature
            ();
            (): number;
            (p: any);
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
            p6(pa1: any): void;
            p7(pa1: any, pa2: any): void;
            p7? (pa1: any, pa2: any): void;
            ~~
!!! error TS2386: Overload signatures must all be optional or required.
        }
        export module eM {
            var V: any;
            function F(): void { };
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
                                  ~
!!! error TS1036: Statements are not allowed in ambient contexts.
            class C { }
            module M { }
            export var eV: any;
            export function eF(): void { };
                                       ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            export class eC { }
            export interface eI { }
            export module eM { }
        }
    }