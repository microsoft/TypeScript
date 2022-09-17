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
    var _a, _b;
    var _c;
    var _staticExtraInitializers = [];
    var _static_field1_decorators;
    var _static_field1_initializers = [];
    var _static_member_decorators;
    var _static_member_initializers = [];
    var _static_member_decorators_1;
    var _static_member_initializers_1 = [];
    return _a = /** @class */ (function () {
            function C() {
            }
            return C;
        }()),
        _b = (_static_field1_decorators = [dec(1)], _static_member_decorators = [dec(2)], _static_member_decorators_1 = [dec(3)], _c = __propKey(field3)),
        (function () {
            __esDecorate(null, null, _static_field1_decorators, { kind: "field", name: "field1", static: true, private: false, access: { get: function () { return this.field1; }, set: function (value) { this.field1 = value; } } }, _static_field1_initializers, _staticExtraInitializers);
            __esDecorate(null, null, _static_member_decorators, { kind: "field", name: "field2", static: true, private: false, access: { get: function () { return this["field2"]; }, set: function (value) { this["field2"] = value; } } }, _static_member_initializers, _staticExtraInitializers);
            __esDecorate(null, null, _static_member_decorators_1, { kind: "field", name: _c, static: true, private: false, access: { get: function () { return this[_c]; }, set: function (value) { this[_c] = value; } } }, _static_member_initializers_1, _staticExtraInitializers);
            __runInitializers(_a, _staticExtraInitializers);
        })(),
        _a.field1 = __runInitializers(_a, _static_field1_initializers, 1),
        _a["field2"] = __runInitializers(_a, _static_member_initializers, 2),
        _a[_b] = __runInitializers(_a, _static_member_initializers_1, 3),
        _a;
}();
