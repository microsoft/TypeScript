//// [esDecorators-classDeclaration-multipleDecorators.ts]
declare let dec1: any, dec2: any;

@dec1
@dec2
class C {
}


//// [esDecorators-classDeclaration-multipleDecorators.js]
var _this = this;
var C = function () {
    var _a;
    var _classDecorators = [dec1, dec2];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        __setFunctionName(_a, "C"),
        (function () {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
}();
