//// [tests/cases/conformance/esDecorators/classExpression/esDecorators-classExpression-commentPreservation.ts] ////

//// [esDecorators-classExpression-commentPreservation.ts]
declare var dec: any;

/*1*/
(
/*2*/
@dec
/*3*/
@dec
/*4*/
class C {
    /*5*/
    @dec
    /*6*/
    @dec
    /*7*/
    method() {}

    /*8*/
    @dec
    /*9*/
    @dec
    /*10*/
    get x() { return 1; }

    /*11*/
    @dec
    /*12*/
    @dec
    /*13*/
    set x(value: number) { }

    /*14*/
    @dec
    /*15*/
    @dec
    /*16*/
    y = 1;

    /*17*/
    @dec
    /*18*/
    @dec
    /*19*/
    accessor z = 1;

    /*20*/
    @dec
    /*21*/
    @dec
    /*22*/
    static #method() {}

    /*23*/
    @dec
    /*24*/
    @dec
    /*25*/
    static get #x() { return 1; }

    /*26*/
    @dec
    /*27*/
    @dec
    /*28*/
    static set #x(value: number) { }

    /*29*/
    @dec
    /*30*/
    @dec
    /*31*/
    static #y = 1;

    /*32*/
    @dec
    /*33*/
    @dec
    /*34*/
    static accessor #z = 1;
}
);


//// [esDecorators-classExpression-commentPreservation.js]
"use strict";
var _a, _C_method, _C_x_get, _C_x_set, _C_y, _C_z_get, _C_z_set, _C_z_accessor_storage, _C_z_1_accessor_storage;
/*1*/
(_a = 
/*2*/
/*4*/
class C {
        constructor() {
            /*14*/
            this.y = 1;
            _C_z_1_accessor_storage = { value: 1 };
        }
        /*5*/
        /*7*/
        method() { }
        /*8*/
        get x() { return 1; }
        /*11*/
        set x(value) { }
        #z_accessor_storage = 1;
        /*17*/
        get z() { return __classPrivateFieldGet(this, _a, "f", _C_z_1_accessor_storage); }
        set z(value) { __classPrivateFieldSet(this, _a, value, "f", _C_z_1_accessor_storage); }
        /*34*/
        static #z_1_accessor_storage = 1;
    },
    _C_z_accessor_storage = new WeakMap(),
    _C_method = function _C_method() { },
    _C_x_get = function _C_x_get() { return 1; },
    _C_x_set = function _C_x_set(value) { },
    _C_z_get = function _C_z_get() { return __classPrivateFieldGet(_a, _a, "f", _C_z_1_accessor_storage); },
    _C_z_set = function _C_z_set(value) { __classPrivateFieldSet(_a, _a, value, "f", _C_z_1_accessor_storage); },
    /*29*/
    _C_y = { value: 1 },
    /*32*/
    _C_z_1_accessor_storage = { value: 1 },
    _a
/*2*/
);
