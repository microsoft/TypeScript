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
var _this = this;
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
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
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
