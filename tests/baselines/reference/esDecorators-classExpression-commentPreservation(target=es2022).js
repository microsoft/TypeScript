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
    var _method_get, _x_get, _x_set, _y, _z_accessor_storage, _z_get, _z_set, _a;
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
    var C = (_a = class {
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
            /*5*/
            method() { }
            /*8*/
            get x() { return 1; }
            /*11*/
            set x(value) { }
            /*14*/
            y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, 1));
            #z_accessor_storage = __runInitializers(this, _z_initializers, 1);
            /*17*/
            get z() { return this.#z_accessor_storage; }
            set z(value) { this.#z_accessor_storage = value; }
            static {
                /*29*/
                _y = { value: __runInitializers(_classThis, _static_private_y_initializers, 1) };
            }
            static {
                _z_accessor_storage = { value: __runInitializers(_classThis, _static_private_z_initializers, 1) };
            }
            static {
                __runInitializers(_classThis, _classExtraInitializers);
            }
        },
        __setFunctionName(_a, "C"),
        /*29*/
        _y = { value: __runInitializers(_classThis, _static_private_y_initializers, 1) },
        _z_accessor_storage = { value: __runInitializers(_classThis, _static_private_z_initializers, 1) },
        _a);
    return C = _classThis;
})());
