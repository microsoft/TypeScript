//// [tests/cases/compiler/esDecoratorExtendsNull.ts] ////

//// [esDecoratorExtendsNull.ts]
declare function dec(target: any, context: any): any;

// When a decorated class extends null and has no explicit constructor,
// the synthetic constructor should NOT call super(...arguments) since
// null is not a valid constructor.
class C extends null {
    @dec x: number = 1;
}


//// [esDecoratorExtendsNull.js]
"use strict";
// When a decorated class extends null and has no explicit constructor,
// the synthetic constructor should NOT call super(...arguments) since
// null is not a valid constructor.
let C = (() => {
    let _classSuper = null;
    let _x_decorators;
    let _x_initializers = [];
    let _x_extraInitializers = [];
    return class C extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _x_decorators = [dec];
            __esDecorate(null, null, _x_decorators, { kind: "field", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _x_initializers, _x_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        x = __runInitializers(this, _x_initializers, 1);
        constructor() {
            __runInitializers(this, _x_extraInitializers);
        }
    };
})();
