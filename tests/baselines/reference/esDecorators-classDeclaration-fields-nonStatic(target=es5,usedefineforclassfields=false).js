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
    var _a;
    var _b;
    var _instanceExtraInitializers = [];
    var _field1_decorators;
    var _field1_initializers = [];
    var _member_decorators;
    var _member_initializers = [];
    var _member_decorators_1;
    var _member_initializers_1 = [];
    return _a = /** @class */ (function () {
            function C() {
                this.field1 = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _field1_initializers, 1));
                this["field2"] = __runInitializers(this, _member_initializers, 2);
                this[_b] = __runInitializers(this, _member_initializers_1, 3);
            }
            return C;
        }()),
        _field1_decorators = [dec(1)],
        _member_decorators = [dec(2)],
        _member_decorators_1 = [dec(3)],
        _b = __propKey(field3),
        (function () {
            __esDecorate(null, null, _field1_decorators, { kind: "field", name: "field1", static: false, private: false }, _field1_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators, { kind: "field", name: "field2", static: false, private: false }, _member_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators_1, { kind: "field", name: _b, static: false, private: false }, _member_initializers_1, _instanceExtraInitializers);
        })(),
        _a;
}();
