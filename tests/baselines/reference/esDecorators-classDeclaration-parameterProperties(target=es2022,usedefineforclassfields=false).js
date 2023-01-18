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
            __esDecorate(this, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false }, null, _instanceExtraInitializers);
        }
        constructor(message) {
            this.message = (__runInitializers(this, _instanceExtraInitializers), message);
        }
        speak() {
        }
    };
})();
