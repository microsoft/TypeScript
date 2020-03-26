//// [test.tsx]
export class C {
    factory() {
        return <div></div>;
    }
}


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
    factory() {
        return factory.createElement("div", null);
    }
}
exports.C = C;
