//// [tests/cases/compiler/caseInsensitiveFileSystemWithCapsImportTypeDeclarations.ts] ////

//// [index.ts]
import { TypeB } from './type-b';

export class Broken {
    method () {
        return { } as TypeB;
    }
}
//// [type-b.ts]
import { Merge } from './types';
import { TypeA } from './type-a';

export type TypeB = Merge<TypeA, {
    b: string;
}>;
//// [type-a.ts]
export type TypeA = {
    a: string;
}
//// [types.ts]
export type Merge<T, U> = T & U;


//// [types.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [type-a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [type-b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broken = void 0;
class Broken {
    method() {
        return {};
    }
}
exports.Broken = Broken;
