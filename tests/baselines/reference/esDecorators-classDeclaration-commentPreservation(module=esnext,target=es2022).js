//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-commentPreservation.ts] ////

//// [file1.ts]
declare var dec: any;

/*1*/
@dec
/*2*/
@dec
/*3*/
class C {
    /*4*/
    @dec
    /*5*/
    @dec
    /*6*/
    method() {}

    /*7*/
    @dec
    /*8*/
    @dec
    /*9*/
    get x() { return 1; }

    /*10*/
    @dec
    /*11*/
    @dec
    /*12*/
    set x(value: number) { }

    /*13*/
    @dec
    /*14*/
    @dec
    /*15*/
    y = 1;

    /*16*/
    @dec
    /*17*/
    @dec
    /*18*/
    accessor z = 1;

    /*19*/
    @dec
    /*20*/
    @dec
    /*21*/
    static #method() {}

    /*22*/
    @dec
    /*23*/
    @dec
    /*24*/
    static get #x() { return 1; }

    /*25*/
    @dec
    /*26*/
    @dec
    /*27*/
    static set #x(value: number) { }

    /*28*/
    @dec
    /*29*/
    @dec
    /*30*/
    static #y = 1;

    /*31*/
    @dec
    /*32*/
    @dec
    /*33*/
    static accessor #z = 1;
}

//// [file2.ts]
/*34*/
@dec
/*35*/
@dec
/*36*/
export class D {
}

/*37*/
@dec
/*38*/
@dec
/*39*/
export default class E {
}

//// [file3.ts]
/*40*/
export
/*41*/
@dec
/*42*/
@dec
/*43*/
class F {
}

/*44*/
export default
/*45*/
@dec
/*46*/
@dec
/*47*/
class G {
}


//// [file1.js]
/*1*/
let C = (() => {
    var _method_get, _x_get, _x_set, _y, _z_accessor_storage, _z_get, _z_set;
    let _classDecorators = [dec, dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticExtraInitializers = [];
    let _instanceExtraInitializers = [];
    let _static_private_method_decorators;
    let _static_private_method_descriptor;
    let _static_private_get_x_decorators;
    let _static_private_get_x_descriptor;
    let _static_private_set_x_decorators;
    let _static_private_set_x_descriptor;
    let _static_private_y_decorators;
    let _static_private_y_initializers = [];
    let _static_private_z_decorators;
    let _static_private_z_initializers = [];
    let _static_private_z_descriptor;
    let _method_decorators;
    let _get_x_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    let _z_decorators;
    let _z_initializers = [];
    var C = class {
        static { __setFunctionName(this, "C"); }
        static { _method_get = function _method_get() { return _static_private_method_descriptor.value; }, _x_get = function _x_get() { return _static_private_get_x_descriptor.get.call(this); }, _x_set = function _x_set(value) { return _static_private_set_x_descriptor.set.call(this, value); }, _z_get = function _z_get() { return _static_private_z_descriptor.get.call(this); }, _z_set = function _z_set(value) { return _static_private_z_descriptor.set.call(this, value); }; }
        static {
            _method_decorators = [dec, dec];
            _get_x_decorators = [dec, dec];
            _set_x_decorators = [dec, dec];
            _y_decorators = [dec, dec];
            _z_decorators = [dec, dec];
            _static_private_method_decorators = [dec, dec];
            _static_private_get_x_decorators = [dec, dec];
            _static_private_set_x_decorators = [dec, dec];
            _static_private_y_decorators = [dec, dec];
            _static_private_z_decorators = [dec, dec];
            __esDecorate(this, _static_private_method_descriptor = { value: __setFunctionName(function () { }, "#method") }, _static_private_method_decorators, { kind: "method", name: "#method", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _method_get) } }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_get_x_descriptor = { get: __setFunctionName(function () { return 1; }, "#x", "get") }, _static_private_get_x_decorators, { kind: "getter", name: "#x", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _x_get) } }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_set_x_descriptor = { set: __setFunctionName(function (value) { }, "#x", "set") }, _static_private_set_x_decorators, { kind: "setter", name: "#x", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "a", _x_set); } } }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_z_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(this, _classThis, "f", _z_accessor_storage); }, "#z", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(this, _classThis, value, "f", _z_accessor_storage); }, "#z", "set") }, _static_private_z_decorators, { kind: "accessor", name: "#z", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _z_get), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "a", _z_set); } } }, _static_private_z_initializers, _staticExtraInitializers);
            __esDecorate(this, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: obj => "method" in obj, get: obj => obj.method } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_x_decorators, { kind: "getter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } } }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _z_decorators, { kind: "accessor", name: "z", static: false, private: false, access: { has: obj => "z" in obj, get: obj => obj.z, set: (obj, value) => { obj.z = value; } } }, _z_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _static_private_y_decorators, { kind: "field", name: "#y", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "f", _y), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "f", _y); } } }, _static_private_y_initializers, _staticExtraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _staticExtraInitializers);
        }
        /*4*/
        method() { }
        /*7*/
        get x() { return 1; }
        /*10*/
        set x(value) { }
        /*13*/
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, 1));
        #z_accessor_storage = __runInitializers(this, _z_initializers, 1);
        /*16*/
        get z() { return this.#z_accessor_storage; }
        set z(value) { this.#z_accessor_storage = value; }
        static {
            /*28*/
            _y = { value: __runInitializers(_classThis, _static_private_y_initializers, 1) };
        }
        static {
            _z_accessor_storage = { value: __runInitializers(_classThis, _static_private_z_initializers, 1) };
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
//// [file2.js]
/*34*/
/*36*/
export let D = (() => {
    let _classDecorators = [dec, dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
/*37*/
export default (() => {
    let _classDecorators_1 = [dec, dec];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    var E = class {
        static {
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            E = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return E = _classThis_1;
})();
//// [file3.js]
/*40*/
export let F = (() => {
    let _classDecorators = [dec, dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var F = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            F = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return F = _classThis;
})();
/*44*/
export default (() => {
    let _classDecorators_1 = [dec, dec];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    var G = class {
        static {
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            G = _classThis_1 = _classDescriptor_1.value;
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return G = _classThis_1;
})();
