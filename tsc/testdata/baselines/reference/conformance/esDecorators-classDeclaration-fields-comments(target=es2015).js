//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-comments.ts] ////

//// [esDecorators-classDeclaration-fields-comments.ts]
declare let dec: any;

// The field after a decorated field has a JSDoc comment, and the fields have no
// trailing semicolons. The comment must be emitted once, on the field it belongs to.
class C {
    @dec a = 1
    /** doc b */
    @dec b = 2
    /** doc c */
    c = 3
    @dec d = [
        1,
        2 /* trailing comment inside the array */
    ]
    // line comment e
    e = 5
    @dec f = 6 /* trailing comment of f */
    /** doc g */
    g = 7
    @dec h = 8 /* trailing comment of h */;
    /** doc i */
    i = 9
    @dec static j = 10
    /** doc k */
    static k = 11
    @dec #l = /* leading comment of l */ 12;
    @dec #m = 13
    /** doc n */
    @dec #n = 14
    /** doc o */
    #o = 15
}


//// [esDecorators-classDeclaration-fields-comments.js]
"use strict";
// The field after a decorated field has a JSDoc comment, and the fields have no
// trailing semicolons. The comment must be emitted once, on the field it belongs to.
let C = (() => {
    var _a, _C_l, _C_m, _C_n, _C_o;
    let _static_j_decorators;
    let _static_j_initializers = [];
    let _static_j_extraInitializers = [];
    let _a_decorators;
    let _a_initializers = [];
    let _a_extraInitializers = [];
    let _b_decorators;
    let _b_initializers = [];
    let _b_extraInitializers = [];
    let _d_decorators;
    let _d_initializers = [];
    let _d_extraInitializers = [];
    let _f_decorators;
    let _f_initializers = [];
    let _f_extraInitializers = [];
    let _h_decorators;
    let _h_initializers = [];
    let _h_extraInitializers = [];
    let _private_l_decorators;
    let _private_l_initializers = [];
    let _private_l_extraInitializers = [];
    let _private_m_decorators;
    let _private_m_initializers = [];
    let _private_m_extraInitializers = [];
    let _private_n_decorators;
    let _private_n_initializers = [];
    let _private_n_extraInitializers = [];
    return _a = class C {
            constructor() {
                this.a = __runInitializers(this, _a_initializers, 1);
                /** doc b */
                this.b = (__runInitializers(this, _a_extraInitializers), __runInitializers(this, _b_initializers, 2));
                /** doc c */
                this.c = (__runInitializers(this, _b_extraInitializers), 3);
                this.d = __runInitializers(this, _d_initializers, [
                    1,
                    2 /* trailing comment inside the array */
                ]);
                // line comment e
                this.e = (__runInitializers(this, _d_extraInitializers), 5);
                this.f = __runInitializers(this, _f_initializers, 6); /* trailing comment of f */
                /** doc g */
                this.g = (__runInitializers(this, _f_extraInitializers), 7);
                this.h = __runInitializers(this, _h_initializers, 8) /* trailing comment of h */;
                /** doc i */
                this.i = (__runInitializers(this, _h_extraInitializers), 9);
                _C_l.set(this, __runInitializers(this, _private_l_initializers, /* leading comment of l */ 12));
                _C_m.set(this, (__runInitializers(this, _private_l_extraInitializers), __runInitializers(this, _private_m_initializers, 13)));
                /** doc n */
                _C_n.set(this, (__runInitializers(this, _private_m_extraInitializers), __runInitializers(this, _private_n_initializers, 14)));
                /** doc o */
                _C_o.set(this, (__runInitializers(this, _private_n_extraInitializers), 15));
            }
        },
        _C_l = new WeakMap(),
        _C_m = new WeakMap(),
        _C_n = new WeakMap(),
        _C_o = new WeakMap(),
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _a_decorators = [dec];
            _b_decorators = [dec];
            _d_decorators = [dec];
            _f_decorators = [dec];
            _h_decorators = [dec];
            _static_j_decorators = [dec];
            _private_l_decorators = [dec];
            _private_m_decorators = [dec];
            _private_n_decorators = [dec];
            __esDecorate(null, null, _static_j_decorators, { kind: "field", name: "j", static: true, private: false, access: { has: obj => "j" in obj, get: obj => obj.j, set: (obj, value) => { obj.j = value; } }, metadata: _metadata }, _static_j_initializers, _static_j_extraInitializers);
            __esDecorate(null, null, _a_decorators, { kind: "field", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
            __esDecorate(null, null, _b_decorators, { kind: "field", name: "b", static: false, private: false, access: { has: obj => "b" in obj, get: obj => obj.b, set: (obj, value) => { obj.b = value; } }, metadata: _metadata }, _b_initializers, _b_extraInitializers);
            __esDecorate(null, null, _d_decorators, { kind: "field", name: "d", static: false, private: false, access: { has: obj => "d" in obj, get: obj => obj.d, set: (obj, value) => { obj.d = value; } }, metadata: _metadata }, _d_initializers, _d_extraInitializers);
            __esDecorate(null, null, _f_decorators, { kind: "field", name: "f", static: false, private: false, access: { has: obj => "f" in obj, get: obj => obj.f, set: (obj, value) => { obj.f = value; } }, metadata: _metadata }, _f_initializers, _f_extraInitializers);
            __esDecorate(null, null, _h_decorators, { kind: "field", name: "h", static: false, private: false, access: { has: obj => "h" in obj, get: obj => obj.h, set: (obj, value) => { obj.h = value; } }, metadata: _metadata }, _h_initializers, _h_extraInitializers);
            __esDecorate(null, null, _private_l_decorators, { kind: "field", name: "#l", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_l, obj), get: obj => __classPrivateFieldGet(obj, _C_l, "f"), set: (obj, value) => { __classPrivateFieldSet(obj, _C_l, value, "f"); } }, metadata: _metadata }, _private_l_initializers, _private_l_extraInitializers);
            __esDecorate(null, null, _private_m_decorators, { kind: "field", name: "#m", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_m, obj), get: obj => __classPrivateFieldGet(obj, _C_m, "f"), set: (obj, value) => { __classPrivateFieldSet(obj, _C_m, value, "f"); } }, metadata: _metadata }, _private_m_initializers, _private_m_extraInitializers);
            __esDecorate(null, null, _private_n_decorators, { kind: "field", name: "#n", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_n, obj), get: obj => __classPrivateFieldGet(obj, _C_n, "f"), set: (obj, value) => { __classPrivateFieldSet(obj, _C_n, value, "f"); } }, metadata: _metadata }, _private_n_initializers, _private_n_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.j = __runInitializers(_a, _static_j_initializers, 10),
        /** doc k */
        _a.k = (__runInitializers(_a, _static_j_extraInitializers), 11),
        _a;
})();
