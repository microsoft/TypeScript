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
            _speak_decorators = [bound];
            __esDecorate(_a, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: function (obj) { return "speak" in obj; }, get: function (obj) { return obj.speak; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
