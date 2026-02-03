//// [tests/cases/conformance/esDecorators/classDeclaration/classThisReference/esDecorators-classDeclaration-classThisReference.es5.ts] ////

//// [esDecorators-classDeclaration-classThisReference.es5.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.es5.js]
var C = function () {
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = _classThis = /** @class */ (function () {
        function C_1() {
        }
        C_1.m = function () { this; };
        Object.defineProperty(C_1, "g", {
            get: function () { return this; },
            enumerable: false,
            configurable: true
        });
        return C_1;
    }());
    __setFunctionName(_classThis, "C");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    (function () {
        _classThis;
    })();
    _classThis.x = _classThis;
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
}();
