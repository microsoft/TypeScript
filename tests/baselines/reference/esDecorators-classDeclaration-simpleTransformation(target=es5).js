//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-simpleTransformation.ts] ////

//// [esDecorators-classDeclaration-simpleTransformation.ts]
declare let dec: any;

@dec
class C {
}


//// [esDecorators-classDeclaration-simpleTransformation.js]
var _this = this;
var C = function () {
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = _classThis = /** @class */ (function () {
        function C_1() {
        }
        return C_1;
    }());
    __setFunctionName(_classThis, "C");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
