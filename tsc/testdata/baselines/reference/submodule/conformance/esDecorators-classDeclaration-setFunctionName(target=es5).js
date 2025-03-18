//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-setFunctionName.ts] ////

//// [a.ts]
declare let dec: any;

@dec class C {}

export {}

//// [b.ts]
declare let dec: any;

@dec export class C {}

//// [c.ts]
declare let dec: any;

@dec export default class C {}

//// [c.ts]
declare let dec: any;

@dec export default class {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
@dec
class C {
}
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
@dec
class C {
}
exports.C = C;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
@dec
class default_1 {
}
exports.default = default_1;
