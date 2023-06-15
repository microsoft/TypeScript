//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-parameterProperties.ts] ////

//// [esDecorators-classDeclaration-parameterProperties.ts]
declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}


//// [esDecorators-classDeclaration-parameterProperties.js]
var _this = this;
var C = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _speak_decorators;
    return _a = /** @class */ (function () {
            function C(message) {
                this.message = (__runInitializers(this, _instanceExtraInitializers), message);
            }
            C.prototype.speak = function () {
            };
            return C;
        }()),
        (function () {
            var metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : undefined;
            _speak_decorators = [bound];
            __esDecorate(_a, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: function (obj) { return "speak" in obj; }, get: function (obj) { return obj.speak; } }, metadata: metadata }, null, _instanceExtraInitializers);
            if (metadata) Object.defineProperty(_a, Symbol.metadata, { configurable: true, writable: true, enumerable: true, value: metadata });
        })(),
        _a;
}();
