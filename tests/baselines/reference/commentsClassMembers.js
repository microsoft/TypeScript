//// [tests/cases/compiler/commentsClassMembers.ts] ////

//// [commentsClassMembers.ts]
/** This is comment for c1*/
class c1 {
    /** p1 is property of c1*/
    public p1: number;
    /** sum with property*/
    public p2(/** number to add*/b: number) {
        return this.p1 + b;
    } /* trailing comment of method*/
    /** getter property*/
    public get p3() {
        return this.p2(this.p1);
    }// trailing comment Getter
    /** setter property*/
    public set p3(/** this is value*/value: number) {
        this.p1 = this.p2(value);
    }// trailing comment Setter
    /** pp1 is property of c1*/
    private pp1: number;
    /** sum with property*/
    private pp2(/** number to add*/b: number) {
        return this.p1 + b;
    } // trailing comment of method
    /** getter property*/
    private get pp3() {
        return this.pp2(this.pp1);
    }
    /** setter property*/
    private set pp3( /** this is value*/value: number) {
        this.pp1 = this.pp2(value);
    }
    /** Constructor method*/
    constructor() {
    }
    /** s1 is static property of c1*/
    static s1: number;
    /** static sum with property*/
    static s2(/** number to add*/b: number) {
        return c1.s1 + b;
    }
    /** static getter property*/
    static get s3() {
        return c1.s2(c1.s1);
    } /*trailing comment 1 getter*/
    /** setter property*/
    static set s3( /** this is value*/value: number) {
        c1.s1 = c1.s2(value);
    }/*trailing comment 2 */ /*setter*/
    public nc_p1: number;
    public nc_p2(b: number) {
        return this.nc_p1 + b;
    }
    public get nc_p3() {
        return this.nc_p2(this.nc_p1);
    }
    public set nc_p3(value: number) {
        this.nc_p1 = this.nc_p2(value);
    }
    private nc_pp1: number;
    private nc_pp2(b: number) {
        return this.nc_pp1 + b;
    }
    private get nc_pp3() {
        return this.nc_pp2(this.nc_pp1);
    }
    private set nc_pp3(value: number) {
        this.nc_pp1 = this.nc_pp2(value);
    }
    static nc_s1: number;
    static nc_s2(b: number) {
        return c1.nc_s1 + b;
    }
    static get nc_s3() {
        return c1.nc_s2(c1.nc_s1);
    }
    static set nc_s3(value: number) {
        c1.nc_s1 = c1.nc_s2(value);
    }

    // p1 is property of c1
    public a_p1: number;
    // sum with property
    public a_p2(b: number) {
        return this.a_p1 + b;
    }
    // getter property
    public get a_p3() {
        return this.a_p2(this.a_p1);
    }
    // setter property
    public set a_p3(value: number) {
        this.a_p1 = this.a_p2(value);
    }
    // pp1 is property of c1
    private a_pp1: number;
    // sum with property
    private a_pp2(b: number) {
        return this.a_p1 + b;
    }
    // getter property
    private get a_pp3() {
        return this.a_pp2(this.a_pp1);
    }
    // setter property
    private set a_pp3(value: number) {
        this.a_pp1 = this.a_pp2(value);
    }
    
    // s1 is static property of c1
    static a_s1: number;
    // static sum with property
    static a_s2(b: number) {
        return c1.a_s1 + b;
    }
    // static getter property
    static get a_s3() {
        return c1.s2(c1.s1);
    }
    
    // setter property
    static set a_s3(value: number) {
        c1.a_s1 = c1.a_s2(value);
    }

    /** p1 is property of c1 */
    public b_p1: number;
    /** sum with property */
    public b_p2(b: number) {
        return this.b_p1 + b;
    }
    /** getter property */
    public get b_p3() {
        return this.b_p2(this.b_p1);
    }
    /** setter property */
    public set b_p3(value: number) {
        this.b_p1 = this.b_p2(value);
    }
    /** pp1 is property of c1 */
    private b_pp1: number;
    /** sum with property */
    private b_pp2(b: number) {
        return this.b_p1 + b;
    }
    /** getter property */
    private get b_pp3() {
        return this.b_pp2(this.b_pp1);
    }
    /** setter property */
    private set b_pp3(value: number) {
        this.b_pp1 = this.b_pp2(value);
    }
    
