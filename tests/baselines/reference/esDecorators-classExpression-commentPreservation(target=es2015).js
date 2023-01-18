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
    var _method_get, _x_get, _x_set, _y, _z_accessor_storage, _z_get, _z_set, _z_1_accessor_storage;
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
    var C = (_classThis = class {
            constructor() {
                /*14*/
                this.y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, 1));
                _z_1_accessor_storage.set(this, __runInitializers(this, _z_initializers, 1));
            }
            /*5*/
            method() { }
            /*8*/
            get x() { return 1; }
            /*11*/
            set x(value) { }
            /*17*/
            get z() { return __classPrivateFieldGet(this, _z_1_accessor_storage, "f"); }
            set z(value) { __classPrivateFieldSet(this, _z_1_accessor_storage, value, "f"); }
        },
        _z_1_accessor_storage = new WeakMap(),
        _method_get = function _method_get() { return _static_private_method_descriptor.value; },
        _x_get = function _x_get() { return _static_private_get_x_descriptor.get.call(this); },
        _x_set = function _x_set(value) { return _static_private_set_x_descriptor.set.call(this, value); },
        _z_get = function _z_get() { return _static_private_z_descriptor.get.call(this); },
        _z_set = function _z_set(value) { return _static_private_z_descriptor.set.call(this, value); },
        __setFunctionName(_classThis, "C"),
        (() => {
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
            __esDecorate(_classThis, _static_private_method_descriptor = { value: __setFunctionName(function () { }, "#method") }, _static_private_method_decorators, { kind: "method", name: "#method", static: true, private: true }, null, _staticExtraInitializers);
            __esDecorate(_classThis, _static_private_get_x_descriptor = { get: __setFunctionName(function () { return 1; }, "#x", "get") }, _static_private_get_x_decorators, { kind: "getter", name: "#x", static: true, private: true }, null, _staticExtraInitializers);
            __esDecorate(_classThis, _static_private_set_x_descriptor = { set: __setFunctionName(function (value) { }, "#x", "set") }, _static_private_set_x_decorators, { kind: "setter", name: "#x", static: true, private: true }, null, _staticExtraInitializers);
            __esDecorate(_classThis, _static_private_z_descriptor = { get: __setFunctionName(function () { return __classPrivateFieldGet(_classThis, _classThis, "f", _z_accessor_storage); }, "#z", "get"), set: __setFunctionName(function (value) { __classPrivateFieldSet(_classThis, _classThis, value, "f", _z_accessor_storage); }, "#z", "set") }, _static_private_z_decorators, { kind: "accessor", name: "#z", static: true, private: true }, _static_private_z_initializers, _staticExtraInitializers);
            __esDecorate(_classThis, null, _method_decorators, { kind: "method", name: "method", static: false, private: false }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _get_x_decorators, { kind: "getter", name: "x", static: false, private: false }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _set_x_decorators, { kind: "setter", name: "x", static: false, private: false }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _z_decorators, { kind: "accessor", name: "z", static: false, private: false }, _z_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _static_private_y_decorators, { kind: "field", name: "#y", static: true, private: true }, _static_private_y_initializers, _staticExtraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false }, _y_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _staticExtraInitializers);
        })(),
        /*29*/
        _y = { value: __runInitializers(_classThis, _static_private_y_initializers, 1) },
        _z_accessor_storage = { value: __runInitializers(_classThis, _static_private_z_initializers, 1) },
        (() => {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _classThis);
    return C = _classThis;
})());
