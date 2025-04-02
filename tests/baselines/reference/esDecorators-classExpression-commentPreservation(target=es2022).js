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
/*1*/
((() => {
    var _C_method_get, _C_x_get, _C_x_set, _C_y, _C_z_accessor_storage, _C_z_get, _C_z_set;
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
    let _static_private_y_extraInitializers = [];
    let _static_private_z_decorators;
    let _static_private_z_initializers = [];
    let _static_private_z_extraInitializers = [];
    let _static_private_z_descriptor;
    let _method_decorators;
    let _get_x_decorators;
    let _set_x_decorators;
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    let _z_decorators;
    let _z_initializers = [];
    let _z_extraInitializers = [];
    var C = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "C"); }
        static { _C_method_get = function _C_method_get() { return _static_private_method_descriptor.value; }, _C_x_get = function _C_x_get() { return _static_private_get_x_descriptor.get.call(this); }, _C_x_set = function _C_x_set(value) { return _static_private_set_x_descriptor.set.call(this, value); }, _C_z_get = function _C_z_get() { return _static_private_z_descriptor.get.call(this); }, _C_z_set = function _C_z_set(value) { return _static_private_z_descriptor.set.call(this, value); }; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
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
            __esDecorate(this, _static_private_method_descriptor = { value: __setFunctionName(function () { }, "#method") }, _static_private_method_decorators, { kind: "method", name: "#method", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_method_get) }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_get_x_descriptor = { get: __setFunctionName(function () { return 1; }, "#x", "get") }, _static_private_get_x_decorators, { kind: "getter", name: "#x", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_x_get) }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_set_x_descriptor = { set: __setFunctionName(function (value) { }, "#x", "set") }, _static_private_set_x_decorators, { kind: "setter", name: "#x", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "a", _C_x_set); } }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_z_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(this, _classThis, "f", _C_z_accessor_storage); }, "#z", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(this, _classThis, value, "f", _C_z_accessor_storage); }, "#z", "set") }, _static_private_z_decorators, { kind: "accessor", name: "#z", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_z_get), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "a", _C_z_set); } }, metadata: _metadata }, _static_private_z_initializers, _static_private_z_extraInitializers);
            __esDecorate(this, null, _method_decorators, { kind: "method", name: "method", static: false, private: false, access: { has: obj => "method" in obj, get: obj => obj.method }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_x_decorators, { kind: "getter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false, access: { has: obj => "x" in obj, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _z_decorators, { kind: "accessor", name: "z", static: false, private: false, access: { has: obj => "z" in obj, get: obj => obj.z, set: (obj, value) => { obj.z = value; } }, metadata: _metadata }, _z_initializers, _z_extraInitializers);
            __esDecorate(null, null, _static_private_y_decorators, { kind: "field", name: "#y", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "f", _C_y), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "f", _C_y); } }, metadata: _metadata }, _static_private_y_initializers, _static_private_y_extraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /*5*/
        method() { }
        /*8*/
        get x() { return 1; }
        /*11*/
        set x(value) { }
        /*14*/
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, 1));
        #z_1_accessor_storage = (__runInitializers(this, _y_extraInitializers), __runInitializers(this, _z_initializers, 1));
        /*17*/
        get z() { return this.#z_1_accessor_storage; }
        set z(value) { this.#z_1_accessor_storage = value; }
        static {
            /*29*/
            _C_y = { value: (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_private_y_initializers, 1)) };
        }
        static {
            _C_z_accessor_storage = { value: (__runInitializers(_classThis, _static_private_y_extraInitializers), __runInitializers(_classThis, _static_private_z_initializers, 1)) };
        }
        constructor() {
            __runInitializers(this, _z_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _static_private_z_extraInitializers);
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})());