    /** s1 is static property of c1 */
    static b_s1: number;
    /** static sum with property */
    static b_s2(b: number) {
        return c1.b_s1 + b;
    }
    /** static getter property 
    */
    static get b_s3() {
        return c1.s2(c1.s1);
    }
    
    /** setter property 
    */
    static set b_s3(value: number) {
        /** setter */
        c1.b_s1 = c1.b_s2(value);
    }
}
var i1 = new c1();
var i1_p = i1.p1;
var i1_f = i1.p2;
var i1_r = i1.p2(20);
var i1_prop = i1.p3;
i1.p3 = i1_prop;
var i1_nc_p = i1.nc_p1;
var i1_ncf = i1.nc_p2;
var i1_ncr = i1.nc_p2(20);
var i1_ncprop = i1.nc_p3;
i1.nc_p3 = i1_ncprop;
var i1_s_p = c1.s1;
var i1_s_f = c1.s2;
var i1_s_r = c1.s2(20);
var i1_s_prop = c1.s3;
c1.s3 = i1_s_prop;
var i1_s_nc_p = c1.nc_s1;
var i1_s_ncf = c1.nc_s2;
var i1_s_ncr = c1.nc_s2(20);
var i1_s_ncprop = c1.nc_s3;
c1.nc_s3 = i1_s_ncprop;
var i1_c = c1;
class cProperties {
    private val: number;
    /** getter only property*/
    public get p1() {
        return this.val;
    } // trailing comment of only getter
    public get nc_p1() {
        return this.val;
    }
    /**setter only property*/
    public set p2(value: number) {
        this.val = value;
    }
    public set nc_p2(value: number) {
        this.val = value;
    } /* trailing comment of setter only*/

    public x = 10; /*trailing comment for property*/
    private y = 10; // trailing comment of // style
}
var cProperties_i = new cProperties();
cProperties_i.p2 = cProperties_i.p1;
cProperties_i.nc_p2 = cProperties_i.nc_p1;


