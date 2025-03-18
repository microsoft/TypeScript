//// [tests/cases/conformance/decorators/decoratorMetadata.ts] ////

//// [service.ts]
export default class Service {
}
//// [component.ts]
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

//// [service.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
}
exports.default = Service;
//// [component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
@decorator
class MyComponent {
    Service;
    constructor(Service) {
        this.Service = Service;
    }
    @decorator
    method(x) {
    }
}
