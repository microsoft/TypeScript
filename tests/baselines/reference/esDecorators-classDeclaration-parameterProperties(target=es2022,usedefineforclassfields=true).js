//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-parameterProperties.ts] ////

//// [esDecorators-classDeclaration-parameterProperties.ts]
declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}


//// [esDecorators-classDeclaration-parameterProperties.js]
let C = (() => {
    let _instanceExtraInitializers = [];
    let _speak_decorators;
    return class C {
        static {
            _speak_decorators = [bound];
            __esDecorate(this, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: obj => "speak" in obj, get: obj => obj.speak } }, null, _instanceExtraInitializers);
        }
        message = (__runInitializers(this, _instanceExtraInitializers), void 0);
        constructor(message) {
            this.message = message;
        }
        speak() {
        }
    };
})();
