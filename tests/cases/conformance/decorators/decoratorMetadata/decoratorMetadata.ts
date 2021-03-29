// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5
// @module: commonjs
// @filename: service.ts
export default class Service {
}
// @filename: component.ts
import Service from "./service";

declare var decorator: any;

@decorator
class MyComponent {
    constructor(public Service: Service) {
    }

    @decorator
    method(x: this) {
    }
}