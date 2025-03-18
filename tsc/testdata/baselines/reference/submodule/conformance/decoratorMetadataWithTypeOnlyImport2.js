//// [tests/cases/conformance/decorators/decoratorMetadataWithTypeOnlyImport2.ts] ////

//// [services.ts]
export namespace Services {
  export class Service {}
}

//// [index.ts]
import type { Services } from './services';

declare const decorator: any;
export class Main {
  @decorator()
  field: Services.Service;
}


//// [services.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
var Services;
(function (Services) {
    class Service {
    }
    Services.Service = Service;
})(Services || (exports.Services = Services = {}));
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
class Main {
    @decorator()
    field;
}
exports.Main = Main;
