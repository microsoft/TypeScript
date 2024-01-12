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
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _speak_decorators = [bound];
            __esDecorate(this, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: obj => "speak" in obj, get: obj => obj.speak }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        message = __runInitializers(this, _instanceExtraInitializers);
        constructor(message) {
            this.message = message;
        }
        speak() {
        }
    };
})();
