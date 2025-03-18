//// [tests/cases/conformance/decorators/decoratorMetadataWithTypeOnlyImport.ts] ////

//// [service.ts]
export class Service {
}
//// [component.ts]
import type { Service } from "./service";

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
exports.Service = void 0;
class Service {
}
exports.Service = Service;
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
