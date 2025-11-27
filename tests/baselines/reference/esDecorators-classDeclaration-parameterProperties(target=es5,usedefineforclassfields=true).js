//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-parameterProperties.ts] ////

//// [esDecorators-classDeclaration-parameterProperties.ts]
declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}


//// [esDecorators-classDeclaration-parameterProperties.js]
var C = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _speak_decorators;
    return _a = /** @class */ (function () {
            function C(message) {
                Object.defineProperty(this, "message", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), message)
                });
            }
            Object.defineProperty(C.prototype, "speak", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                }
            });
            return C;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _speak_decorators = [bound];
            __esDecorate(_a, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: function (obj) { return "speak" in obj; }, get: function (obj) { return obj.speak; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
