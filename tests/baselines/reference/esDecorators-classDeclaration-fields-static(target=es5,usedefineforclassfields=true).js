//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-static.ts] ////

//// [esDecorators-classDeclaration-fields-static.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static field1 = 1;
    @dec(2) static ["field2"] = 2;
    @dec(3) static [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-static.js]
var _this = this;
var field3 = "field3";
var C = function () {
    var _a;
    var _b;
    var _static_field1_decorators;
    var _static_field1_initializers = [];
    var _static_field1_extraInitializers = [];
    var _static_member_decorators;
    var _static_member_initializers = [];
    var _static_member_extraInitializers = [];
    var _static_member_decorators_1;
    var _static_member_initializers_1 = [];
    var _static_member_extraInitializers_1 = [];
    return _a = /** @class */ (function () {
            function C() {
            }
            return C;
        }()),
        _static_field1_decorators = [dec(1)],
        _static_member_decorators = [dec(2)],
        _static_member_decorators_1 = [dec(3)],
        _b = __propKey(field3),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, null, _static_field1_decorators, { kind: "field", name: "field1", static: true, private: false, access: { has: function (obj) { return "field1" in obj; }, get: function (obj) { return obj.field1; }, set: function (obj, value) { obj.field1 = value; } }, metadata: _metadata }, _static_field1_initializers, _static_field1_extraInitializers);
            __esDecorate(null, null, _static_member_decorators, { kind: "field", name: "field2", static: true, private: false, access: { has: function (obj) { return "field2" in obj; }, get: function (obj) { return obj["field2"]; }, set: function (obj, value) { obj["field2"] = value; } }, metadata: _metadata }, _static_member_initializers, _static_member_extraInitializers);
            __esDecorate(null, null, _static_member_decorators_1, { kind: "field", name: _b, static: true, private: false, access: { has: function (obj) { return _b in obj; }, get: function (obj) { return obj[_b]; }, set: function (obj, value) { obj[_b] = value; } }, metadata: _metadata }, _static_member_initializers_1, _static_member_extraInitializers_1);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        Object.defineProperty(_a, "field1", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: __runInitializers(_a, _static_field1_initializers, 1)
        }),
        Object.defineProperty(_a, "field2", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (__runInitializers(_a, _static_field1_extraInitializers), __runInitializers(_a, _static_member_initializers, 2))
        }),
        Object.defineProperty(_a, _b, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (__runInitializers(_a, _static_member_extraInitializers), __runInitializers(_a, _static_member_initializers_1, 3))
        }),
        (function () {
            __runInitializers(_a, _static_member_extraInitializers_1);
        })(),
        _a;
}();
