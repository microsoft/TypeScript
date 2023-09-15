//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-multipleDecorators.ts] ////

//// [esDecorators-classDeclaration-multipleDecorators.ts]
declare let dec1: any, dec2: any;

@dec1
@dec2
class C {
}


//// [esDecorators-classDeclaration-multipleDecorators.js]
var C = function () {
    var _classDecorators = [dec1, dec2];
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
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
