//// [tests/cases/compiler/metadataReferencedWithinFilteredUnion.ts] ////

//// [Class1.ts]
export class Class1 {
}
//// [Class2.ts]
import { Class1 } from './Class1';

function decorate(target: any, propertyKey: string) {
}

export class Class2 {
    @decorate
    get prop(): Class1 | undefined {
        return undefined;
    }
}

//// [Class1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class1 = void 0;
class Class1 {
}
exports.Class1 = Class1;
//// [Class2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class2 = void 0;
function decorate(target, propertyKey) {
}
class Class2 {
    @decorate
    get prop() {
        return undefined;
    }
}
exports.Class2 = Class2;
