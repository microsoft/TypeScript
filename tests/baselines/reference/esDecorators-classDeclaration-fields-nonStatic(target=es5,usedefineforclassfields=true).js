//// [esDecorators-classDeclaration-fields-nonStatic.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) field1 = 1;
    @dec(2) ["field2"] = 2;
    @dec(3) [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-nonStatic.js]
var field3 = "field3";
var C = function () {
    var _a, _b;
    var _c;
    var _instanceExtraInitializers = [];
    var _field1_decorators;
    var _field1_initializers = [];
    var _member_decorators;
    var _member_initializers = [];
    var _member_decorators_1;
    var _member_initializers_1 = [];
    return _b = /** @class */ (function () {
            function C() {
                Object.defineProperty(this, "field1", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _field1_initializers, 1))
                });
                Object.defineProperty(this, "field2", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: __runInitializers(this, _member_initializers, 2)
                });
                Object.defineProperty(this, _a, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: __runInitializers(this, _member_initializers_1, 3)
                });
            }
            return C;
        }()),
        _a = (_field1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _c = __propKey(field3)),
        (function () {
            __esDecorate(null, null, _field1_decorators, { kind: "field", name: "field1", static: false, private: false, access: { get: function () { return this.field1; }, set: function (value) { this.field1 = value; } } }, _field1_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators, { kind: "field", name: "field2", static: false, private: false, access: { get: function () { return this["field2"]; }, set: function (value) { this["field2"] = value; } } }, _member_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators_1, { kind: "field", name: _c, static: false, private: false, access: { get: function () { return this[_c]; }, set: function (value) { this[_c] = value; } } }, _member_initializers_1, _instanceExtraInitializers);
        })(),
        _b;
}();
