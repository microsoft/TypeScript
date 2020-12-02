//// [tests/cases/compiler/declFileAccessors.ts] ////

//// [declFileAccessors_0.ts]
/** This is comment for c1*/
export class c1 {
    /** getter property*/
    public get p3() {
        return 10;
    }
    /** setter property*/
    public set p3(/** this is value*/value: number) {
    }
    /** private getter property*/
    private get pp3() {
        return 10;
    }
    /** private setter property*/
    private set pp3(/** this is value*/value: number) {
    }
    /** static getter property*/
    static get s3() {
        return 10;
    }
    /** setter property*/
    static set s3( /** this is value*/value: number) {
    }
    public get nc_p3() {
        return 10;
    }
    public set nc_p3(value: number) {
    }
    private get nc_pp3() {
        return 10;
    }
    private set nc_pp3(value: number) {
    }
    static get nc_s3() {
        return "";
    }
    static set nc_s3(value: string) {
    }

    // Only getter property
    public get onlyGetter() {
        return 10;
    }

    // Only setter property
    public set onlySetter(value: number) {
    }
}

//// [declFileAccessors_1.ts]
/** This is comment for c2 - the global class*/
class c2 {
    /** getter property*/
    public get p3() {
        return 10;
    }
    /** setter property*/
    public set p3(/** this is value*/value: number) {
    }
    /** private getter property*/
    private get pp3() {
        return 10;
    }
    /** private setter property*/
    private set pp3(/** this is value*/value: number) {
    }
    /** static getter property*/
    static get s3() {
        return 10;
    }
    /** setter property*/
    static set s3( /** this is value*/value: number) {
    }
    public get nc_p3() {
        return 10;
    }
    public set nc_p3(value: number) {
    }
    private get nc_pp3() {
        return 10;
    }
    private set nc_pp3(value: number) {
    }
    static get nc_s3() {
        return "";
    }
    static set nc_s3(value: string) {
    }

    // Only getter property
    public get onlyGetter() {
        return 10;
    }

    // Only setter property
    public set onlySetter(value: number) {
    }
}

//// [declFileAccessors_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c1 = void 0;
/** This is comment for c1*/
var c1 = /** @class */ (function () {
    function c1() {
    }
    var proto_1 = c1.prototype;
    Object.defineProperty(proto_1, "p3", {
        /** getter property*/
        get: function () {
            return 10;
        },
        /** setter property*/
        set: function (/** this is value*/ value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "pp3", {
        /** private getter property*/
        get: function () {
            return 10;
        },
        /** private setter property*/
        set: function (/** this is value*/ value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(c1, "s3", {
        /** static getter property*/
        get: function () {
            return 10;
        },
        /** setter property*/
        set: function (/** this is value*/ value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "nc_p3", {
        get: function () {
            return 10;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "nc_pp3", {
        get: function () {
            return 10;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(c1, "nc_s3", {
        get: function () {
            return "";
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "onlyGetter", {
        // Only getter property
        get: function () {
            return 10;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "onlySetter", {
        // Only setter property
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    return c1;
}());
exports.c1 = c1;
//// [declFileAccessors_1.js]
/** This is comment for c2 - the global class*/
var c2 = /** @class */ (function () {
    function c2() {
    }
    var proto_1 = c2.prototype;
    Object.defineProperty(proto_1, "p3", {
        /** getter property*/
        get: function () {
            return 10;
        },
        /** setter property*/
        set: function (/** this is value*/ value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "pp3", {
        /** private getter property*/
        get: function () {
            return 10;
        },
        /** private setter property*/
        set: function (/** this is value*/ value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(c2, "s3", {
        /** static getter property*/
        get: function () {
            return 10;
        },
        /** setter property*/
        set: function (/** this is value*/ value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "nc_p3", {
        get: function () {
            return 10;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "nc_pp3", {
        get: function () {
            return 10;
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(c2, "nc_s3", {
        get: function () {
            return "";
        },
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "onlyGetter", {
        // Only getter property
        get: function () {
            return 10;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "onlySetter", {
        // Only setter property
        set: function (value) {
        },
        enumerable: false,
        configurable: true
    });
    return c2;
}());


//// [declFileAccessors_0.d.ts]
/** This is comment for c1*/
export declare class c1 {
    /** getter property*/
    get p3(): number;
    /** setter property*/
    set p3(/** this is value*/ value: number);
    /** private getter property*/
    private get pp3();
    /** private setter property*/
    private set pp3(value);
    /** static getter property*/
    static get s3(): number;
    /** setter property*/
    static set s3(/** this is value*/ value: number);
    get nc_p3(): number;
    set nc_p3(value: number);
    private get nc_pp3();
    private set nc_pp3(value);
    static get nc_s3(): string;
    static set nc_s3(value: string);
    get onlyGetter(): number;
    set onlySetter(value: number);
}
//// [declFileAccessors_1.d.ts]
/** This is comment for c2 - the global class*/
declare class c2 {
    /** getter property*/
    get p3(): number;
    /** setter property*/
    set p3(/** this is value*/ value: number);
    /** private getter property*/
    private get pp3();
    /** private setter property*/
    private set pp3(value);
    /** static getter property*/
    static get s3(): number;
    /** setter property*/
    static set s3(/** this is value*/ value: number);
    get nc_p3(): number;
    set nc_p3(value: number);
    private get nc_pp3();
    private set nc_pp3(value);
    static get nc_s3(): string;
    static set nc_s3(value: string);
    get onlyGetter(): number;
    set onlySetter(value: number);
}
