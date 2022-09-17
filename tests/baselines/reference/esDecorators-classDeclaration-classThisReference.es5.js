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
    var _a;
    var _classDecorators = [dec];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var C = (_a = /** @class */ (function () {
            function class_1() {
            }
            class_1.m = function () { this; };
            Object.defineProperty(class_1, "g", {
                get: function () { return this; },
                enumerable: false,
                configurable: true
            });
            return class_1;
        }()),
        __setFunctionName(_a, "C"),
        (function () {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
        })(),
        (function () {
            _classThis;
        })(),
        _a.x = _classThis,
        (function () {
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
}();