//// [commentsClassMembers.js]
/** This is comment for c1*/
var c1 = /** @class */ (function () {
    /** Constructor method*/
    function c1() {
    }
    /** sum with property*/
    c1.prototype.p2 = function (/** number to add*/ b) {
        return this.p1 + b;
    }; /* trailing comment of method*/
    Object.defineProperty(c1.prototype, "p3", {
        /** getter property*/
        get: function () {
            return this.p2(this.p1);
        } // trailing comment Getter
        ,
        /** setter property*/
        set: function (/** this is value*/ value) {
            this.p1 = this.p2(value);
        } // trailing comment Setter
        ,
        enumerable: false,
        configurable: true
    });
    /** sum with property*/
    c1.prototype.pp2 = function (/** number to add*/ b) {
        return this.p1 + b;
    }; // trailing comment of method
    Object.defineProperty(c1.prototype, "pp3", {
        /** getter property*/
        get: function () {
            return this.pp2(this.pp1);
        },
        /** setter property*/
        set: function (/** this is value*/ value) {
            this.pp1 = this.pp2(value);
        },
        enumerable: false,
        configurable: true
    });
    /** static sum with property*/
    c1.s2 = function (/** number to add*/ b) {
        return c1.s1 + b;
    };
    Object.defineProperty(c1, "s3", {
        /** static getter property*/
        get: function () {
            return c1.s2(c1.s1);
        } /*trailing comment 1 getter*/,
        /** setter property*/
        set: function (/** this is value*/ value) {
            c1.s1 = c1.s2(value);
        } /*trailing comment 2 */ /*setter*/,
        enumerable: false,
        configurable: true
    });
    c1.prototype.nc_p2 = function (b) {
        return this.nc_p1 + b;
    };
    Object.defineProperty(c1.prototype, "nc_p3", {
        get: function () {
            return this.nc_p2(this.nc_p1);
        },
        set: function (value) {
            this.nc_p1 = this.nc_p2(value);
        },
        enumerable: false,
        configurable: true
    });
    c1.prototype.nc_pp2 = function (b) {
        return this.nc_pp1 + b;
    };
    Object.defineProperty(c1.prototype, "nc_pp3", {
        get: function () {
            return this.nc_pp2(this.nc_pp1);
        },
        set: function (value) {
            this.nc_pp1 = this.nc_pp2(value);
        },
        enumerable: false,
        configurable: true
    });
    c1.nc_s2 = function (b) {
        return c1.nc_s1 + b;
    };
    Object.defineProperty(c1, "nc_s3", {
        get: function () {
            return c1.nc_s2(c1.nc_s1);
        },
        set: function (value) {
            c1.nc_s1 = c1.nc_s2(value);
        },
        enumerable: false,
        configurable: true
    });
    // sum with property
    c1.prototype.a_p2 = function (b) {
        return this.a_p1 + b;
    };
    Object.defineProperty(c1.prototype, "a_p3", {
        // getter property
        get: function () {
            return this.a_p2(this.a_p1);
        },
        // setter property
        set: function (value) {
            this.a_p1 = this.a_p2(value);
        },
        enumerable: false,
        configurable: true
    });
    // sum with property
    c1.prototype.a_pp2 = function (b) {
        return this.a_p1 + b;
    };
    Object.defineProperty(c1.prototype, "a_pp3", {
        // getter property
        get: function () {
            return this.a_pp2(this.a_pp1);
        },
        // setter property
        set: function (value) {
            this.a_pp1 = this.a_pp2(value);
        },
        enumerable: false,
        configurable: true
    });
    // static sum with property
    c1.a_s2 = function (b) {
        return c1.a_s1 + b;
    };
    Object.defineProperty(c1, "a_s3", {
        // static getter property
        get: function () {
            return c1.s2(c1.s1);
        },
        // setter property
        set: function (value) {
            c1.a_s1 = c1.a_s2(value);
        },
        enumerable: false,
        configurable: true
    });
    /** sum with property */
    c1.prototype.b_p2 = function (b) {
        return this.b_p1 + b;
    };
    Object.defineProperty(c1.prototype, "b_p3", {
        /** getter property */
        get: function () {
            return this.b_p2(this.b_p1);
        },
        /** setter property */
        set: function (value) {
            this.b_p1 = this.b_p2(value);
        },
        enumerable: false,
        configurable: true
    });
    /** sum with property */
    c1.prototype.b_pp2 = function (b) {
        return this.b_p1 + b;
    };
    Object.defineProperty(c1.prototype, "b_pp3", {
        /** getter property */
        get: function () {
            return this.b_pp2(this.b_pp1);
        },
        /** setter property */
        set: function (value) {
            this.b_pp1 = this.b_pp2(value);
        },
        enumerable: false,
        configurable: true
    });
    /** static sum with property */
    c1.b_s2 = function (b) {
        return c1.b_s1 + b;
    };
    Object.defineProperty(c1, "b_s3", {
        /** static getter property
        */
        get: function () {
            return c1.s2(c1.s1);
        },
        /** setter property
        */
        set: function (value) {
            /** setter */
            c1.b_s1 = c1.b_s2(value);
        },
        enumerable: false,
        configurable: true
    });
    return c1;
}());
var i1 = new c1();
var i1_p = i1.p1;
var i1_f = i1.p2;
var i1_r = i1.p2(20);
var i1_prop = i1.p3;
i1.p3 = i1_prop;
var i1_nc_p = i1.nc_p1;
var i1_ncf = i1.nc_p2;
var i1_ncr = i1.nc_p2(20);
var i1_ncprop = i1.nc_p3;
i1.nc_p3 = i1_ncprop;
var i1_s_p = c1.s1;
var i1_s_f = c1.s2;
var i1_s_r = c1.s2(20);
var i1_s_prop = c1.s3;
c1.s3 = i1_s_prop;
var i1_s_nc_p = c1.nc_s1;
var i1_s_ncf = c1.nc_s2;
var i1_s_ncr = c1.nc_s2(20);
var i1_s_ncprop = c1.nc_s3;
c1.nc_s3 = i1_s_ncprop;
var i1_c = c1;
var cProperties = /** @class */ (function () {
    function cProperties() {
        this.x = 10; /*trailing comment for property*/
        this.y = 10; // trailing comment of // style
    }
    Object.defineProperty(cProperties.prototype, "p1", {
        /** getter only property*/
        get: function () {
            return this.val;
        } // trailing comment of only getter
        ,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(cProperties.prototype, "nc_p1", {
        get: function () {
            return this.val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(cProperties.prototype, "p2", {
        /**setter only property*/
        set: function (value) {
            this.val = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(cProperties.prototype, "nc_p2", {
        set: function (value) {
            this.val = value;
        } /* trailing comment of setter only*/,
        enumerable: false,
        configurable: true
    });
    return cProperties;
}());
var cProperties_i = new cProperties();
cProperties_i.p2 = cProperties_i.p1;
cProperties_i.nc_p2 = cProperties_i.nc_p1;


//// [commentsClassMembers.d.ts]
/** This is comment for c1*/
declare class c1 {
    /** p1 is property of c1*/
    p1: number;
    /** sum with property*/
    p2(/** number to add*/ b: number): number;
    /** getter property*/
    get p3(): number;
    /** setter property*/
    set p3(/** this is value*/ value: number);
    /** pp1 is property of c1*/
    private pp1;
    /** sum with property*/
    private pp2;
    /** getter property*/
    private get pp3();
    /** setter property*/
    private set pp3(value);
    /** Constructor method*/
    constructor();
    /** s1 is static property of c1*/
    static s1: number;
    /** static sum with property*/
    static s2(/** number to add*/ b: number): number;
    /** static getter property*/
    static get s3(): number;
    /** setter property*/
    static set s3(/** this is value*/ value: number);
    nc_p1: number;
    nc_p2(b: number): number;
    get nc_p3(): number;
    set nc_p3(value: number);
    private nc_pp1;
    private nc_pp2;
    private get nc_pp3();
    private set nc_pp3(value);
    static nc_s1: number;
    static nc_s2(b: number): number;
    static get nc_s3(): number;
    static set nc_s3(value: number);
    a_p1: number;
    a_p2(b: number): number;
    get a_p3(): number;
    set a_p3(value: number);
    private a_pp1;
    private a_pp2;
    private get a_pp3();
    private set a_pp3(value);
    static a_s1: number;
    static a_s2(b: number): number;
    static get a_s3(): number;
    static set a_s3(value: number);
    /** p1 is property of c1 */
    b_p1: number;
    /** sum with property */
    b_p2(b: number): number;
    /** getter property */
    get b_p3(): number;
    /** setter property */
    set b_p3(value: number);
    /** pp1 is property of c1 */
    private b_pp1;
    /** sum with property */
    private b_pp2;
    /** getter property */
    private get b_pp3();
    /** setter property */
    private set b_pp3(value);
    /** s1 is static property of c1 */
    static b_s1: number;
    /** static sum with property */
    static b_s2(b: number): number;
    /** static getter property
    */
    static get b_s3(): number;
    /** setter property
    */
    static set b_s3(value: number);
}
declare var i1: c1;
declare var i1_p: number;
declare var i1_f: (b: number) => number;
declare var i1_r: number;
declare var i1_prop: number;
declare var i1_nc_p: number;
declare var i1_ncf: (b: number) => number;
declare var i1_ncr: number;
declare var i1_ncprop: number;
declare var i1_s_p: number;
declare var i1_s_f: typeof c1.s2;
declare var i1_s_r: number;
declare var i1_s_prop: number;
declare var i1_s_nc_p: number;
declare var i1_s_ncf: typeof c1.nc_s2;
declare var i1_s_ncr: number;
declare var i1_s_ncprop: number;
declare var i1_c: typeof c1;
declare class cProperties {
    private val;
    /** getter only property*/
    get p1(): number;
    get nc_p1(): number;
    /**setter only property*/
    set p2(value: number);
    set nc_p2(value: number);
    x: number;
    private y;
}
declare var cProperties_i: cProperties;
