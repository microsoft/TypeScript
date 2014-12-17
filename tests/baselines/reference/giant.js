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

//// [giant.js]
define(["require", "exports"], function (require, exports) {
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
    function F() {
    }
    ;
    var C = (function () {
        function C() {
        }
        C.prototype.pF = function () {
        };
        C.prototype.rF = function () {
        };
        C.prototype.pgF = function () {
        };
        Object.defineProperty(C.prototype, "pgF", {
            get: function () {
            },
            enumerable: true,
            configurable: true
        });
        C.prototype.psF = function (param) {
        };
        Object.defineProperty(C.prototype, "psF", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        C.prototype.rgF = function () {
        };
        Object.defineProperty(C.prototype, "rgF", {
            get: function () {
            },
            enumerable: true,
            configurable: true
        });
        C.prototype.rsF = function (param) {
        };
        Object.defineProperty(C.prototype, "rsF", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        C.tF = function () {
        };
        C.tsF = function (param) {
        };
        Object.defineProperty(C, "tsF", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        C.tgF = function () {
        };
        Object.defineProperty(C, "tgF", {
            get: function () {
            },
            enumerable: true,
            configurable: true
        });
        return C;
    })();
    var M;
    (function (_M) {
        var V;
        function F() {
        }
        ;
        var C = (function () {
            function C() {
            }
            C.prototype.pF = function () {
            };
            C.prototype.rF = function () {
            };
            C.prototype.pgF = function () {
            };
            Object.defineProperty(C.prototype, "pgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            C.prototype.psF = function (param) {
            };
            Object.defineProperty(C.prototype, "psF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            C.prototype.rgF = function () {
            };
            Object.defineProperty(C.prototype, "rgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            C.prototype.rsF = function (param) {
            };
            Object.defineProperty(C.prototype, "rsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            C.tF = function () {
            };
            C.tsF = function (param) {
            };
            Object.defineProperty(C, "tsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            C.tgF = function () {
            };
            Object.defineProperty(C, "tgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            return C;
        })();
        var M;
        (function (M) {
            var V;
            function F() {
            }
            ;
            var C = (function () {
                function C() {
                }
                return C;
            })();
            ;
            ;
            ;
            M.eV;
            function eF() {
            }
            M.eF = eF;
            ;
            var eC = (function () {
                function eC() {
                }
                return eC;
            })();
            M.eC = eC;
            ;
            ;
            ;
            ;
            ;
            ;
        })(M || (M = {}));
        _M.eV;
        function eF() {
        }
        _M.eF = eF;
        ;
        var eC = (function () {
            function eC() {
            }
            eC.prototype.pF = function () {
            };
            eC.prototype.rF = function () {
            };
            eC.prototype.pgF = function () {
            };
            Object.defineProperty(eC.prototype, "pgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            eC.prototype.psF = function (param) {
            };
            Object.defineProperty(eC.prototype, "psF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            eC.prototype.rgF = function () {
            };
            Object.defineProperty(eC.prototype, "rgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            eC.prototype.rsF = function (param) {
            };
            Object.defineProperty(eC.prototype, "rsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            eC.tF = function () {
            };
            eC.tsF = function (param) {
            };
            Object.defineProperty(eC, "tsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            eC.tgF = function () {
            };
            Object.defineProperty(eC, "tgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            return eC;
        })();
        _M.eC = eC;
        var eM;
        (function (eM) {
            var V;
            function F() {
            }
            ;
            var C = (function () {
                function C() {
                }
                return C;
            })();
            ;
            ;
            ;
            eM.eV;
            function eF() {
            }
            eM.eF = eF;
            ;
            var eC = (function () {
                function eC() {
                }
                return eC;
            })();
            eM.eC = eC;
            ;
            ;
            ;
            ;
            ;
            ;
        })(eM = _M.eM || (_M.eM = {}));
        ;
    })(M || (M = {}));
    exports.eV;
    function eF() {
    }
    exports.eF = eF;
    ;
    var eC = (function () {
        function eC() {
        }
        eC.prototype.pF = function () {
        };
        eC.prototype.rF = function () {
        };
        eC.prototype.pgF = function () {
        };
        Object.defineProperty(eC.prototype, "pgF", {
            get: function () {
            },
            enumerable: true,
            configurable: true
        });
        eC.prototype.psF = function (param) {
        };
        Object.defineProperty(eC.prototype, "psF", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        eC.prototype.rgF = function () {
        };
        Object.defineProperty(eC.prototype, "rgF", {
            get: function () {
            },
            enumerable: true,
            configurable: true
        });
        eC.prototype.rsF = function (param) {
        };
        Object.defineProperty(eC.prototype, "rsF", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        eC.tF = function () {
        };
        eC.tsF = function (param) {
        };
        Object.defineProperty(eC, "tsF", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        eC.tgF = function () {
        };
        Object.defineProperty(eC, "tgF", {
            get: function () {
            },
            enumerable: true,
            configurable: true
        });
        return eC;
    })();
    exports.eC = eC;
    var eM;
    (function (_eM) {
        var V;
        function F() {
        }
        ;
        var C = (function () {
            function C() {
            }
            C.prototype.pF = function () {
            };
            C.prototype.rF = function () {
            };
            C.prototype.pgF = function () {
            };
            Object.defineProperty(C.prototype, "pgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            C.prototype.psF = function (param) {
            };
            Object.defineProperty(C.prototype, "psF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            C.prototype.rgF = function () {
            };
            Object.defineProperty(C.prototype, "rgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            C.prototype.rsF = function (param) {
            };
            Object.defineProperty(C.prototype, "rsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            C.tF = function () {
            };
            C.tsF = function (param) {
            };
            Object.defineProperty(C, "tsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            C.tgF = function () {
            };
            Object.defineProperty(C, "tgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            return C;
        })();
        var M;
        (function (M) {
            var V;
            function F() {
            }
            ;
            var C = (function () {
                function C() {
                }
                return C;
            })();
            ;
            ;
            ;
            M.eV;
            function eF() {
            }
            M.eF = eF;
            ;
            var eC = (function () {
                function eC() {
                }
                return eC;
            })();
            M.eC = eC;
            ;
            ;
            ;
            ;
            ;
            ;
        })(M || (M = {}));
        _eM.eV;
        function eF() {
        }
        _eM.eF = eF;
        ;
        var eC = (function () {
            function eC() {
            }
            eC.prototype.pF = function () {
            };
            eC.prototype.rF = function () {
            };
            eC.prototype.pgF = function () {
            };
            Object.defineProperty(eC.prototype, "pgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            eC.prototype.psF = function (param) {
            };
            Object.defineProperty(eC.prototype, "psF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            eC.prototype.rgF = function () {
            };
            Object.defineProperty(eC.prototype, "rgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            eC.prototype.rsF = function (param) {
            };
            Object.defineProperty(eC.prototype, "rsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            eC.tF = function () {
            };
            eC.tsF = function (param) {
            };
            Object.defineProperty(eC, "tsF", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            eC.tgF = function () {
            };
            Object.defineProperty(eC, "tgF", {
                get: function () {
                },
                enumerable: true,
                configurable: true
            });
            return eC;
        })();
        _eM.eC = eC;
        var eM;
        (function (eM) {
            var V;
            function F() {
            }
            ;
            var C = (function () {
                function C() {
                }
                return C;
            })();
            ;
            ;
            ;
            eM.eV;
            function eF() {
            }
            eM.eF = eF;
            ;
            var eC = (function () {
                function eC() {
                }
                return eC;
            })();
            eM.eC = eC;
            ;
            ;
            ;
            ;
            ;
            ;
        })(eM = _eM.eM || (_eM.eM = {}));
        ;
    })(eM = exports.eM || (exports.eM = {}));
    ;
});
